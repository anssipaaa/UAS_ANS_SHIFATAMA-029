import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') || '1';
  const img = searchParams.get('img') || '/images/produk/roti_tawar_putih.png';
  
  try {
    const result = await query(
      `UPDATE produk SET gambar_utama=? WHERE id_produk=?`,
      [img, Number(id)]
    );
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message, stack: error.stack });
  }
}
