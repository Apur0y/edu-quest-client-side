import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import img1 from "../../../assets/banner/img3.jpg";
import img2 from "../../../assets/banner/img4.jpg";
import img3 from "../../../assets/banner/img5.jpg";
import img4 from "../../../assets/banner/img6.jpg";
import "./banner.css";

const Banner = () => {
  return (
    <div className="bg-black">
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper max-h-lvh"
      >
        <SwiperSlide>
          <div className="absolute z-30 top-1/2 left-1/2 bottom-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p className="font-medium text-2xl">We believe in</p>
            <h1 className="text-8xl fonttext font-semibold">
              LifeLong Learning
            </h1>
            <p>Learn Best From the Best.</p>
          </div>
          <img src={img2} alt="Banner 2" className="w-full opacity-70" />
        </SwiperSlide>

        <SwiperSlide>
        <div className="absolute z-30 top-1/2 left-1/2 bottom-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p className="font-medium text-2xl">We believe in</p>
            <h1 className="text-8xl fonttext font-semibold">
              Dedicated Personalities
            </h1>
            <p>Learn Best From the Best.</p>
          </div>
          <img src={img1} alt="Banner 1 " className="w-full opacity-70" />
        </SwiperSlide>
        <SwiperSlide>
        <div className="absolute z-30 top-1/2 left-1/2 bottom-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p className="font-medium text-2xl">We believe in</p>
            <h1 className="text-8xl fonttext font-semibold">
              Group Learning
            </h1>
            <p>Learn Best From the Best.</p>
          </div>
          <img src={img3} alt="Banner 3"  className="w-full opacity-70" />
        </SwiperSlide>
        <SwiperSlide>
        <div className="absolute z-30 top-1/2 left-1/2 bottom-20 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <p className="font-medium text-2xl">We believe in</p>
            <h1 className="text-8xl fonttext font-semibold">
              Solo Learning
            </h1>
            <p>Learn Best From the Best.</p>
          </div>
          <img src={img4} alt="Banner 4" className="w-full opacity-70" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
