"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarAdmin } from "@/src/app/components/SidebarAdmin";
import styles from "./solicitudespendientes.module.css";

export default function SolicitudesPendientes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      periodo: "",
    },
  });

  // Obtener solicitudes al cargar el componente
  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch("/api/solicitudes-pendientes");
        if (!response.ok) throw new Error("Error al obtener solicitudes");
        const data = await response.json();
        setSolicitudes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSolicitudes();
  }, []);

  return (
    <div className={styles.container}>
      <SidebarAdmin activeItem="Solicitudes pendientes" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administrador</h1>
          <h2 className={styles.subtitle}>Solicitudes pendientes</h2>
        </header>

        {error && <div className={styles.errorAlert}>Error: {error}</div>}

        <div className={styles.studentsList}>
          <h3>Solicitudes pendientes ({solicitudes.length})</h3>
          {isLoading ? (
            <p className={styles.loading}>Cargando solicitudes...</p>
          ) : solicitudes.length > 0 ? (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Escuela</th>
                    <th>Localidad</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {solicitudes.map((solicitud) => (
                    <tr key={solicitud.id_solicitud}>
                      <td>{solicitud.escuela}</td>
                      <td>{solicitud.localidad}</td>
                      <td>{solicitud.telefono}</td>
                      <td>{solicitud.email}</td>
                      <td>
                        <section className={styles.nextSection}>
                          <Link
                            href="/escuelas/panel"
                            className={`${styles.button} ${styles.buttonSuccess}`}
                          >
                            Ver datos
                          </Link>
                        </section>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.noData}>No hay solicitudes pendientes</p>
          )}
        </div>
      </main>
    </div>
  );
}
