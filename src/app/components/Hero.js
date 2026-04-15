"use client";
import { useEffect, useRef, useCallback } from 'react';
import styles from './Hero.module.css';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const btnRef = useRef(null);
  const videoRef = useRef(null);

  // ── Video autoplay ──────────────────────────────────────────────────────────
  // Using a ref CALLBACK (not useRef) so initVideo fires the instant React
  // attaches the <video> element to the DOM — before any useEffect runs.
  // This is critical: video.muted must be set imperatively because React does
  // NOT serialize the `muted` attribute in SSR HTML (known React bug).
  // Without muted, ALL mobile browsers block autoplay.
  const initVideo = useCallback((videoEl) => {
    if (!videoEl) return;
    videoRef.current = videoEl;

    // Force muted + inline attributes programmatically (required for mobile autoplay)
    videoEl.muted = true;
    videoEl.defaultMuted = true;
    videoEl.setAttribute('playsinline', '');
    videoEl.setAttribute('webkit-playsinline', ''); // Required for iOS < 10

    const tryPlay = () => {
      const promise = videoEl.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // Silently ignored — Low Power Mode / strict browser blocked it.
          // The user-interaction listeners below will retry.
        });
      }
    };

    // Attempt 1: immediately (synchronously after mount)
    tryPlay();

    // Attempt 2: when video data is ready
    videoEl.addEventListener('loadeddata', tryPlay, { once: true });
    videoEl.addEventListener('canplay',    tryPlay, { once: true });

    // Attempt 3: IntersectionObserver — browser may auto-pause off-screen videos
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => { if (entries[0].isIntersecting) tryPlay(); },
        { threshold: 0 }
      );
      observer.observe(videoEl);
    }

    // Attempt 4: first user interaction (last resort for Low Power Mode on iOS)
    const onInteraction = () => tryPlay();
    const evts = ['touchstart', 'touchend', 'pointerdown', 'click', 'scroll'];
    evts.forEach(evt =>
      document.addEventListener(evt, onInteraction, { once: true, passive: true })
    );

    // Attach cleanup to the element so we can call it on unmount
    videoEl._heroCleanup = () => {
      if (observer) observer.disconnect();
      evts.forEach(evt => document.removeEventListener(evt, onInteraction));
    };
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

  // ── Cleanup video listeners on unmount ──────────────────────────────────────
  useEffect(() => {
    return () => {
      videoRef.current?._heroCleanup?.();
    };
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>

      {/* 1. Background Video */}
      <div className={styles.videoWrapper}>
        {/*
          IMPORTANT: ref={initVideo} is a callback ref — it fires immediately when
          the element is inserted into the DOM, before useEffect runs.
          This ensures video.muted = true is set BEFORE any play() call,
          which is the only reliable way to enable autoplay on mobile.
        */}
        <video
          ref={initVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video-el"
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
        </video>
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
