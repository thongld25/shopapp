import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const OrderCard = ({ order }) => {

    const { currency } = useContext(ShopContext);
    
  return (
    <div className="border rounded-lg p-4 shadow-md mb-6">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <div>
          <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
          <p className="text-sm text-gray-600">Date placed: {new Date(order.orderDate).toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total amount: {order.totalAmount}{currency}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">{order.receiverName}</h3>
          <p className="text-sm text-gray-600">Phone: {order.receiverPhone}</p>
          <p className="text-sm text-gray-600">Address: {order.address}</p>
        </div>
        
        <p className="text-sm text-green-500">{order.status}</p>
      </div>
      {order.items.map((item, index) => (
        <div key={index} className="flex items-center gap-4 mb-4">
          <Link to={`/product/${item.productId}`}>
            <img
            src={item.urlImage}
            alt={item.productName}
            className="w-20 h-20 rounded border"
          />
          </Link>
          <div>
            <Link to={`/product/${item.productId}`}>
              <h4 className="font-semibold">{item.productName}</h4>
            </Link>
            <p className="text-sm text-gray-600">{item.productSize} x {item.quantity}</p>
            <p className="text-sm">{item.price}{currency}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderCard;
