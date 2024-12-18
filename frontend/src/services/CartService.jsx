import axios from "axios";
import API_BASE_URL from "./apiConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export async function addToCart(id, nb, sz) {
  const token = localStorage.getItem("token");
  const url = `${API_BASE_URL}/cartItems/item/add?productId=${id}&quantity=${nb}&size=${sz}`;

  try {
    const response = await axios.post(
      url,
      null, // No data needed in the request body for this POST
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.data);  // Log the successful response
    return response.data; // Return the data for further processing
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        toast.error("Vui lòng đăng nhập để thực hiện thao tác này.");
        console.error("Unauthorized: Token không hợp lệ hoặc hết hạn.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (status === 403) {
        toast.error("Bạn không có quyền truy cập tài nguyên này.");
      } else if (status >= 500) {
        toast.error("Lỗi máy chủ. Vui lòng thử lại sau.");
      }
    } else if (error.request) {
      // console.log(error.request);
      toast.error("Không nhận được phản hồi từ máy chủ.");
    } else {
      toast.error("Lỗi khi thiết lập yêu cầu.");
    }
    throw error;
  }
}

export const getCart = async () => {
  const token = localStorage.getItem("token"); // Or however you store the token

  try {
    const response = await axios.get(`${API_BASE_URL}/carts/my-cart`, {
      // Replace /api/cart with your endpoint
      headers: {
        Authorization: `Bearer ${token}`, // Or the correct authorization scheme
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        toast.error("Vui lòng đăng nhập để thực hiện thao tác này.");
        console.error("Unauthorized: Token không hợp lệ hoặc hết hạn.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else if (status === 403) {
        toast.error("Bạn không có quyền truy cập tài nguyên này.");
      } else if (status >= 500) {
        toast.error("Lỗi máy chủ. Vui lòng thử lại sau.");
      }
    } else if (error.request) {
      // console.log(error.request);
      toast.error("Không nhận được phản hồi từ máy chủ.");
    } else {
      toast.error("Lỗi khi thiết lập yêu cầu.");
    }
    throw error;
  }
};

export const updateItem = async (id, quantity) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.put(
      `${API_BASE_URL}/cartItems/product/${id}/update?quantity=${quantity}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.error("Unauthorized: Token không hợp lệ hoặc hết hạn.");
        localStorage.removeItem("token");
        toast.error("Vui lòng đăng nhập để thực hiện thao tác này.");
        window.location.href = "/login";
      } else if (status === 403) {
        toast.error("Bạn không có quyền truy cập tài nguyên này.");
      } else if (status >= 500) {
        toast.error("Lỗi máy chủ. Vui lòng thử lại sau.");
      }
    } else if (error.request) {
      // console.log(error.request);
      toast.error("Không nhận được phản hồi từ máy chủ.");
    } else {
      toast.error("Lỗi khi thiết lập yêu cầu.");
    }
    throw error;
  }
};

export const clearItem = async (id) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/cartItems/product/${id}/remove`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.error("Unauthorized: Token không hợp lệ hoặc hết hạn.");
        localStorage.removeItem("token");
        toast.error("Vui lòng đăng nhập để thực hiện thao tác này.");
        window.location.href = "/login";
      } else if (status === 403) {
        toast.error("Bạn không có quyền truy cập tài nguyên này.");
      } else if (status >= 500) {
        toast.error("Lỗi máy chủ. Vui lòng thử lại sau.");
      }
    } else if (error.request) {
      // console.log(error.request);
      toast.error("Không nhận được phản hồi từ máy chủ.");
    } else {
      toast.error("Lỗi khi thiết lập yêu cầu.");
    }
    throw error;
  }
};

export const totalCartAmount = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_BASE_URL}/carts/cart/total-price`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        console.error("Unauthorized: Token không hợp lệ hoặc hết hạn.");
        localStorage.removeItem("token");
        toast.error("Vui lòng đăng nhập để thực hiện thao tác này.");
        window.location.href = "/login";
      } else if (status === 403) {
        toast.error("Bạn không có quyền truy cập tài nguyên này.");
      } else if (status >= 500) {
        toast.error("Lỗi máy chủ. Vui lòng thử lại sau.");
      }
    } else if (error.request) {
      // console.log(error.request);
      toast.error("Không nhận được phản hồi từ máy chủ.");
    } else {
      toast.error("Lỗi khi thiết lập yêu cầu.");
    }
    throw error;
  }
};
