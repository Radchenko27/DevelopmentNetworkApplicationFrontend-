import { Api, Insurance } from "../api/Api";

const api = new Api();

export const loadInsurances = async (
  sessionId: string | undefined,
  setInsurances: (insurances: Insurance[]) => void,
  setError: (error: string | null) => void,
  setLoading: (loading: boolean) => void
) => {
  if (!sessionId) {
    setError("Необходимо авторизоваться");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    // Устанавливаем sessionId в куки
    document.cookie = `sessionid=${sessionId}; path=/`; // Сохраняем sessionId в куки для передачи с запросом

    // Параметры запроса
    const queryParams = {
      insurance_status: "", // Фильтр по статусу
      start_date: "", // Начальная дата
      end_date: "", // Конечная дата
    };

    // Загружаем список всех заказов с параметрами фильтрации
    const response = await api.insurances.insurancesList(queryParams, {
      withCredentials: true, // Указываем, что сессия (куки) передается с запросом
    });

    // Логируем полный ответ от API
    console.log("Полученный ответ от API:", response);

    // Если заказов нет, просто передаем пустой массив в setOrders
    if (!response.data || response.data.length === 0) {
      setInsurances([]); // Пустой список заказов
      return;
    }

    // Просто передаем данные как есть, используя типы из интерфейсов
    const ordersData: Insurance[] = response.data;

    // Логируем, как выглядит data после преобразования
    console.log("Полученные данные заказов:", ordersData);

    setInsurances(ordersData); // Сохраняем данные в состояние
  } catch (err) {
    setError("Ошибка при загрузке списка заказов");
    console.error("Ошибка загрузки:", err);
  } finally {
    setLoading(false);
  }
};
