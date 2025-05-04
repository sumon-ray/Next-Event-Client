'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import img from '../../../../public/images/img16.jpg'
import img2 from '../../../../public/images/img14.jpg'
import img3 from '../../../../public/images/img15.jpg'
import NextButton from '@/components/shared/NextButton';
import Link from 'next/link';
const Banner = () => {
    return (
        <div className='w-full'>
<Swiper
    modules={[Navigation, Pagination, Scrollbar,Autoplay  ]}
    navigation
    pagination
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 3500,
      disableOnInteraction: true,
    }}
    scrollbar={{ draggable: true }}
>
<SwiperSlide>
    <div className="relative w-full h-[100dvh]">
        <Image
          src={img2}
          alt="Events Banner"
          width={1000} height={1000} quality={100}
          
          loading="lazy"
          className="object-cover w-full"
        />
      <div className="absolute flex lg:items-center top-20 md:inset-0 bg-black/60">
  <div className="container mx-auto md:mt-24 lg:mt-0">
    <h1 className="text-3xl font-bold leading-10 tracking-wide text-white md:text-5xl lg:text-6xl">
      Discover <br /><span className="my-2 text-[#3B82F6]">Next-Level Events</span><br />
      <span className="">Celebrate Moments, Join Experiences</span><br />
      <span className="hidden mt-4 text-xl font-medium md:block text-white/90 md:text-2xl">
        Browse, Book & Be There – All in One Place.
      </span>
    </h1>
  </div>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 px-4 pb-10 md:px-8">
  <div className="bg-gradient-to-r from-[#0F172A]/90 to-[#1E293B]/90 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg text-white max-w-5xl mx-auto">
    <p className="mb-4 text-base md:text-lg text-white/80">
      Discover events that spark connections, creativity, and celebration. Your next great moment is just a click away.
    </p>

    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
   
      <div className="flex gap-4">
       <Link href="/events"> <NextButton name="Our Services">
          
          </NextButton></Link>
        <button className="px-6 py-2 font-semibold text-white border border-white hover:bg-white hover:text-[#1E293B] rounded-md transition-all duration-300">
          Get Started →
        </button>
      </div>

   
      <div className="grid grid-cols-1 gap-6 pt-6 mt-6 text-center border-t sm:grid-cols-3 md:mt-0 border-white/10">
        <div>
          <div className="text-xl font-bold">⭐ 4.9</div>
          <p className="mt-1 text-sm text-white/70">Our Ratings</p>
        </div>
        <div>
          <div className="flex items-center justify-center -space-x-2">
            <div className="flex items-center justify-center -space-x-2">
            <img src="/images/terr1.jpg" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
            <img src="/images/terr2.webp" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
            <img src="/images/terr3.jpg" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
          </div>
          </div>
          <p className="mt-2 text-sm text-white/70">450+ Clients Trust</p>
        </div>
        <div>
          <div className="text-2xl font-bold">98%</div>
          <p className="mt-1 text-sm text-white/70">Satisfaction</p>
        </div>
      </div>
    </div>
  </div>
</div>
     
    </SwiperSlide>
