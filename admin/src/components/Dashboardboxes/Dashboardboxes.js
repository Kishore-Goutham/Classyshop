import React from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';
import { IoStatsChartSharp } from "react-icons/io5";


// Import Swiper styles
import 'swiper/css';


function Dashboardboxes() {
  return (
    <div className='mt-5'>
        <Swiper
        slidesPerView={4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className=' border p-5 border-slate-200 rounded-md shadow-md bg-white flex justify-between items-center gap-4 rouded-md'>
                  <div className=''>
                        <h1 className='font-light text-sm text-slate-500'>New Orders</h1>
                        <p className='text-2xl font-bold mt-1'>1,320</p>
                  </div>
                  <IoStatsChartSharp className='text-[#3872fa] text-3xl' />
            </div>
        </SwiperSlide>
         <SwiperSlide>
            <div className='bg-white border p-5 border-slate-200 rounded-md shadow-md flex justify-between items-center gap-4 rouded-md'>
                  <div className=''>
                        <h1 className='font-light text-sm text-slate-500'>Sales</h1>
                        <p className='text-2xl font-bold mt-1'>1,320</p>
                  </div>
                  <IoStatsChartSharp className='text-green-500 text-3xl' />
            </div>
        </SwiperSlide>
         <SwiperSlide>
            <div className='bg-white border p-5 border-slate-200 rounded-md shadow-md flex justify-between items-center gap-4 rouded-md'>
                  <div className=''>
                        <h1 className='font-light text-sm text-slate-500'>Revenue</h1>
                        <p className='text-2xl font-bold mt-1'>1,320</p>
                  </div>
                  <IoStatsChartSharp className='text-[#7928ca] text-3xl' />
            </div>
        </SwiperSlide>

         <SwiperSlide>
            <div className='border p-5 bg-white border-slate-200 rounded-md shadow-md flex justify-between items-center gap-4 rouded-md'>
                  <div className=''>
                        <h1 className='font-light text-sm text-slate-500'>New Orders</h1>
                        <p className='text-2xl font-bold mt-1'>1,320</p>
                  </div>
                  <IoStatsChartSharp className='text-[#3872fa] text-3xl' />
            </div>
        </SwiperSlide>
           <SwiperSlide>
            <div className=' border p-5 bg-white border-slate-200 rounded-md shadow-md flex justify-between items-center gap-4 rouded-md'>
                  <div className=''>
                        <h1 className='font-light text-sm text-slate-500'>New Orders</h1>
                        <p className='text-2xl font-bold mt-1'>1,320</p>
                  </div>
                  <IoStatsChartSharp className='text-[#3872fa] text-3xl' />
            </div>
        </SwiperSlide>
        
      </Swiper>
    </div>
  )
}

export default Dashboardboxes