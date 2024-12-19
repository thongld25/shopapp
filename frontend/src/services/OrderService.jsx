import axios from "axios";
import API_BASE_URL from "./apiConfig";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
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

export const listOrdersOfUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/order`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
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