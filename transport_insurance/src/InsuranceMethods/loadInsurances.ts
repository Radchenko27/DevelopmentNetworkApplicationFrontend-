import { Dispatch, SetStateAction } from "react";
import axios from "axios";

export const fetchInsuranceDetails = async (
  isAuthenticated: boolean,
  draftInsuranceId: string,
  setError: Dispatch<SetStateAction<string | null>>,
  setInsuranceDetails: Dispatch<SetStateAction<any>>
) => {
  if ( !draftInsuranceId) {
    setError("Необходимо авторизоваться и получить ID заказа.");
    return;
  }
  setError(null);

  try {
    const response = await axios.get(`/insurances/${draftInsuranceId.toString()}/`);

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
  } finally {
    // setLoading(false);
  }
};
