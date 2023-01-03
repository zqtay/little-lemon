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
        <Nav></Nav>
      </Container>
    </header>
  );
};

export default Header;