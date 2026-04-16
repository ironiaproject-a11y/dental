import Image from 'next/image';
import styles from './BeforeAfter.module.css';

export default function BeforeAfter() {
  const cases = [
    {
      title: 'Clareamento Dental Avançado',
      result: 'Dente Branco Uniforme · 1 sessão',
      quote: '"A mudança foi incrível! Recuperei minha segurança para sorrir e falar em público. O resultado ficou extremamente natural." — Carlos M.',
      image: '/tooth_split.png'
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
                <Image 
                  src={item.image} 
                  alt={`${item.title} Antes e Depois`} 
                  width={800} 
                  height={600} 
                  className={styles.baImage} 
                  loading="lazy" 
                />
                <span className={styles.baLabelSplit}>Antes / Depois</span>
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
