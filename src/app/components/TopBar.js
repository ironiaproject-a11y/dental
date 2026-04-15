"use client";
import { useState } from 'react';
import styles from './TopBar.module.css';
import { HiX } from 'react-icons/hi';

export default function TopBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`${styles.topBar} top-bar`}>
      <span>
        📍 Atendimento exclusivo na <strong>Av. Paulista</strong> — Valet gratuito para pacientes SmilePro
      </span>

      <div className={styles.separator} />

      <div className={styles.rightActions}>
        <a href="#contato" className={styles.link}>
          Agendar Agora →
        </a>
      </div>

      <button
        className={styles.closeBtn}
        onClick={() => setIsVisible(false)}
        aria-label="Fechar aviso"
      >
        <HiX size={14} />
      </button>
    </div>
  );
}
