"use client";
import { useState } from 'react';
import styles from './Faq.module.css';
import { FiChevronDown } from 'react-icons/fi';

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      q: 'A primeira avaliação tem custo?',
      a: 'Não. Nossa primeira consulta é uma experiência de diagnóstico completa, onde utilizamos escaneamento e câmeras intraorais para que você entenda exatamente seu caso, sem custo ou compromisso.'
    },
    {
      q: 'Como funciona o parcelamento?',
      a: 'Oferecemos condições exclusivas em até 18x no cartão ou através de nossa assinatura SmilePro Plus, que garante descontos agressivos e parcelamento facilitado em todos os tratamentos.'
    },
    {
      q: 'Quanto tempo dura um tratamento completo?',
      a: 'Depende da complexidade. Um clareamento leva apenas 1 sessão. Um implante, cerca de 3 meses. Caso opte pelo Invisalign, o tempo médio é 30% menor que aparelhos convencionais.'
    },
    {
      q: 'Quais convênios a clínica aceita?',
      a: 'Operamos com os principais planos nacionais (Amil, Bradesco, SulAmérica, Porto Seguro, Unimed) na modalidade de atendimento direto ou reembolso facilitado.'
    },
    {
      q: 'Os procedimentos são realmente sem dor?',
      a: 'Sim. Utilizamos anestesia eletrônica computadorizada e sedação consciente com óxido nitroso, garantindo que você não sinta absolutamente nada durante o procedimento.'
    },
    {
      q: 'Como faço para agendar agora?',
      a: 'A forma mais rápida é através do nosso WhatsApp oficial ou preenchendo o formulário de contato. Nosso time de concierge responde em menos de 5 minutos.'
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq">
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>Claridade Total</span>
          <h2 className={styles.title}>
            Suas dúvidas <span>respondidas</span>
          </h2>
          <p className={styles.subtext}>
            Tudo o que você precisa saber antes de iniciar sua jornada conosco.
          </p>
        </div>

        <div className={`${styles.grid} faq-grid`}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.item} ${activeIndex === index ? styles.active : ''} faq-item`}
              onClick={() => toggleAccordion(index)}
            >
              <div className={styles.questionRow}>
                <h3 className={`${styles.question} faq-q`}>{faq.q}</h3>
                <span className={styles.icon}><FiChevronDown /></span>
              </div>
              <div className={styles.answerWrapper}>
                <div className={`${styles.answer} faq-answer`}>
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
