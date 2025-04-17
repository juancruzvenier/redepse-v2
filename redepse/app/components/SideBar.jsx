'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.css';


const SideBar = () => {
    return (
<aside className={styles.sidebar}>
  <div className={styles.logo}>
  <Image src="/images/favicon-sde.png" alt="Escudo del Club" width={100} height={100} />
  <Image src="/images/logo-sde.svg" alt="Escudo del Club" width={100} height={100} />
  </div>

  <h2 style={{ color: 'white', textAlign: 'left', backgroundColor: 'transparent' }}>
    REGRISTO DE ESCUELAS DE FORMACION DEPORTIVA
  </h2>

  <nav className={styles.nav}>
    <Link href="/" className={`${styles['nav-item']} ${styles.active}`}>Datos Generales</Link>
    <Link href="/habilitaciones" className={styles['nav-item']}>Habilitaciones</Link>
    <Link href="/disciplinas" className={styles['nav-item']}>Disciplinas</Link>
    <Link href="/canchas"className={`${styles['nav-item']}`}>Canchas</Link>
    <Link href="/propiedad-escuela"className={`${styles['nav-item']}`}>Propiedad de Escuela</Link>
    <Link href="/personal-escuela"className={`${styles['nav-item']}`}>Personal de Escuela</Link>
    <Link href="/datos-entrenadores" className={styles['nav-item']}>Datos Entrenadores</Link>
    <Link href="/datos-alumnos" className={styles['nav-item']}>Datos Alumnos</Link>
    <Link href="/pages/" className={styles['nav-item']}>Finalizar Registro</Link>
  </nav>

  <button className={styles['logout-btn']} onClick={() => window.location.href = '/pages/login'}>
    Cerrar Sesión
  </button>
</aside>

    );
};

export default SideBar;