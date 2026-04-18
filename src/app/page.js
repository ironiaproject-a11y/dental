import dynamic from 'next/dynamic';

// Above-the-fold: load immediately (SSR)
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TopBar from './components/TopBar';

// Below-the-fold: lazy load to reduce initial JS bundle
const TrustBar             = dynamic(() => import('./components/TrustBar'));
const PainFreeTech         = dynamic(() => import('./components/PainFreeTech'));
const Services             = dynamic(() => import('./components/Services'));
const BeforeAfter          = dynamic(() => import('./components/BeforeAfter'));
const DiscountPlan         = dynamic(() => import('./components/DiscountPlan'));
const Team                 = dynamic(() => import('./components/Team'));
const ClinicInfrastructure = dynamic(() => import('./components/ClinicInfrastructure'));
const Testimonials         = dynamic(() => import('./components/Testimonials'));
const Faq                  = dynamic(() => import('./components/Faq'));
const LocationContact      = dynamic(() => import('./components/LocationContact'));
const CtaBanner            = dynamic(() => import('./components/CtaBanner'));
const Footer               = dynamic(() => import('./components/Footer'));
const WhatsAppFloat        = dynamic(() => import('./components/WhatsAppFloat'));
const Marquee              = dynamic(() => import('./components/Marquee'));

import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <TopBar />
      <Navbar />
      <Hero />
      <TrustBar />
      <PainFreeTech />
      <Services />
      <BeforeAfter />
      <Marquee />
      <DiscountPlan />
      <ClinicInfrastructure />
      <Team />
      <Testimonials />
      <Faq />
      <LocationContact />
      <CtaBanner />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
