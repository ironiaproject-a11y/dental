const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app', 'components');

const files = {
  'Team.js': `
import styles from './Team.module.css';
import { FiInstagram, FiFacebook } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export default function Team() {
  const team = [
    { name: 'Dr. Rafael Costa', cro: 'CRO-SP 12345', role: 'Implantodontista' },
    { name: 'Dra. Camila Ferreira', cro: 'CRO-SP 23456', role: 'Ortodontista' },
    { name: 'Dr. Bruno Mendes', cro: 'CRO-SP 34567', role: 'Harmonização Facial' },
    { name: 'Dra. Ana Lima', cro: 'CRO-SP 45678', role: 'Dentística Estética' },
  ];

  return (
    <section className="section" style={{ backgroundColor: 'var(--color-bg-accent)' }} id="equipe">
      <div className="container">
        <div className={styles.header}>
          <span className="tag">Nossa Equipe</span>
          <h2 className="title">Especialistas dedicados<br/>ao seu <span>sorriso</span></h2>
        </div>

        <div className={styles.grid}>
          {team.map((doc, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.photo}></div>
              <div className={styles.content}>
                <h3 className={styles.name}>{doc.name}</h3>
                <div className={styles.role}>{doc.role} | {doc.cro}</div>
                <div className={styles.socials}>
                  <FiInstagram className={styles.icon} />
                  <FiFacebook className={styles.icon} />
                  <FaWhatsapp className={styles.icon} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
  `,
  'Team.module.css': `
.header {
  margin-bottom: 60px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--card-gap);
}

@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}

.card {
  background-color: var(--color-bg-main);
  border-radius: var(--radius-card);
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform 0.25s ease;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover);
}

.photo {
  width: 100%;
  height: 260px;
  background-color: #E5E7EB;
}

.content {
  padding: 24px;
}

.name {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 4px;
}

.role {
  font-size: 14px;
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: 16px;
}

.socials {
  display: flex;
  gap: 12px;
}

.icon {
  color: var(--color-text-secondary);
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.icon:hover {
  color: var(--color-primary);
}
  `,
  'Testimonials.js': `
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const testimonials = [
    { quote: "Fiz meu implante aqui e foi a melhor decisão da minha vida. Equipe incrível, resultado perfeito!", name: "Juliana M.", location: "Moema, SP" },
    { quote: "Usava aparelho há anos sem resultado. Com o Invisalign da SmilePro, em 8 meses meu sorriso mudou completamente.", name: "Carlos R.", location: "Campinas, SP" },
    { quote: "Plano família cobre toda minha família por um valor justo. Atendimento top, sempre pontual.", name: "Fernanda T.", location: "Santo André, SP" }
  ];

  return (
    <section className="section" id="depoimentos">
      <div className="container">
        <div className={styles.header}>
          <span className="tag">Depoimentos</span>
          <h2 className="title">Pacientes que transformaram<br/> <span>o sorriso</span></h2>
        </div>

        <div className={styles.grid}>
          {testimonials.map((test, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.quote}>"{test.quote}"</p>
              <div className={styles.authorRow}>
                <div className={styles.avatar}></div>
                <div>
                  <div className={styles.name}>{test.name}</div>
                  <div className={styles.location}>{test.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
  `,
  'Testimonials.module.css': `
.header {
  text-align: center;
  margin-bottom: 60px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--card-gap);
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}

.card {
  background-color: var(--color-bg-alt);
  border-radius: var(--radius-card);
  padding: 32px;
}

.stars {
  font-size: 20px;
  margin-bottom: 20px;
}

.quote {
  font-size: 16px;
  font-style: italic;
  color: var(--color-text-primary);
  line-height: 1.7;
  margin-bottom: 24px;
}

.authorRow {
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #E5E7EB;
}

.name {
  font-weight: 700;
  color: var(--color-text-primary);
}

.location {
  font-size: 12px;
  color: var(--color-text-secondary);
}
  `,
  'CtaBanner.js': `
import styles from './CtaBanner.module.css';

export default function CtaBanner() {
  return (
    <section className={styles.banner}>
      <div className={\`container \${styles.container}\`}>
        <div className={styles.content}>
          <div className={styles.tag}>Oferta por tempo limitado</div>
          <h2 className={styles.title}>Avaliação gratuita<br/>para novos pacientes!</h2>
          <p className={styles.text}>
            Sem compromisso. Venha conhecer nossa clínica e descobrir o melhor 
            tratamento para o seu sorriso.
          </p>
          <div className={styles.actions}>
            <button className={\`btn \${styles.btnWhite}\`}>Agendar pelo WhatsApp</button>
            <button className={\`btn \${styles.btnOutline}\`}>Ligar Agora →</button>
          </div>
        </div>
      </div>
      <div className={styles.imageRight}>
        <div className={styles.circleBg}></div>
        <div className={styles.imagePlaceholder}></div>
      </div>
    </section>
  );
}
  `,
  'CtaBanner.module.css': `
.banner {
  background-color: var(--color-primary);
  min-height: 480px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
  z-index: 2;
  position: relative;
}

.content {
  padding: 80px 0;
  max-width: 500px;
}

@media (min-width: 1024px) {
  .content { padding: 80px 0; }
}

.tag {
  display: inline-block;
  background-color: #FFFFFF;
  color: var(--color-primary);
  padding: 8px 16px;
  border-radius: var(--radius-badge);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 24px;
}

.title {
  color: #FFFFFF;
  font-size: 52px;
  margin-bottom: 20px;
}

.text {
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
  margin-bottom: 40px;
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.btnWhite {
  background-color: #FFFFFF;
  color: var(--color-primary);
}

.btnWhite:hover {
  background-color: #F8F9FF;
}

.btnOutline {
  background-color: transparent;
  color: #FFFFFF;
  border: 1px solid #FFFFFF;
}

.btnOutline:hover {
  background-color: rgba(255,255,255,0.1);
}

.imageRight {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 1;
  display: none;
}

@media (min-width: 1024px) {
  .imageRight { display: block; }
}

.circleBg {
  position: absolute;
  bottom: -20%;
  right: 10%;
  width: 600px;
  height: 600px;
  border-radius: 50%;
  border: 40px solid rgba(255,255,255,0.1);
}

.imagePlaceholder {
  position: absolute;
  bottom: 0;
  right: 10%;
  width: 400px;
  height: 80%;
  background-color: rgba(255,255,255,0.2);
  border-top-left-radius: 200px;
  border-top-right-radius: 200px;
}
  `,
  'Footer.js': `
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.logo}>SmilePro</div>
            <p className={styles.desc}>Transformando sorrisos e vidas em São Paulo desde 2009.</p>
          </div>
          <div>
            <h4 className={styles.title}>Contato</h4>
            <ul className={styles.list}>
              <li>📞 (11) 9 9999-9999</li>
              <li>✉ contato@smilepro.com.br</li>
              <li><a href="#" className={styles.linkVerde}>💬 WhatsApp</a></li>
            </ul>
          </div>
          <div>
            <h4 className={styles.title}>Clínica</h4>
            <ul className={styles.list}>
              <li>Sobre Nós</li>
              <li>Serviços</li>
              <li>Planos</li>
              <li>Blog</li>
              <li>Trabalhe Conosco</li>
            </ul>
          </div>
          <div>
            <h4 className={styles.title}>Funcionamento</h4>
            <ul className={styles.list}>
              <li>🕐 Segunda a Sábado: 8h – 20h</li>
              <li>📍 Av. Paulista, 1000 — São Paulo, SP</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.bottom}>
          <p>© 2025 SmilePro Odontologia. Todos os direitos reservados.</p>
          <p>Política de Privacidade · Termos de Uso</p>
        </div>
      </div>
    </footer>
  );
}
  `,
  'Footer.module.css': `
.footer {
  background-color: var(--color-text-primary);
  padding: 80px 0 40px;
  color: #FFFFFF;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(4, 1fr); }
}

.logo {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 16px;
}

.desc {
  color: var(--color-text-secondary);
  font-size: 14px;
  line-height: 1.6;
}

.title {
  font-size: 16px;
  margin-bottom: 20px;
  font-weight: 700;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list li {
  color: var(--color-text-light);
  font-size: 14px;
}

.linkVerde {
  color: var(--color-success);
}

.divider {
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 40px 0;
}

.bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: space-between;
  font-size: 13px;
  color: var(--color-text-secondary);
}

@media (min-width: 768px) {
  .bottom { flex-direction: row; }
}
  `,
  'WhatsAppButton.js': `
import styles from './WhatsAppButton.module.css';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a href="#" className={styles.btn}>
      <FaWhatsapp size={28} />
    </a>
  );
}
  `,
  'WhatsAppButton.module.css': `
.btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  background-color: #25D366;
  color: #FFF;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  z-index: 100;
  transition: transform 0.3s ease;
  animation: pulseBtn 2s infinite;
}

.btn:hover {
  transform: scale(1.1);
}

@keyframes pulseBtn {
  0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
  70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}
  `
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(dir, name), content.trim());
}
