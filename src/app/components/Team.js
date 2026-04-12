"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './Team.module.css';
import { FiInstagram, FiTwitter } from 'react-icons/fi';
import { FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import gsap from 'gsap';
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
      role: 'Cirurgião Bucomaxilofacial', 
      photo: '/images/team/doctor-1.png' 
    },
    { 
      name: 'Dra. Ana Ferreira', 
      cro: 'CRO-SP 234.56', 
      role: 'Especialista em Invisalign', 
      photo: '/images/team/doctor-2.png' 
    },
    { 
      name: 'Dr. Bruno Mendes', 
      cro: 'CRO-SP 345.67', 
      role: 'Implantodontista PhD', 
      photo: '/images/team/doctor-3.png' 
    },
    { 
      name: 'Dra. Luiza Lima', 
      cro: 'CRO-SP 456.78', 
      role: 'Estética de Alta Performance', 
      photo: '/images/team/doctor-4.png' 
    },
  ];

  return (
    <section className={`section ${styles.sectionBg}`} id="equipe" ref={sectionRef}>
      <div className="container">
        <div className={`${styles.header} anim-team-header`}>
          <span className="tag">Excelência Clínica</span>
          <h2 className="title">Conheça os especialistas por trás do seu <span>novo sorriso</span></h2>
        </div>

        <div className={`${styles.grid} team-grid`}>
          {team.map((doc, i) => (
            <div key={i} className={`${styles.card} anim-team-card team-card`}>
              <div className={styles.photo}>
                <Image 
                  src={doc.photo} 
                  alt={doc.name} 
                  width={300} 
                  height={380} 
                  className={styles.docImage}
                  priority={i < 2} // Priority for top row
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.name}>{doc.name}</h3>
                <div className={styles.cro}>{doc.cro}</div>
                <div className={styles.role}>{doc.role}</div>
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