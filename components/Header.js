import styles from "../styles/Header.module.css";
import Link from "next/link";

const Header = ({ config }) => {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <b>Home</b>
        </a>
      </Link>
      <div className={styles.wrapper}>
        {config.map((item) => (
          <Link href={item.route} key={item.route} passHref>
            <a className={styles.link}>{item.name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Header;
