const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'components');

const files = {
  'TrustBar.js': `
import styles from './TrustBar.module.css';

export default function TrustBar() {
  const partners = ['Unimed', 'Amil', 'Bradesco Saúde', 'SulAmérica', 'Porto Seguro', 'Particular'];
  
  return (
    <section className={styles.trustBar}>
      <div className={\`container \${styles.container}\`}>
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
  `,
  'TrustBar.module.css': `
.trustBar {
  background-color: var(--color-bg-alt);
  padding: 28px 0;
  border-top: 1px solid #E5E7EB;
  border-bottom: 1px solid #E5E7EB;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    justify-content: space-between;
  }
}

.label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  width: 100%;
}

@media (min-width: 1024px) {
  .logos {
    justify-content: space-around;
    flex: 1;
    margin-left: 40px;
  }
}

.logoItem {
  font-size: 16px;
  font-weight: 800;
  color: var(--color-text-secondary);
  opacity: 0.5;
  transition: opacity 0.3s ease, color 0.3s ease;
  cursor: default;
}

.logoItem:hover {
  opacity: 1;
  color: var(--color-primary);
}
  `,
  'Services.js': `
import styles from './Services.module.css';

export default function Services() {
  const services = [
    { id: 1, icon: '🦷', title: 'Ortodontia', desc: 'Aparelhos fixos, móveis e alinhadores transparentes' },
    { id: 2, icon: '🔩', title: 'Implante Dental', desc: 'Substitua dentes perdidos com naturalidade' },
    { id: 3, icon: '✨', title: 'Clareamento', desc: 'Até 8 tons mais claro em uma única sessão' },
    { id: 4, icon: '😁', title: 'Invisalign', desc: 'Alinhamento invisível e confortável' },
    { id: 5, icon: '💉', title: 'Harmonização Facial', desc: 'Resultados naturais e equilibrados' },
    { id: 6, icon: '💎', title: 'Dentística Estética', desc: 'Lentes de contato, facetas e restaurações' },
  ];

  return (
    <section className="section" id="servicos">
      <div className={\`container \${styles.container}\`}>
        <div className={styles.header}>
          <span className="tag">O Que Oferecemos</span>
          <h2 className="title">Tratamentos para cada <span>sorriso único</span></h2>
          <p className={styles.subtext}>
            Oferecemos uma gama completa de tratamentos odontológicos com especialistas 
            altamente qualificados e tecnologia de ponta.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map(service => (
            <div key={service.id} className={styles.card}>
              <div className={styles.iconWrapper}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <a href="#" className={styles.link}>Saiba mais →</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
  `,
  'Services.module.css': `
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 60px;
  max-width: 520px;
}

.subtext {
  color: var(--color-text-secondary);
  font-size: 16px;
  margin-top: 16px;
  line-height: 1.6;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--card-gap);
  width: 100%;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background-color: var(--color-bg-main);
  border-radius: var(--radius-card);
  padding: 32px;
  border: 1px solid #F3F4F6;
  box-shadow: var(--shadow-card);
  transition: all 0.25s ease;
  position: relative;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover);
  border-color: var(--color-primary);
}

.iconWrapper {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgba(37, 99, 235, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--color-primary);
  margin-bottom: 24px;
}

.cardTitle {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
}

.cardDesc {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: 24px;
  min-height: 42px;
}

.link {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  display: inline-block;
}

.card:hover .link {
  opacity: 1;
  transform: translateY(0);
}
  `,
  'DiscountPlan.js': `
import styles from './DiscountPlan.module.css';

export default function DiscountPlan() {
  return (
    <section className={styles.section} id="planos">
      <div className={\`container \${styles.container}\`}>
        <div className={styles.leftCol}>
          <span className="tag">Plano de Saúde Odontológica</span>
          <h2 className="title">Sua família merece o <span>melhor cuidado</span></h2>
          <p className={styles.text}>
            Economize de 30% a 80% em todos os procedimentos. 
            Sem carência, sem burocracia.
          </p>
          
          <div className={styles.socialProof}>
            <div className={styles.avatars}>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.socialText}>Junte-se a +500 famílias</div>
          </div>
          
          <button className="btn btn-primary">Conhecer o Plano Família</button>
        </div>

        <div className={styles.rightCol}>
          <div className={styles.cardBlue}>
            <div className={styles.percentTextWhite}>80%</div>
            <h3 className={styles.cardTitleWhite}>Economia em consultas</h3>
            <p className={styles.cardDescWhite}>
              Exames, limpeza e raio-x com até 80% de desconto para membros
            </p>
          </div>
          
          <div className={styles.cardOutlined}>
            <div className={styles.percentTextBlue}>40%</div>
            <h3 className={styles.cardTitleDark}>Em todos os procedimentos</h3>
            <p className={styles.cardDescDark}>
              Implantes, ortodontia, clareamento e harmonização com 40% off
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
  `,
  'DiscountPlan.module.css': `
.section {
  padding: 120px 0;
  background-color: var(--color-bg-accent);
}

.container {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

@media (min-width: 1024px) {
  .container {
    flex-direction: row;
    align-items: center;
    gap: 80px;
  }
}

.leftCol, .rightCol {
  flex: 1;
}

.text {
  font-size: 18px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 24px 0 40px;
}

.socialProof {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
}

.avatars {
  display: flex;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #E5E7EB;
  border: 3px solid var(--color-bg-accent);
  margin-left: -12px;
}

.avatar:first-child {
  margin-left: 0;
}

.arrow {
  color: var(--color-text-light);
  font-size: 20px;
}

.socialText {
  font-weight: 600;
  color: var(--color-text-primary);
}

.rightCol {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cardBlue, .cardOutlined {
  border-radius: var(--radius-card);
  padding: 36px;
  box-shadow: var(--shadow-card);
}

.cardBlue {
  background-color: var(--color-primary);
  color: #FFFFFF;
}

.cardOutlined {
  background-color: #FFFFFF;
  border: 1px solid var(--color-primary);
}

.percentTextWhite {
  font-family: var(--font-accent);
  font-size: 96px;
  font-weight: 800;
  line-height: 1;
  color: #FFFFFF;
  margin-bottom: 8px;
}

.percentTextBlue {
  font-family: var(--font-accent);
  font-size: 96px;
  font-weight: 800;
  line-height: 1;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.cardTitleWhite {
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
  margin-bottom: 12px;
}

.cardTitleDark {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 12px;
}

.cardDescWhite {
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  line-height: 1.5;
}

.cardDescDark {
  color: var(--color-text-secondary);
  font-size: 16px;
  line-height: 1.5;
}
  `
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), content.trim());
}
