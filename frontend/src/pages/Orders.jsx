import React, { useContext, useEffect, useState } from "react";
import { listOrdersOfUser } from "../services/OrderService";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { currency, navigate } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const ordersData = await listOrdersOfUser();
      console.log("Orders Data:", ordersData.data); // Log API response for orders
      if (ordersData) {
        setOrders(ordersData.data); // Update orders state
      } else {
        toast.error(ordersData.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders on component mount
  }, []);

  return (
    <div>
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {orders.length > 0 ? (
        <div>
          {orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1.5fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              key={index}
            >
              <img className="w-12" src={assets.package_icon} alt="" />

              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.productName} x {item.quantity}{" "}
                        <span>{item.productSize.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        {item.productName} x {item.quantity}{" "}
                        <span>{item.productSize.size}</span>,
                      </p>
                    );
                  }
                })}

                <p className="mt-3 mb-2 font-medium">{order.receiverName}</p>
                <p>{order.address}</p>
                <p>{order.receiverPhone}</p>
              </div>
              <div>
                <p className="text-sm sm:text-[15px]">
                  Items : {order.items.length}
                </p>
                <p className="mt-3">Method : COD</p>
                <p>Date : {new Date(order.orderDate).toLocaleString()}</p>
              </div>
              <p className="text-sm sm:text-[15px]">
                {order.totalAmount}
                {currency}
              </p>
              <p className="p-2 font-semibold">{order.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
