"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import Image from "next/image";
import logo from "@/public/favicon-sde.png";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
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
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
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