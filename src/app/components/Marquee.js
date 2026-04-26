import styles from './Marquee.module.css';

export default function Marquee() {
  const content = "SMILEPRO • ODONTOLOGIA DE LUXO • HARMONIA PERFEITA • CUIDADO DE ALTO PADRÃO • A ARTE DO SORRISO • ";
  const repeatedContent = content.repeat(4);

  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.marqueeTrack}>
        <span className={styles.marqueeItem}>{repeatedContent}</span>
        <span className={styles.marqueeItem}>{repeatedContent}</span>
      </div>
    </div>
  );
}
