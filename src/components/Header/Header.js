import styles from './Header.module.scss';
import Nav from '../Nav/Nav';
import Container from "../UI/Container/Container";
import { ROOT_URL } from "../../Util";

const Header = () => {
  return (
    <header>
      <Container className={styles.container}>
        <a href="/">
          <img className={styles.logo} alt="logo" src={`${ROOT_URL}/logo.png`}></img>
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