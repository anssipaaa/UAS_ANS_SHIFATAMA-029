"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusUser, setFocusUser] = useState(false);
  const [focusPass, setFocusPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { redirect: false, email, password });
    if (res?.error) {
      setError("Ups, email atau passwordnya salah nih 😢");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(circle at 10% 20%, rgba(255, 182, 193, 0.4) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(255, 105, 180, 0.3) 0%, transparent 40%), #FFF0F5",
      fontFamily: "var(--font-quicksand), sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated floating blobs */}
      <div style={{
        position: "absolute", top: "10%", left: "15%",
        width: "300px", height: "300px",
        background: "linear-gradient(135deg, rgba(255, 182, 193, 0.5), rgba(255, 105, 180, 0.3))",
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        animation: "blobBounce 8s infinite alternate ease-in-out",
        pointerEvents: "none",
        filter: "blur(20px)",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", right: "10%",
        width: "250px", height: "250px",
        background: "linear-gradient(135deg, rgba(255, 105, 180, 0.4), rgba(255, 182, 193, 0.6))",
        borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
        animation: "blobBounce 10s infinite alternate-reverse ease-in-out",
        pointerEvents: "none",
        filter: "blur(20px)",
      }} />

      <style>{`
        @keyframes blobBounce {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translateY(0); }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: translateY(-20px); }
          100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: translateY(0); }
        }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .login-btn:hover { background: linear-gradient(135deg, var(--accent-brown), var(--accent-amber)) !important; transform: translateY(-4px) scale(1.05) !important; box-shadow: 0 15px 30px rgba(255, 105, 180, 0.4) !important; }
        .login-btn:active { transform: translateY(0) scale(0.95) !important; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none !important; }
      `}</style>

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "440px",
        margin: "20px",
        animation: "fadeUp 0.6s ease forwards",
        position: "relative", zIndex: 10,
      }}>
        <div style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "2px dashed rgba(255, 105, 180, 0.3)",
          borderRadius: "40px",
          padding: "48px 44px",
          boxShadow: "0 20px 50px rgba(255, 182, 193, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div style={{
              width: "80px", height: "80px",
              background: "#FFF0F5",
              border: "2px dashed rgba(255, 105, 180, 0.4)",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "40px",
              boxShadow: "0 10px 20px rgba(255, 105, 180, 0.15)",
            }}>
              🎀
            </div>

            <h1 style={{
              fontSize: "32px", margin: "0 0 8px",
              color: "var(--accent-brown)", fontFamily: "var(--font-fredoka), sans-serif"
            }}>
              Cipa's Bakery
            </h1>
            <p style={{ color: "var(--text-dim)", fontSize: "15px", margin: 0, fontWeight: 600 }}>
              Masuk ke Dapur Admin 👩‍🍳
            </p>
          </div>

          {/* Error box */}
          {error && (
            <div style={{
              background: "#FFEBEE", border: "2px dashed #EF5350",
              borderRadius: "20px", padding: "12px 16px",
              color: "#C62828", fontSize: "14px", textAlign: "center",
              marginBottom: "24px", fontWeight: "bold"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{
                display: "block", fontSize: "13px", fontWeight: 700,
                color: "var(--accent-brown)", textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "8px", fontFamily: "var(--font-fredoka), sans-serif"
              }}>Email Admin</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusUser ? "var(--accent-brown)" : "var(--accent-amber)", transition: "color 0.2s",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                <input
                  type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusUser(true)}
                  onBlur={() => setFocusUser(false)}
                  placeholder="admin@bakerykita.id"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "#FFF",
                    border: `2px solid ${focusUser ? "var(--accent-brown)" : "rgba(255, 182, 193, 0.4)"}`,
                    borderRadius: "20px",
                    padding: "16px 16px 16px 48px",
                    color: "var(--text-main)", fontSize: "15px",
                    outline: "none",
                    boxShadow: focusUser ? "0 5px 15px rgba(255, 105, 180, 0.15)" : "none",
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    fontFamily: "var(--font-quicksand), sans-serif",
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "32px" }}>
              <label style={{
                display: "block", fontSize: "13px", fontWeight: 700,
                color: "var(--accent-brown)", textTransform: "uppercase", letterSpacing: "1px",
                marginBottom: "8px", fontFamily: "var(--font-fredoka), sans-serif"
              }}>Kata Sandi rahasia</label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
                  color: focusPass ? "var(--accent-brown)" : "var(--accent-amber)", transition: "color 0.2s",
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"} required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusPass(true)}
                  onBlur={() => setFocusPass(false)}
                  placeholder="Sstt.. Rahasia ya!"
                  style={{
                    width: "100%", boxSizing: "border-box",
                    background: "#FFF",
                    border: `2px solid ${focusPass ? "var(--accent-brown)" : "rgba(255, 182, 193, 0.4)"}`,
                    borderRadius: "20px",
                    padding: "16px 48px 16px 48px",
                    color: "var(--text-main)", fontSize: "15px",
                    outline: "none",
                    boxShadow: focusPass ? "0 5px 15px rgba(255, 105, 180, 0.15)" : "none",
                    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    fontFamily: "var(--font-quicksand), sans-serif",
                  }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--accent-brown)", padding: "4px",
                  display: "flex", alignItems: "center",
                }}>
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button type="submit" disabled={loading} className="login-btn" style={{
              width: "100%", padding: "18px",
              background: "linear-gradient(135deg, var(--accent-amber), var(--accent-brown))",
              border: "none", borderRadius: "50px",
              color: "#FFF", fontSize: "16px", fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              boxShadow: "0 10px 25px rgba(255, 105, 180, 0.3)",
              transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              fontFamily: "var(--font-fredoka), sans-serif",
            }}>
              {loading ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite" }}>
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Membuka Pintu...
                </>
              ) : (
                <>
                  Masuk Sekarang 🚀
                </>
              )}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "30px", color: "var(--accent-amber)", fontSize: "13px", fontWeight: "bold" }}>
            © 2026 Cipa's Bakery 💖
          </p>
        </div>
      </div>
    </div>
  );
}
