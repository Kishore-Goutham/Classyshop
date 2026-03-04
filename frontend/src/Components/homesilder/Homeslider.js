import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation,Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
import save from "../../assests/valentine.png"
import sale from "../../assests/sale.png"
import collection from "../../assests/newcol.png"

function Homeslider() {
  return (
         <Swiper loop={true} navigation={true} modules={[Navigation,Autoplay]}  autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} className="mySwiper">
        <SwiperSlide><img src={collection} alt='collection' className='!w-full !h-48 md:!h-full'/></SwiperSlide>
        <SwiperSlide><img src={save} alt='save' className='!w-full !h-48 md:!h-full'/></SwiperSlide>
        <SwiperSlide><img src={sale} alt='sale' className='!w-full !h-48 md:!h-full'/></SwiperSlide>
      </Swiper>
 
  )
}

export default Homeslider