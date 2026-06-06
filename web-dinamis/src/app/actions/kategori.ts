"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createKategori(formData: FormData) {
  const nama = formData.get("nama_kategori") as string;
  const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const deskripsi = formData.get("deskripsi") as string || null;
  const gambar_url = formData.get("gambar_url") as string || null;
  const urutan = Number(formData.get("urutan")) || 0;
  const aktif = formData.get("aktif") === "on" ? 1 : 0;

  await query(
    "INSERT INTO kategori (nama_kategori, slug, deskripsi, gambar_url, urutan, aktif) VALUES (?, ?, ?, ?, ?, ?)",
    [nama, slug, deskripsi, gambar_url, urutan, aktif]
  );

  revalidatePath("/admin/kategori");
  revalidatePath("/");
  redirect("/admin/kategori");
}

export async function updateKategori(id: number, formData: FormData) {
  const nama = formData.get("nama_kategori") as string;
  const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const deskripsi = formData.get("deskripsi") as string || null;
  const gambar_url = formData.get("gambar_url") as string || null;
  const urutan = Number(formData.get("urutan")) || 0;
  const aktif = formData.get("aktif") === "on" ? 1 : 0;

  await query(
    "UPDATE kategori SET nama_kategori=?, slug=?, deskripsi=?, gambar_url=?, urutan=?, aktif=? WHERE id_kategori=?",
    [nama, slug, deskripsi, gambar_url, urutan, aktif, id]
  );

  revalidatePath("/admin/kategori");
  revalidatePath("/");
  redirect("/admin/kategori");
}

export async function deleteKategori(id: number) {
  await query("DELETE FROM kategori WHERE id_kategori = ?", [id]);
  revalidatePath("/admin/kategori");
  revalidatePath("/");
}
