import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';

const Cart = () => {

    const { products, currency, cartItems } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = [];

        // วนลูปผ่าน cartItems
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                tempData.push({
                    _id: itemId,
                    quantity: cartItems[itemId]
                });
            }
        }

        setCartData(tempData);

    }, [cartItems]);

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <h1>Your CART</h1>
            </div>
            <div>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);

                    return (
                        <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                            <div className='flex items-start gap-6'>
                                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                                <div>
                                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                    <div className='flex items-center gap-5 mt-2'>
                                        <p>{currency}{productData.price}</p>

                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Cart;
