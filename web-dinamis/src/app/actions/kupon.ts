"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createKupon(formData: FormData) {
  const kode = (formData.get("kode_kupon") as string).toUpperCase();
  const deskripsi = formData.get("deskripsi") as string || null;
  const tipe_diskon = formData.get("tipe_diskon") as string;
  const nilai_diskon = Number(formData.get("nilai_diskon"));
  const min_belanja = Number(formData.get("min_belanja")) || 0;
  const maks_diskon = formData.get("maks_diskon") ? Number(formData.get("maks_diskon")) : null;
  const kuota = formData.get("kuota") ? Number(formData.get("kuota")) : null;
  const berlaku_mulai = formData.get("berlaku_mulai") as string || null;
  const berlaku_sampai = formData.get("berlaku_sampai") as string || null;
  const aktif = formData.get("aktif") === "on" ? 1 : 0;

  await query(
    `INSERT INTO kupon (kode_kupon, deskripsi, tipe_diskon, nilai_diskon, min_belanja, maks_diskon, kuota, berlaku_mulai, berlaku_sampai, aktif)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [kode, deskripsi, tipe_diskon, nilai_diskon, min_belanja, maks_diskon, kuota, berlaku_mulai, berlaku_sampai, aktif]
  );

  revalidatePath("/admin/kupon");
  redirect("/admin/kupon");
}

export async function updateKupon(id: number, formData: FormData) {
  const kode = (formData.get("kode_kupon") as string).toUpperCase();
  const deskripsi = formData.get("deskripsi") as string || null;
  const tipe_diskon = formData.get("tipe_diskon") as string;
  const nilai_diskon = Number(formData.get("nilai_diskon"));
  const min_belanja = Number(formData.get("min_belanja")) || 0;
  const maks_diskon = formData.get("maks_diskon") ? Number(formData.get("maks_diskon")) : null;
  const kuota = formData.get("kuota") ? Number(formData.get("kuota")) : null;
  const berlaku_mulai = formData.get("berlaku_mulai") as string || null;
  const berlaku_sampai = formData.get("berlaku_sampai") as string || null;
  const aktif = formData.get("aktif") === "on" ? 1 : 0;

  await query(
    `UPDATE kupon SET kode_kupon=?, deskripsi=?, tipe_diskon=?, nilai_diskon=?, min_belanja=?, maks_diskon=?, kuota=?, berlaku_mulai=?, berlaku_sampai=?, aktif=?
     WHERE id_kupon=?`,
    [kode, deskripsi, tipe_diskon, nilai_diskon, min_belanja, maks_diskon, kuota, berlaku_mulai, berlaku_sampai, aktif, id]
  );

  revalidatePath("/admin/kupon");
  redirect("/admin/kupon");
}

export async function deleteKupon(id: number) {
  await query("DELETE FROM kupon WHERE id_kupon = ?", [id]);
  revalidatePath("/admin/kupon");
}
