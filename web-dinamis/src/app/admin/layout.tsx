import React from "react";
import "./admin.css";
import AdminClientLayout from "./AdminClientLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  return (
    <AdminClientLayout>
      {children}
    </AdminClientLayout>
  );
}
