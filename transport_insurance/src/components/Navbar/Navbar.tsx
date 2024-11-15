import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
// const Navbar = () => {
//   return (
//     <nav class="main-nav">
//       <ul class="main-nav__list">
//         {/* <li><a href="#">Главная</a></li>
//               <li><a href="#">Автострахование</a></li>
//               <li><a href="#">Имущество</a></li>
//               <li><a href="#">Путешествия</a></li>
//               <li><a href="#">Контакты</a></li>  */}
//         {/* {% block header %}

//                 {% endblock header %} */}
//       </ul>
//     </nav>
//   );
// };
// export default Navbar;

interface NavBarProps {
  children?: ReactNode; // Указывает, что children может быть передан, но это необязательно
  showDefaultLinks?: boolean; // Опциональный булевый пропс, по умолчанию true
}

const NavBar: React.FC<NavBarProps> = ({
  children,
  showDefaultLinks = true,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.header__card}>
        <div className={styles.header__container}>
          <nav className={styles.main_nav}>
            <ul className={styles.main_nav__list}>
              {/* Логотип, который всегда присутствует */}

              {/* Отображение стандартных ссылок, если showDefaultLinks равно true */}
              {showDefaultLinks && (
                <>
                  <li>
                    <Link to="/drivers/" className={styles.nav_link}>
                      Список водителей
                    </Link>
                  </li>
                  <li>
                    <a href="/about" className={styles.nav_link}>
                      О нас
                    </a>
                  </li>
                  
                </>
              )}

              {/* Отображение переданных через children дополнительных элементов */}
              {children}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;

// <nav>
//   <ul>
//     <li>
//       <Link to="/">Главная</Link>
//     </li>
//     <li>
//       <Link to="/equipment">Список оборудования</Link>
//     </li>
//     <li>
//       <Link to="/order/1">Детали заказа</Link>
//     </li>{" "}
//     {/* Пример ссылки на детали заказа */}
//   </ul>
// </nav>
