"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import Reviewscard from "../cards/reviews-card/reviewscard";
import { ReviewDetailsList } from "@packages/lib/types/interfaces";
import { getArticleDetailUrlParamValues } from "@packages/lib/utlils/helper-function";

interface ReviewSliderProps {
  reviewData: ReviewDetailsList["reviewDetail"];
  pageName?: any;
  parent_category?:any;
  sub_Category?:any;
}

const Reviewslidercomponents: React.FC<ReviewSliderProps> = ({
  reviewData,
  pageName,
  parent_category,
  sub_Category,
}) => {

  const{category, subCategory, articleTitle} = getArticleDetailUrlParamValues();

  return (
    <>
      <div className="slider-container" data-testid="review-slider">
        <Swiper
          pagination={{ clickable: true }}
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
          {reviewData?.map((review, index) => (
            <SwiperSlide key={index}>
              <Reviewscard
                reviewData={review}
                index={index}
                ratings={5}
                pageName={pageName}
                article_category={category ? category : parent_category}
                article_subCat={subCategory ? subCategory: sub_Category}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Reviewslidercomponents;
