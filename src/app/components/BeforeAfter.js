import Image from 'next/image';
import styles from './BeforeAfter.module.css';

export default function BeforeAfter() {
  const cases = [
    {
      title: 'Clareamento Dental',
      before: '/images/before-after/whitening-before.png',
      after: '/images/before-after/whitening-after.png',
    },
    {
      title: 'Implante Unitário',
      before: '/images/before-after/implant-before.png',
      after: '/images/before-after/implant-after.png',
    },
    {
      title: 'Ortodontia Invisalign',
      before: '/images/before-after/invisalign-before.png',
      after: '/images/before-after/invisalign-after.png',
    },
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
                <div className={styles.baImagePair}>
                  <div className={styles.baImageWrapper}>
                    <Image
                      src={item.before}
                      alt={`${item.title} — Antes`}
                      width={400}
                      height={300}
                      className={styles.baImage}
                      loading="lazy"
                    />
                    <span className={styles.baLabel}>Antes</span>
                  </div>
                  <div className={styles.baImageWrapper}>
                    <Image
                      src={item.after}
                      alt={`${item.title} — Depois`}
                      width={400}
                      height={300}
                      className={styles.baImage}
                      loading="lazy"
                    />
                    <span className={styles.baLabel}>Depois</span>
                  </div>
                </div>
              </div>
              <div className={styles.baInfo}>
                <strong className={styles.baTitle}>{item.title}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
