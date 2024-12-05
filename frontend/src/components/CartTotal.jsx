import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import { totalCartAmount } from '../services/CartService';

const CartTotal = () => {

    const {currency, delivery_fee} = useContext(ShopContext);

    const getCartAmount = async () => {
      try {
        const totalAmount = await totalCartAmount();
        console.log(totalAmount);
        return totalAmount.data;  // Log API response for products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>

      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
            <p>Subtotal</p>
            <p>{getCartAmount()}{currency}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Shipping Fee</p>
            <p>{delivery_fee}{currency}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>Total</p>
            <p>{getCartAmount()===0 ? 0 : getCartAmount()+delivery_fee}{currency}</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
