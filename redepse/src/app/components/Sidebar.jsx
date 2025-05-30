"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";

export const Sidebar = ({ activeItem }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Aquí podés limpiar auth del localStorage o cookies si más adelante usás eso
    router.push("/login");
  };

  const menuItems = [
    { icon: "📋", href: "/datos-generales", label: "Datos generales" },
    { icon: "✅", href: "/habilitaciones", label: "Habilitaciones" },
    { icon: "⚽", href: "/disciplinas", label: "Disciplinas" },
    { icon: "👨‍🏫", href: "/datos-entrenadores", label: "Entrenadores" },
    { icon: "👥", href: "/datos-alumnos", label: "Alumnos" },
    { icon: "🧑‍🤝‍🧑", href: "/tutores", label: "Tutores" },
    { icon: "📤", href: "/finalizar-registro", label: "Finalizar registro" },
  ];

  return (
    <aside className={styles.sidebar} aria-label="Menú de registro">
      <div className={styles.sidebarHeader}>
        <h2>Registro de Escuelas</h2>
        <h3>de Formación Deportiva</h3>
      </div>
      <nav>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <li
                key={item.label}
                className={`${styles.navItem} ${
                  activeItem === item.label ? styles.active : ""
                }`}
              >
                <span>{item.icon}</span> {item.label}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
};
