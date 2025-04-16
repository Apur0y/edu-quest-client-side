import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import img1 from "../../../assets/banner/img3.jpg";
import img2 from "../../../assets/banner/img4.jpg";
import img3 from "../../../assets/banner/img5.jpg";
import img4 from "../../../assets/banner/img6.jpg";
import "./banner.css";

const Banner = () => {
  return (
    <div className="bg-black mb-20">
      <Swiper
      
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper w-full h-screen max-h-[800px]"
      >
        {[
          { img: img2, title: "Eazy Effective Learning" },
          { img: img1, title: "Dedicated Personalities" },
          { img: img3, title: "Group Wise Learning" },
          { img: img4, title: "Explore New Chapter" },
        ].map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <div className="absolute z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white w-full px-4">
                <p className="text-4xl md:text-6xl lg:text-6xl  font-bold  mb-2">We believe in</p>
                <h1 className="text-4xl md:text-6xl lg:text-6xl  font-bold mb-2">
                  {slide.title}
                </h1>
                <p className="text-sm md:text-base">Learn Best From the Best.</p>
              </div>
              <img 
                src={slide.img} 
                alt={`Banner ${index + 1}`} 
                className="w-full h-full object-cover opacity-70" 
              />
            </div>
            <div className="absolute inset-0 bg-teal-900/70 z-10" />

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;