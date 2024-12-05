import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Product from '../pages/Product';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, brand}) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(()=> {
        if(products.length > 0) {
            let productCopy = products.slice();
            productCopy = productCopy.filter((item)=> category === item.category.name);
            productCopy = productCopy.filter((item)=> brand === item.brand);

            setRelated(productCopy.slice(0, 5));
        }
    }, [products])

  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item,index)=>(
            <ProductItem key={index} id={item.id} name={item.name} price={item.price} images={item.images}/>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts