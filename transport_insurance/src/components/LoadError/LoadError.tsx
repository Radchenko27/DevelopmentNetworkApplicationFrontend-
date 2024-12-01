import  { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap"; // Импортируем только компоненты
// import "bootstrap/dist/css/bootstrap.min.css"; // Импортируем стили для компонента
import styles from "./LoadError.module.css";
const LoadError = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Пример асинхронного запроса
    setTimeout(() => {
      setError("Что-то пошло не так");
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Spinner animation="border" />} {/* Отображение Spinner */}
      {error && <Alert variant="danger">{error}</Alert>}{" "}
      {/* Отображение Alert */}
    </div>
  );
};

export default LoadError;
