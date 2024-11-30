import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

// import LoadError from "../../components/LoadError/LoadError";
import NavBar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import SearchForm from "../../components/SearchForm/SearchForm";
import Breadcrumbs from "../../components/Breadcrumb";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import styles from "./DriversListPage.module.css";

export interface Driver {
  id: number;
  name: string;
  certificate_number: string;
  license: string;
  experience: number;
  characteristics: string;
  image_url: string | null;
  status: string;
}
export const mockData: Driver[] = [
  {
    id: 1,
    name: "Радченко Дмитрий Сергеевич",
    certificate_number: "32 12 344234",
    license: "B",
    experience: 2,
    image_url: null,
    characteristics: "лучший,",
    status: "active",
  },
  {
    id: 2,
    name: "Радченко Дмитрий Сергеевич",
    certificate_number: "32 12 344234",
    license: "B",
    experience: 2,
    image_url: null,
    characteristics: "лучший,",
    status: "active",
  },
  {
    id: 3,
    name: "Радченко Дмитрий Сергеевич",
    certificate_number: "32 12 344234",
    license: "B",
    experience: 2,
    image_url: null,
    characteristics: "лучший,",
    status: "active",
  },
];

const breadcrumbItems = [
  { label: "Главная", path: "/" },
  { label: "Список водителей", path: "/drivers" },
];
const defaultImageUrl = "http://127.0.0.1:9000/test/images.png";

const DriversListPage: React.FC = () => {
  const [driversList, setdriversList] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Компонент DriversListPage был смонтирован!");
    fetchDrivers();
  }, []);

  const fetchDrivers = async (searchQuery: string = "") => {
    setLoading(true);
    setError(null);

    let url = "/drivers/";
    if (searchQuery) {
      url += `?driver_name=${searchQuery}`;
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

  const handleSearch = (searchQuery: string) => {
    fetchDrivers(searchQuery); // Обновляем список водителей с новым поисковым запросом
  };
  const menuItems = [{ name: "Главная", path: "/" },{ name: "Список водителей", path: "/drivers" },];
  return (
    <>
      <Header />
      <NavBar>
        <IngosLogo />
        <CollapsibleMenu menuItems={menuItems} />
      </NavBar>
      <div className={styles.main__container}>
        <h2 className={styles.main_title}>Автострахование онлайн</h2>
        <SearchForm onSearch={handleSearch} />
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
