import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null); // เปลี่ยนค่าเริ่มต้นเป็น null
    const [image, setImage] = useState('');
    const [message, setMessage] = useState('');

    const fetchProductData = () => {
        const foundProduct = products.find(item => item._id === productId);
        if (foundProduct) {
            setProductData(foundProduct);
            setImage(foundProduct.image[0]);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [productId, products]);

    const handleSendMessage = () => {
        
    };

    return productData ? (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            {/* Product Data */}
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                {/* Product Images */}
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {productData.image.map((item, index) => (
                            <img 
                                onClick={() => setImage(item)} 
                                src={item} 
                                key={index} 
                                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' 
                                alt="" 
                            />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} alt="" />
                    </div>
                </div>

                {/* Product Info */}
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                    <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                    
                    <div className='flex items-center gap-2 mt-5'>
                        <button 
                            onClick={() => addToCart(productData._id)} 
                            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
                        >
                            ADD TO CART
                        </button>
                        <button 
                            onClick={handleSendMessage} 
                            className='bg-blue-500 text-white px-4 py-2 rounded'
                        >
                            ส่งข้อความ
                        </button>
                    </div>
                    
                    <hr className='mt-8 sm:w-4/5' />
                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>✔️ 100% Original product.</p>
                        <p>✔️ Cash on delivery is available on this product.</p>
                        <p>✔️ Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Display related products */}
        </div>
    ) : (
        <div className='opacity-0'></div>
    );
};

export default Product;
