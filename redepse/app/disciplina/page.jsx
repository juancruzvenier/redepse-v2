// Import the necessary modules and components
import styles from "./disciplina.module.css";

export default function Disciplina() {
  return (
    <>
      <head>
        <title>Disciplinas | REDEPSE</title>
        <meta name="description" content="Página de Disciplinas en REDEPSE" />
      </head>

      <div className={styles.container}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Registro de Escuelas</h2>
            <h3>de Formación Deportiva</h3>
          </div>
          <nav>
            <ul className={styles.navList}>
              <li className={styles.navItem}>Datos Generales</li>
              <li className={styles.navItem}>Habilitaciones</li>
              <li className={`${styles.navItem} ${styles.active}`}>
                Disciplinas
              </li>
              <li className={styles.navItem}>Entrenadores</li>
              <li className={styles.navItem}>Alumnos</li>
              <li className={styles.navItem}>Finalizar Registro</li>
            </ul>
          </nav>
        </aside>

        {/* Contenido principal */}
        <main className={styles.mainContent}>
          {/* Encabezado con gradiente */}
          <header className={styles.header}>
            <h1 className={styles.title}>Escuela Amigos Quimilí</h1>
            <h2 className={styles.subtitle}>Disciplinas</h2>
          </header>

          {/* Instrucción */}
          <section className={styles.instructionSection}>
            <p>
              Por favor, agregue las disciplinas que se practican en la escuela.
            </p>
          </section>

          {/* Formulario */}
          <section className={styles.formSection}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="disciplina">Disciplina</label>
                <select className={styles.select}>
                  <option value="sekec">Fútbol</option>
                  <option value="sekec">Básquet</option>
                  <option value="sekec">Vóley</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="canchas">Cantidad de canchas</label>
                <input
                  id="canchas"
                  type="number"
                  placeholder="0"
                  className={styles.input}
                />
              </div>
              <button type="button" className={styles.saveButton}>
                Guardar
              </button>
            </form>
          </section>

          {/* Botón "Siguiente" */}
          <section className={styles.nextSection}>
            <button className={styles.nextButton}>Siguiente</button>
          </section>
        </main>
      </div>
    </>
  );
}
