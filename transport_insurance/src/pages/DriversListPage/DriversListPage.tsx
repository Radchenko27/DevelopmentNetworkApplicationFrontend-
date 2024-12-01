import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

import NavBar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumb";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import styles from "./DriversListPage.module.css";

import { mockData, Driver } from "../../mock/mockData";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setDriverName } from "../../slices/dataSlice";

const breadcrumbItems = [
  { label: "Главная", path: "/" },
  { label: "Список водителей", path: "/drivers" },
];
const defaultImageUrl = "http://127.0.0.1:9000/test/images.png";

const DriversListPage: React.FC = () => {
  const [driversList, setdriversList] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const driverName = useSelector(
    (state: RootState) => state.ourData.driverName
  );

  useEffect(() => {
    const storedDriverName = localStorage.getItem("driverName");
    if (storedDriverName) dispatch(setDriverName(storedDriverName));

    console.log("Компонент DriversListPage был смонтирован!");

    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    setError(null);

    let url = "/drivers/";
    if (driverName) {
      url += `?driver_name=${driverName}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Ошибка при загрузке данных");
      const data = await response.json();
      // setdriversList(data.drivers);
      if (Array.isArray(data.drivers)) {
        setdriversList(data.drivers);
      } else {
        throw new Error("Некорректный формат данных");
      }
    } catch (err) {
      setError("Ошибка при загрузке данных, использую моковые данные");
      setdriversList(mockData); // Используем моки при ошибке
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDrivers(); // Обновляем список водителей с новым поисковым запросом
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setDriverName(value));
    localStorage.setItem("driverName", value);
  };

  const menuItems = [
    { name: "Главная", path: "/" },
    { name: "Список водителей", path: "/drivers" },
  ];
  return (
    <>
      <Header />
      <NavBar>
        <IngosLogo />
        <CollapsibleMenu menuItems={menuItems} />
      </NavBar>
      <div className={styles.main__container}>
        <h2 className={styles.main_title}>Автострахование онлайн</h2>
        {/* <SearchForm onSearch={handleSearch} /> */}
        <div className={styles.search_block}>
          <form onSubmit={handleSearch} className={styles.search_form}>
            <input
              type="text"
              className={styles.search_input}
              name="driver_name"
              placeholder="Поиск по ФИО"
              value={driverName || ""}
              onChange={handleChange}
            />
            <button type="submit" className={styles.search_button}>
              Искать
            </button>
          </form>
        </div>
      </div>

      <Container className={styles.services}>
        <div className={styles.services__container2}>
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <Row className={styles.services__container}>
          {driversList.map((driver) => (
            <Col key={driver.id} className={styles.driver_item} md={4}>
              <div className={styles.driver_item__image}>
                <img
                  src={driver.image_url || defaultImageUrl}
                  alt={driver.name}
                />
              </div>
              <div className={styles.driver_item_content}>
                <h2 className={styles.driver_item__title}>{driver.name}</h2>
                <p className={styles.driver_item__description}>
                  Стаж вождения: {driver.experience}
                </p>
              </div>
              <div className={styles.driver_item_buttons}>
                <Link
                  to={`/drivers/${driver.id}`}
                  className={styles.driver_item__button}
                >
                  {" "}
                  Подробнее{" "}
                </Link>

                <Button className={styles.driver_item__add_button} disabled>
                  +
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default DriversListPage;



