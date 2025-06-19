// app/api/alumnos/route.js
// app/api/alumnos/route.js
import pool from "@/src/lib/db";

// GET - Obtener todos los alumnos activos
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        e.dni_ent, 
        e.nombre, 
        e.apellido, 
        e.email,
        e.fecha_nac,
        e.telefono1 AS telefono,
        e.domicilio,
        e.id_periodo
      FROM entrenador e
    `);

    const entrenadores = rows.map((entrenador) => ({
      ...entrenador,
      fecha_nac: entrenador.fecha_nac?.toISOString().split("T")[0] || null,
      disciplina: entrenador.disciplina || "No especificada",
      escuela: entrenador.escuela || "No especificada",
    }));

    return Response.json(entrenadores);
  } catch (error) {
    console.error("Error en GET /api/entrenadores:", error);
    return Response.json(
      { error: "Error al obtener entrenadores", details: error.message },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo alumno
export async function POST(request) {
  try {
    const { dni_ent, nombre, apellido, fecha_nac, domicilio, periodo } =
      await request.json();

    // Validación básica
    if (!dni_ent || !nombre || !apellido) {
      return Response.json(
        { error: "DNI, nombre y apellido son obligatorios" },
        { status: 400 }
      );
    }

    // Insertar alumno
    await pool.query(
      `INSERT INTO entrenador 
       (dni_ent, nombre, apellido, fecha_nac, domicilio, email, id_periodo, telefono1) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        dni_ent,
        nombre,
        apellido,
        fecha_nac,
        domicilio,
        email,
        periodo,
        telefono,
      ]
    );

    // Asignar disciplina si existe
    if (disciplina) {
      const [dis] = await pool.query(
        "SELECT id_disciplina FROM disciplina WHERE disciplina = ?",
        [disciplina]
      );
      if (dis.length > 0) {
        await pool.query(
          "INSERT INTO alum_disc_esc_per (dni_alumno, id_disciplina, escuela, periodo) VALUES (?, ?, ?, ?)",
          [dni_alumno, dis[0].id_disciplina, escuela, periodo]
        );
      }
    }

    return Response.json({ success: true, dni_entrenador }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/entrenadores:", error);

    // Manejar error de duplicado
    if (error.code === "ER_DUP_ENTRY") {
      return Response.json(
        { error: "Ya existe un entrenador con este DNI" },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "Error al crear entrenador", details: error.message },
      { status: 500 }
    );
  }
}

// app/api/alumnos/route.js
// app/alumnos/page.jsx
