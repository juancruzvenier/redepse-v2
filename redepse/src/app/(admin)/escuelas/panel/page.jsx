"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarAdmin } from "@/src/app/components/SidebarAdmin";
import styles from "./panel.module.css";

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
          <h2 className={styles.subtitle}>Escuela Amigos Quimilí</h2>
        </header>

        {error && <div className={styles.errorAlert}>Error: {error}</div>}

        <div className={styles.studentsList}>
          <h3>Panel</h3>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <tbody>
                {solicitudes.map((solicitud) => (
                  <tr key={solicitud.id_solicitud}>
                    <td>
                      <section className={styles.nextSection}>
                        <Link
                          href="./datos-generales"
                          className={`${styles.button} ${styles.buttonSuccess}`}
                        >
                          Datos generales
                        </Link>
                      </section>
                    </td>
                    <td>
                      <section className={styles.nextSection}>
                        <Link
                          href="./habilitaciones"
                          className={`${styles.button} ${styles.buttonSuccess}`}
                        >
                          Habilitaciones
                        </Link>
                      </section>
                    </td>
                    <td>
                      <section className={styles.nextSection}>
                        <Link
                          href="./disciplinas"
                          className={`${styles.button} ${styles.buttonSuccess}`}
                        >
                          Disciplinas
                        </Link>
                      </section>
                    </td>
                    <td>
                      <section className={styles.nextSection}>
                        <Link
                          href="./entrenadores"
                          className={`${styles.button} ${styles.buttonSuccess}`}
                        >
                          Entrenadores
                        </Link>
                      </section>
                    </td>
                    <td>
                      <section className={styles.nextSection}>
                        <Link
                          href="./alumnos"
                          className={`${styles.button} ${styles.buttonSuccess}`}
                        >
                          Alumnos
                        </Link>
                      </section>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
