"use client";
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef(null);
  const btnRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ── Controle Dinâmico para Autoplay (Bypass Safari/iOS) ────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Forçamos o mute explicitamente. Safari bloqueia play se achar que tem áudio.
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    // Tentar executar de imediato assim que montar via JS
    const attemptPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Se falhar o autoplay por política, tentamos repetidamente de forma
          // assíncrona para que, se o browser liberar após hidratar, ele toque sem precisar rolar.
          console.log("Autoplay retrying...", error);
          setTimeout(attemptPlay, 500);
        });
      }
    };

    attemptPlay();

    // Se a Apple continuar bloqueando o background via política de bateria estrita,
    // o usuário não verá o video quebrado (opacity 0), mas podemos amarrar uma verificação de fallback.
  }, []);

  // ── GSAP animations ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Entrada Premium: do lado esquerdo, cascata progressiva
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

      // Parallax no desktop ao mover o mouse
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

  return (
    <section className={styles.hero} ref={heroRef} id="home">

      {/* 1. Background Video - Renderização direta com React para evitar perdas de hidratação e atributos */}
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPlaying={() => setIsPlaying(true)}
          className={styles.videoBg}
          style={{ 
            width: '100%', height: '100%', objectFit: 'cover', 
            objectPosition: 'center top', pointerEvents: 'none', 
            position: 'absolute', top: 0, left: 0, zIndex: 0,
            opacity: isPlaying ? 1 : 0,
            transition: 'opacity 0.8s ease'
          }}
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/hero-bg.webm" type="video/webm" />
        </video>
      </div>

      {/* 2. Overlay com gradiente sutil para leitura */}
      <div className={styles.videoOverlay}></div>

      {/* 3. Conteúdo Principal */}
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
