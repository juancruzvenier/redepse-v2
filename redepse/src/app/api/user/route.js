import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function GET(req) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Token no encontrado' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    return NextResponse.json({ user: payload });
  } catch (err) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
  }
}