
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../store";
import { fetchInsurancesList } from "../../slices/insurancesSlice";
import Navbar from "../../components/Navbar/Navbar";
import Breadcrumbs from "../../components/Breadcrumb";
import Header from "../../components/Header/Header";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import style from "./InsurancesList.module.css";

const InsurancesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { insurances, isLoading, error } = useSelector(
    (state: RootState) => state.insurances
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(fetchInsurancesList());
  }, [dispatch]);

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
      {isAuthenticated ? (
        <>
          <div className={style.main__container}>
            <h3 className={style.main_title}>Список страховок</h3>
          </div>
          <div className={style.services__container2}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p className={style.error}>{error}</p>
          ) : insurances.length > 0 ? (
            <div className={style.services__container}>
              <div className={style["order-table"]}>
                <div className={style["order-table-header"]}>
                  <div className={style["order-card-cell"]}>Номер страховки</div>
                  <div className={style["order-card-cell"]}>Данные полиса</div>
                  <div className={style["order-card-cell"]}>Статус</div>
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
                {insurances.map((insurance) => (
                  <div className={style["order-card"]} key={insurance.id}>
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
                    <div className={style["order-card-cell"]}>
                      {formatTime(insurance.date_formation)}
                    </div>
                    <div className={style["order-card-cell"]}>
                      {formatTime(insurance.date_completion)}
                    </div>
                    <div className={style["order-card-cell"]}>
                      {insurance.average_experience || "Не указан"}
                    </div>
                    <div className={style["order-card-cell"]}>
                      <Link
                        className={style.header__button}
                        to={`/insurances/${insurance.id}`}
                      >
                        Подробности
                      </Link>
                    </div>
                  </div>
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
