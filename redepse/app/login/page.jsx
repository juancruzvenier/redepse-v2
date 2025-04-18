"use client";

import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import logo from "@/public/favicon-sde.webp"; // Asegurate de que esté en public o en assets

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Por favor, ingrese ambos campos");
      return;
    }

    setError("");
    alert(`Correo: ${email}, Contraseña: ${password}`);
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
