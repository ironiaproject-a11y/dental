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


  return (
    <section className={styles.hero} ref={heroRef}>

      {/* Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        preload="auto"
        className={styles.videoBg}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      
      {/* Dark Overlay for Text Legibility */}
      <div className={styles.videoOverlay}></div>

      <div className={`container ${styles.container}`}>
        {/* Left Column Content */}
        <div className={`${styles.leftCol} hero-parallax`}>
          
          <h1 className={styles.title}>
            <span className="anim-hero-left" style={{ display: 'block' }}>
              Seu Sorriso <span className={styles.titleHighlight}>Perfeito</span>
            </span>
            <span className="anim-hero-left" style={{ display: 'block' }}>
              Começa Aqui.
            </span>
          </h1>
          
          <p className={`${styles.description} anim-hero-left`}>
            Atendimento humanizado, tecnologia de última geração e resultados reais. 
            Agende sua avaliação gratuita e descubra o tratamento ideal para você.
          </p>
          
          <div className={`${styles.ctaRow} anim-hero-left`}>
            <button ref={btnRef} className={`btn btn-primary ${styles.mainCta}`}>Agendar Avaliação Gratuita →</button>
            <a href="#servicos" className={styles.secondaryLink}>Ver nossos serviços</a>
          </div>

          {/* Social Proof Pill — separated from buttons */}
          <div className={`${styles.socialProofPill} anim-hero-left`}>
            <div className={styles.pillAvatars}>
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
