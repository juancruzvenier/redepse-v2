"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarAdmin } from "@/src/app/components/SidebarAdmin";
import styles from "./escuelasregistradas.module.css";

export default function EscuelasRegistradas() {
  const [escuelas, setEscRegistradas] = useState([]);
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
    const fetchEscRegistradas = async () => {
      try {
        const response = await fetch("/api/escuelas-registradas");
        if (!response.ok) throw new Error("Error al obtener escuelas");
        const data = await response.json();
        setEscRegistradas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEscRegistradas();
  }, []);

  return (
    <div className={styles.container}>
      <SidebarAdmin activeItem="Escuelas registradas" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administrador</h1>
          <h2 className={styles.subtitle}>Escuelas registradas</h2>
        </header>

        {error && <div className={styles.errorAlert}>Error: {error}</div>}

        <div className={styles.studentsList}>
          <h3>Escuelas registradas ({escuelas.length})</h3>
          {isLoading ? (
            <p className={styles.loading}>Cargando escuelas...</p>
          ) : escuelas.length > 0 ? (
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
                  {escuelas.map((escuela) => (
                    <tr key={escuela.id_escuela}>
                      <td>{escuela.escuela}</td>
                      <td>{escuela.localidad}</td>
                      <td>{escuela.telefono}</td>
                      <td>{escuela.email}</td>
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
            <p className={styles.noData}>No hay escuelas registradas</p>
          )}
        </div>
      </main>
    </div>
  );
}
