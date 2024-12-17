import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import { totalCartAmount } from "../services/CartService";

const CartTotal = () => {
  const { currency, delivery_fee } = useContext(ShopContext);
  const [totalAmount, setTotalAmount] = useState(0);

  const getCartAmount = async () => {
    try {
      const total = await totalCartAmount();
      console.log(total);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getCartAmount();
  });

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {totalAmount}
            {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {delivery_fee}
            {currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>
            {totalAmount === 0 ? 0 : totalAmount + delivery_fee}
            {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
