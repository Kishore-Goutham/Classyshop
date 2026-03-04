import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation} from 'swiper/modules';
import 'swiper/css/navigation';
import Adsbannerbox from './Adsbannerbox';
import ad1 from '../../assests/ads/ad1.webp'
import ad2 from '../../assests/ads/ad2.webp'
import ad3 from '../../assests/ads/ad3.webp'
import ad4 from '../../assests/ads/ad4.webp'

function AdsbannerSlider(props) {
  return (
      <div>
         <Swiper
          slidesPerView={2}
              /* responsive breakpoints */
      breakpoints={{
        640: {
          slidesPerView: 3, // small screens
        },
        768: {
          slidesPerView: 4, // tablets
        },
        1024: {
          slidesPerView: props.item
        },
      }}
          spaceBetween={10} 
         navigation={true} 

         modules={[Navigation]} 
         className="mySwiper">
        <SwiperSlide><Adsbannerbox img={ad1} /></SwiperSlide> 
        <SwiperSlide><Adsbannerbox img={ad2}/> </SwiperSlide> 
        <SwiperSlide> <Adsbannerbox img={ad3}/></SwiperSlide> 
        <SwiperSlide> <Adsbannerbox img={ad4}/></SwiperSlide> 
        <SwiperSlide><Adsbannerbox img={ad1}/></SwiperSlide> 
        <SwiperSlide> <Adsbannerbox img={ad1}/></SwiperSlide> 
        <SwiperSlide> <Adsbannerbox img={ad1}/></SwiperSlide> 
            
      </Swiper>
    </div>
  )
}

export default AdsbannerSlider