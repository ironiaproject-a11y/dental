"use client";
import { useEffect, useRef, useCallback, useState } from 'react';
import styles from './Services.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: 1,
    title: 'Clareamento Dental',
    tag: 'ESTÉTICA',
    subtitle: 'Até 8 tons mais claros',
    desc: 'Tecnologia a laser e moldeiras personalizadas para um branco natural em poucos dias.',
    icon: '🦷',
    thumbnail: '/images/infrastructure/treatment-suite.png'
  },
  {
    id: 2,
    title: 'Implante Dental',
    tag: 'IMPLANTES',
    subtitle: 'Segurança e naturalidade',
    desc: 'Substitua dentes perdidos com materiais de alta compatibilidade e técnica minimamente invasiva.',
    icon: '🔬',
    thumbnail: '/images/infrastructure/sterilization.png'
  },
  {
    id: 3,
    title: 'Ortodontia',
    tag: 'ESPECIALIDADE',
    subtitle: 'Alinhadores modernizados',
    desc: 'Aparelhos invisíveis e fixos para todas as idades, com foco em conforto e estética.',
    icon: '😁',
    thumbnail: '/images/tech-room.png'
  },
  {
    id: 4,
    title: 'Facetas de Porcelana',
    tag: 'ESTÉTICA',
    subtitle: 'O sorriso das estrelas',
    desc: 'Transformação total em poucas sessões. Lentes ultrafinas que corrigem cor e formato.',
    icon: '💎',
    thumbnail: '/images/infrastructure/treatment-suite.png'
  },
  {
    id: 5,
    title: 'Harmonização Facial',
    tag: 'HARMÔNICO',
    subtitle: 'Rejuvenescimento natural',
    desc: 'Equilíbrio facial com toxina botulínica e preenchimentos para realçar sua beleza única.',
    icon: '✨',
    thumbnail: '/images/infrastructure/reception.png'
  },
  {
    id: 6,
    title: 'Check-up Preventivo',
    tag: 'PREVENÇÃO',
    subtitle: 'Saúde em primeiro lugar',
    desc: 'Avaliação completa com câmera intraoral para detectar problemas antes que eles se tornem graves.',
    icon: '🛡️',
    thumbnail: '/images/tech-room.png'
  },
];

function getVisible() {
  if (typeof window === 'undefined') return 3;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768)  return 2;
  return 1;
}

export default function Services() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const trackRef    = useRef(null);
  const intervalRef = useRef(null);
  const isHovered   = useRef(false);

  const [active,  setActive]  = useState(0);
  const [visible, setVisible] = useState(3);

  const total = services.length;
  const pages = Math.ceil(total / visible);

  // ── Slide ──────────────────────────────────────────────────────────────────
  const slideTo = useCallback((idx) => {
    if (!trackRef.current) return;
    const safe = ((idx % total) + total) % total;
    setActive(safe);
    const pct = safe * (100 / visible);
    gsap.to(trackRef.current, { x: `-${pct}%`, duration: 0.65, ease: 'power2.inOut' });
  }, [total, visible]);

  // ── Auto-play ──────────────────────────────────────────────────────────────
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
    }, 4500);
  }, [slideTo, total]);

  // ── Resize ────────────────────────────────────────────────────────────────
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

  // ── Entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.18, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }
      gsap.fromTo(
        `.${styles.carouselWrapper}`,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Start auto-play ───────────────────────────────────────────────────────
  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, [startAuto]);

  const activeDot = Math.floor(active / visible) % pages;
  const prev = () => { slideTo(active - 1); startAuto(); };
  const next = () => { slideTo(active + 1); startAuto(); };

  return (
    <section className={styles.servicesSection} id="servicos" ref={sectionRef}>
      <div className={`container ${styles.container}`}>

        {/* Header */}
        <div className={styles.header} ref={headerRef}>
          <span className="tagInverse">O QUE OFERECEMOS</span>
          <h2 className="titleInverse">
            Tratamentos para cada{' '}
            <span className={styles.textHighlight}>
              sorriso único
              <svg className={styles.curvyLine} width="220" height="30" viewBox="0 0 220 30" fill="none">
                <path d="M5 10C50 30 170 30 215 10" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round"/>
                <path d="M208 15L218 10L208 5" fill="#60A5FA" />
              </svg>
            </span>
          </h2>
          <p className={styles.subtext}>
            Do simples ao complexo, cuidamos do seu sorriso com tecnologia de última geração e atenção humanizada que você merece.
          </p>
        </div>

        {/* Carousel */}
        <div
          className={styles.carouselWrapper}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
        >
          {/* Prev */}
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Serviço anterior">
            ‹
          </button>

          {/* Track */}
          <div className={styles.carouselOuter}>
            <div className={styles.track} ref={trackRef}>
              {services.map((service, i) => (
                <div
                  key={service.id}
                  className={`${styles.serviceCard} ${i === active ? styles.cardActive : ''}`}
                  style={{ flex: `0 0 ${100 / visible}%` }}
                >
                  <div className={styles.cardInner}>
                    <div className={styles.cardMedia}>
                      <img src={service.thumbnail} alt={service.title} className={styles.thumbnail} />
                      <div className={styles.playOverlay}>
                        <div className={styles.playCircle}>
                          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                      </div>
                      <span className={styles.cardTag}>{service.tag}</span>
                    </div>
                    
                    <div className={styles.cardBody}>
                      <div className={styles.titleRow}>
                        <div className={styles.cardIcon}>{service.icon}</div>
                        <h3 className={styles.cardTitle}>{service.title}</h3>
                      </div>
                      <p className={styles.cardDesc}>{service.desc}</p>
                      <div className={styles.cardFooter}>
                        <span className={styles.cardSubtitle}>{service.subtitle}</span>
                        <button className={styles.cardBtn}>Saber mais →</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next */}
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Próximo serviço">
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
              onClick={() => { slideTo(i * visible); startAuto(); }}
            />
          ))}
        </div>

      </div>
    </section>
  );
}