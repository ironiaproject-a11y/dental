"use client";
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
       const ctx = gsap.context(() => {
         const tl = gsap.timeline();

         // Entrance Animation - Smooth from Left
         tl.fromTo('.anim-hero-left', 
           { x: -50, opacity: 0 }, 
           { 
             x: 0, 
             opacity: 1, 
             duration: 1.2, 
             stagger: 0.15, 
             ease: 'power4.out',
             clearProps: 'transform' // Avoid conflicts with parallax transform later
           }
         );

         // Parallax Effect
         const handleMouseMove = (e) => {
           if (window.innerWidth >= 1024) {
             const { clientX, clientY } = e;
             const xPos = (clientX / window.innerWidth - 0.5) * 20;
             const yPos = (clientY / window.innerHeight - 0.5) * 20;

             gsap.to('.hero-parallax', {
               x: xPos,
               y: yPos,
               yPercent: -50, 
               duration: 1,
               ease: 'power2.out',
             });
           }
         };
         
         if (heroRef.current) {
            heroRef.current.addEventListener('mousemove', handleMouseMove);
         }

         // Magnetic Button
         if (btnRef.current) {
           btnRef.current.addEventListener('mousemove', (e) => {
             const rect = btnRef.current.getBoundingClientRect();
             const h = rect.width / 2;
             const w = rect.height / 2;
             const x = e.clientX - rect.left - h;
             const y = e.clientY - rect.top - w;
             
             gsap.to(btnRef.current, {
               x: x * 0.3,
               y: y * 0.3,
               duration: 0.4,
               ease: 'power2.out'
             });
           });

           btnRef.current.addEventListener('mouseleave', () => {
             gsap.to(btnRef.current, {
               x: 0,
               y: 0,
               duration: 0.7,
               ease: 'elastic.out(1, 0.3)'
             });
           });
         }

       }, heroRef);
       return () => ctx.revert();
    }
  }, []);

  useEffect(() => {
    const playVideo = () => {
      const videos = document.querySelectorAll('.hero-video-el');
      videos.forEach(video => {
        if (video.paused) {
          video.play().catch(e => console.log('Autoplay prevented by browser: ', e));
        }
      });
    };
    
    // Play on mount
    playVideo();
    
    // Attempt to play on first interaction if blocked
    document.addEventListener('touchstart', playVideo, { once: true });
    document.addEventListener('click', playVideo, { once: true });
    
    return () => {
      document.removeEventListener('touchstart', playVideo);
      document.removeEventListener('click', playVideo);
    };
  }, []);


  return (
    <section className={styles.hero} ref={heroRef}>

      {/* 1. Background Video */}
      <div
        className={styles.videoWrapper}
        dangerouslySetInnerHTML={{
          __html: `
            <video
              class="hero-video-el"
              autoplay="autoplay"
              loop="loop"
              muted="muted"
              playsinline="true"
              webkit-playsinline="true"
              x5-playsinline="true"
              style="width: 100%; height: 100%; object-fit: cover; object-position: center top; pointer-events: none; border: none; outline: none;"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
            </video>
          `
        }}
      />
      
      {/* 2. Overlay Gradient */}
      <div className={styles.videoOverlay}></div>

      {/* 3. Hero Content */}
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
                <div key={i} className={styles.pillAvatar} style={{ backgroundImage: `url(${url})`, backgroundSize: 'cover' }} />
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
