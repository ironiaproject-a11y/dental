"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const testimonials = [
    { 
      quote: "Fiz meu implante aqui e foi a melhor decisão da minha vida. Equipe incrível, resultado perfeito!", 
      name: "Juliana M.", 
      location: "Moema, SP", 
      duration: "cliente há 2 anos",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop"
    },
    { 
      quote: "Usava aparelho há anos sem resultado. Com o Invisalign da SmilePro, em 8 meses meu sorriso mudou completamente.", 
      name: "Carlos R.", 
      location: "Campinas, SP", 
      duration: "cliente há 1 ano",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop"
    },
    { 
      quote: "Plano família cobre toda minha família por um valor justo. Atendimento top, sempre pontual.", 
      name: "Fernanda T.", 
      location: "Santo André, SP", 
      duration: "cliente há 3 anos",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=150&auto=format&fit=crop"
    },
    { 
      quote: "Excelente tecnologia. Me senti muito segura com scanners 3D e o planejamento digital do meu caso. Recomendo muito!", 
      name: "Ricardo A.", 
      location: "Brooklin, SP", 
      duration: "cliente há 1 ano",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
    },
    { 
      quote: "Ambiente impecável e recepção muito acolhedora. Nem parece que estou no dentista. Nota 10!", 
      name: "Beatriz M.", 
      location: "Pinheiros, SP", 
      duration: "cliente há 2 anos",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
    },
    { 
      quote: "O melhor clareamento que já fiz. Sem sensibilidade nenhuma e o ambiente é muito relaxante.", 
      name: "Gustavo P.", 
      location: "Vila Mariana, SP", 
      duration: "cliente há 6 meses",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`section ${styles.sectionBg}`} id="depoimentos" ref={sectionRef}>
      <div className="container">
        <div className={styles.header}>
          <span className="tag">Depoimentos</span>
          <h2 className="title">Pacientes que transformaram<br/> <span>o sorriso</span></h2>
          <p className={styles.subtext}>Resultados reais de pacientes que confiaram na SmilePro para transformar seus sorrisos.</p>
        </div>

        <div className={`${styles.grid} testimonials-grid`}>
          {testimonials.map((test, i) => (
            <div 
              key={i} 
              className={styles.card}
              ref={el => cardsRef.current[i] = el}
            >
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.quote}>"{test.quote}"</p>
              <div className={styles.authorRow}>
                <div className={styles.avatar}>
                  <Image 
                    src={test.avatar} 
                    alt={test.name} 
                    width={150} 
                    height={150} 
                    className={styles.avatarImg} 
                    loading="lazy" 
                  />
                </div>
                <div>
                  <div className={styles.name}>{test.name}</div>
                  <div className={styles.location}>
                    {test.location} · {test.duration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}