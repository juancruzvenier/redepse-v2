"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Sidebar } from "@/app/components/Sidebar";
import styles from "./datosalumnos.module.css";

export default function RegistroAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      disciplina: "",
    },
  });

  const onSubmit = (data) => {
    const nuevoAlumno = {
      id: Date.now(),
      dni: data.dni.trim(),
      nombre: data.nombre.trim(),
      apellido: data.apellido.trim(),
      fechaNacimiento: data.fechaNacimiento || "No especificada",
      disciplina: data.disciplina || "No especificada",
    };

    setAlumnos([...alumnos, nuevoAlumno]);
    reset();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className={styles.container}>
      <Sidebar activeItem="Alumnos" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escuela Amigos Quimilí</h1>
          <h2 className={styles.subtitle}>Alumnos</h2>
        </header>

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
                  errors.disciplina ? styles.error : ""
                }`}
              >
                <option value="" disabled hidden>
                  Seleccione una disciplina
                </option>
                <option value="Fútbol">Fútbol</option>
                <option value="Básquet">Básquet</option>
                <option value="Vóley">Vóley</option>
                <option value="Natación">Natación</option>
              </select>
              {errors.discipline && (
                <span className={styles.errorMessage}>
                  {errors.discipline.message}
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
            {alumnos.length > 0 ? (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>DNI</th>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>Fecha Nacimiento</th>
                      <th>Disciplina</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alumnos.map((alumno) => (
                      <tr key={alumno.id}>
                        <td>{alumno.dni}</td>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.apellido}</td>
                        <td>{alumno.fechaNacimiento}</td>
                        <td>{alumno.disciplina}</td>
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
