import styles from './Marquee.module.css';

export default function Marquee() {
  const content = "SMILEPRO • LUXURY DENTISTRY • PERFECT HARMONY • HIGH-END CARE • THE ART OF THE SMILE • ";
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
