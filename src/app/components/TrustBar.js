import styles from './TrustBar.module.css';

export default function TrustBar() {
  const partners = ['Unimed', 'Amil', 'Bradesco Saúde', 'SulAmérica', 'Porto Seguro', 'Particular'];
  
  return (
    <section className={styles.trustBar}>
      <div className={`container ${styles.container}`}>
        <div className={styles.label}>Convênios e parceiros aceitos:</div>
        <div className={styles.logos}>
          {partners.map(partner => (
            <div key={partner} className={styles.logoItem}>{partner}</div>
          ))}
        </div>
      </div>
    </section>
  );
}