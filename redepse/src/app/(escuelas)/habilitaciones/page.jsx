"use client";
import Link from "next/link";
import { Sidebar } from "@/src/app/components/Sidebar";
import styles from "./habilitaciones.module.css"; // Opcional: si necesitas estilos específicos

export default function Habilitaciones() {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Archivo seleccionado:", file.name);
      // Aquí podrías subirlo a tu backend
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const driveLink = e.target.driveLink.value;
    console.log("Enlace de Drive:", driveLink);
    // Lógica para guardar en tu base de datos
  };

  return (
    <div className={styles.container}>
      <Sidebar activeItem="Habilitaciones" />

      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>Escuela Amigos Quimilí</h1>
          <h2 className={styles.subtitle}>Habilitaciones</h2>
        </header>

        <section className={styles.formSection}>
          <h2>Habilitaciones</h2>
          <p>
            Por favor, suba el documento que respalde a la escuela como una
            institución reconocida.
          </p>

          <form onSubmit={handleSubmit}>
            <div className={styles.fileUpload}>
              <label>
                <strong>Seleccionar archivo</strong>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className={styles.fileInput}
                />
                <span className={styles.fileLabel}>
                  Ningún archivo seleccionado
                </span>
              </label>
            </div>

            <p className={styles.note}>
              Ante problemas de conexión o archivos muy grandes recomendamos el
              ingreso de un enlace de Google Drive
            </p>

            <div className={styles.driveLink}>
              <label>
                <strong>Enlace:</strong>
                <input
                  type="url"
                  name="driveLink"
                  placeholder="https://drive.google.com/..."
                  className={styles.linkInput}
                />
              </label>
            </div>

            <section className={styles.nextSection}>
              <Link
                href="/disciplinas"
                className={`${styles.button} ${styles.buttonSuccess}`}
              >
                Siguiente →
              </Link>
            </section>
          </form>
        </section>
      </main>
    </div>
  );
}
