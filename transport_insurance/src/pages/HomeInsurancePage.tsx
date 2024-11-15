import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import '../Navbar.css';
import styles from "./HomeInsurancePage.module.css";
import Header from "../components/Header/Header";
import NavBar from "../components/Navbar/Navbar";

const HomeInsurancePage: React.FC = () => {
  useEffect(() => {
    console.log("Компонент HomeInsurancePage был смонтирован!");
  }, []);
  return (
    <>
      {" "}
      <Header />
      <NavBar>
        <li>{/* <SearchForm onSearch={handleSearch} /> */}</li>
        <li>
          <a href="#" className={styles.header__button}>
            Текущая страховка недоступна
          </a>
        </li>
      </NavBar>
      {/* <div className="main__container">
        <h2 className="main_title">Автострахование онлайн</h2>
      </div> */}
      <div className={styles.main_container}>
        {/* <section className={styles.services_section}>
          <h2>Наши услуги</h2>
          <div className={styles.services_grid}>
            <div className={styles.service_card}>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Автострахование"
              />
              <h3>Автострахование</h3>
              <p>Комплексные программы страхования для водителей.</p>
              <a href="#" className={styles.service_link}>
                Подробнее
              </a>
            </div>
            <div className={styles.service_card}>
              <img
                src="https://via.placeholder.com/300x200"
                alt="Медицинское страхование"
              />
              <h3>Медицинское страхование</h3>
              <p>Забота о вашем здоровье и здоровье вашей семьи.</p>
              <a href="#" className={styles.service_link}>
                Подробнее
              </a>
            </div>
            <div className="service-card">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Имущественное страхование"
              />
              <h3>Имущественное страхование</h3>
              <p>Надежная защита вашего имущества от любых рисков.</p>
              <a href="#" className={styles.service_link}>
                Подробнее
              </a>
            </div>
          </div>
        </section> */}

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
