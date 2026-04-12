"use client";
import { useState } from 'react';
import styles from './TopBar.module.css';
import { HiX } from 'react-icons/hi';

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={styles.topBar}>
      <span className={styles.text}>
        📍 Atendimento Exclusivo na Av. Paulista — Vallet Gratuito para Pacientes SmilePro
      </span>
      <div className={styles.rightActions}>
        <a href="#contato" className={styles.link}>Agendar Agora →</a>
      </div>
    </div>
  );
}
