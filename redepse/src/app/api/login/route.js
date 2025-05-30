import { NextResponse } from "next/server";
import pool from "@/src/lib/db";
/*import bcrypt from "bcrypt";*/

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const [rows] = await pool.query(
      "SELECT id_user, username, contraseña, rol FROM usuario WHERE email = ? AND contraseña = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const user = rows[0];

    /*   const passwordMatch = await bcrypt.compare(password, user.contraseña);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }*/

    const { contraseña, ...userData } = user;

    return NextResponse.json({ user: userData }, { status: 200 });
  } catch (error) {
    console.error("Error en login API:", error);
    return NextResponse.json(
      { error: "Error", details: error.message },
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}

/*
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    const connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(
      "SELECT id_user, username, rol FROM usuario WHERE email = ? AND contraseña = ?",
      [email, password]
    );

    await connection.end();

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Correo o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const user = rows[0];

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error en login API:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
*/
