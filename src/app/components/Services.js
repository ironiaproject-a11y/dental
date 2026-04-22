"use client";
import { useState, useEffect, useCallback } from 'react';
import styles from './Services.module.css';

// ╔══════════════════════════════════════════════════════════════╗
// ║  EDITE AQUI — cole o link do YouTube ou Vimeo de cada       ║
// ║  serviço no campo "video". Deixe "" para mostrar            ║
// ║  placeholder "vídeo em breve".                              ║
// ╚══════════════════════════════════════════════════════════════╝
const services = [
  {
    number: "01",
    name: "Clareamento Dental",
    tag: "Estética",
    video: "", // ex: "https://www.youtube.com/embed/ID_DO_VIDEO"
    desc: "Tecnologia a laser e moldeiras personalizadas para um branco natural em poucos dias. Seguro, indolor e com resultado imediato.",
    details: [
      { label: "Duração", value: "1–2 sessões" },
      { label: "Resultado", value: "Até 8 tons mais claro" },
      { label: "Tempo por sessão", value: "60–90 min" }
    ]
  },
  {
    number: "02",
    name: "Facetas de Porcelana",
    tag: "Estética",
    video: "",
    desc: "Lâminas ultrafinas de porcelana para corrigir forma, cor e imperfeições. Resultado natural, duradouro e transformador.",
    details: [
      { label: "Material", value: "Porcelana feldspática" },
      { label: "Durabilidade", value: "10–15 anos" },
      { label: "Sessões", value: "2–3 consultas" }
    ]
  },
  {
    number: "03",
    name: "Implantes Dentários",
    tag: "Reabilitação",
    video: "",
    desc: "Substituição permanente de dentes perdidos com implantes de titânio. Função mastigatória completa e estética natural.",
    details: [
      { label: "Material", value: "Titânio grau cirúrgico" },
      { label: "Osseointegração", value: "3–6 meses" },
      { label: "Durabilidade", value: "Vida toda" }
    ]
  },
  {
    number: "04",
    name: "Ortodontia",
    tag: "Correção",
    video: "",
    desc: "Alinhamento dos dentes com aparelhos convencionais ou alinhadores transparentes. Para um sorriso harmonioso e duradouro.",
    details: [
      { label: "Opções", value: "Metálico / Estético / Invisível" },
      { label: "Duração média", value: "18–30 meses" },
      { label: "Consultas", value: "Mensais" }
    ]
  },
  {
    number: "05",
    name: "Tratamento de Canal",
    tag: "Endodontia",
    video: "",
    desc: "Eliminação da infecção interna preservando o dente. Procedimento moderno, indolor e com alta taxa de sucesso.",
    details: [
      { label: "Sessões", value: "1–3 consultas" },
      { label: "Anestesia", value: "Totalmente indolor" },
      { label: "Recuperação", value: "24–48 horas" }
    ]
  },
  {
    number: "06",
    name: "Limpeza e Prevenção",
    tag: "Prevenção",
    video: "",
    desc: "Remoção de tártaro, polimento e aplicação de flúor. A base de qualquer tratamento de sucesso.",
    details: [
      { label: "Frequência ideal", value: "A cada 6 meses" },
      { label: "Duração", value: "45–60 min" },
      { label: "Inclui", value: "Raio-X anual" }
    ]
  },
  {
    number: "07",
    name: "Prótese Dentária",
    tag: "Reabilitação",
    video: "",
    desc: "Reposição de dentes ausentes com próteses fixas ou removíveis de alta qualidade. Devolvemos função e confiança.",
    details: [
      { label: "Tipos", value: "Fixa / Removível / Total" },
      { label: "Material", value: "Zircônia / Porcelana" },
      { label: "Adaptação", value: "1–2 semanas" }
    ]
  },
  {
    number: "08",
    name: "Extração e Cirurgia",
    tag: "Cirurgia",
    video: "",
    desc: "Extrações simples e cirúrgicas com máxima precisão e conforto. Pós-operatório acompanhado de perto.",
    details: [
      { label: "Anestesia", value: "Local / Sedação" },
      { label: "Recuperação", value: "3–7 dias" },
      { label: "Retorno", value: "7 dias após" }
    ]
  }
];

function getEmbedUrl(url) {
  if (!url) return null;
  // YouTube
  const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;
  // Vimeo
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}?autoplay=1`;
  // Already an embed URL
  return url;
}

export default function Services() {
  const [activeService, setActiveService] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const openPanel = (service) => {
    setActiveService(service);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closePanel = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      setActiveService(null);
    }, 400);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closePanel();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closePanel]);

  return (
    <section className={styles.servicesSection} id="servicos">
      <div className={styles.container}>

        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.sectionTag}>O que oferecemos</div>
            <h2 className={styles.sectionTitle}>Tratamentos para cada <em>sorriso único</em></h2>
          </div>
          <p className={styles.sectionDesc}>Do simples ao complexo, cuidamos do seu sorriso com tecnologia de última geração e atenção humanizada.</p>
        </div>

        <div className={styles.servicesList}>
          {services.map((s, idx) => (
            <button 
              key={idx}
              className={`${styles.serviceItem} ${activeService?.number === s.number ? styles.serviceItemActive : ''}`}
              onClick={() => openPanel(s)}
              aria-expanded={activeService?.number === s.number && isOpen}
            >
              <span className={styles.serviceNumber}>{s.number}</span>
              <span className={styles.serviceName}>{s.name}</span>
              <div className={styles.serviceArrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10"/>
                </svg>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* OVERLAY */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.overlayShow : ''}`} 
        onClick={closePanel}
      ></div>

      {/* PANEL */}
      <div 
        className={`${styles.servicePanel} ${isOpen ? styles.servicePanelOpen : ''}`} 
        role="dialog" 
        aria-modal="true"
      >
        <div className={styles.panelVideoWrap}>
          {isOpen && activeService && (
            getEmbedUrl(activeService.video) ? (
              <iframe 
                src={getEmbedUrl(activeService.video)} 
                allow="autoplay; fullscreen" 
                allowFullScreen
                title={activeService.name}
              ></iframe>
            ) : (
              <div className={styles.videoPlaceholder}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10"/>
                  <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
                </svg>
                <span>Vídeo em breve</span>
              </div>
            )
          )}
        </div>

        <div className={styles.panelContent}>
          <div className={styles.panelTop}>
            <span className={styles.panelTag}>{activeService?.tag}</span>
            <button className={styles.panelClose} onClick={closePanel} aria-label="Fechar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <h3 className={styles.panelTitle}>{activeService?.name}</h3>
          <p className={styles.panelDesc}>{activeService?.desc}</p>
          
          <div className={styles.panelDetails}>
            {activeService?.details.map((d, i) => (
              <div key={i} className={styles.panelDetailRow}>
                <span className={styles.panelDetailLabel}>{d.label}</span>
                <span className={styles.panelDetailValue}>{d.value}</span>
              </div>
            ))}
          </div>

          <a href="#contato" className={styles.panelCta} onClick={closePanel}>
            Agendar avaliação
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7v10"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}