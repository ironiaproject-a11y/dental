"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiStar } from 'react-icons/fi';
import styles from './CtaBanner.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CtaBanner() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-content-anim', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
      gsap.from('.cta-image-anim', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

    return (
    <section className={`${styles.banner} cta-section`} ref={sectionRef}>
      
      {/* ── ALINHAMENTO DO TEXTO NATIVO AO FLUXO DA PÁGINA ── */}
      <div className={`container ${styles.gridContainer}`}>
        <div className={`${styles.textContent} cta-content-anim`}>
          <div className={styles.tag}>Atendimento Exclusivo Premium</div>
          
          <h2 className={`${styles.title} cta-title`}>
            A evolução da sua imagem começa em uma <span>sessão exclusiva</span>
          </h2>
          
          <p className={styles.text}>
            Nossos Masters em estética desenharão o planejamento digital da sua face com tecnologia tridimensional, garantindo absoluto sigilo e resultados de impacto cinematográfico.
          </p>
          
          <div className={`${styles.actions} cta-buttons`}>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className={styles.btnWhite}>
              Falar com o Concierge
            </a>
            <a href="#contato" className={styles.btnOutline}>
              Planejar Rota →
            </a>
          </div>

          <div className={styles.trustProof}>
            <div className={styles.trustStars}>
              <FiStar size={16} strokeWidth={1} fill="currentColor" />
              <FiStar size={16} strokeWidth={1} fill="currentColor" />
              <FiStar size={16} strokeWidth={1} fill="currentColor" />
              <FiStar size={16} strokeWidth={1} fill="currentColor" />
              <FiStar size={16} strokeWidth={1} fill="currentColor" />
            </div>
            <p className={styles.trustQuote}>"Experiência cinematográfica. Superou totalmente minhas expectativas."</p>
            <div className={styles.trustAuthor}>— Beatriz S., São Paulo</div>
          </div>
        </div>
      </div>

      {/* ── IMAGEM EDGE-TO-EDGE SEPARADA DO CONTEÚDO (FULL BLEED) ── */}
      <div className={`${styles.fullBleedImage} cta-image-anim`}>
         <div className={styles.photoContainer}></div>
      </div>

    </section>
  );
}