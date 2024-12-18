import { createContext, useState, useEffect } from "react";
import { listProducts } from "../services/ProductService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getCart } from "../services/CartService";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = '₫';
  const delivery_fee = 50000;
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartData = async () => {
    try {
      const cart = await getCart();
      setCartItems(cart.data);
      console.log('Cart Data:', cart.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const getCartItemNumber = () => {
    let total = 0;
    if (cartItems && cartItems.items) {
      for (const item of cartItems.items) {
        total += item.quantity;
      }
    }
    return total;
  };
  

  useEffect(() => {
    listProducts()
      .then(data => {
        setProducts(data.data); // Gán danh sách sản phẩm vào state
      })
      .catch(error => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      });
    // fetchCartData();
  }, []); // Chỉ chạy một lần khi component được render
  

  const value = {
    products, // Giá trị state sẽ tự động cập nhật khi có dữ liệu
    currency,
    delivery_fee,
    search, setSearch,
    showSearch, setShowSearch,
    cartItems, navigate,
    getCartItemNumber
  };

  

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
