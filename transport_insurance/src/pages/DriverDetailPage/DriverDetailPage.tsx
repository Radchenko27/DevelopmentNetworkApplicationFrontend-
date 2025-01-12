import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import { RootState } from '../../store';
import { fetchDriverById } from '../../slices/driverSlice'; // Импортируем thunk
import { Driver } from '../../mock/mockData'; // Тип для водителя
import styles from './DriverDetailPage.module.css';
import NavBar from '../../components/Navbar/Navbar';
import Header from '../../components/Header/Header';
import Breadcrumbs from '../../components/Breadcrumb';
import IngosLogo from '../../components/Ingoslogo/Ingoslogo';
import CollapsibleMenu from '../../components/CollapsibleMenu/CollapsibleMenu';

const defaultImageUrl = 'http://127.0.0.1:9000/test/images.png';

const DriverDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем id водителя из URL
  const dispatch = useDispatch();

  const { driver, loading, error } = useSelector((state: RootState) => state.driver); // Получаем состояние из Redux

  useEffect(() => {
    if (id) {
      dispatch(fetchDriverById(id)); // Загружаем данные о водителе по id
    }
  }, [id, dispatch]);

  const breadcrumbItems = [
    { label: 'Главная', path: '/' },
    { label: 'Список водителей', path: '/drivers' },
    { label: driver?.name || 'Загрузка...', path: '#' },
  ];

  if (loading) {
    return (
      <Container>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!driver) {
    return (
      <Container>
        <Alert variant="warning">Данные о водителе отсутствуют.</Alert>
      </Container>
    );
  }

  const menuItems = [
    { name: 'Главная', path: '/' },
    { name: 'Список водителей', path: '/drivers' },
  ];

  return (
    <>
      <Header />
      <NavBar>
        <IngosLogo />
        <CollapsibleMenu menuItems={menuItems} />
      </NavBar>
      <div className={styles.main__container}>
        <h2 className={styles.main_title}>Сведения о водителе</h2>
      </div>
      <div className={styles.services__container2}>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <Container className={styles.services}>
        <div className={styles.driver_details}>
          <div className={styles.driver_details__image}>
            <img src={driver.image_url || defaultImageUrl} alt={driver.name} />
          </div>
          <div className={styles.driver_details__info}>
            <h2 className={styles.driver_details__name}>{driver.name}</h2>
            <p className={styles.driver_details__experience}>Стаж: {driver.experience}</p>
            <p className={styles.driver_details__license}>Категории прав: {driver.license}</p>
            <p className={styles.driver_details__certificate_number}>Номер водительского удостоверения: {driver.certificate_number}</p>
            <p className={styles.driver_details__characteristics}>{driver.characteristics}</p>
            <Link to="/drivers/" className={styles.driver_details__back_button}>
              Вернуться
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DriverDetailPage;