import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

interface NavBarProps {
  children?: ReactNode; // Указывает, что children может быть передан, но это необязательно
  showDefaultLinks?: boolean; // Опциональный булевый пропс, по умолчанию true
}

const NavBar: React.FC<NavBarProps> = ({
  children,
  showDefaultLinks = true,
}) => {
  // const email = localStorage.getitem("email");
  return (
    <header className={styles.header}>
      <div className={styles.header__card}>
        {/* <div className={styles.main_nav__list}></div> */}
        {children}
      </div>
    </header>
  );
};

export default NavBar;
