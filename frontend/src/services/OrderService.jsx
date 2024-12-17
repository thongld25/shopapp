import axios from "axios";
import API_BASE_URL from "./apiConfig";

export const createOrder = async (receiverName, receiverPhone, address) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(`${API_BASE_URL}/orders/place-order`, {receiverName, receiverPhone, address}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const listOrdersOfUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

