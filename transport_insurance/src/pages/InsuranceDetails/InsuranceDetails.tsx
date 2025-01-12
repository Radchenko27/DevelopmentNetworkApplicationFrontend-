
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import {
  fetchInsuranceDetails,
  updateInsuranceDetails,
  deleteDriver,
  updateDriver,
  submitInsurance,
  deleteInsurance,
} from "../../slices/insuranceSlice";
import Header from "../../components/Header/Header";
import NavBar from "../../components/Navbar/Navbar";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import Breadcrumbs from "../../components/Breadcrumb";
import style from "./InsuranceDetails.module.css";
import { useParams } from "react-router-dom";

const InsuranceDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { insuranceDetails, error, isLoading } = useSelector(
    (state: RootState) => state.insurance
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchInsuranceDetails());
  }, [dispatch]);

  const menuItems = [
    { name: "Главная", path: "/" },
    { name: "Список водителей", path: "/drivers" },
  ];
  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Список водителей", path: "/drivers" },
    { label: `Страховка: ${id}`, path: `/insurances/${id}` },
  ];
  const handleUpdateInsuranceDetails = (field: string, value: string) => {
    dispatch(updateInsuranceDetails({ field, value }));
  };

  const handleDeleteDriver = (driverId: string) => {
    if (!insuranceDetails?.id || !driverId) {
      alert("Невозможно удалить водителя: отсутствует ID.");
      return;
    }
    dispatch(deleteDriver({ insuranceId: insuranceDetails.id, driverId }));
  };

  const handleUpdateDriver = (driverId: string) => {
    if (!insuranceDetails?.id || !driverId) {
      alert("Невозможно обновить данные водителя: отсутствует ID.");
      return;
    }
    dispatch(updateDriver({ insuranceId: insuranceDetails.id, driverId }));
  };

  const handleSubmitInsurance = () => {
    if (!insuranceDetails?.id) {
      alert("Невозможно оформить страховку: отсутствует ID.");
      return;
    }
    dispatch(submitInsurance(insuranceDetails.id));
  };

  const handleDeleteInsurance = () => {
    if (!insuranceDetails?.id) {
      alert("Невозможно удалить страховку: отсутствует ID.");
      return;
    }
    dispatch(deleteInsurance(insuranceDetails.id));
  };

  const renderDriverDetails = () => {
    if (
      !Array.isArray(insuranceDetails?.drivers) ||
      insuranceDetails.drivers.length === 0
    ) {
      return <p>Нет водителей для отображения.</p>;
    }

    return insuranceDetails.drivers.map((driver, index) => (
      <div className={style.driver_details} key={index}>
        <div className={style.driver_details__image}>
          <img
            src={driver.driver.image_url || "/default-driver.png"}
            alt="Фото водителя"
          />
        </div>
        <div className={style.insurance_detail_driver__info}>
          <div className={style.container_insurance_driver_name}>
            <h2 className={style.driver_details__name}>ФИО водителя</h2>
            <p className={style.driver_details__experience}>
              {driver.driver.name}
            </p>
            {insuranceDetails.status === "draft" && (
              <button
                className={style.driver_detail__button_delete}
                onClick={() => handleDeleteDriver(driver.driver.id.toString())}
              >
                Удалить
              </button>
            )}
          </div>
          <div className={style.container_insurance_driver_name}>
            <h2 className={style.driver_details__name}>Стаж вождения</h2>
            <p className={style.driver_details__experience}>
              {driver.driver.experience}
            </p>
            {insuranceDetails.status === "draft" && (
              <button
                className={style.driver_detail__button_update}
                onClick={() => handleUpdateDriver(driver.driver.id.toString())}
              >
                Обновить
              </button>
            )}
          </div>
        </div>
      </div>
    ));
  };

  if (isLoading) {
    return <p>Загрузка данных...</p>;
  }

  if (error) {
    return <p className={style.error}>Ошибка: {error}</p>;
  }

  return (
    <>
      <Header />
      <NavBar>
        <IngosLogo />
        <CollapsibleMenu menuItems={menuItems} />
      </NavBar>
      <div className={style.main__container}>
        <h2 className={style.main_title}>Оформление</h2>
      </div>
      {localStorage.getItem("isAuthenticated") === "true" ? (
        <div className={style.services}>
          <div className={style.services__container2}>
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <div className={style.driver_details}>
            <h2 className={style.driver_details__name}>
              {insuranceDetails?.type}
            </h2>
            <p className={style.driver_details__name}>
              Статус:{" "}
              {insuranceDetails?.status === "draft"
                ? "Черновик"
                : insuranceDetails?.status === "completed"
                  ? "Завершен"
                  : insuranceDetails?.status === "deleted"
                    ? "Удален"
                    : "Отклонен"}
            </p>
            <table>
              <thead>
                <tr>
                  <th>Полис</th>
                  <th>Срок действия</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Номер:</th>
                  <td>
                    <input
                      type="text"
                      defaultValue={insuranceDetails?.certificate_number || ""}
                      onChange={(e) =>
                        handleUpdateInsuranceDetails(
                          "certificate_number",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <th>Серия:</th>
                  <td>
                    <input
                      type="text"
                      defaultValue={insuranceDetails?.certificate_series || ""}
                      onChange={(e) =>
                        handleUpdateInsuranceDetails(
                          "certificate_series",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <h2>Список водителей</h2>
            {renderDriverDetails()}
            <div>
              {insuranceDetails?.status === "draft" && (
                <>
                  <button onClick={handleSubmitInsurance}>
                    Оформить страховку
                  </button>
                  <button onClick={handleDeleteInsurance}>
                    Удалить страховку
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Пожалуйста, авторизуйтесь, чтобы увидеть страховки.</div>
      )}
    </>
  );
};

export default InsuranceDetails;
