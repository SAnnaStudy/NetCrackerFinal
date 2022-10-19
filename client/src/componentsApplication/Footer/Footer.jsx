import styles from './Footer.module.css';

const Footer = () => {
  return (
   <div className={styles.footer}>
      <div className={styles.logo_pic}></div>
      <div className={styles.name}>Просто вкусно</div>
      <div className={styles.text}>Здесь есть все, что нужно, для приготовления любимых блюд</div>
   </div>
  );
}

export default Footer;