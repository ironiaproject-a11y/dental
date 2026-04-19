/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const videoRef = useRef(null);
  const heroRef = useRef(null);
  const btnRef = useRef(null);

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
          stagger: 0.3, 
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

    }, heroRef);

    return () => ctx.revert();
  }, []);

  // ── Autoplay robusto: iOS Safari + React Strict Mode + visibilidade ──────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Garante atributos críticos via JS (React às vezes não sincroniza em SSR)
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    let didPlay = false;

    const attemptPlay = () => {
      if (didPlay && !video.paused) return; // já rodando, não fazer nada
      const p = video.play();
      if (p !== undefined) {
        p.then(() => { didPlay = true; }).catch(() => {
          // iOS Safari bloqueia até interação — aguarda touchstart como fallback
        });
      }
    };

    // ── Estratégia 1: execução imediata ─────────────────────────────────────
    attemptPlay();

    // ── Estratégia 2: quando o vídeo tiver dados suficientes para tocar ──────
    const onCanPlay = () => attemptPlay();
    video.addEventListener('canplay', onCanPlay, { once: true });

    // ── Estratégia 3: IntersectionObserver — toca quando entra na viewport ──
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) attemptPlay(); },
      { threshold: 0.01 }
    );
    observer.observe(video);

    // ── Estratégia 4: retoma se a aba voltar ao foco ─────────────────────────
    const onVisible = () => {
      if (document.visibilityState === 'visible') attemptPlay();
    };
    document.addEventListener('visibilitychange', onVisible);

    // ── Estratégia 5: fallback para iOS Safari restritivo (após 1º toque) ────
    const onTouch = () => { attemptPlay(); };
    document.addEventListener('touchstart', onTouch, { once: true, passive: true });

    return () => {
      video.removeEventListener('canplay', onCanPlay);
      document.removeEventListener('visibilitychange', onVisible);
      document.removeEventListener('touchstart', onTouch);
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>

      {/* 1. Background Video (Optimized for Mobile Autoplay) */}
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          className={styles.videoBg}
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
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>
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
            Onde engenharia digital encontra maestria artesanal — calibrada para o seu rosto.
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
              <span className={styles.pillLabel}>+2.400 pacientes</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
