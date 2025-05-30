// app/api/alumnos/route.js
// app/api/alumnos/route.js
import pool from "@/src/lib/db";

// GET - Obtener todos los alumnos activos
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        t.dni_tutor, 
        t.nombre, 
        t.apellido, 
        t.fecha_nac,
        t.email,
        t.telefono1 AS telefono,
        t.domicilio,
        t.id_periodo
      FROM tutor t
    `);

    const tutores = rows.map((tutor) => ({
      ...tutor,
      fecha_nac: tutor.fecha_nac?.toISOString().split("T")[0] || null,
    }));

    return Response.json(tutores);
  } catch (error) {
    console.error("Error en GET /api/tutores:", error);
    return Response.json(
      { error: "Error al obtener tutores", details: error.message },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo tutor
export async function POST(request) {
  try {
    const {
      dni_tutor,
      nombre,
      apellido,
      fecha_nac,
      email,
      telefono,
      domicilio,
      periodo,
    } = await request.json();

    // Validación básica
    if (!dni_tutor || !nombre || !apellido) {
      return Response.json(
        { error: "DNI, nombre y apellido son obligatorios" },
        { status: 400 }
      );
    }

    // Insertar tutor
    await pool.query(
      `INSERT INTO tutor
       (dni_tutor, nombre, apellido, fecha_nac, email, telefono1, domicilio, id_periodo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dni_tutor,
        nombre,
        apellido,
        fecha_nac,
        email,
        telefono,
        domicilio,
        periodo,
      ]
    );

    return Response.json({ success: true, dni_tutor }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/tutores:", error);

    // Manejar error de duplicado
    if (error.code === "ER_DUP_ENTRY") {
      return Response.json(
        { error: "Ya existe un tutor con este DNI" },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "Error al crear tutor", details: error.message },
      { status: 500 }
    );
  }
}
