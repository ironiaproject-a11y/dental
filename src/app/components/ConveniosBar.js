import Image from 'next/image';
import styles from './ConveniosBar.module.css';

export default function ConveniosBar() {
  const providers = ['Unimed', 'Amil', 'Bradesco Saúde', 'SulAmérica', 'Porto Seguro', 'Particular'];
  
  return (
    <section className={styles.trustBar}>
      <span className={styles.trustLabel}>Convênios aceitos:</span>
      <div className={styles.trustLogos}>
        {providers.map((provider, index) => (
          <span key={provider} className={styles.logoItem}>
            {provider}{index < providers.length - 1 ? ' | ' : ''}
          </span>
        ))}
      </div>
    </section>
  );
}
