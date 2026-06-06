"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createArtikel(formData: FormData) {
  const judul = formData.get("judul") as string;
  const slug = judul.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const isi = formData.get("isi") as string;
  const gambar_url = formData.get("gambar_url") as string || null;
  const penulis = formData.get("penulis") as string || null;
  const status = formData.get("status") === "publish" ? "publish" : "draft";

  await query(
    "INSERT INTO artikel (judul, slug, isi, gambar_url, penulis, status) VALUES (?, ?, ?, ?, ?, ?)",
    [judul, slug, isi, gambar_url, penulis, status]
  );

  revalidatePath("/admin/artikel");
  revalidatePath("/");
  redirect("/admin/artikel");
}

export async function updateArtikel(id: number, formData: FormData) {
  const judul = formData.get("judul") as string;
  const slug = judul.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const isi = formData.get("isi") as string;
  const gambar_url = formData.get("gambar_url") as string || null;
  const penulis = formData.get("penulis") as string || null;
  const status = formData.get("status") === "publish" ? "publish" : "draft";

  await query(
    "UPDATE artikel SET judul=?, slug=?, isi=?, gambar_url=?, penulis=?, status=? WHERE id_artikel=?",
    [judul, slug, isi, gambar_url, penulis, status, id]
  );

  revalidatePath("/admin/artikel");
  revalidatePath("/");
  redirect("/admin/artikel");
}

export async function deleteArtikel(id: number) {
  await query("DELETE FROM artikel WHERE id_artikel = ?", [id]);
  revalidatePath("/admin/artikel");
  revalidatePath("/");
}

export async function togglePublishArtikel(id: number, currentStatus: string) {
  const newStatus = currentStatus === "publish" ? "draft" : "publish";
  await query("UPDATE artikel SET status = ? WHERE id_artikel = ?", [newStatus, id]);
  revalidatePath("/admin/artikel");
  revalidatePath("/");
}
