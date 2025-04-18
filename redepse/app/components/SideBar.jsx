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
    { icon: "📋", label: "Datos Generales", path: "/datos" },
    { icon: "✅", label: "Habilitaciones", path: "/habilitaciones" },
    { icon: "⚽", label: "Disciplinas", path: "/disciplinas" },
    { icon: "👨‍🏫", label: "Entrenadores", path: "/entrenadores" },
    { icon: "👥", label: "Alumnos", path: "/alumnos" },
    { icon: "📤", label: "Finalizar Registro", path: "/finalizar" },
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
            <li
              key={item.label}
              className={`${styles.navItem} ${
                activeItem === item.label ? styles.active : ""
              }`}
            >
              <span>{item.icon}</span> {item.label}
            </li>
          ))}
        </ul>
      </nav>
      <button className={styles.logoutButton} onClick={handleLogout}>
        Cerrar sesión
      </button>
    </aside>
  );
};
