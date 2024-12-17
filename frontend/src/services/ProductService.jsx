import axios from "axios";
import API_BASE_URL from "./apiConfig";

export const listProducts = () =>
  axios
    .get("http://localhost:9193/api/v1/products/all")
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
    });

export const getProductById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/product/${id}/product`
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
