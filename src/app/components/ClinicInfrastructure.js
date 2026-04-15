"use client";
import Image from 'next/image';
import { useState } from 'react';
import styles from './ClinicInfrastructure.module.css';

export default function ClinicInfrastructure() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
      caption: "Espaço de Recepção Consciente"
    },
    {
      url: "https://images.unsplash.com/photo-1588776814546-1ffbb68b82de?q=80&w=1200&auto=format&fit=crop",
      caption: "Tecnologia e Esterilização de Ponta"
    },
    {
      url: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1200&auto=format&fit=crop",
      caption: "Suítes de Tratamento High-End"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className={styles.section} id="infraestrutura">
      <div className="container">
        <div className={styles.header}>
           <span className="tag">Investimento em Você</span>
           <h2 className="title">Um ecossistema de<br/><span>bem-estar e precisão</span></h2>
           <p className={styles.subtext}>Projetamos cada metro quadrado da SmilePro para ser o consultório mais acolhedor e tecnológico que você já visitou.</p>
        </div>

        <div className={styles.carouselContainer}>
          <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {images.map((img, i) => (
              <div key={i} className={styles.slide}>
                 <Image
                   src={img.url}
                   alt={img.caption}
                   width={1200}
                   height={600}
                   className={styles.image}
                   loading="lazy"
                 />
                 <div className={styles.overlay}>
                    <h3 className={styles.caption}>{img.caption}</h3>
                 </div>
              </div>
            ))}
          </div>
          
          <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevSlide}>&larr;</button>
          <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextSlide}>&rarr;</button>

          <div className={styles.dots}>
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`${styles.dot} ${currentIndex === i ? styles.activeDot : ''}`}
                onClick={() => setCurrentIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
