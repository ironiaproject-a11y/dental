"use client";
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const btnRef = useRef(null);

  const videoContainerRef = useRef(null);

  // ── Video Autoplay Guarantee via Raw DOM ─────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const container = videoContainerRef.current;
    if (!container) return;

    // Remove existing video if re-running
    container.innerHTML = '';

    const v = document.createElement('video');
    v.className = 'hero-video-el';
    v.src = '/videos/hero-bg.mp4';
    v.playsInline = true;
    v.autoplay = true;
    v.loop = true;
    v.muted = true;
    v.defaultMuted = true;
    v.preload = 'auto';
    
    // Crucial explicitly set attributes for iOS
    v.setAttribute('playsinline', 'playsinline');
    v.setAttribute('webkit-playsinline', 'playsinline');
    v.setAttribute('muted', 'muted');
    
    v.style.cssText = "width: 100%; height: 100%; object-fit: cover; object-position: center top; pointer-events: none; position: absolute; top: 0; left: 0; z-index: 0;";

    container.appendChild(v);

    // Force play immediately after appending
    const promise = v.play();
    if (promise !== undefined) {
      promise.catch((err) => {
        // If it still fails (Low Power Mode), listen for any touch to recover it
        const recoverPlay = () => {
          v.play();
          document.removeEventListener('touchstart', recoverPlay);
        };
        document.addEventListener('touchstart', recoverPlay, { passive: true });
      });
    }

    return () => { container.innerHTML = ''; };
  }, []);

  // ── GSAP animations ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Entrance slide-in from left
      gsap.timeline().fromTo(
        '.anim-hero-left',
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.6, stagger: 0.35, ease: 'power3.out', clearProps: 'transform' }
      );

      // Desktop parallax on mouse move
      const handleMouseMove = (e) => {
        if (window.innerWidth < 1024) return;
        const xPos = (e.clientX / window.innerWidth  - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        gsap.to('.hero-parallax', { x: xPos, y: yPos, yPercent: -50, duration: 1, ease: 'power2.out' });
      };
      heroRef.current?.addEventListener('mousemove', handleMouseMove);

      // Magnetic CTA button
      const btn = btnRef.current;
      if (btn) {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width  / 2;
          const y = e.clientY - rect.top  - rect.height / 2;
          gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>

      {/* 1. Background Video */}
      <div className={styles.videoWrapper} ref={videoContainerRef}>
        {/* O vídeo será injetado pelo JavaScript aqui via DOM nativo */}
      </div>

      {/* 2. Overlay */}
      <div className={styles.videoOverlay}></div>

      {/* 3. Content */}
      <div className={`container ${styles.container}`}>
        <div className={`${styles.leftCol} hero-parallax hero-content`}>

          <h1 className={styles.title}>
            <span className="anim-hero-left" style={{ display: 'block' }}>
              Seu Sorriso <span className={styles.titleHighlight}>Perfeito</span>
            </span>
            <span className="anim-hero-left" style={{ display: 'block' }}>
              Começa Aqui.
            </span>
          </h1>

          <p className={`${styles.description} anim-hero-left`}>
            Tecnologia de ponta e atendimento humanizado para transformar seu sorriso. Agende sua avaliação gratuita.
          </p>

          <div className={`${styles.ctaRow} anim-hero-left hero-buttons`}>
            <button ref={btnRef} className="btn btn-primary">Agendar Avaliação Gratuita →</button>
          </div>

          <div className={`${styles.socialProofPill} anim-hero-left hero-social-proof`}>
            <div className={`${styles.pillAvatars} avatars`}>
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=40&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=40&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=40&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=40&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=40&auto=format&fit=crop'
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
