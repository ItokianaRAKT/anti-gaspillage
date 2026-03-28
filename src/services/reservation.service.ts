import api from "../api/axios";

interface ReservationPayload {
    quantity_reserved: number;
    estimated_recovery_time: string;
    product: string
}

const createReservation = async (playload: ReservationPayload) => {
    const response = await api.post("/reservations/", playload);
    return response.data;
};

const annulerReservation = async (id_reservation: string) => {
    const response = await api.post(`/reservations/${id_reservation}/not-collected/`);
    return response.data;
};

const collecterReservation = async (id_reservation: string) => {
  const response = await api.post(`/reservations/${id_reservation}/collect/`);
  return response.data;
};
 

export { createReservation, annulerReservation, collecterReservation }