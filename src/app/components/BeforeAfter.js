"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './BeforeAfter.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 85%' },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const handleMove = (x) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((x - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(pos, 100));
    setSliderPosition(pos);
  };

  const handleMouseMove = (e) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length > 0) handleMove(e.touches[0].clientX);
  };

  return (
    <section className={styles.section} id="resultados">
      <div className="container">
        <div className={styles.header} ref={headerRef}>
          <span className="tagInverse">A Obra de Arte</span>
          <h2 className="titleInverse">
            O resultado de uma <span>Harmonização Absoluta</span>
          </h2>
          <p className={styles.subtext}>
            Deslize a barra para experimentar a transformação. Lentes em porcelana ultrafinas desenhadas digitalmente com perfeição celular.
          </p>
        </div>

        <div className={styles.singletonWrapper}>
          <div 
            className={styles.sliderContainer}
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDragging(false)}
          >
            {/* Antes da transformação */}
            <div className={styles.beforeWrapper}>
              <div className={styles.imageOverlay} />
              <Image 
                src="/images/before-after/premium_dental_smile.png"
                alt="Sorriso antes do Tratamento"
                fill
                className={styles.beforeImage}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
              <span className={styles.badgeBefore}>Antes</span>
            </div>

            {/* Depois da transformação (Controlada pelo slide de corte) */}
            <div 
              className={styles.afterWrapper}
              style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
            >
              <Image 
                src="/images/before-after/premium_dental_smile.png"
                alt="Sorriso Perfeito após o Tratamento"
                fill
                className={styles.afterImage}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                priority
              />
              <span className={styles.badgeAfter}>Depois</span>
            </div>

            {/* Arrastador Tangível */}
            <div 
              className={styles.sliderHandle}
              style={{ left: `${sliderPosition}%` }}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
            >
              <div className={styles.sliderLine} />
              <div className={styles.sliderKnob}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F1B2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l5-6-5-6M9 18l-5-6 5-6" />
                </svg>
              </div>
            </div>

            {/* Accessibilidade fluida mobile/desktop invisivel no topo */}
            <input 
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(parseFloat(e.target.value))}
              className={styles.hiddenInput}
              aria-label="Controle de visualização da transformação de dentes do paciente"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
