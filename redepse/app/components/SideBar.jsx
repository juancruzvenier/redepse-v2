'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from './SideBar.module.css';

const SideBar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/datos-generales', label: 'Datos Generales' }, // Cambiado de '/' a '/datos-generales'
    { href: '/habilitaciones', label: 'Habilitaciones' },
    { href: '/disciplinas', label: 'Disciplinas' },
    { href: '/canchas', label: 'Canchas' },
    { href: '/propiedad-escuela', label: 'Propiedad de Escuela' },
    { href: '/personal-escuela', label: 'Personal de Escuela' },
    { href: '/datos-entrenadores', label: 'Datos Entrenadores' },
    { href: '/datos-alumnos', label: 'Datos Alumnos' },
    { href: '/finalizar-registro', label: 'Finalizar Registro' }, // Corregido "Registro"
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Image src="/favicon-sde.png" alt="Escudo del Club" width={100} height={100} />
        <Image src="/logo-sde.svg" alt="Logo" width={100} height={100} />
      </div>

      <h2>REGISTRO DE ESCUELAS DE FORMACIÓN DEPORTIVA</h2>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles['nav-item']} ${
              pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href)) ? styles.active : ''
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <button 
        className={styles['logout-btn']}
        onClick={() => window.location.href = '/login'}
      >
        Cerrar Sesión
      </button>
    </aside>
  );
};

export default SideBar;