import styles from "../styles/contact.module.css";
import { MdEmail, MdVoiceChat, MdForum } from "react-icons/md";

const ContactCard = () => {
  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.grid_card}>
            <i>
              <MdEmail />
            </i>
            <h2>Email</h2>
            <p>Monday To Friday Expected</p>
            <p className={styles.last_para}>Response time: 72 hours</p>
            <a href="/">
              Send Email<span>-&gt;</span>
            </a>
          </div>
          <div className={styles.grid_card}>
            <i>
              <MdVoiceChat />
            </i>
            <h2>Live Chat</h2>
            <p>Monday To Friday Expected</p>
            <p className={styles.last_para}>Response time: 72 hours</p>
            <a href="/">
              Send Email<span>-&gt;</span>
            </a>
          </div>
          <div className={styles.grid_card}>
            <i>
              <MdForum />
            </i>
            <h2>Community Forum</h2>
            <p>Monday To Friday Expected</p>
            <p className={styles.last_para}>Response time: 72 hours</p>
            <a href="/">
              Send Email<span>-&gt;</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
