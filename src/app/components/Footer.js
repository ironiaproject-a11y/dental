import styles from './Footer.module.css';
import { FiInstagram, FiFacebook, FiYoutube, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={`${styles.grid} footer-grid`}>
          <div className={styles.brandCol}>
            <div className={styles.logo}>Smile<span>Pro</span></div>
            <p className={styles.desc}>
              Transformando sorrisos com tecnologia de ponta e cuidado humanizado. Referência em odontologia digital e estética em São Paulo.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialIcon}><FiInstagram /></a>
              <a href="#" className={styles.socialIcon}><FiFacebook /></a>
              <a href="#" className={styles.socialIcon}><FiYoutube /></a>
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.title}>Menu</h4>
            <ul className={styles.list}>
              <li><a href="#tecnologia" className={styles.link}>Tecnologia</a></li>
              <li><a href="#servicos" className={styles.link}>Tratamentos</a></li>
              <li><a href="#planos" className={styles.link}>Assinatura Plus</a></li>
              <li><a href="#equipe" className={styles.link}>Nossa Equipe</a></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.title}>Suporte</h4>
            <ul className={styles.list}>
              <li><a href="#faq" className={styles.link}>Dúvidas Frequentes</a></li>
              <li><a href="#contato" className={styles.link}>Agendamento</a></li>
              <li><a href="#" className={styles.link}>Blog do Sorriso</a></li>
              <li><a href="#" className={styles.link}>Trabalhe Conosco</a></li>
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.title}>Onde Estamos</h4>
            <ul className={styles.list}>
              <li><FiMapPin style={{ marginRight: '8px' }} /> Av. Paulista, 1000 — SP</li>
              <li><FiPhone style={{ marginRight: '8px' }} /> (11) 9 9999-9999</li>
              <li><FiMail style={{ marginRight: '8px' }} /> contato@smilepro.com.br</li>
            </ul>
          </div>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.bottom}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '14px' }}>© 2026 SmilePro Odontologia Premium. Todos os direitos reservados.</p>
          <div className={styles.bottomLinks}>
            <span className={styles.bottomLink}>Privacidade</span>
            <span className={styles.bottomLink}>Termos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}