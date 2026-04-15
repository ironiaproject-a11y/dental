"use client";
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import styles from './DiscountPlan.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DiscountPlan() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.anim-left', {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
      
      gsap.from('.anim-right', {
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const avatars = [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=80&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop'
  ];

  return (
    <section className={styles.section} id="planos" ref={sectionRef}>
      <div className={`container ${styles.container}`}>
        <div className={`${styles.leftCol} anim-left`}>
          <span className="tag">Assinatura SmilePro Plus</span>
          <h2 className={styles.plansTitle}>A democratização do <span>sorriso premium</span></h2>
          <div className={styles.priceTag}>A partir de R$ 89/mês</div>
          <p className={styles.plansText}>
            Criamos um modelo de assinatura exclusivo para quem não abre mão da excelência. Economia real em todos os procedimentos, sem carência e com atendimento prioritário.
          </p>
          
          <div className={styles.socialProof}>
            <div className={styles.avatars}>
              {avatars.map((av, idx) => (
                <div key={idx} className={styles.avatar}>
                  <Image 
                    src={av} 
                    alt={`Avatar ${idx}`} 
                    width={40} 
                    height={40} 
                    className={styles.avatarImg}
                  />
                </div>
              ))}
            </div>
            <div className={styles.arrow}>→</div>
            <div className={styles.plansSocialText}>Junte-se a +500 famílias</div>
          </div>
          
          <button className="btn btn-primary">Conhecer Benefícios Exclusivos</button>
        </div>

        <div className={`${styles.rightCol} plans-section`}>
          <div className={`${styles.cardBlue} anim-right`}>
            <div className={styles.percentTextWhite}>80%</div>
            <h3 className={styles.cardTitleWhite}>Prevenção Completa</h3>
            <p className={styles.cardDescWhite}>
              Consultas, limpezas semestrais e exames preventivos com 80% de desconto para assinantes.
            </p>
          </div>
          
          <div className={`${styles.cardOutlined} anim-right`}>
            <div className={styles.percentTextBlue}>40%</div>
            <h3 className={styles.cardTitleDark}>Procedimentos Estéticos</h3>
            <p className={styles.cardDescDark}>
              Lentes de contato, Invisalign e Implantes com 40% de desconto direto, sem burocracia.
            </p>
          </div>

          <div className={`${styles.cardPrioritario} anim-right`}>
            <div className={styles.iconCircle}>⚡</div>
            <div>
              <h3 className={styles.cardTitleWhiteCompact}>Atendimento Prioritário</h3>
              <p className={styles.cardDescWhite}>Acesso à nossa agenda VIP com espera zero e concierge 24h.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}