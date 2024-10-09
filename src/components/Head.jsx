import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css'; // Core styles
import 'swiper/css/navigation'; // Navigation styles
import 'swiper/css/pagination'; // Pagination styles
import 'swiper/css/effect-fade'; // Effect Fade styles
import { assets } from '../assets/assets';

const ImageSlider = () => {
  return (
    <div className="relative mt-6"> {/* เพิ่ม margin-top ที่นี่ */}
      {/* Text Overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="mt-2">Discover the latest collections and exclusive offers.</p>
      </div>

      {/* Image Slider */}
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        loop={true}
        speed={1000}
        className="h-full" // Optional: ensure Swiper takes up full height
      >
        <SwiperSlide>
          <img src={assets.frontmfu} alt="Slide 2" className="w-full h-auto object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={assets.upsky} alt="Slide 3" className="w-full h-auto object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ImageSlider;
