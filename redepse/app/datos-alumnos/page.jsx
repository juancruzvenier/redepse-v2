'use client';
import { useState } from 'react';
import SideBar from '@/app/components/SideBar';
import styles from './datosalumnos.module.css';

export default function RegistroAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    disciplina: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación mejorada
    if (!formData.dni || !formData.nombre || !formData.apellido) {
      alert('Por favor complete los campos obligatorios: DNI, Nombre y Apellido');
      return;
    }

    // Agregar nuevo alumno con validación de campos vacíos
    const nuevoAlumno = {
      id: Date.now(),
      dni: formData.dni.trim(),
      nombre: formData.nombre.trim(),
      apellido: formData.apellido.trim(),
      fechaNacimiento: formData.fechaNacimiento || 'No especificada',
      disciplina: formData.disciplina || 'No especificada'
    };

    setAlumnos([...alumnos, nuevoAlumno]);
    
    // Limpiar formulario manteniendo los valores por defecto
    setFormData({
      dni: '',
      nombre: '',
      apellido: '',
      fechaNacimiento: '',
      disciplina: ''
    });
  };

  return (
    <div className={styles.container}>
      <SideBar />
      
      <main className={styles.mainContent}>
        <h1 className={styles.title}>Registro de Alumnos</h1>
        <h2 className={styles.subtitle}>Escuela Amigos Quimili</h2>
        
        <div className={styles.registrationContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>DNI *</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                required
                pattern="[0-9]{8,10}"
                title="Ingrese un DNI válido (8-10 dígitos)"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
                pattern="[A-Za-zÁ-ú\s]{2,}"
                title="Ingrese un nombre válido (mínimo 2 letras)"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Apellido *</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
                required
                pattern="[A-Za-zÁ-ú\s]{2,}"
                title="Ingrese un apellido válido (mínimo 2 letras)"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Disciplina</label>
              <select
                name="disciplina"
                value={formData.disciplina}
                onChange={handleInputChange}
              >
                <option value="">Seleccione...</option>
                <option value="Fútbol">Fútbol</option>
                <option value="Básquet">Básquet</option>
                <option value="Vóley">Vóley</option>
                <option value="Natación">Natación</option>
              </select>
            </div>
            
            <button type="submit" className={styles.submitButton}>
              Registrar Alumno
            </button>
          </form>
          
          <div className={styles.studentsList}>
            <h3>Alumnos Registrados ({alumnos.length})</h3>
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
              <p className={styles.noData}>No hay alumnos registrados aún</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}