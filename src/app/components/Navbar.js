"use client";
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { FiPhone } from 'react-icons/fi';
import { HiMenu, HiX } from 'react-icons/hi';

const TOPBAR_HEIGHT = 36; // px — altura exata do TopBar (keep in sync)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > TOPBAR_HEIGHT);
      
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início',    href: '/' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Planos',   href: '#planos' },
    { label: 'Equipe',   href: '#equipe' },
    { label: 'Contato',  href: '#contato' },
  ];

  return (
    <nav className={`navbar ${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.container}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C7 2 6 6 6 8c0 4 6 5 6 13 0-8 6-9 6-13 0-2-1-6-6-6z"/>
            <path d="M12 22a9.97 9.97 0 0 1-5-1.5"/>
            <path d="M12 22a9.97 9.97 0 0 0 5-1.5"/>
          </svg>
          <span>SmilePro</span>
        </div>

        {/* Desktop Links */}
        <div className={`${styles.desktopLinks} nav-links`}>
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className={styles.desktopRight}>
          <div className={`${styles.phoneWrapper} nav-phone`}>
            <FiPhone className={styles.phoneIcon} />
            <span className={styles.phoneText}>(11) 9 9999-9999</span>
          </div>
          <div className={styles.divider}></div>
          <button className={`btn btn-primary ${styles.navBtn} nav-cta`}>Agendar Consulta</button>
        </div>

        {/* Hamburger Menu Icon */}
        <div className={styles.mobileMenuToggle} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileDrawerOpen : ''}`}>
        <div className={styles.mobileLinks}>
          {navLinks.map((item) => (
            <a key={item.label} href={item.href} className={styles.mobileLink} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <div className={styles.mobileActions}>
            <div className={styles.phoneWrapperMobile}>
              <FiPhone className={styles.phoneIcon} />
              <span className={styles.phoneText}>(11) 9 9999-9999</span>
            </div>
            <button className="btn btn-primary w-full mt-4">Agendar Consulta</button>
          </div>
        </div>
      </div>

      {/* Reading Progress Bar */}
      <div 
        className={styles.readingProgressBar}
        style={{ 
          transform: `scaleX(${scrollProgress})`, 
          transformOrigin: 'left',
          height: '2px',
          background: 'var(--color-primary-gradient)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
          transition: 'transform 0.1s linear'
        }}
      ></div>
    </nav>
  );
}
