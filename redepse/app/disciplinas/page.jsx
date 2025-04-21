"use client"; // Indica que es un Client Component

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Sidebar } from "@/app/components/Sidebar";
import styles from "./disciplinas.module.css";

export default function Disciplinas() {
  const [savedDisciplines, setSavedDisciplines] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discipline: "",
      courts: "0",
    },
  });

  const onSubmit = (data) => {
    setSavedDisciplines([...savedDisciplines, data]);
    reset();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className={styles.container}>
      <Sidebar activeItem="Disciplinas" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escuela Amigos Quimilí</h1>
          <h2 className={styles.subtitle}>Disciplinas</h2>
        </header>

        <section className={styles.instructionSection}>
          <p>
            Por favor, agregue las disciplinas que se practican en la escuela.
          </p>
        </section>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={`${styles.label} ${styles.required}`}>
              Disciplina
            </label>
            <select
              {...register("discipline", { required: "Campo obligatorio" })}
              className={`${styles.select} ${
                errors.discipline ? styles.error : ""
              }`}
            >
              <option value="" disabled hidden>
                Seleccione una disciplina
              </option>
              <option value="Fútbol">Fútbol</option>
              <option value="Básquet">Básquet</option>
              <option value="Vóley">Vóley</option>
            </select>
            {errors.discipline && (
              <span className={styles.errorMessage}>
                {errors.discipline.message}
              </span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={`${styles.label} ${styles.required}`}>
              Cantidad de canchas
            </label>
            <input
              type="number"
              min="1"
              {...register("courts", {
                valueAsNumber: true,
                validate: (value) => value >= 0 || "Número inválido",
              })}
              className={`${styles.input} ${errors.courts ? styles.error : ""}`}
            />
            {errors.courts && (
              <span className={styles.errorMessage}>
                {errors.courts.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            💾 Guardar
          </button>
        </form>

        {savedDisciplines.length > 0 && (
          <section className={styles.savedSection}>
            <h3>Disciplinas registradas:</h3>
            <ul>
              {savedDisciplines.map((item, index) => (
                <li key={index}>
                  <strong>{item.discipline}</strong> ({item.courts || 0}{" "}
                  canchas)
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className={styles.nextSection}>
          <button
            className={`${styles.button} ${styles.buttonSuccess}`}
            disabled={savedDisciplines.length === 0}
          >
            Siguiente →
          </button>
        </section>

        {showToast && (
          <div className={styles.toast}>
            ✅ Disciplina guardada correctamente
          </div>
        )}
      </main>
    </div>
  );
}
