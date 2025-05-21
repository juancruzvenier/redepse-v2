"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Sidebar } from "@/src/app/components/Sidebar";
import styles from "./datosalumnos.module.css";

export default function RegistroAlumnos() {
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
      <Sidebar activeItem="Alumnos" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escuela Amigos Quimilí</h1>
          <h2 className={styles.subtitle}>Alumnos</h2>
        </header>

        {error && <div className={styles.errorAlert}>Error: {error}</div>}

        <div className={styles.registrationContainer}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                DNI
              </label>
              <input
                type="text"
                {...register("dni", {
                  required: "El DNI es obligatorio",
                  pattern: {
                    value: /^[0-9]{8,10}$/,
                    message: "Ingrese un DNI válido (8-10 dígitos)",
                  },
                })}
                className={`${styles.input} ${errors.dni ? styles.error : ""}`}
              />
              {errors.dni && (
                <span className={styles.errorMessage}>
                  {errors.dni.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Nombre
              </label>
              <input
                type="text"
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  pattern: {
                    value: /^[A-Za-zÁ-ú\s]{2,}$/,
                    message: "Ingrese un nombre válido (mínimo 2 letras)",
                  },
                })}
                className={`${styles.input} ${
                  errors.nombre ? styles.error : ""
                }`}
              />
              {errors.nombre && (
                <span className={styles.errorMessage}>
                  {errors.nombre.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Apellido
              </label>
              <input
                type="text"
                {...register("apellido", {
                  required: "El apellido es obligatorio",
                  pattern: {
                    value: /^[A-Za-zÁ-ú\s]{2,}$/,
                    message: "Ingrese un apellido válido (mínimo 2 letras)",
                  },
                })}
                className={`${styles.input} ${
                  errors.apellido ? styles.error : ""
                }`}
              />
              {errors.apellido && (
                <span className={styles.errorMessage}>
                  {errors.apellido.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Fecha de nacimiento
              </label>
              <input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                {...register("fechaNacimiento")}
                className={`${styles.input} ${
                  errors.fechaNacimiento ? styles.error : ""
                }`}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Disciplina
              </label>
              <select
                {...register("disciplina", { required: "Campo obligatorio" })}
                className={`${styles.select} ${
                  errors.periodo ? styles.error : ""
                }`}
              >
                <option value="" disabled hidden>
                  Seleccione una disciplina
                </option>
                <option value="Fútbol">Fútbol</option>
                <option value="Básquet">Básquet</option>
                <option value="Natación">Natación</option>
              </select>
              {errors.periodo && (
                <span className={styles.errorMessage}>
                  {errors.periodo.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Domicilio
              </label>
              <input
                type="text"
                {...register("domicilio", {
                  required: "El domicilio es obligatorio",
                  pattern: {
                    value: /^[A-Za-zÁ-ú\s]{2,}$/,
                    message: "Ingrese un domicilio válido (mínimo 2 letras)",
                  },
                })}
                className={`${styles.input} ${
                  errors.domicilio ? styles.error : ""
                }`}
              />
              {errors.domicilio && (
                <span className={styles.errorMessage}>
                  {errors.domicilio.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Periodo
              </label>
              <select
                {...register("periodo", { required: "Campo obligatorio" })}
                className={`${styles.select} ${
                  errors.periodo ? styles.error : ""
                }`}
              >
                <option value="" disabled hidden>
                  Seleccione un periodo
                </option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
              </select>
              {errors.periodo && (
                <span className={styles.errorMessage}>
                  {errors.periodo.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                DNI del tutor
              </label>
              <input
                type="text"
                {...register("dni_tutor", {
                  required: "El DNI del tutor es obligatorio",
                  pattern: {
                    value: /^[0-9]{8,10}$/,
                    message: "Ingrese un DNI válido (8-10 dígitos)",
                  },
                })}
                className={`${styles.input} ${
                  errors.dni_tutor ? styles.error : ""
                }`}
              />
              {errors.dni_tutor && (
                <span className={styles.errorMessage}>
                  {errors.dni_tutor.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Registrar Alumno
            </button>
          </form>

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

        <section className={styles.nextSection}>
          <button
            className={`${styles.button} ${styles.buttonSuccess}`}
            disabled={alumnos.length === 0}
          >
            Siguiente →
          </button>
        </section>

        {showToast && (
          <div className={styles.toast}>✅ Alumno registrado correctamente</div>
        )}
      </main>
    </div>
  );
}
