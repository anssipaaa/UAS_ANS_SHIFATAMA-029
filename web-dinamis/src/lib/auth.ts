import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { query } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@bakerykita.id" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const rows = await query<any>(
            "SELECT id_user, nama_lengkap, email, kata_sandi, role FROM `user` WHERE email = ? AND aktif = 1",
            [credentials.email]
          );

          const user = rows[0];

          if (user) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.kata_sandi
            );

            if (isPasswordValid) {
              return {
                id: user.id_user.toString(),
                name: user.nama_lengkap,
                email: user.email,
                role: user.role,
              };
            }
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // @ts-ignore
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "your-super-secret-key-1234",
};
