// app/api/alumnos/route.js
// app/api/alumnos/route.js
import pool from "@/src/lib/db";

// GET - Obtener todas las solicitudes pendientes
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT
        nombre_esc,
        localidad,
        direccion,
        telefono1 AS telefono,
        email
      FROM escuela
      WHERE id_esc = 2
    `);

    const escuela = rows.map((escuela) => ({
      ...escuela,
      localidad: escuela.localidad || "No especificada",
      telefono: escuela.telefono || "No especificado",
      email: escuela.email || "No especificado",
    }));

    return Response.json(escuela);
  } catch (error) {
    console.error("Error en GET /api/datos-generales:", error);
    return Response.json(
      {
        error: "Error al obtener datos",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
