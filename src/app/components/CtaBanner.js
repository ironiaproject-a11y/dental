import Image from 'next/image';
import styles from './CtaBanner.module.css';

export default function CtaBanner() {
  return (
    <section className={`${styles.banner} cta-section`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <div className={styles.tag}>Exclusivo para Novos Pacientes</div>
          <h2 className={`${styles.title} cta-title`}>Seu novo sorriso começa com uma <span>consultoria gratuita</span></h2>
          <p className={styles.text}>
            Descubra o potencial do seu sorriso com nossa equipe de especialistas. Tecnologia 3D, diagnóstico preciso e zero compromisso.
          </p>
          <div className={`${styles.actions} cta-buttons`}>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className={styles.btnWhite}>
              Agendar via WhatsApp
            </a>
            <a href="#contato" className={styles.btnOutline}>
              Ver Localização →
            </a>
          </div>
        </div>
        
        <div className={`${styles.imageRight} cta-image`}>
          <div className={styles.circleBg}></div>
          <Image 
            src="/images/cta-person.png" 
            alt="Resultado de Sorriso SmilePro" 
            width={450} 
            height={600} 
            className={styles.image} 
            loading="lazy" 
          />
          <div className={styles.floatingCard}>
            <div className={styles.quoteIcon}>⭐</div>
            <p className={styles.quoteText}>"Experiência incrível. Superou todas as minhas expectativas!"</p>
            <div className={styles.quoteAuthor}>— Beatriz S., São Paulo</div>
          </div>
        </div>
      </div>
    </section>
  );
}