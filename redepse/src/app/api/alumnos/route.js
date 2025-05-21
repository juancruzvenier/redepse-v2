// app/api/alumnos/route.js
// app/api/alumnos/route.js
import pool from "@/src/lib/db";

// GET - Obtener todos los alumnos activos
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        a.dni_alumno, 
        a.nombre, 
        a.apellido, 
        a.fecha_nac,
        a.estado,
        a.domicilio,
        a.dni_tutor,
        a.id_periodo,
        d.disciplina, 
        e.nombre_esc AS escuela
      FROM alumno a
      LEFT JOIN alu_disc_esc_per adep ON a.dni_alumno = adep.dni_alumno
      LEFT JOIN disciplina d ON adep.id_disciplina = d.id_disciplina
      LEFT JOIN inscripcion i ON a.dni_alumno = i.dni_alumno
      LEFT JOIN escuela e ON i.id_esc = e.id_esc
      LEFT JOIN periodo p ON adep.id_periodo = p.id_periodo
      WHERE a.estado = 'Activo'
    `);

    const alumnos = rows.map((alumno) => ({
      ...alumno,
      fecha_nac: alumno.fecha_nac?.toISOString().split("T")[0] || null,
      disciplina: alumno.disciplina || "No especificada",
      escuela: alumno.escuela || "No especificada",
    }));

    return Response.json(alumnos);
  } catch (error) {
    console.error("Error en GET /api/alumnos:", error);
    return Response.json(
      { error: "Error al obtener alumnos", details: error.message },
      { status: 500 }
    );
  }
}

// POST - Crear un nuevo alumno
export async function POST(request) {
  try {
    const {
      dni_alumno,
      nombre,
      apellido,
      fecha_nac,
      disciplina,
      domicilio,
      dni_tutor,
      periodo,
      estado,
    } = await request.json();

    // Validación básica
    if (!dni_alumno || !nombre || !apellido) {
      return Response.json(
        { error: "DNI, nombre y apellido son obligatorios" },
        { status: 400 }
      );
    }

    // Insertar alumno
    await pool.query(
      `INSERT INTO alumno 
       (dni_alumno, nombre, apellido, fecha_nac, domicilio, dni_tutor, id_periodo, estado) 
       VALUES (?, ?, ?, ?, ?, ?, ?, 'Activo')`,
      [dni_alumno, nombre, apellido, fecha_nac, domicilio, dni_tutor, periodo]
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

    return Response.json({ success: true, dni_alumno }, { status: 201 });
  } catch (error) {
    console.error("Error en POST /api/alumnos:", error);

    // Manejar error de duplicado
    if (error.code === "ER_DUP_ENTRY") {
      return Response.json(
        { error: "Ya existe un alumno con este DNI" },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "Error al crear alumno", details: error.message },
      { status: 500 }
    );
  }
}

// app/api/alumnos/route.js
// app/alumnos/page.jsx
