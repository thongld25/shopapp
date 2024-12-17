import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { clearItem, getCart, updateItem } from "../services/CartService";
import { listProducts } from "../services/ProductService";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { currency, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await updateItem(id, quantity);
      console.log(response);
      fetchCartData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const clearCartItem = async (id) => {
    try {
      const response = await clearItem(id);
      console.log(response);
      fetchCartData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const fetchProductData = async () => {
    try {
      const productsData = await listProducts();
      // console.log('Products Data:', productsData);  // Log API response for products
      setProducts(productsData.data); // Update products state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCartData = async () => {
    try {
      const cart = await getCart();
      // console.log('Cart Data:', cart);  // Log API response for cart
      setCartData(cart.data); // Update cart state
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    fetchProductData(); // Fetch products on component mount
    fetchCartData(); // Fetch cart data on component mount
  }, []);

  // // Log cartData and products after they are updated
  // useEffect(() => {
  //   console.log("Updated Cart Data:", cartData);
  // }, [cartData]);

  // useEffect(() => {
  //   console.log("Updated Products:", products);
  // }, [products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.items &&
          cartData.items.length > 0 &&
          cartData.items.map((item, index) => {
            // Tìm sản phẩm từ danh sách products
            const productData = products.find(
              (product) => product.id === Number(item.productId)
            );

            // Kiểm tra nếu không tìm thấy productData
            if (!productData) {
              return <div key={index}>Product not found</div>; // Hiển thị thông báo nếu không tìm thấy sản phẩm
            }

            // Kiểm tra nếu không có productSize trong item
            const productSize = item.productSize;
            if (!productSize) {
              return <div key={index}>Size not found for this item</div>;
            }

            return (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <img
                    className="w-16 sm:w-20"
                    src={productData.images[0].url}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {productData.price}
                        {currency}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {productSize.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => {
                    const newQuantity =
                      e.target.value === "" || e.target.value === "0"
                        ? 0
                        : Number(e.target.value);
                    // Cập nhật số lượng nếu giá trị hợp lệ và không vượt quá tồn kho
                    if (
                      newQuantity > 0 &&
                      newQuantity <= productSize.inventory
                    ) {
                      updateQuantity(item.productSize.id, newQuantity);
                    }
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  max={productSize.inventory}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => clearCartItem(item.productSize.id)}
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Remove item"
                />
              </div>
            );
          })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