<SwiperSlide>
    <div className="relative w-full h-[100dvh]">
        <Image
          src={img}
          alt="Events Banner"
          width={1000} height={1000} quality={100}
          
          loading="lazy"
          className="object-cover w-full"
        />
      <div className="absolute flex lg:items-center top-20 md:inset-0 bg-black/60">
  <div className="container mx-auto md:mt-24 lg:mt-0">
    <h1 className="text-3xl font-bold leading-tight tracking-wide text-white md:text-5xl lg:text-6xl">
      Discover <br /><span className="my-2 text-[#3B82F6]">Next-Level Events</span><br />
      <span className="">Celebrate Moments, Join Experiences</span><br />
      <span className="hidden mt-4 text-xl font-medium md:block text-white/90 md:text-2xl">
        Browse, Book & Be There – All in One Place.
      </span>
    </h1>
  </div>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 px-4 pb-10 md:px-8">
  <div className="bg-gradient-to-r from-[#0F172A]/90 to-[#1E293B]/90 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg text-white max-w-5xl mx-auto">
    <p className="mb-4 text-base md:text-lg text-white/80">
      Discover events that spark connections, creativity, and celebration. Your next great moment is just a click away.
    </p>

    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
   
      <div className="flex gap-4">
       <Link href="/events"> <NextButton name="Our Services">
          
          </NextButton></Link>
        <button className="px-6 py-2 font-semibold text-white border border-white hover:bg-white hover:text-[#1E293B] rounded-md transition-all duration-300">
          Get Started →
        </button>
      </div>

   
      <div className="grid grid-cols-1 gap-6 pt-6 mt-6 text-center border-t sm:grid-cols-3 md:mt-0 border-white/10">
        <div>
          <div className="text-xl font-bold">⭐ 4.9</div>
          <p className="mt-1 text-sm text-white/70">Our Ratings</p>
        </div>
        <div>
          <div className="flex items-center justify-center -space-x-2">
            <div className="flex items-center justify-center -space-x-2">
            <img src="/images/terr1.jpg" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
            <img src="/images/terr2.webp" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
            <img src="/images/terr3.jpg" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
          </div>
          </div>
          <p className="mt-2 text-sm text-white/70">450+ Clients Trust</p>
        </div>
        <div>
          <div className="text-2xl font-bold">98%</div>
          <p className="mt-1 text-sm text-white/70">Satisfaction</p>
        </div>
      </div>
    </div>
  </div>
</div>
     
    </SwiperSlide>
<SwiperSlide>
    <div className="relative w-full h-[100dvh]">
        <Image
          src={img3}
          alt="Events Banner"
          width={1000} height={1000} quality={100}
          
          loading="lazy"
          className="object-cover w-full"
        />
      <div className="absolute flex lg:items-center top-20 md:inset-0 bg-black/60">
  <div className="container mx-auto md:mt-24 lg:mt-0">
    <h1 className="text-3xl font-bold leading-tight tracking-wide text-white md:text-5xl lg:text-6xl">
      Discover <br /><span className="my-2 text-[#3B82F6]">Next-Level Events</span><br />
      <span className="">Celebrate Moments, Join Experiences</span><br />
      <span className="hidden mt-4 text-xl font-medium md:block text-white/90 md:text-2xl">
        Browse, Book & Be There – All in One Place.
      </span>
    </h1>
  </div>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 px-4 pb-10 md:px-8">
  <div className="bg-gradient-to-r from-[#0F172A]/90 to-[#1E293B]/90 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-lg text-white max-w-5xl mx-auto">
    <p className="mb-4 text-base md:text-lg text-white/80">
      Discover events that spark connections, creativity, and celebration. Your next great moment is just a click away.
    </p>

    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
   
      <div className="flex gap-4">
       <Link href="/events"> <NextButton name="Our Services">
          
          </NextButton></Link>
        <button className="px-6 py-2 font-semibold text-white border border-white hover:bg-white hover:text-[#1E293B] rounded-md transition-all duration-300">
          Get Started →
        </button>
      </div>

   
      <div className="grid grid-cols-1 gap-6 pt-6 mt-6 text-center border-t sm:grid-cols-3 md:mt-0 border-white/10">
        <div>
          <div className="text-xl font-bold">⭐ 4.9</div>
          <p className="mt-1 text-sm text-white/70">Our Ratings</p>
        </div>
        <div>
          <div className="flex items-center justify-center -space-x-2">
            <div className="flex items-center justify-center -space-x-2">
            <img src="/images/terr1.jpg" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
            <img src="/images/terr2.webp" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
            <img src="/images/terr3.jpg" alt="Client" className="object-cover w-8 h-8 border-2 border-white rounded-full" />
          </div>
          </div>
          <p className="mt-2 text-sm text-white/70">450+ Clients Trust</p>
        </div>
        <div>
          <div className="text-2xl font-bold">98%</div>
          <p className="mt-1 text-sm text-white/70">Satisfaction</p>
        </div>
      </div>
    </div>
  </div>
</div>
     
    </SwiperSlide>
  
    
  
    
</Swiper>
</div>
    );
};

export default Banner;