"use client";
import Link from "next/link";
import { Sidebar } from "@/src/app/components/Sidebar";
import styles from "./finalizarregistro.module.css"; // Opcional: si necesitas estilos específicos

export default function FinalizarRegistro() {
  return (
    <div className={styles.container}>
      <Sidebar activeItem="Finalizar registro" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escuela Amigos Quimilí</h1>
          <h2 className={styles.subtitle}>Finalizar registro</h2>
        </header>

        <section className={styles.formSection}>
          <h2>Envío de solicitud</h2>
          <p>
            Una vez enviada la solicitud, los datos ingresados no podrán ser
            modificados. En la brevedad, la Secretaría revisará su solicitud.
          </p>

          <section className={styles.nextSection}>
            <Link
              href="/"
              className={`${styles.button} ${styles.buttonSuccess}`}
            >
              Enviar solicitud
            </Link>
          </section>
        </section>
      </main>
    </div>
  );
}
