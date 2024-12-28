import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { RootState } from "../../store";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumb";
import Header from "../../components/Header/Header";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import style from "./InsurancesList.module.css";
import { Insurance } from "../../api/Api";

const defaultImageUrl = "http://127.0.0.1:9000/test/images.png";

const InsurancesList = () => {
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  //   const [expandedInsurances, setExpandedInsurances] = useState<{
  //     [key: number]: boolean;
  //   }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:8000/insurances/`, {
          withCredentials: true,
        });

        const insurancesData: Insurance[] = Array.isArray(
          response.data.insurances
        )
          ? response.data.insurances
          : [];

        console.log("Загруженные данные:", insurancesData);
        setInsurances(insurancesData);
      } catch (err) {
        console.error("Ошибка загрузки данных:", err);
        setError("Не удалось загрузить данные");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  //   }, []);

  const formatTime = (dateString: string | null) => {
    if (!dateString) return "Не указана";
    return new Date(dateString).toLocaleString();
  };

  const menuItems = [
    { name: "Главная", path: "/" },
    { name: "Список водителей", path: "/drivers" },
  ];

  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Список страховок", path: "/insurances" },
  ];
  return (
    <>
      <Header />
      <Navbar>
        <IngosLogo />
        <CollapsibleMenu menuItems={menuItems} />
      </Navbar>
      {localStorage.getItem("isAuthenticated") === "true" ? (
        <>
          <div className={style.main__container}>
            <h3 className={style.main_title}>Список страховок</h3>
          </div>
          <div className={style.services__container2}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          {insurances.length > 0 ? (
            <div className={style.services__container}>
              <div className={style["order-table"]}>
                {/* Шапка таблицы */}
                <div className={style["order-table-header"]}>
                  <div className={style["order-card-cell"]}>
                    Номер страховки
                  </div>
                  <div className={style["order-card-cell"]}>Данные полиса</div>
                  <div className={style["order-card-cell"]}>Статус</div>
                  {/* <div className={style["order-card-cell"]}>Дата создания</div> */}
                  <div className={style["order-card-cell"]}>
                    Дата формирования
                  </div>
                  <div className={style["order-card-cell"]}>
                    Дата завершения
                  </div>
                  <div className={style["order-card-cell"]}>Средний стаж</div>
                  <div className={style["order-card-cell"]}>
                    Ссылка на страховку
                  </div>
                </div>

                {/* Список страховок */}
                {insurances.map((insurance) => (
                  <React.Fragment key={insurance.id}>
                    <div className={style["order-card"]}>
                      <div className={style["order-card-cell"]}>
                        Страховка #{insurance.id}
                      </div>
                      <div className={style["order-card-cell"]}>
                        {insurance.certificate_number +
                          " " +
                          insurance.certificate_series}
                      </div>
                      <div className={style["order-card-cell"]}>
                        {insurance.status === "draft"
                          ? "Черновик"
                          : insurance.status === "deleted"
                            ? "Удалена"
                            : insurance.status === "formed"
                              ? "Сформирована"
                              : insurance.status === "completed"
                                ? "Завершена"
                                : "Отклонена"}
                      </div>
                      {/* <div className={style["order-card-cell"]}>
                        {formatTime(insurance.date_creation || null)}
                      </div> */}
                      <div className={style["order-card-cell"]}>
                        {insurance.date_formation
                          ? formatTime(insurance.date_formation)
                          : "Не указана"}
                      </div>
                      <div className={style["order-card-cell"]}>
                        {insurance.date_completion
                          ? formatTime(insurance.date_completion)
                          : "Не указана"}
                      </div>
                      <div className={style["order-card-cell"]}>
                        {insurance.average_experience
                          ? insurance.average_experience
                          : "Не указан"}
                      </div>
                      <div className={style["order-card-cell"]}>
                        <a
                          className={style.header__button}
                          href={`/insurances/${insurance.id}`}
                        >
                          Подробности
                        </a>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ) : (
            <p>Страховки отсутствуют</p>
          )}
        </>
      ) : (
        <div className="unauthorized-message">
          Пожалуйста, авторизуйтесь, чтобы увидеть страховки.
        </div>
      )}
    </>
  );
};

export default InsurancesList;
