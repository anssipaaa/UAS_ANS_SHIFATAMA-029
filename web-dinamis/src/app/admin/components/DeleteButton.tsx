"use client";

import React from "react";

export default function DeleteButton({
  confirmMessage = "Yakin ingin menghapus data ini?",
}: {
  confirmMessage?: string;
}) {
  return (
    <button
      type="submit"
      className="admin-btn-icon"
      style={{ color: "#ef4444" }}
      title="Hapus"
      onClick={(e) => {
        if (!confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      🗑️
    </button>
  );
}
