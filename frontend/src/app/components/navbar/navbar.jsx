import styles from "./navbar.module.css";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  return (
    <>
      <nav className={styles.container}>
        <h2 className={styles.heroHeading}>Tarjumma-Gemini Flash 2.0</h2>
        <a
          href="https://github.com/MuhammadAffan-06/"
          style={{ textDecoration: "none", color: "black" }}
          target="_blank"
        >
          <FaGithub
            style={{
              backgroundColor: "white",
              padding: "2px",
              borderRadius: "60%",
            }}
            size={25}
          />
        </a>
      </nav>
      <hr className={styles.navbarDivider} />
    </>
  );
}
