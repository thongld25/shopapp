import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { listProducts } from "../services/ProductService";
import { getCart } from "../services/CartService";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { createOrder } from "../services/OrderService";

const PlaceOrder = () => {
  const { currency, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

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

  const handlePlaceOrder = async () => {
    try {
      // Call createOrder service
      const orderData = await createOrder(name, phone, address);
      if (orderData) {
        console.log("Order placed successfully:", orderData);
        toast.success("Order placed successfully!");
        navigate("/orders"); // Redirect to /order page
      }
      // Redirect to /order page
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    fetchProductData(); // Fetch products on component mount
    fetchCartData(); // Fetch cart data on component mount
  }, []);

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Phần Delivery Information - 2/3 */}
      <div className="flex flex-col gap-4 w-full sm:w-2/3">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Full Name"
          />
        </div>
        <input
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone number"
        />
        <input
          onChange={(e) => setAddress(e.target.value)}
          value={address}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Address"
        />
        <div>
          {cartData.items &&
            cartData.items.length > 0 &&
            cartData.items.map((item, index) => {
              const productData = products.find(
                (product) => product.id === Number(item.productId)
              );

              if (!productData) {
                return <div key={index}>Product not found</div>;
              }

              const productSize = item.productSize;
              if (!productSize) {
                return <div key={index}>Size not found for this item</div>;
              }

              return (
                <div
                  key={index}
                  className="py-4 border-t border-b text-gray-700 flex items-center gap-4"
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
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                          {productSize.size}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 ml-auto text-center">
                    {`Quantity: ${item.quantity}`}
                  </p>
                  <p className="ml-auto text-right">
                    {productData.price}
                    {currency}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Phần Cart Totals - 1/3 */}
      <div className="w-full sm:w-1/3">
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>
          <div className="mt-12">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex gap-3 flex-col lg:flex-row">
              <div className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">
                  CASH ON DELIVERY
                </p>
              </div>
            </div>
            <div className="w-full text-end mt-8">
              <button onClick={()=>handlePlaceOrder()} className="bg-black text-white px-16 py-3 text-sm">PLACE ORDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
