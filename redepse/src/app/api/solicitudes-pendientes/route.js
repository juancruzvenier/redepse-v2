// app/api/alumnos/route.js
// app/api/alumnos/route.js
import pool from "@/src/lib/db";

// GET - Obtener todas las solicitudes pendientes
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
      WHERE s.estado = 'Pendiente'
    `);

    const solicitudes = rows.map((solicitud) => ({
      ...solicitud,
      localidad: solicitud.localidad || "No especificada",
      telefono: solicitud.telefono || "No especificado",
      email: solicitud.email || "No especificado",
    }));

    return Response.json(solicitudes);
  } catch (error) {
    console.error("Error en GET /api/solicitudes-pendientes:", error);
    return Response.json(
      {
        error: "Error al obtener solicitudes pendientes",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
