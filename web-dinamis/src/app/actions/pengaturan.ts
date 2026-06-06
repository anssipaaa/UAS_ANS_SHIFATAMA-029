"use server";

import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updatePengaturan(formData: FormData) {
  const keys = [
    "nama_toko", "tagline", "alamat_toko", "telepon_toko", "email_toko",
    "jam_buka", "min_order_delivery", "ongkir_per_km", "radius_delivery_km", "meta_description"
  ];

  for (const key of keys) {
    const value = formData.get(key) as string;
    if (value !== null && value !== undefined) {
      await query(
        "INSERT INTO pengaturan (kunci, nilai) VALUES (?, ?) ON DUPLICATE KEY UPDATE nilai = ?",
        [key, value, value]
      );
    }
  }

  revalidatePath("/admin/pengaturan");
  revalidatePath("/");
}
