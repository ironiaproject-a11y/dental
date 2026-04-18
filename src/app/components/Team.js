"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './Team.module.css';
import { FiInstagram, FiTwitter } from 'react-icons/fi';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import gsap from 'gsap';
import AnimatedTitle from './AnimatedTitle';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Team() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.anim-team-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%'
        }
      });
      
      gsap.from('.anim-team-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const team = [
    { 
      name: 'Dr. Ricardo Costa', 
      cro: 'CRO-SP 123.45', 
      role: 'Cirurgião Bucomaxilofacial Master', 
      bio: 'Membro titular do colégio brasileiro de cirurgiões. Pioneiro em técnicas de implante guiado por computador sem incisões, garantindo uma recuperação celular silenciosa.',
      photo: '/images/team/doctor-1.png' 
    },
    { 
      name: 'Dra. Ana Ferreira', 
      cro: 'CRO-SP 234.56', 
      role: 'Especialista Diamond em Invisalign', 
      bio: 'Liderou o desenvolvimento das resinas nanoparticuladas no pólo Sul. Sua visão estética busca a simetria perfeita sem comprometer a identidade original do rosto.',
      photo: '/images/team/doctor-2.png' 
    },
    { 
      name: 'Dr. Bruno Mendes', 
      cro: 'CRO-SP 345.67', 
      role: 'Ph.D em Implantodontia', 
      bio: 'Doutor em Biotecnologia Odontológica. Foca seu atelier clínico em reabilitação de alta complexidade com osseointegração acelerada, ministrando cursos globais.',
      photo: '/images/team/doctor-3.png' 
    },
    { 
      name: 'Dra. Luiza Lima', 
      cro: 'CRO-SP 456.78', 
      role: 'Estética de Alta Performance Face & Lábio', 
      bio: 'Artista facial com especialização internacional em harmonização orofacial. Utiliza micro-pontos de ácido hialurônico para devolver sustentação e jovialidade de forma invisível.',
      photo: '/images/team/doctor-4.png' 
    },
  ];

  return (
    <section className={`section ${styles.sectionBg}`} id="equipe" ref={sectionRef}>
      <div className="container">
        <div className={`${styles.header} anim-team-header`}>
          <span className="tag">Excelência Clínica</span>
          <AnimatedTitle className="title" delay={0.2}>Conheça os Especialistas por trás do seu <span>novo sorriso</span></AnimatedTitle>
        </div>

        <div className={`${styles.grid} team-grid`}>
          {team.map((doc, i) => (
            <div key={i} className={`${styles.card} anim-team-card team-card`}>
              <div className={styles.photo}>
                <Image 
                  src={doc.photo} 
                  alt={doc.name} 
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                  className={styles.docImage}
                  priority={i < 2} 
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{doc.name}</h3>
                <div className={styles.role}>{doc.role}</div>
                <div className={styles.cro}>{doc.cro}</div>
                <p className={styles.bio}>{doc.bio}</p>
                <div className={styles.socials}>
                  <FiInstagram className={styles.icon} />
                  <FaLinkedinIn className={styles.icon} />
                  <FaWhatsapp className={styles.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}