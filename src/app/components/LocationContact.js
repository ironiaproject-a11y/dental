"use client";
import { useState, useEffect } from 'react';
import styles from './LocationContact.module.css';
import { FaWhatsapp } from 'react-icons/fa';
import { FiPhone, FiMapPin, FiClock } from 'react-icons/fi';

export default function LocationContact() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const whatsappUrl = "https://wa.me/5511999999999?text=Olá!%20Gostaria%20de%20agendar%20uma%20avaliação%20gratuita%20na%20SmilePro.";

  return (
    <section className={styles.section} id="contato">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <span className="tag">Dê o Primeiro Passo</span>
          <h2 className="title">Agende sua <span>Avaliação Gratuita</span></h2>
          <p className={styles.subtext}>
            Sem compromisso. Vamos entender o que você precisa e apresentar o melhor tratamento para o seu sorriso.
          </p>
        </div>

        <div className={`${styles.grid} contact-grid`}>
          {/* Left: Info + CTAs */}
          <div className={styles.contactCol}>
            <div className={styles.infoBox}>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}><FiMapPin /></div>
                <div>
                  <h4>Nossa Sede</h4>
                  <p>Av. Paulista, 1000 - Bela Vista<br />São Paulo - SP, 01310-100</p>
                  <span className={styles.highlight}>Valet gratuito para pacientes</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}><FiClock /></div>
                <div>
                  <h4>Horários</h4>
                  <p>Segunda a Sexta: 08:00 – 20:00<br />Sábados: 08:00 – 14:00</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.infoIcon}><FiPhone /></div>
                <div>
                  <h4>Telefone</h4>
                  <p>(11) 9 9999-9999</p>
                </div>
              </div>
            </div>

            <div className={styles.ctaBlock}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnWhatsapp}
              >
                <FaWhatsapp size={22} />
                Agendar pelo WhatsApp
              </a>
              <a href="tel:+5511999999999" className={styles.btnPhone}>
                <FiPhone size={20} />
                Ligar Agora
              </a>
            </div>

            <p className={styles.noCommitment}>
              ✓ Sem compromisso &nbsp;&nbsp; ✓ Resposta em até 5 min &nbsp;&nbsp; ✓ Avaliação gratuita
            </p>
          </div>

          {/* Right: Google Maps */}
          <div className={styles.mapCol}>
            <div className={styles.mapWrapper}>
              {isMounted && (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.147040417534!2d-46.654508623507!3d-23.56317456165279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1712891340157!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização da Clínica SmilePro na Avenida Paulista"
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
