import { Dispatch, SetStateAction } from "react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Insurance } from "../../api/Api";
import style from "./InsuranceDetails.module.css"; // Подключение CSS-модуля
import NavBar from "../../components/Navbar/Navbar";
import Header from "../../components/Header/Header";
import Breadcrumbs from "../../components/Breadcrumb";
import { useParams } from "react-router-dom";
import IngosLogo from "../../components/Ingoslogo/Ingoslogo";
import CollapsibleMenu from "../../components/CollapsibleMenu/CollapsibleMenu";
import axios from "axios";
import { Api } from "../../api/Api";

const api = new Api();

const defaultImageUrl = "http://127.0.0.1:9000/test/images.png";

const InsuranceDetails = () => {
  const sessionId = useSelector((state: RootState) => state.auth.sessionId);
  const [insuranceDetails, setInsuranceDetails] = useState<Insurance | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("id:", id);
    if (id) {
      fetchInsuranceDetails(isAuthenticated, id, setError, setInsuranceDetails);
    } else {
      setError("Не удалось получить ID заказа.");
    }
  }, [id]);

  const menuItems = [
    { name: "Главная", path: "/" },
    { name: "Список водителей", path: "/drivers" },
  ];

  const fetchInsuranceDetails = async (
    isAuthenticated: boolean,
    draftInsuranceId: string,
    setError: Dispatch<SetStateAction<string | null>>,
    setInsuranceDetails: Dispatch<SetStateAction<any>>
  ) => {
    if (!draftInsuranceId) {
      setError("Необходимо авторизоваться и получить ID заказа.");
      return;
    }
    setError(null);
    const cookies = document.cookie; // Вернет строку с куки, например: "session_id=abc123; csrftoken=xyz789"
    console.log(cookies);
    try {
      const response = await axios.get(
        `http://localhost:8000/insurances/${draftInsuranceId}/`,
        {
          withCredentials: true,
        }
      );
      const {
        id,
        status,
        type,
        certificate_number,
        certificate_series,
        date_creation,
        date_begin,
        date_end,
        date_formation,
        date_completion,
        car_brand,
        car_model,
        car_region,
        moderator,
        average_experience,
        drivers,
      } = response.data;

      setInsuranceDetails({
        id,
        status,
        type,
        certificate_number,
        certificate_series,
        date_creation,
        date_begin,
        date_end,
        date_formation,
        date_completion,
        car_brand,
        car_model,
        car_region,
        moderator,
        average_experience,
        drivers,
      });
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Ошибка при загрузке данных.");
    } finally {
    }
  };

  const handleDeletedriver = async (
    draftInsuranceId: number | string,
    driverId: string,
    setError: Dispatch<SetStateAction<string | null>>
    // setInsuranceDetails: Dispatch<SetStateAction<any>>
  ): Promise<void> => {
    if (!draftInsuranceId) {
      setError("ID заказа отсутствует.");
      return;
    }

    try {
      // Удаляем товар из заказа
      await axios.delete(
        `http://localhost:8000/insurances/${draftInsuranceId}/drivers/${driverId}/delete/`,
        {
          withCredentials: true,
        }
      );
      //Обновляем данные заказа после удаления товара
      const response = await axios.get(
        `http://localhost:8000/insurances/${draftInsuranceId.toString()}/`,
        {
          withCredentials: true,
        }
      );
      const {
        id,
        status,
        type,
        certificate_number,
        certificate_series,
        date_creation,
        date_begin,
        date_end,
        date_formation,
        date_completion,
        car_brand,
        car_model,
        car_region,
        moderator,
        average_experience,
        drivers,
        creator,
      } = response.data;

      setInsuranceDetails({
        id,
        status,
        type,
        certificate_number,
        certificate_series,
        date_creation,
        date_begin,
        date_end,
        date_formation,
        date_completion,
        car_brand,
        car_model,
        car_region,
        moderator,
        average_experience,
        drivers,
        creator,
      });
      // setError(null);
    } catch (err) {
      setError("Ошибка при удалении товара");
      console.error("Ошибка:", err);
    }
  };

  const handleUpdatedriver = async (
    draftInsuranceId: number | string,
    driverId: string,
    setError: Dispatch<SetStateAction<string | null>>
    // setInsuranceDetails: Dispatch<SetStateAction<any>>
  ): Promise<void> => {
    if (!draftInsuranceId) {
      setError("ID заказа отсутствует.");
      return;
    }
    // const api = new Api();
    try {
      // Удаляем товар из заказа
      await axios.put(
        `http://localhost:8000/insurances/${draftInsuranceId}/drivers/${driverId}/update/`,
        { owner: 1 },
        {
          withCredentials: true,
        }
      );
      //Обновляем данные заказа после удаления товара
      const response = await axios.get(
        `http://localhost:8000/insurances/${draftInsuranceId.toString()}/`,
        {
          withCredentials: true,
        }
      );
      const {
        id,
        status,
        type,
        certificate_number,
        certificate_series,
        date_creation,
        date_begin,
        date_end,
        date_formation,
        date_completion,
        car_brand,
        car_model,
        car_region,
        moderator,
        average_experience,
        drivers,
        creator,
      } = response.data;

      setInsuranceDetails({
        id,
        status,
        type,
        certificate_number,
        certificate_series,
        date_creation,
        date_begin,
        date_end,
        date_formation,
        date_completion,
        car_brand,
        car_model,
        car_region,
        moderator,
        average_experience,
        drivers,
        creator,
      });

      // setError(null);
    } catch (err) {
      setError("Ошибка при удалении товара");
      console.error("Ошибка:", err);
    }
  };

  const handleSubmitInsurance = async (
    draftInsuranceId: number | string,
    setError: Dispatch<SetStateAction<string | null>>
    // setInsuranceDetails: Dispatch<SetStateAction<any>>
  ): Promise<void> => {
    if (!draftInsuranceId) {
      setError("ID заказа отсутствует.");
      return;
    }
    const api = new Api();

    try {
      // Подтверждаем заказ
      await axios.put(
        `http://localhost:8000/insurances/${draftInsuranceId}/submit/`,
        { owner: 1 },
        {
          withCredentials: true,
        }
      );

      // После успешного обновления и подтверждения, получаем актуальные данные заказа
      const response = await axios.get(
        `http://localhost:8000/insurances/${draftInsuranceId.toString()}/`,
        {
          withCredentials: true,
        }
      );
      // Обновляем состояние с новыми данными заказа
      const {
        id,
        status,
        type,
        certificate_number,
        certificate_series,
        date_creation,
        date_begin,
        date_end,
        date_formation,
        date_completion,
        car_brand,
        car_model,
        car_region,
        moderator,
        average_experience,
        drivers,
        creator,
      } = response.data;

      setInsuranceDetails({
        id,
        status,
        type,
        certificate_number,
        certificate_series,
        date_creation,
        date_begin,
        date_end,
        date_formation,
        date_completion,
        car_brand,
        car_model,
        car_region,
        moderator,
        average_experience,
        drivers,
        creator,
      });

      setError(null);
    } catch (err) {
      setError("Ошибка при обновлении или подтверждении заказа");
      console.error("Ошибка:", err);
    }
  };

  const breadcrumbItems = [
    { label: "Главная", path: "/" },
    { label: "Список водителей", path: "/drivers" },
    { label: `Страховка: ${id}`, path: `/insurances/${id}` },
  ];

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
              : insuranceDetails?.status === "deleted"
                ? "Удален"
                : insuranceDetails?.status === "formed"
                  ? "Сформирован"
                  : insuranceDetails?.status === "completed"
                    ? "Завершен"
                    : "Отклонен"}
          </p>
          <table>
            <thead>
              <tr>
                <th colSpan={4} className={style.policy_info}>
                  Данные полиса
                </th>
                <th rowSpan={2} colSpan={3} className={style.policy_info}>
                  Срок действия
                </th>
                <th>Начало:</th>
                <th>Конец:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Номер:</th>
                <td>{insuranceDetails?.certificate_number}</td>
                <th>Серия:</th>
                <td>{insuranceDetails?.certificate_series}</td>
                <td className={style.date_info}>
                  {insuranceDetails?.date_begin}
                </td>
                <td className={style.dateInfo}>{insuranceDetails?.date_end}</td>
              </tr>
              <tr>
                <th colSpan={9} className={style.policy_info}>
                  Данные автомобиля
                </th>
              </tr>
              <tr>
                <th>Марка:</th>
                <td>{insuranceDetails?.car_brand}</td>
                <th>Модель:</th>
                <td>{insuranceDetails?.car_model}</td>
                <td></td>
                <th>Номер:</th>
                <td>{insuranceDetails?.car_region}</td>
                <th>Регион:</th>
                <td>{insuranceDetails?.car_region}</td>
              </tr>
            </tbody>
          </table>
          <h2 className={style.driver_details__name}>Список водителей</h2>

          {/* Проверка, чтобы избежать ошибок при рендере списка */}
          {Array.isArray(insuranceDetails?.drivers) &&
          insuranceDetails?.drivers.length > 0 ? (
            insuranceDetails.drivers.map((driverInsurance, index) => (
              <div className={style.driver_details} key={index}>
                <div className={style.driver_details__image}>
                  <img
                    src={driverInsurance.driver.image_url || defaultImageUrl}
                    alt="Фото водителя"
                  />
                </div>
                <div className={style.insurance_detail_driver__info}>
                  <div className={style.container_insurance_driver_name}>
                    <h2 className={style.driver_details__name}>ФИО водителя</h2>
                    <p className={style.driver_details__experience}>
                      {driverInsurance.driver.name}
                    </p>
                    {insuranceDetails.status === "draft" && (
                      <>
                        <button
                          className={style.driver_detail__button_delete}
                          onClick={() => {
                            if (
                              insuranceDetails?.id &&
                              driverInsurance.driver?.id
                            ) {
                              handleDeletedriver(
                                insuranceDetails.id.toString(),
                                driverInsurance.driver.id.toString(),
                                setError
                              );
                            } else {
                              setError(
                                "Невозможно удалить водителя: отсутствует ID."
                              );
                            }
                          }}
                        >
                          Удалить
                        </button>
                      </>
                    )}
                  </div>
                  <div className={style.container_insurance_driver_name}>
                    <h2 className={style.driver_details__name}>
                      Стаж вождения
                    </h2>
                    <p className={style.driver_details__experience}>
                      {driverInsurance.driver.experience}
                    </p>
                    {insuranceDetails.status === "draft" && (
                      <>
                        <button
                          className={style.driver_detail__button_update}
                          onClick={() => {
                            if (
                              insuranceDetails?.id &&
                              driverInsurance.driver?.id
                            ) {
                              handleUpdatedriver(
                                insuranceDetails.id.toString(),
                                driverInsurance.driver.id.toString(),
                                setError
                              );
                            } else {
                              setError(
                                "Невозможно удалить водителя: отсутствует ID."
                              );
                            }
                          }}
                        >
                          Обновить
                        </button>
                      </>
                    )}
                  </div>
                  <div className={style.container_insurance_driver_name}>
                    <h2 className={style.driver_details__name}>
                      Номер удостоверения
                    </h2>
                    <p className={style.driver_details__certificate_number}>
                      {driverInsurance.driver.certificate_number}
                    </p>
                    {driverInsurance.owner && (
                      <div className={style.toast_notification}>
                        <div className={style.toast_сontent}>
                          <span className={style.toast_icon}>&#x2714;</span>
                          <div className={style.toast_message}>
                            <span
                              className={`${style.status_label} ${style.active}`}
                            >
                              Владелец
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Нет водителей для отображения.</p>
          )}

          <hr />
          <div className={style.insurance_detail_driver__info}>
            {insuranceDetails?.status === "draft" && (
              // <form
              //   method="POST"
              //   action={`/update_insurance_status/${insuranceDetails?.type}`}
              // >
              <button
                type="submit"
                // name="action"
                // value="delete"
                onClick={() => {
                  if (insuranceDetails?.id) {
                    handleSubmitInsurance(
                      insuranceDetails.id.toString(),
                      // driverInsurance.driver.id.toString(),
                      setError
                    );
                  } else {
                    setError("Невозможно удалить водителя: отсутствует ID.");
                  }
                }}
                className={style.insurance_detail__button_delete}
              >
                Оформить страховку
              </button>
              // </form>
            )}

            {insuranceDetails?.status !== "completed" ? (
              <h2 className={style.driver_details2__name}>
                Средний стаж: рассчитывается...
              </h2>
            ) : (
              <h2 className={style.driver_details2__name}>
                Средний стаж: {insuranceDetails.average_experience}
              </h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InsuranceDetails;
