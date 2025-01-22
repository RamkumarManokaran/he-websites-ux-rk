"use client";
import React from "react";
import AdviceCourseCard from "../cards/advice-course/advicecoursecard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
const Advicecourseslidercomponents = ({
  articledata,
  iscontentPreview,
}: any) => {
  return (
    <>
      {articledata && (
        <div className="slider-container">
          <Swiper
            pagination={true}
            navigation={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              1200: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            modules={[FreeMode, Pagination, Navigation]}
            className="MultiSwiper"
          >
            {articledata?.map((items: any, index: number) => (
              <SwiperSlide className="h-auto-important" key={index + 1}>
                <AdviceCourseCard
                  jsondata={items}
                  index={index}
                  iscontentPreview={iscontentPreview}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default Advicecourseslidercomponents;
