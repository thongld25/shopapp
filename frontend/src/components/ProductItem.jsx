import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, images, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Kiểm tra nếu images có dữ liệu
  const imageUrl = images && images.length > 0 ? images[0].url : '';

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden' style={{
          width: '100%',
          aspectRatio: '1 / 1', // Tạo khung vuông
          overflow: 'hidden',
          position: 'relative', // Giữ hình ảnh đúng vị trí
        }}>
        <img
          className='hover:scale-110 transition ease-in-out'
          style={{
            width: '100%', // Đặt chiều rộng bằng khung
            height: '100%', // Đặt chiều cao bằng khung
            objectFit: 'contain', // Giữ hình ảnh vừa khít
          }}
          src={imageUrl}
          alt={name}
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{price}{currency}</p>
    </Link>
  );
};

export default ProductItem;
