"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { SidebarAdmin } from "@/src/app/components/SidebarAdmin";
import styles from "./entrenadores.module.css";

export default function Entrenadores() {
  const [entrenadores, setEntrenadores] = useState([]);
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
    const fetchEntrenadores = async () => {
      try {
        const response = await fetch("/api/entrenadores");
        if (!response.ok) throw new Error("Error al obtener entrenadores");
        const data = await response.json();
        setEntrenadores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntrenadores();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/entrenadores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dni_alumno: data.dni.trim(),
          nombre: data.nombre.trim(),
          apellido: data.apellido.trim(),
          fecha_nac: data.fechaNacimiento || null,
          estado: "Activo",
          disciplina: data.disciplina || null,
          escuela: data.escuela || null,
          domicilio: data.domicilio.trim(),
          dni_tutor: data.dni_tutor.trim(),
          periodo: data.periodo || null,
        }),
      });

      if (!response.ok) throw new Error("Error al registrar alumno");

      // Refrescar la lista de alumnos después de agregar uno nuevo
      const refreshResponse = await fetch("/api/alumnos");
      const refreshedData = await refreshResponse.json();
      setAlumnos(refreshedData);

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
            <h3>Entrenadores registrados ({entrenadores.length})</h3>
            {isLoading ? (
              <p className={styles.loading}>Cargando entrenadores...</p>
            ) : entrenadores.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>DNI</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Fecha de nacimiento</th>
                      <th>Disciplina</th>
                      <th>Domicilio</th>
                      <th>Periodo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entrenadores.map((entrenador) => (
                      <tr key={entrenador.dni_entrenador}>
                        <td>{entrenador.dni_entrenador}</td>
                        <td>{entrenador.nombre}</td>
                        <td>{entrenador.apellido}</td>
                        <td>{entrenador.fecha_nac}</td>
                        <td>{entrenador.disciplina}</td>
                        <td>{entrenador.domicilio}</td>
                        <td>{entrenador.id_periodo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>
                Aún no hay entrenadores registrados
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
