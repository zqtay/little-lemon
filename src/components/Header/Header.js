import styles from './Header.module.scss';
import Nav from '../Nav/Nav';
import Container from "../UI/Container";
import logo from "../../logo.png"

const Header = () => {
  return (
    <header>
      <Container className={styles.container}>
        <a href="/">
          <img className={styles.logo} alt="logo" src={logo}></img>
        </a>
        <div className={styles["nav-container"]}>
          <button className={styles["nav-button"]}>{">"}</button>
          <Nav className={styles["nav-header"]}></Nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;