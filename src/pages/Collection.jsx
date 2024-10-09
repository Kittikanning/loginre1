import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(true);
    const [filterProducts, setFilterProducts] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory(prev => e.target.checked ? [...prev, value] : prev.filter(sub => sub !== value));
    }

    const applyFilter = () => {
        let productsCopy = products.slice();

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilterProducts(productsCopy);
    }

    useEffect(() => {
        setFilterProducts(products);
    }, [products]);

    useEffect(() => {
        applyFilter();
    }, [subCategory, search, showSearch]);

   
    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 border-t'>
            {/* Filter Options */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/* SubCategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Topwear' onChange={toggleSubCategory} />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Bottomwear' onChange={toggleSubCategory} />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value='Winterwear' onChange={toggleSubCategory} />Winterwear
                        </p>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className='flex-1'>
                

                {/* Map Products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {filterProducts.map((item, index) => (
                        <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Collection
