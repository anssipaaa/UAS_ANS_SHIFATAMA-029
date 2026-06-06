"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateStatusPesanan(id: number, status: string) {
  await query("UPDATE pesanan SET status = ? WHERE id_pesanan = ?", [status, id]);
  revalidatePath("/admin/pesanan");
  revalidatePath(`/admin/pesanan/${id}`);
  revalidatePath("/admin");
}
