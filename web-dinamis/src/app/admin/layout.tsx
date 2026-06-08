import React from "react";
import "./admin.css";
import AdminClientLayout from "./AdminClientLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Auth guard is handled by middleware.ts — no need to check session here
  return (
    <AdminClientLayout>
      {children}
    </AdminClientLayout>
  );
}
