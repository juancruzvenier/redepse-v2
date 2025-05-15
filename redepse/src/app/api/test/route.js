import pool from "@/src/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT "Conexión exitosa" AS message');
    return Response.json({ success: true, message: rows[0].message });
  } catch (error) {
    return Response.json({ success: false, error: error.message });
  }
}
