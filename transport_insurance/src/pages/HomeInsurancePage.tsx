import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import '../Navbar.css';
import styles from "./HomeInsurancePage.module.css";
import Header from "../components/Header/Header";
import NavBar from "../components/Navbar/Navbar";
import IngosLogo from "../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../components/CollapsibleMenu/CollapsibleMenu";
const HomeInsurancePage: React.FC = () => {
  useEffect(() => {
    console.log("Компонент HomeInsurancePage был смонтирован!");
  }, []);

  const menuItems = ["Главная", "О компании", "Услуги", "Контакты"];
  return (
    <>
      {" "}
      <Header />
      <NavBar>
        <IngosLogo />

        {/* <SearchForm onSearch={handleSearch} /> */}

        <CollapsibleMenu menuItems={menuItems} />
      </NavBar>
      {/* <div className="main__container">
        <h2 className="main_title">Автострахование онлайн</h2>
      </div> */}
      <div className={styles.main_container}>
        <section className={styles.additional_info}>
          <h2>Почему выбирают нас?</h2>
          <p>
            Многолетний опыт работы, высокая надежность и индивидуальный подход
            к каждому клиенту.
          </p>
          <Link to="/drivers" className={styles.cta_button}>
            Список водителей
          </Link>
        </section>
      </div>
    </>
  );
};

export default HomeInsurancePage;
