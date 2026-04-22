"use client";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    quote: "Tinha medo de dentista desde criança. A equipe da SmilePro foi tão cuidadosa que nem percebi quando o implante foi feito. Resultado impecável, zero dor. Não troco por nada.",
    name: "Juliana Martins",
    location: "Moema, SP",
    service: "Implante Dentário",
    date: "Março 2025",
    stars: 5,
  },
  {
    quote: "Em 9 meses com o Invisalign meu sorriso mudou completamente. Ninguém nem notava que eu estava usando. Valeu cada centavo.",
    name: "Carlos Rodrigues",
    location: "Campinas, SP",
    service: "Ortodontia Invisalign",
    date: "Fevereiro 2025",
    stars: 5,
  },
  {
    quote: "O clareamento ficou absurdamente natural. Sem aquela sensibilidade chata que tive em outros lugares. Voltei para fazer a família inteira.",
    name: "Fernanda Torres",
    location: "Santo André, SP",
    service: "Clareamento Dental",
    date: "Janeiro 2025",
    stars: 5,
  },
  {
    quote: "Planejamento digital incrível. Vi exatamente como ia ficar meu sorriso antes de começar o tratamento. Tecnologia de outro nível.",
    name: "Ricardo Alves",
    location: "Brooklin, SP",
    service: "Lentes de Contato Dental",
    date: "Abril 2025",
    stars: 5,
  },
  {
    quote: "Ambiente lindo, recepção super acolhedora e o Dr. tratou minha filha de 7 anos com tanta paciência. Melhor clínica que já fui.",
    name: "Beatriz Mendes",
    location: "Pinheiros, SP",
    service: "Odontopediatria",
    date: "Março 2025",
    stars: 5,
  },
  {
    quote: "Fiz o plano família e o custo-benefício é imbatível. Toda a família atendida com qualidade por um valor que cabe no orçamento.",
    name: "Gustavo Pereira",
    location: "Vila Mariana, SP",
    service: "Plano Odontológico",
    date: "Fevereiro 2025",
    stars: 5,
  },
];

function StarRating({ count }) {
  return (
    <div className={styles.stars} aria-label={`${count} estrelas`}>
      {Array.from({ length: count }).map((_, i) => <span key={i}>★</span>)}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <div className={styles.verified} title="Paciente verificado">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Paciente verificado
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);

  // ── Entrance animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Duplicate testimonials for seamless infinite scroll
  const marqueeItems = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section
      className={styles.section}
      id="depoimentos"
      ref={sectionRef}
    >
      <div className="container">

        {/* Header */}
        <div className={styles.header}>
          <span className="tag">Depoimentos</span>
          <h2 className="title">
            O que nossos pacientes<br /><span>dizem sobre nós</span>
          </h2>
          <p className={styles.subtext}>
            Mais de 2.400 pacientes transformaram seus sorrisos. Veja o que eles falam.
          </p>
          <div className={styles.ratingBadge}>
            <span className={styles.ratingScore}>5,0</span>
            <div>
              <div className={styles.ratingStars}>★★★★★</div>
              <div className={styles.ratingLabel}>Avaliação média · Google Reviews</div>
            </div>
          </div>
        </div>

        {/* Marquee Animation */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {marqueeItems.map((t, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardTop}>
                  <StarRating count={t.stars} />
                  <span className={styles.dateTag}>{t.date}</span>
                </div>
                <p className={styles.quote}>"{t.quote}"</p>
                <div className={styles.divider} />
                <div className={styles.authorRow}>
                  <div>
                    <div className={styles.name}>{t.name}</div>
                    <div className={styles.meta}>{t.location} · {t.service}</div>
                  </div>
                </div>
                <VerifiedBadge />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}