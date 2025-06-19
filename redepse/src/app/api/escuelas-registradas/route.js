// app/api/alumnos/route.js
// app/api/alumnos/route.js
import pool from "@/src/lib/db";

// GET - Obtener todas las escuelas registradas
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT
        e.id_esc,
        e.nombre_esc AS escuela,
        e.localidad,
        e.telefono1 AS telefono,
        e.email
      FROM solicitudes s
      LEFT JOIN escuela e ON s.id_esc = e.id_esc
      WHERE s.estado = 'Aprobada'
    `);

    const escuelas = rows.map((escuela) => ({
      ...escuela,
      localidad: escuela.localidad || "No especificada",
      telefono: escuela.telefono || "No especificado",
      email: escuela.email || "No especificado",
    }));

    return Response.json(escuelas);
  } catch (error) {
    console.error("Error en GET /api/escuelas-registradas:", error);
    return Response.json(
      {
        error: "Error al obtener escuelas",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
