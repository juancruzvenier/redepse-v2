"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarAdmin } from "@/src/app/components/SidebarAdmin";
import styles from "./tutores.module.css";

export default function Tutores() {
  const [tutores, setTutores] = useState([]);
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

  // Obtener alumnos al cargar el componente
  useEffect(() => {
    const fetchTutores = async () => {
      try {
        const response = await fetch("/api/tutores");
        if (!response.ok) throw new Error("Error al obtener tutores");
        const data = await response.json();
        setTutores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTutores();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/tutores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dni_tutor: data.dni.trim(),
          nombre: data.nombre.trim(),
          apellido: data.apellido.trim(),
          fecha_nac: data.fechaNacimiento || null,
          domicilio: data.domicilio.trim(),
        }),
      });

      if (!response.ok) throw new Error("Error al registrar tutor");

      // Refrescar la lista de alumnos después de agregar uno nuevo
      const refreshResponse = await fetch("/api/tutores");
      const refreshedData = await refreshResponse.json();
      setTutores(refreshedData);

      reset();
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <SidebarAdmin activeItem="Solicitudes pendientes" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administrador</h1>
          <h2 className={styles.subtitle}>Escuela Amigos Quimilí</h2>
        </header>

        {error && <div className={styles.errorAlert}>Error: {error}</div>}

        <div className={styles.registrationContainer}>
          <div className={styles.studentsList}>
            <h3>Tutores registrados ({tutores.length})</h3>
            {isLoading ? (
              <p className={styles.loading}>Cargando tutores...</p>
            ) : tutores.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>DNI</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Fecha de nacimiento</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Domicilio</th>
                      <th>Periodo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutores.map((tutor) => (
                      <tr key={tutor.dni_tutor}>
                        <td>{tutor.dni_tutor}</td>
                        <td>{tutor.nombre}</td>
                        <td>{tutor.apellido}</td>
                        <td>{tutor.fecha_nac}</td>
                        <td>{tutor.email || "No especificado"}</td>
                        <td>{tutor.telefono || "No especificado"}</td>
                        <td>{tutor.domicilio}</td>
                        <td>{tutor.id_periodo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>Aún no hay tutores registrados</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
