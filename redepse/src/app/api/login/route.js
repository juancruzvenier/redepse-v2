import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    const { usuario, contraseña } = await request.json();
    console.log("Intentando login para:", usuario);

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST, // <- asegurate de que esté definida
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
    });

    console.log("Conexión a MySQL exitosa");

    const [rows] = await connection.execute(
      "SELECT * FROM usuario WHERE email = ?",
      [usuario]
    );

    if (!rows.length) {
      console.log("Usuario no encontrado");
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 });
    }

    if (rows[0].contraseña !== contraseña) {
      console.log("Contraseña incorrecta");
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 403 });
    }

    console.log("Generando token...");
    console.log("JWT_SECRET:", process.env.JWT_SECRET); 

    const token = jwt.sign(
      { id: rows[0].id_user, tipo: rows[0].tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("Token generado con éxito");

    return NextResponse.json({ token, tipo: rows[0].tipo }, {
      headers: {
        'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=86400`
      }
    });
  } catch (error) {
    console.error("Error en login:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}