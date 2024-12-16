import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import NavBar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumb";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import styles from "./DriversListPage.module.css";

import { mockData, Driver } from "../../mock/mockData";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  setDriverName,
  setQuantityOfDrivers,
  setDraftInsuranceId,
} from "../../slices/dataSlice";
import { Api } from "../../api/Api";
const api = new Api();

const breadcrumbItems = [
  { label: "Главная", path: "/" },
  { label: "Список водителей", path: "/drivers" },
];
const defaultImageUrl = "http://127.0.0.1:9000/test/images.png";

const DriversListPage: React.FC = () => {
  const [driversList, setdriversList] = useState<Driver[]>([]);
  // const [localDraftInsuranceId, setlocalDraftInsuranceId] = useState<
  //   string | null
  // >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const QuantityOfDrivers = useSelector(
    (state: RootState) => state.ourData.QuantityOfDrivers
  );
  const driverName = useSelector(
    (state: RootState) => state.ourData.driverName
  );

  useEffect(() => {
    const storedDriverName = localStorage.getItem("driverName");
    if (storedDriverName) dispatch(setDriverName(storedDriverName));

    console.log("Компонент DriversListPage был смонтирован!");

    fetchDrivers();
  }, [isAuthenticated]);

  const fetchDrivers = async () => {
    setLoading(true);
    setError(null);

    // let url = "/drivers/";
    // if (driverName) {
    //   url += `?driver_name=${driverName}`;
    // }

    // try {
    //   const response = await fetch(url);
    //   if (!response.ok) throw new Error("Ошибка при загрузке данных");
    //   const data = await response.json();
    //   // setdriversList(data.drivers);
    //   if (Array.isArray(data.drivers)) {
    //     setdriversList(data.drivers);
    //   } else {
    //     throw new Error("Некорректный формат данных");
    //   }
    // } catch (err) {
    //   setError("Ошибка при загрузке данных, использую моковые данные");
    //   setdriversList(mockData); // Используем моки при ошибке
    // } finally {
    //   setLoading(false);
    // }

    const params: Record<string, string | number> = {};
    if (driverName) params.driver_name = driverName;
    try {
      const response = await axios.get("/drivers/", { params });
      const { drivers, quantity_of_drivers, current_insurance_id } =
        response.data;

      console.log("Ответ сервера:", response.data);

      setdriversList(drivers);
      dispatch(setQuantityOfDrivers(quantity_of_drivers));
      dispatch(setDraftInsuranceId(current_insurance_id)); // Сохраняем draftOrderId в локальном состоянии
    } catch (err) {
      setError("Ошибка при загрузке данных");
      console.error("Ошибка:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToOrder = async (id: string) => {
    if (!sessionId) {
      alert(
        "Пожалуйста, войдите в систему, чтобы добавить водителя в страховку."
      );
      return;
    }

    // Устанавливаем session_id в куки
    // document.cookie = `session_id=${sessionId}; path=/; SameSite=None`;
    console.log(document.cookie);
    try {
      //   await api.drivers.driversAddToDraftCreate(id, {
      //     withCredentials: true,
      //   });
      const response = await axios.post(
        `/drivers/${id}/add-to-draft/`,
        { driverId: id },
        // Пустое тело для POST-запроса
        {
          // withCredentials: true, // Включаем передачу куки
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );
      console.log("Успешно добавлено в черновик:", response.data);
      await fetchDrivers();
    } catch (error) {
      setError("Ошибка при добавлении водителя в страховку");
      console.error("Ошибка при добавлении водителя:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setDriverName(value));
    localStorage.setItem("driverName", value);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDrivers(); // Обновляем список водителей с новым поисковым запросом
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

                <Button
                  className={styles.driver_item__add_button}
                  onClick={() => handleAddToOrder(driver.id.toString())}
                >
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
