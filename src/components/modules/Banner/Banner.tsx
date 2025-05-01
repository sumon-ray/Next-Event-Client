'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import img from '../../../../public/images/img3.jpg'
const Banner = () => {
    return (
        <div>
<Swiper
    modules={[Navigation, Pagination, Scrollbar,Autoplay  ]}
    navigation
    pagination
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 3500,
      disableOnInteraction: false,
    }}
    scrollbar={{ draggable: true }}
>
    <SwiperSlide>
        <Image width={1000} height={1000} quality={100} alt='Banner' className='h-[90dvh] w-full ' src={img} loading="lazy" />
    </SwiperSlide>
    <SwiperSlide>
        <Image width={1000} height={1000} quality={100} alt='Banner' className='h-[90dvh] w-full ' src={img} loading="lazy" />
    </SwiperSlide>
    <SwiperSlide>
        <Image width={1000} height={1000} quality={100} alt='Banner' className='h-[90dvh] w-full' src={img} loading="lazy" />
    </SwiperSlide>
    
</Swiper>
</div>
    );
};

export default Banner;