"use client";
import { useState } from 'react';
import styles from './TopBar.module.css';
import { HiX } from 'react-icons/hi';

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`${styles.topBar} top-bar`}>
      {/* Ponto verde pulsante — indica disponibilidade */}
      <span className={styles.liveDot} aria-hidden="true" />

      <span className={styles.text}>
        📍 <strong>Av. Paulista</strong> — Valet gratuito SmilePro
      </span>

      <span className={styles.sep} aria-hidden="true" />

      <a href="#contato" className={styles.link}>
        Agendar →
      </a>

      <button
        className={styles.closeBtn}
        onClick={() => setIsVisible(false)}
        aria-label="Fechar aviso"
      >
        <HiX size={12} />
      </button>
    </div>
  );
}
