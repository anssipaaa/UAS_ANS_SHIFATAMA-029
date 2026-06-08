"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProduk(formData: FormData) {
  const nama = formData.get("nama_produk") as string;
  const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const id_kategori = Number(formData.get("id_kategori"));
  const deskripsi = formData.get("deskripsi") as string || null;
  const harga = Number(formData.get("harga"));
  const harga_coret = formData.get("harga_coret") ? Number(formData.get("harga_coret")) : null;
  const stok = Number(formData.get("stok")) || 0;
  const satuan = (formData.get("satuan") as string) || "pcs";
  const berat_gram = formData.get("berat_gram") ? Number(formData.get("berat_gram")) : null;
  const gambar_utama = (formData.get("gambar_utama") as string) || null;
  const unggulan = formData.get("unggulan") === "on" ? 1 : 0;
  const aktif = formData.get("aktif") === "on" ? 1 : 0;

  await query(
    `INSERT INTO produk (id_kategori, nama_produk, slug, deskripsi, harga, harga_coret, stok, satuan, berat_gram, gambar_utama, unggulan, aktif)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id_kategori, nama, slug, deskripsi, harga, harga_coret, stok, satuan, berat_gram, gambar_utama, unggulan, aktif]
  );

  revalidatePath("/admin/produk");
  revalidatePath("/produk");
  revalidatePath("/");
  redirect("/admin/produk");
}

export async function updateProduk(id: number, formData: FormData) {
  const nama = formData.get("nama_produk") as string;
  const slug = nama.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  const id_kategori = Number(formData.get("id_kategori"));
  const deskripsi = formData.get("deskripsi") as string || null;
  const harga = Number(formData.get("harga"));
  const harga_coret = formData.get("harga_coret") ? Number(formData.get("harga_coret")) : null;
  const stok = Number(formData.get("stok")) || 0;
  const satuan = (formData.get("satuan") as string) || "pcs";
  const berat_gram = formData.get("berat_gram") ? Number(formData.get("berat_gram")) : null;
  const gambar_utama = (formData.get("gambar_utama") as string) || null;
  const unggulan = formData.get("unggulan") === "on" ? 1 : 0;
  const aktif = formData.get("aktif") === "on" ? 1 : 0;

  await query(
    `UPDATE produk SET id_kategori=?, nama_produk=?, slug=?, deskripsi=?, harga=?, harga_coret=?, stok=?, satuan=?, berat_gram=?, gambar_utama=?, unggulan=?, aktif=?
     WHERE id_produk=?`,
    [id_kategori, nama, slug, deskripsi, harga, harga_coret, stok, satuan, berat_gram, gambar_utama, unggulan, aktif, id]
  );

  revalidatePath("/admin/produk");
  revalidatePath("/produk");
  revalidatePath("/");
  redirect("/admin/produk");
}

export async function deleteProduk(id: number) {
  await query("DELETE FROM produk WHERE id_produk = ?", [id]);
  revalidatePath("/admin/produk");
  revalidatePath("/produk");
  revalidatePath("/");
}

export async function toggleAktifProduk(id: number, current: number) {
  await query("UPDATE produk SET aktif = ? WHERE id_produk = ?", [current === 1 ? 0 : 1, id]);
  revalidatePath("/admin/produk");
  revalidatePath("/produk");
}

export async function toggleUnggulanProduk(id: number, current: number) {
  await query("UPDATE produk SET unggulan = ? WHERE id_produk = ?", [current === 1 ? 0 : 1, id]);
  revalidatePath("/admin/produk");
  revalidatePath("/");
}
