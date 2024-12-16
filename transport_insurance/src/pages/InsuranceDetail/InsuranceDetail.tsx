import React from "react";
import style from "./InsuranceDetails.module.css"; // Подключение CSS-модуля

interface DriverInsurance {
  driver: {
    image_url: string;
    name: string;
    experience_text: string;
    certificate_number: string;
  };
  owner: boolean;
}

interface Insurance {
  type: string;
  certificate_number: string;
  certificate_series: string;
  date_begin: string; // Формат даты, например: '2024-12-16'
  date_end: string;
  car_brand: string;
  car_model: string;
  car_number: string;
  car_region: string;
  status: string;
  average_experience_text?: string; // Опционально, если статус != 'completed'
}

interface Props {
  insurance: Insurance;
  driversInsurance: DriverInsurance[];
}

const InsuranceDetails: React.FC<Props> = ({ insurance, driversInsurance }) => {
  return (
    <div className={style.mainContainer}>
      <h2 className={style.mainTitle}>Оформление</h2>
      <div className={style.services}>
        <div className={style.driverDetails}>
          <h2 className={style.driverDetailsName}>{insurance.type}</h2>
          <table>
            <thead>
              <tr>
                <th colSpan={4} className={style.policyInfo}>
                  Данные полиса
                </th>
                <th rowSpan={2} colSpan={3} className={style.policyInfo}>
                  Срок действия
                </th>
                <th>Начало:</th>
                <th>Конец:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Номер:</th>
                <td>{insurance.certificate_number}</td>
                <th>Серия:</th>
                <td>{insurance.certificate_series}</td>
                <td className={style.dateInfo}>{insurance.date_begin}</td>
                <td className={style.dateInfo}>{insurance.date_end}</td>
              </tr>
              <tr>
                <th colSpan={9} className={style.policyInfo}>
                  Данные автомобиля
                </th>
              </tr>
              <tr>
                <th>Марка:</th>
                <td>{insurance.car_brand}</td>
                <th>Модель:</th>
                <td>{insurance.car_model}</td>
                <td></td>
                <th>Номер:</th>
                <td>{insurance.car_number}</td>
                <th>Регион:</th>
                <td>{insurance.car_region}</td>
              </tr>
            </tbody>
          </table>
          <h2 className={style.driverDetailsName}>Список водителей</h2>

          {driversInsurance.map((driverInsurance, index) => (
            <div className={style.insuranceDetail} key={index}>
              <div className={style.driverDetailsImage}>
                <img
                  src={driverInsurance.driver.image_url}
                  alt="Фото водителя"
                />
              </div>
              <div className={style.insuranceDetailDriverInfo}>
                <div className={style.containerInsuranceDriverName}>
                  <h2 className={style.driverDetailsName}>ФИО водителя</h2>
                  <p className={style.driverDetailsExperience}>
                    {driverInsurance.driver.name}
                  </p>
                </div>
                <div className={style.containerInsuranceDriverName}>
                  <h2 className={style.driverDetailsName}>Стаж вождения</h2>
                  <p className={style.driverDetailsExperience}>
                    {driverInsurance.driver.experience_text}
                  </p>
                </div>
                <div className={style.containerInsuranceDriverName}>
                  <h2 className={style.driverDetailsName}>
                    Номер удостоверения
                  </h2>
                  <p className={style.driverDetailsCertificateNumber}>
                    {driverInsurance.driver.certificate_number}
                  </p>
                </div>
                {driverInsurance.owner && (
                  <div className={style.toastNotification}>
                    <div className={style.toastContent}>
                      <span className={style.toastIcon}>&#x2714;</span>
                      <div className={style.toastMessage}>
                        <span
                          className={`${style.statusLabel} ${style.active}`}
                        >
                          Владелец
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          <hr />
          <div className={style.insuranceDetailDriverInfo}>
            {insurance.status !== "deleted" && (
              <form
                method="POST"
                action={`/update_insurance_status/${insurance.type}`}
              >
                <button
                  type="submit"
                  name="action"
                  value="delete"
                  className={style.insuranceDetailButtonDelete}
                >
                  Удалить заказ
                </button>
              </form>
            )}

            {insurance.status !== "completed" ? (
              <h2 className={style.driverDetailsName}>
                Средний стаж: рассчитывается...
              </h2>
            ) : (
              <h2 className={style.driverDetailsName}>
                Средний стаж: {insurance.average_experience_text}
              </h2>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
