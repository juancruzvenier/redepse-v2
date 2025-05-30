"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Sidebar } from "@/src/app/components/Sidebar";
import styles from "./tutores.module.css";

export default function RegistroTutores() {
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
          email: data.email ? data.email.trim() : null,
          telefono: data.telefono ? data.telefono.trim() : null,
          domicilio: data.domicilio.trim(),
          periodo: data.periodo || null,
        }),
      });

      if (!response.ok) throw new Error("Error al registrar tutor");

      // Refrescar la lista de tutores después de agregar uno nuevo
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
      <Sidebar activeItem="Tutores" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escuela Amigos Quimilí</h1>
          <h2 className={styles.subtitle}>Tutores</h2>
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
                max={new Date().toISOString().split("T")[0]} // evita fechas futuras
                {...register("fechaNacimiento", {
                  required: "La fecha de nacimiento es obligatoria",
                  message:
                    "Ingrese una fecha de nacimiento válida (mayor a 18 años)",
                  validate: (value) => {
                    const fechaIngresada = new Date(value);
                    const fechaLimite = new Date();
                    fechaLimite.setFullYear(fechaLimite.getFullYear() - 18);
                    return (
                      fechaIngresada <= fechaLimite ||
                      "El tutor debe tener al menos 18 años"
                    );
                  },
                })}
                className={`${styles.input} ${
                  errors.fechaNacimiento ? styles.error : ""
                }`}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Correo electrónico
              </label>
              <input
                type="email"
                {...register("email", { required: "Campo obligatorio" })}
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Teléfono
              </label>
              <input
                type="tel"
                placeholder="Código de área (sin 0) + Número de teléfono"
                {...register("telefono", { required: "Campo obligatorio" })}
                className={`${styles.input} ${
                  errors.telefono ? styles.error : ""
                }`}
              />
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
                    value: /^[A-Za-zÁ-ÿ0-9\s.,°#-]{2,}$/,
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

            <button
              type="submit"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Registrar Tutor
            </button>
          </form>

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

        <section className={styles.nextSection}>
          <button
            className={`${styles.button} ${styles.buttonSuccess}`}
            disabled={tutores.length === 0}
          >
            Siguiente →
          </button>
        </section>

        {showToast && (
          <div className={styles.toast}>✅ Tutor registrado correctamente</div>
        )}
      </main>
    </div>
  );
}
