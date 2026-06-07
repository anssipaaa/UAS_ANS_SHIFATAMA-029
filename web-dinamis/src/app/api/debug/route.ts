import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    const produk = await query('SELECT id_produk, nama_produk, gambar_utama FROM produk');
    return NextResponse.json({ success: true, data: produk });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
