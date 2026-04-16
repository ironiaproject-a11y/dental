"use client";
import { useEffect, useRef, useCallback, useState } from 'react';
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
    initials: "JM",
    color: "#4F46E5",
    location: "Moema, SP",
    service: "Implante Dentário",
    date: "Março 2025",
    stars: 5,
  },
  {
    quote: "Em 9 meses com o Invisalign meu sorriso mudou completamente. Ninguém nem notava que eu estava usando. Valeu cada centavo.",
    name: "Carlos Rodrigues",
    initials: "CR",
    color: "#0891B2",
    location: "Campinas, SP",
    service: "Ortodontia Invisalign",
    date: "Fevereiro 2025",
    stars: 5,
  },
  {
    quote: "O clareamento ficou absurdamente natural. Sem aquela sensibilidade chata que tive em outros lugares. Voltei para fazer a família inteira.",
    name: "Fernanda Torres",
    initials: "FT",
    color: "#059669",
    location: "Santo André, SP",
    service: "Clareamento Dental",
    date: "Janeiro 2025",
    stars: 5,
  },
  {
    quote: "Planejamento digital incrível. Vi exatamente como ia ficar meu sorriso antes de começar o tratamento. Tecnologia de outro nível.",
    name: "Ricardo Alves",
    initials: "RA",
    color: "#DC2626",
    location: "Brooklin, SP",
    service: "Lentes de Contato Dental",
    date: "Abril 2025",
    stars: 5,
  },
  {
    quote: "Ambiente lindo, recepção super acolhedora e o Dr. tratou minha filha de 7 anos com tanta paciência. Melhor clínica que já fui.",
    name: "Beatriz Mendes",
    initials: "BM",
    color: "#7C3AED",
    location: "Pinheiros, SP",
    service: "Odontopediatria",
    date: "Março 2025",
    stars: 5,
  },
  {
    quote: "Fiz o plano família e o custo-benefício é imbatível. Toda a família atendida com qualidade por um valor que cabe no orçamento.",
    name: "Gustavo Pereira",
    initials: "GP",
    color: "#B45309",
    location: "Vila Mariana, SP",
    service: "Plano Odontológico",
    date: "Fevereiro 2025",
    stars: 5,
  },
];

// How many cards visible per "page" (desktop 3, tablet 2, mobile 1)
function getVisible() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function StarRating({ count }) {
  return (
    <div className={styles.stars} aria-label={`${count} estrelas`}>
      {Array.from({ length: count }).map((_, i) => <span key={i}>★</span>)}
    </div>
  );
}

function Avatar({ initials, color }) {
  return (
    <div className={styles.avatarCircle} style={{ background: color }}>
      {initials}
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
  const sectionRef   = useRef(null);
  const trackRef     = useRef(null);
  const intervalRef  = useRef(null);
  const isHovered    = useRef(false);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(3);

  const total = testimonials.length;
  const pages = Math.ceil(total / visible);   // dot count

  // ── Slide to index ─────────────────────────────────────────────────────────
  const slideTo = useCallback((idx) => {
    if (!trackRef.current) return;
    const safeIdx = ((idx % total) + total) % total;
    setActive(safeIdx);

    // card width = 100% / visible  ➜ translate = safeIdx * (100/visible)%
    const pct = safeIdx * (100 / visible);
    gsap.to(trackRef.current, {
      x: `-${pct}%`,
      duration: 0.65,
      ease: 'power2.inOut',
    });
  }, [total, visible]);

  // ── Auto-play ───────────────────────────────────────────────────────────────
  const startAuto = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isHovered.current) {
        setActive(prev => {
          const next = (prev + 1) % total;
          slideTo(next);
          return next;
        });
      }
    }, 4000);
  }, [slideTo, total]);

  // ── Responsive recalc ───────────────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const v = getVisible();
      setVisible(v);
      setActive(0);
      if (trackRef.current) gsap.set(trackRef.current, { x: 0 });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

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

  // ── Start auto-play after mount ─────────────────────────────────────────────
  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, [startAuto]);

  // ── Dot page index ──────────────────────────────────────────────────────────
  const activeDot = Math.floor(active / visible) % pages;

  const goToDot = (dotIdx) => {
    slideTo(dotIdx * visible);
    startAuto();
  };

  const prev = () => { slideTo(active - 1); startAuto(); };
  const next = () => { slideTo(active + 1); startAuto(); };

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

        {/* Carousel */}
        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          {/* Prev arrow */}
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={prev}
            aria-label="Depoimento anterior"
          >
            ‹
          </button>

          {/* Track */}
          <div className={styles.carouselOuter}>
            <div className={styles.track} ref={trackRef}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`${styles.card} ${i === active ? styles.cardActive : ''}`}
                  style={{ flex: `0 0 ${100 / visible}%` }}
                >
                  <div className={styles.cardTop}>
                    <StarRating count={t.stars} />
                    <span className={styles.dateTag}>{t.date}</span>
                  </div>
                  <p className={styles.quote}>"{t.quote}"</p>
                  <div className={styles.divider} />
                  <div className={styles.authorRow}>
                    <Avatar initials={t.initials} color={t.color} />
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

          {/* Next arrow */}
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={next}
            aria-label="Próximo depoimento"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className={styles.dots} role="tablist">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeDot}
              aria-label={`Página ${i + 1}`}
              className={`${styles.dot} ${i === activeDot ? styles.dotActive : ''}`}
              onClick={() => goToDot(i)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}