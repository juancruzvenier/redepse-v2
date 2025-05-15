"use client"; // Indica que es un Client Component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Sidebar } from "@/src/app/components/Sidebar";
import styles from "./datosgenerales.module.css";

export default function DatosGenerales() {
  const [datosGenerales, setDatosGenerales] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.container}>
      <Sidebar activeItem="Datos generales" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escuela Amigos Quimilí</h1>
          <h2 className={styles.subtitle}>Datos generales</h2>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Nombre de la escuela
              </label>
              <input
                type="text"
                className={`${styles.input} ${
                  errors.nombreEscuela ? styles.error : ""
                }`}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={`${styles.label} ${styles.required}`}>
                Localidad
              </label>
              <input
                type="text"
                className={`${styles.input} ${
                  errors.localidad ? styles.error : ""
                }`}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>
                  Dirección de la escuela
                </label>
                <input
                  type="text"
                  className={`${styles.input} ${
                    errors.direccion ? styles.error : ""
                  }`}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>
                  Fecha de fundación
                </label>
                <input
                  type="date"
                  placeholder="dd/mm/aaaa"
                  className={`${styles.input} ${
                    errors.fechaFundacion ? styles.error : ""
                  }`}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>
                  Correo electrónico
                </label>
                <input
                  type="email"
                  className={`${styles.input} ${
                    errors.email ? styles.error : ""
                  }`}
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={`${styles.label} ${styles.required}`}>
                    Teléfono de contacto
                  </label>
                  <input
                    type="tel"
                    placeholder="Código de área (sin 0) + Número de teléfono"
                    className={`${styles.input} ${
                      errors.telefono ? styles.error : ""
                    }`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={`${styles.label} ${styles.required}`}>
                    DNI del responsable
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
                    placeholder="Número de DNI (sin puntos ni guiones)"
                    className={`${styles.input} ${
                      errors.dni ? styles.error : ""
                    }`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={`${styles.label} ${styles.required}`}>
                    Nombre del responsable
                  </label>
                  <input
                    type="text"
                    className={`${styles.input} ${
                      errors.nombreResponsable ? styles.error : ""
                    }`}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={`${styles.label} ${styles.required}`}>
                  Apellido del responsable
                </label>
                <input
                  type="text"
                  className={`${styles.input} ${
                    errors.apellidoResponsable ? styles.error : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </form>

        <section className={styles.nextSection}>
          <button className={`${styles.button} ${styles.buttonSuccess}`}>
            Siguiente →
          </button>
        </section>
      </main>
    </div>
  );
}
