import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [filterProducts, setFilterProducts] = useState([]);
    const [subCategory, setSubCategory] = useState('');

    const toggleSubCategory = (value) => {
        // Set selected subCategory to the value clicked
        setSubCategory(prev => (prev === value ? '' : value)); // ถ้าเลือกหมวดเดิมอีกครั้งให้ยกเลิก
    };

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        if (subCategory) {
            productsCopy = productsCopy.filter(item => item.subCategory === subCategory);
        }

        setFilterProducts(productsCopy);
    };

    useEffect(() => {
        setFilterProducts(products);
    }, [products]);

    useEffect(() => {
        applyFilter();
    }, [subCategory, search, showSearch]);

    return (
        <div>
            {/* ฟิลเตอร์ */}
            <div className=''>
                <div className='flex flex-row gap-10 justify-start text-sm font-light text-gray-700'> 
                    {/* ตัวเลือกเป็นปุ่มที่กดได้ */}
                    <div 
                        className={`cursor-pointer px-4 py-2 rounded ${subCategory === 'เสื้อ' ? 'font-bold text-yellow-500 underline' : ''}`}
                        onClick={() => toggleSubCategory('เสื้อ')}
                    >
                        เสื้อ
                    </div>
                    <div 
                        className={`cursor-pointer px-4 py-2 rounded ${subCategory === 'กางเกง' ? 'font-bold text-yellow-500 underline' : ''}`}
                        onClick={() => toggleSubCategory('กางเกง')}
                    >
                        กางเกง
                    </div>
                    <div 
                        className={`cursor-pointer px-4 py-2 rounded ${subCategory === 'รองเท้า' ? 'font-bold text-yellow-500 underline' : ''}`}
                        onClick={() => toggleSubCategory('รองเท้า')}
                    >
                        รองเท้า
                    </div>
                    <div 
                        className={`cursor-pointer px-4 py-2 rounded ${subCategory === 'อื่นๆ' ? 'font-bold text-yellow-500 underline' : ''}`}
                        onClick={() => toggleSubCategory('อื่นๆ')}
                    >
                        อื่นๆ
                    </div>
                </div>
            </div>

            {/* ส่วนของผลิตภัณฑ์ */}
            <div className='flex-1'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {filterProducts.map((item, index) => (
                        <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Collection;
