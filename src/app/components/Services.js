"use client";
import { useEffect, useRef } from 'react';
import styles from './Services.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Services() {
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const bentoRef = useRef(null);
  const headerRef = useRef(null);

  const services = [
    { 
      id: 1, 
      title: 'Clareamento Dental', 
      tag: 'ESTÉTICA', 
      subtitle: 'Até 8 tons mais claros',
      desc: 'Tecnologia a laser e moldeiras personalizadas para um branco natural em poucos dias.',
      icon: '🦷',
      video: '' // <!-- VIDEO: clareamento.mp4 -->
    },
    { 
      id: 2, 
      title: 'Implante Dental', 
      tag: 'IMPLANTES', 
      subtitle: 'Segurança e naturalidade',
      desc: 'Substitua dentes perdidos com materiais de alta compatibilidade e técnica minimamente invasiva.',
      icon: '🔬',
      video: '' // <!-- VIDEO: implante.mp4 -->
    },
    { 
      id: 3, 
      title: 'Ortodontia', 
      tag: 'ESPECIALIDADE', 
      subtitle: 'Alinhadores modernizados',
      desc: 'Aparelhos invisíveis e fixos para todas as idades, com foco em conforto e estética.',
      icon: '😁',
      video: '' // <!-- VIDEO: ortodontia.mp4 -->
    },
    { 
      id: 4, 
      title: 'Facetas de Porcelana', 
      tag: 'ESTÉTICA', 
      subtitle: 'O sorriso das estrelas',
      desc: 'Transformação total em poucas sessões. Lentes ultrafinas que corrigem cor e formato.',
      icon: '💎',
      video: '' // <!-- VIDEO: facetas.mp4 -->
    },
    { 
      id: 5, 
      title: 'Harmonização Facial', 
      tag: 'HARMÔNICO', 
      subtitle: 'Rejuvenescimento natural',
      desc: 'Equilíbrio facial com toxina botulínica e preenchimentos para realçar sua beleza única.',
      icon: '✨',
      video: ''
    },
    { 
      id: 6, 
      title: 'Check-up Preventivo', 
      tag: 'PREVENÇÃO', 
      subtitle: 'Saúde em primeiro lugar',
      desc: 'Avaliação completa com câmera intraoral para detectar problemas antes que eles se tornem graves.',
      icon: '🛡️',
      video: ''
    },
  ];

  // GSAP Animations
  useEffect(() => {
    if (typeof window !== 'undefined' && headerRef.current && bentoRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(headerRef.current.children, 
          { y: 30, opacity: 0 },
          { 
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            }
          }
        );

        gsap.fromTo('.service-card-anim',
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: {
              trigger: bentoRef.current,
              start: 'top 85%',
            }
          }
        );
      });
      return () => ctx.revert();
    }
  }, []);

  return (
    <section className={styles.servicesSection} id="servicos" ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header} ref={headerRef}>
          <span className="tagInverse">O QUE OFERECEMOS</span>
          <h2 className="titleInverse">
            Tratamentos para cada{' '}
            <span className={styles.textHighlight}>
              sorriso único
              <svg className={styles.curvyLine} width="220" height="30" viewBox="0 0 220 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 10C50 30 170 30 215 10" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round"/>
                <path d="M208 15L218 10L208 5" fill="#60A5FA" />
              </svg>
            </span>
          </h2>
          <p className={styles.subtext}>
            Do simples ao complexo, cuidamos do seu sorriso com tecnologia de última geração e atenção humanizada que você merece.
          </p>
        </div>

        <div className={styles.servicesGrid} ref={bentoRef}>
          {services.map((service) => (
            <div key={service.id} className={`${styles.serviceCard} service-card-anim`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardIcon}>{service.icon}</div>
                <span className={styles.cardTag}>{service.tag}</span>
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <div className={styles.cardFooter}>
                <span className={styles.cardSubtitle}>{service.subtitle}</span>
                <button className={styles.cardBtn}>Saber mais →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}