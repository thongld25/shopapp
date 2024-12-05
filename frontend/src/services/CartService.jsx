import axios from "axios";
import API_BASE_URL from "./apiConfig";

export async function addToCart(id, nb, sz) {
    const token = localStorage.getItem('token');
    const url = `${API_BASE_URL}/cartItems/item/add?productId=${id}&quantity=${nb}&size=${sz}`;

    try {
        const response = await axios.post(
            url,
            null, // No data needed in the request body for this POST
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        // console.log(response.data);  // Log the successful response
        return response.data; // Return the data for further processing

    } catch (error) {
        // console.error("Error adding to cart:", error); // More informative error message
        throw error; // Re-throw the error to be handled higher up in the component
    }
}

// export async function getCart() {
//     const token = localStorage.getItem('token');
//     try {
//         const response = await axios.get(
//             `${API_BASE_URL}/carts/my-cart`,
//             null,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 }
//             }
//         );
//         console.log(response.data);
//         return response.data;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }


export const getCart = async () => {
    const token = localStorage.getItem('token'); // Or however you store the token

    try {
      const response = await axios.get(`${API_BASE_URL}/carts/my-cart`, { // Replace /api/cart with your endpoint
        headers: {
          Authorization: `Bearer ${token}` // Or the correct authorization scheme
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error; // Re-throw the error to be caught in your component
    }
  };

export const updateItem = async (id, quantity) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.put(
            `${API_BASE_URL}/cartItems/product/${id}/update?quantity=${quantity}`,
            null,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
      throw error;
    }
}

export const clearItem = async(id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/cartItems/product/${id}/remove`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
      throw error;
    }
}

export const totalCartAmount = async() => {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.get(
            `${API_BASE_URL}/carts/cart/total-price`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
      throw error;
    }
}

