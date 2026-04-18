/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import gsap from 'gsap';

export default function Hero() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const btnRef = useRef(null);

  // ── Video Autoplay & Fallback Handling ─────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Force property muting just in case
    v.muted = true;
    v.defaultMuted = true;
    
    // Ensure playsinline
    v.setAttribute('playsinline', 'playsinline');
    v.setAttribute('webkit-playsinline', 'playsinline');

    // Try playing
    const promise = v.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // Low Power Mode blocked it
        const recoverPlay = () => {
          v.play().catch(() => {});
          document.removeEventListener('touchstart', recoverPlay);
          document.removeEventListener('scroll', recoverPlay);
        };
        // Add listeners to naturally resume video on any touch or scroll
        document.addEventListener('touchstart', recoverPlay, { passive: true });
        document.addEventListener('scroll', recoverPlay, { passive: true });
      });
    }
  }, []);

  // ── GSAP animations ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Premium entrance: from the left, progressive cascading
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top 85%'
        }
      }).fromTo(
        '.anim-hero-left',
        { x: -80, opacity: 0, filter: 'blur(16px)' },
        { 
          x: 0, 
          opacity: 1, 
          filter: 'blur(0px)', 
          duration: 1.8, 
          stagger: 0.3, // Ideal timing: 300ms de intervalo entre a cascata (title -> text -> CTA -> social)
          ease: 'power4.out', 
          clearProps: 'all' 
        }
      );

      // Desktop parallax on mouse move
      const handleMouseMove = (e) => {
        if (window.innerWidth < 1024) return;
        const xPos = (e.clientX / window.innerWidth  - 0.5) * 15;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 15;
        gsap.to('.hero-parallax', { x: xPos, y: yPos, yPercent: -50, duration: 1.5, ease: 'power2.out' });
      };
      heroRef.current?.addEventListener('mousemove', handleMouseMove);

        // Magnetic CTA button & Social Proof Pill
        const magneticElements = [btnRef.current, document.querySelector('.hero-social-proof')];
        magneticElements.forEach((el) => {
          if (!el) return;
          el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width  / 2;
            const y = e.clientY - rect.top  - rect.height / 2;
            gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: 'power2.out' });
          });
          el.addEventListener('mouseleave', () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: 'power3.out' });
          });
        });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>

      {/* 1. Background Video */}
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className="hero-video-el"
          src="/videos/hero-bg.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          fetchPriority="high"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0,
          }}
        />
      </div>

      {/* 2. Overlay */}
      <div className={styles.videoOverlay}></div>

      {/* 3. Content */}
      <div className={`container ${styles.container}`}>
        <div className={`${styles.leftCol} hero-parallax hero-content`}>

          <h1 className={`${styles.title} anim-hero-left`}>
            Seu Sorriso <span className={styles.titleHighlight}>Perfeito</span> Começa Aqui.
          </h1>

          <p className={`${styles.description} anim-hero-left`}>
            A união definitiva entre engenharia digital e maestria artesanal. Descubra a estética de vanguarda projetada exclusivamente para as proporções anatômicas do seu rosto.
          </p>

          <div className={`${styles.ctaRow} anim-hero-left hero-buttons`}>
            <button ref={btnRef} className="btn btn-primary">Solicitar Reserva de Horário →</button>
            <a href="#servicos" className={`${styles.secondaryLink} anim-hero-left`}>Explorar Especialidades</a>
          </div>

          <div className={`${styles.socialProofPill} anim-hero-left hero-social-proof`}>
            <div className={`${styles.pillAvatars} avatars`}>
              {[
                '/images/patients/carlos.png',
                '/images/patients/fernanda.png',
                '/images/patients/juliana.png',
                '/images/patients/patient-4.png',
                '/images/patients/patient-5.png'
              ].map((url, i) => (
                <div
                  key={i}
                  className={styles.pillAvatar}
                  style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }}
                />
              ))}
            </div>
            <div className={styles.pillText}>
              <span className={styles.pillStars}>★★★★★</span>
              <span className={styles.pillLabel}>+2.400 pacientes satisfeitos</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
