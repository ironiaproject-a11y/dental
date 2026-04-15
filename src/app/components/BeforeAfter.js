import Image from 'next/image';
import styles from './BeforeAfter.module.css';

export default function BeforeAfter() {
  const cases = [
    {
      title: 'Clareamento Dental',
      result: '8 tons mais claro · 1 sessão',
      quote: '"O resultado superou minhas expectativas, dentes brancos e sem sensibilidade!" — Patrícia R.',
      before: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop',
      after:  'https://images.unsplash.com/photo-1588776814546-1ffbb68b82de?q=80&w=400&auto=format&fit=crop'
    },
    {
      title: 'Implante Unitário',
      result: 'Reabilitação estética · 3 meses',
      quote: '"Recuperei minha segurança para sorrir e falar em público." — Carlos M.',
      before: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=400&auto=format&fit=crop',
      after:  'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=400&auto=format&fit=crop'
    },
    {
      title: 'Ortodontia Invisalign',
      result: 'Alinhamento preciso · 14 meses',
      quote: '"Tratamento discreto e resultado impecável. Valeu cada centavo." — Juliana S.',
      before: 'https://images.unsplash.com/photo-1607817143706-1dfc05b98da8?q=80&w=400&auto=format&fit=crop',
      after:  'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=400&auto=format&fit=crop'
    }
  ];

  return (
    <section className={styles.section} id="resultados">
      <div className="container">
        <div className={styles.header}>
          <span className="tagInverse">Resultados Reais</span>
          <h2 className="titleInverse">
            Transformações que <span>falam por si</span>
          </h2>
          <p className={styles.subtext}>
            Documentação fotográfica real de pacientes SmilePro. Estética, função e saúde em harmonia.
          </p>
        </div>

        <div className={`${styles.grid} ba-grid`}>
          {cases.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.baImages}>
                <div className={styles.baBefore}>
                  <Image 
                    src={item.before} 
                    alt={`${item.title} Antes`} 
                    width={400} 
                    height={300} 
                    className={styles.baImage} 
                    loading="lazy" 
                  />
                  <span className={styles.baLabel}>Antes</span>
                </div>
                <div className={styles.baDivider}>→</div>
                <div className={styles.baAfter}>
                  <Image 
                    src={item.after} 
                    alt={`${item.title} Depois`} 
                    width={400} 
                    height={300} 
                    className={styles.baImage} 
                    loading="lazy" 
                  />
                  <span className={`${styles.baLabel} ${styles.after}`}>Depois</span>
                </div>
              </div>
              <div className={styles.baInfo}>
                <strong className={styles.baTitle}>{item.title}</strong>
                <span className={styles.baResult}>{item.result}</span>
                <p className={styles.baQuote}>{item.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
