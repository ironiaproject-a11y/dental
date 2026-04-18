import styles from './TrustBar.module.css';

export default function TrustBar() {
  const partners = ['Unimed', 'Amil', 'Bradesco Saúde', 'SulAmérica', 'Porto Seguro', 'Particular'];
  
  return (
    <section className={`${styles.trustBar} trust-bar`}>
      <div className={`container ${styles.container}`}>
        <div className={`${styles.label} trust-label`}>Acesso credenciado aos convênios mais seletos do país:</div>
        <div className={`${styles.logos} trust-logos`}>
          {partners.map(partner => (
            <div key={partner} className={styles.logoItem}>{partner}</div>
          ))}
        </div>
      </div>
    </section>
  );
}