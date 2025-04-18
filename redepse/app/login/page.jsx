import styles from "./login.module.css";
import Image from "next/image";
import logoSde from "@/app/img/favicon-sde.webp";

export default function Login() {
  return (
    <>
      <head>
        <title>Login | REDEPSE</title>
        <meta name="description" content="Inicio de sesión | REDEPSE" />
      </head>

      <div className={styles.container}>
        {/* Sidebar */}
        {/*         <aside className={styles.sidebar}>
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
        </aside> */}

        {/* Contenido principal */}
        <main className={styles.mainContent}>
          {/* Encabezado con gradiente */}
          <header className={styles.header}>
            <div className={styles.headerContent}>
              <Image
                src={logoSde}
                alt="Logo Secretaría"
                width={40}
                height={40}
              />
              <div className={styles.headerText}>
                <h1 className={styles.title}>
                  Secretaría de Deportes de Santiago del Estero
                </h1>
                <h2 className={styles.subtitle}>REDEPSE</h2>
              </div>
              <nav className={styles.navLinks}>
                <a href="/">Inicio</a>
                <a href="/contacto">Contacto</a>
              </nav>
            </div>
          </header>

          {/* Instrucción */}
          <section className={styles.instructionSection}>
            <p>Por favor, ingrese su correo electrónico y contraseña.</p>
          </section>

          {/* Formulario */}
          <section className={styles.formSection}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Correo electrónico</label>
                <input id="email" type="email" className={styles.input} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Contraseña</label>
                <input id="password" type="password" className={styles.input} />
              </div>
            </form>
          </section>

          {/* Botón "Siguiente" */}
          <section className={styles.nextSection}>
            <button className={styles.nextButton}>Iniciar sesión</button>
          </section>
        </main>
      </div>
    </>
  );
}
