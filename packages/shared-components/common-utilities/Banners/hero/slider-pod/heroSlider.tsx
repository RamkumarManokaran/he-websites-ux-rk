"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import HeroSliderCard from "@packages/shared-components/common-utilities/cards/hero-card/heroslidercard";
import { SliderBannerCollection } from "@packages/lib/types/interfaces";
interface PropsInterface {
  data: SliderBannerCollection;
  pageName?: any;
}

const HeroSlider = ({ data, pageName }: PropsInterface) => {
  return (
    <Swiper
      slidesPerView={1}
      data-testid="parent_swiper"
      effect={"fade"}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
      modules={[Autoplay, EffectFade, Pagination]}
      className="mySwiper hero"
    >
      {data?.items?.map((childItems, index: number) => (
        <SwiperSlide key={index + 1} data-testid={`slider${index + 1}`}>
          <HeroSliderCard data={childItems} index={index} pageName={pageName} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
