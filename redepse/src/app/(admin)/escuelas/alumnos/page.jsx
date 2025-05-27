"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Sidebar } from "@/src/app/components/Sidebar";
import styles from "./alumnos.module.css";

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState([]);
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
    const fetchAlumnos = async () => {
      try {
        const response = await fetch("/api/alumnos");
        if (!response.ok) throw new Error("Error al obtener alumnos");
        const data = await response.json();
        setAlumnos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAlumnos();
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/alumnos", {
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
      <Sidebar activeItem="Solicitudes pendientes" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administrador</h1>
          <h2 className={styles.subtitle}>Escuela Amigos Quimilí</h2>
        </header>

        {error && <div className={styles.errorAlert}>Error: {error}</div>}

        <div className={styles.registrationContainer}>
          <div className={styles.studentsList}>
            <h3>Alumnos registrados ({alumnos.length})</h3>
            {isLoading ? (
              <p className={styles.loading}>Cargando alumnos...</p>
            ) : alumnos.length > 0 ? (
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
                    {alumnos.map((alumno) => (
                      <tr key={alumno.dni_alumno}>
                        <td>{alumno.dni_alumno}</td>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.apellido}</td>
                        <td>{alumno.fecha_nac}</td>
                        <td>{alumno.disciplina}</td>
                        <td>{alumno.domicilio}</td>
                        <td>{alumno.id_periodo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className={styles.noData}>Aún no hay alumnos registrados</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
