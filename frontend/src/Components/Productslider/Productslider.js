import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation} from 'swiper/modules';
import 'swiper/css/navigation';
import Productitem from '../Productitem/Productitem';

function Productslider({item,data=[]}) {   // data=[] is default when there is no data it takes emty array
   
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
          slidesPerView:item
        },
      }}
          spaceBetween={10} 
         navigation={true} 

         modules={[Navigation]} 
         className="mySwiper">
       
       {data.map((data,index)=>{
        return <SwiperSlide> <Productitem data={data}/></SwiperSlide>
       })}
            
            
      </Swiper>
    </div>
  )
}

export default Productslider