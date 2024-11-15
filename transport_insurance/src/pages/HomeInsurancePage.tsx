import React, { useEffect } from "react";
import { Link } from "react-router-dom";
// import '../Navbar.css';
import Header from "../components/Header/Header";
import NavBar from "../components/Navbar/Navbar";

const HomeInsurancePage: React.FC = () => {
  useEffect(() => {
    console.log("Компонент HomeInsurancePage был смонтирован!");
  }, []);
  return (
    <>
      {" "}
      <Header/>
      <NavBar>
        <li>{/* <SearchForm onSearch={handleSearch} /> */}</li>
        <li>
          <a href="#" className="header__button">
            Текущая страховка недоступна
          </a>
        </li>
      </NavBar>
      <div className="main__container">
        <h2 className="main_title">Автострахование онлайн</h2>
      </div>
    </>
  );
};

export default HomeInsurancePage;
