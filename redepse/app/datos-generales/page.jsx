import SideBar from '../components/SideBar.jsx'; // Si components está al mismo nivel que app
import styles from './page.module.css';

export default function DatosGenerales() {
  return (
    <div className={styles.container}>
      <SideBar />
      
      <main className={styles.mainContent}>
        <h1 className={styles.schoolTitle}>Escuela Amigos Quimili</h1>
        <h2 className={styles.sectionTitle}>Datos Generales</h2>
        
        <form className={styles.form}>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Nombre de la Escuela</label>
              <input type="text" placeholder="Ej: Escuela Amigos Quimili" />
            </div>
            
            <div className={styles.formGroup}>
              <label>Correo Electrónico</label>
              <input type="email" placeholder="ejemplo@escuela.com" />
            </div>
            
            <div className={styles.formGroup}>
              <label>Nombre del responsable</label>
              <input type="text" placeholder="Nombre" />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Dirección de la Escuela</label>
              <input type="text" placeholder="Dirección completa" />
            </div>
            
            <div className={styles.formGroup}>
              <label>Fecha de fundación</label>
              <input type="date" placeholder="dd/mm/aaaa" />
            </div>
            
            <div className={styles.formGroup}>
              <label>Apellido del responsable</label>
              <input type="text" placeholder="Apellido" />
            </div>
          </div>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label>Teléfono de contacto</label>
              <input type="tel" placeholder="+54 9 XXX XXX XXXX" />
            </div>
            
            <div className={styles.formGroup}>
              <label>Municipio</label>
              <input type="text" placeholder="Municipio/Localidad" />
            </div>
            
            <div className={styles.formGroup}>
              <label>DNI del responsable</label>
              <input type="text" placeholder="Número de DNI" />
            </div>
          </div>
          
          <button type="submit" className={styles.submitButton}>
            Siguiente
          </button>
        </form>
      </main>
    </div>
  );
}