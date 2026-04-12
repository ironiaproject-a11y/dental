import Image from 'next/image';
import styles from './PainFreeTech.module.css';

export default function PainFreeTech() {
  const items = [
    {
      title: 'Anestesia Eletrônica Sem Agulha',
      desc: 'Dispositivo digital que controla o fluxo do anestésico com precisão microscópica, eliminando o desconforto da aplicação tradicional.',
    },
    {
      title: 'Sedação Consciente com Óxido Nitroso',
      desc: 'Um relaxamento profundo, seguro e imediato para pacientes que desejam uma experiência totalmente zen durante o procedimento.',
    },
    {
      title: 'Escaneamento Intraoral 3D',
      desc: 'Chega de moldagens desconfortáveis. Capturamos cada detalhe do seu sorriso em segundos com precisão digital absoluta.',
    },
  ];

  return (
    <section className={styles.section} id="tecnologia">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.content}>
            <span className={styles.tag}>Padrão Ouro em Odontologia</span>
            <h2 className={styles.title}>Tecnologia de ponta para o seu <span>conforto absoluto</span></h2>
            <p className={styles.text}>
              Na SmilePro, acreditamos que a tecnologia deve servir ao bem-estar. Investimos nos equipamentos mais modernos do mundo para transformar sua percepção sobre ir ao dentista.
            </p>
            <ul className={styles.list}>
              {items.map((item, i) => (
                <li key={i}>
                  <span className={styles.checkCircle}>✓</span>
                  <div>
                    <strong>{item.title}</strong>
                    {item.desc}
                  </div>
                </li>
              ))}
            </ul>
            <a href="#contato" className="btn btn-primary">Agendar Experiência Premium</a>
          </div>
          <div className={styles.visual}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/tech-room.png"
                alt="Tecnologia Odontológica Premium"
                width={600}
                height={800}
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.badge}>
                <span className={styles.badgeIcon}>🛡️</span>
                <div className={styles.badgeText}>
                  <strong>100%</strong>
                  <span>Procedimentos Humanizados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
