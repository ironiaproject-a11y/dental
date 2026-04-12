import styles from './WhatsAppButton.module.css';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton() {
  return (
    <a href="#" className={styles.btn}>
      <FaWhatsapp size={28} />
    </a>
  );
}