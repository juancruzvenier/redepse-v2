"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // <- IMPORTANTE
=======
import { useState } from "react";
import { useRouter } from "next/navigation";
>>>>>>> 91d648ca5950fe6cc4b36a2bee5834b077d78d82
import styles from "./login.module.css";
import Image from "next/image";
import logo from "@/public/favicon-sde.png";

export default function Login() {
<<<<<<< HEAD
  const router = useRouter(); // <- USAMOS ESTO PARA REDIRECCIONAR

=======
  const router = useRouter();
>>>>>>> 91d648ca5950fe6cc4b36a2bee5834b077d78d82
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

<<<<<<< HEAD
  const handleSubmit = async (data) => {
    data.preventDefault();

    if (!email || !password) {
      setError("Por favor, ingrese ambos campos");
      return;
    }

    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          contraseña: data.contraseña,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Error al iniciar sesión");
        return;
      }

      const { data } = await res.json();

      // 🔁 Redirige según el rol
      if (data.rol === "admin") {
        router.push("/app/(admin)");
      } else if (data.rol === "escuela") {
        router.push("/datos-generales");
      } else {
        setError("Rol desconocido");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error en el servidor");
    }
  };

  /*
  const handleSubmit = (e) => {
=======
  const handleSubmit = async (e) => {
>>>>>>> 91d648ca5950fe6cc4b36a2bee5834b077d78d82
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, ingrese ambos campos");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({
          usuario: email,
          contraseña: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error en el inicio de sesión");
        return;
      }

      // Redirección por rol
      if (data.tipo === "admin") {
        router.push("/admin/dashboard");
      } else if (data.tipo === "escuela") {
        router.push("/datos-generales");
      } else {
        setError("Tipo de usuario no reconocido");
      }
    } catch (err) {
      setError("Error del servidor. Intente más tarde.");
    }
  };
*/
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Logo SDE"
            width={256}
            height={256}
            className={styles.logo}
            priority
          />
        </div>
        <h2 className={styles.title}>REDEPSE</h2>
        {error && <div className={styles.error}>{error}</div>}
        <form method="POST" onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.button}>
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}