"use client";
import { useState, useEffect } from 'react';
import styles from './LocationContact.module.css';

export default function LocationContact() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Solicitação recebida com sucesso! Um de nossos consultores SmilePro entrará em contato em breve.");
  };

  return (
    <section className={styles.section} id="contato">
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
           <span className="tag">Dê o Primeiro Passo</span>
           <h2 className="title">Agende sua <span>Avaliação Premium</span></h2>
           <p className={styles.subtext}>Seu novo sorriso começa com uma conversa. Deixe seus dados abaixo ou visite nossa sede na Avenida Paulista.</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.formCol}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <h3 className={styles.formTitle}>Consultoria Personalizada</h3>
              
              <div className={styles.inputGroup}>
                <label htmlFor="name">Seu Nome</label>
                <input type="text" id="name" placeholder="Como podemos chamar você?" required />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="phone">WhatsApp para Contato</label>
                <input type="tel" id="phone" placeholder="(11) 90000-0000" required />
              </div>
              
              <div className={styles.inputGroup}>
                <label htmlFor="service">Serviço Desejado</label>
                <select id="service" required defaultValue="">
                  <option value="" disabled>O que você busca?</option>
                  <option value="implante">Implantes Dentais</option>
                  <option value="invisalign">Invisalign (Ortodontia Invisível)</option>
                  <option value="clareamento">Clareamento à Laser</option>
                  <option value="harmonizacao">Harmonização Facial</option>
                  <option value="outro">Check-up Preventivo</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="time">Melhor Período</label>
                <select id="time" required defaultValue="manha">
                  <option value="manha">Manhã (08h - 12h)</option>
                  <option value="tarde">Tarde (13h - 18h)</option>
                  <option value="noite">Noite (18h - 20h)</option>
                </select>
              </div>

              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                Solicitar Contato Exclusivo
              </button>
            </form>
          </div>

          <div className={styles.mapCol}>
            <div className={styles.infoBox}>
              <div className={styles.infoItem}>
                <h4>📍 Nossa Sede</h4>
                <p>Av. Paulista, 1000 - Bela Vista<br/>São Paulo - SP, 01310-100</p>
                <p className={styles.highlight}>Vallet gratuito no local para pacientes.</p>
              </div>
              <div className={styles.infoItem}>
                <h4>🕒 Horários</h4>
                <p>Segunda a Sexta: 08:00 – 20:00<br/>Sábados: 08:00 – 14:00</p>
              </div>
            </div>
            
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
