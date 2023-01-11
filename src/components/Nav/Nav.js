import styles from "./Nav.module.scss";

const navItems = [
  {text: "Home", link: "/"},
  {text: "About", link: "/#about"},
  {text: "Menu", link: "/menu"},
  {text: "Reservations", link: "/book"},
  {text: "Order Online", link: "/order"},
  {text: "Login", link: "/login"},
];

const Nav = ({className}) => {
  const fullClassName = (!className || className.length === 0) ? 
    styles.nav : `${styles.nav} ${className}`;
  return (
    <nav className={fullClassName}>
      <ul>
        {navItems.map((e, i) => <li key={i}><a href={e.link}>{e.text}</a></li>)}
      </ul>
    </nav>
  );
};

export default Nav;