"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarAdmin } from "@/src/app/components/SidebarAdmin";
import styles from "./datosgenerales.module.css";

export default function DatosGenerales() {
  const [escuela, setEscuela] = useState([]);
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
    const fetchEscuela = async () => {
      try {
        const response = await fetch("/api/datos-generales");
        if (!response.ok) throw new Error("Error al obtener datos");
        const data = await response.json();
        setEscuela(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEscuela();
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
          <h3>Datos generales</h3>
          <div className="space-y-4">
            {escuela.map((escuela) => (
              <div>
                <label className={styles.label}>Nombre de la escuela:</label>
                <p className={styles.p}>{escuela.nombre_esc}</p>
                <label className={styles.label}>Dirección:</label>
                <p className={styles.p}>{escuela.direccion}</p>
                <label className={styles.label}>Localidad:</label>
                <p className={styles.p}>{escuela.localidad}</p>
                <label className={styles.label}>Teléfono:</label>
                <p className={styles.p}>{escuela.telefono}</p>
                <label className={styles.label}>Email:</label>
                <p className={styles.p}>{escuela.email}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
