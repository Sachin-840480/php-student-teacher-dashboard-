import styles from "../modules/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © {new Date().getFullYear()} School Management System
      </p>

      <span>
        Developed with React, PHP & MySQL
      </span>
    </footer>
  );
}

export default Footer;
