import React from "react";

import { ReviewDetails } from "@packages/lib/types/interfaces";
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";
interface ReviewCardProps {
  reviewData: ReviewDetails;
  index: any;
  ratings: any;
  pageName?: any;
}
const Reviewscard: React.FC<ReviewCardProps> = ({ reviewData, pageName }) => {
  return (
    <ClickTrackerWrapper
      gaData={{
        event: "ga_contentful_events",
        eventName: "university_reviews",
        cta_name: "NA",
        cta_url: `/university-course-reviews/${reviewData?.collegetextkey}/${reviewData?.collegeId}`,
        website_name: `${process.env.PROJECT}`,
        page_name: pageName,
        college_id: reviewData?.collegeId,
        college_name: reviewData?.collegeName,
      }}
    >
      <a
        href={`/university-course-reviews/${reviewData?.collegetextkey}/${reviewData?.collegeId}`}
        className="reviews-card group  flex flex-col bg-white p-[16px] rounded-[8px] bg-white border border-grey-200 hover:border-primary-400 shadow-custom-2 min-h-[267px]"
      >
        <div
          data-testid="review-card"
          className="review-card-header flex items-center gap-[8px] border-b border-neutrale-200 pb-[16px] min-h-[83px]"
        >
          <div className="review-box__avatar flex justify-center items-center h6 text-white w-[48px] h-[48px] bg-primary-400 rounded-[100px]">
            {reviewData?.initial}
          </div>
          <div className="review-box__details flex flex-col justify-center w-[calc(100%_-_48px)]">
            <div className="review-box__name font-semibold small text-grey300 line-clamp-1">
              {reviewData?.reviewerName}
            </div>
            <div className="review-box__uniname small text-grey300 line-clamp-1">
              {reviewData?.collegeName}
            </div>
            <div className="review-rating flex justify-start gap-[5px] mt-[6px]">
              {Array.from({ length: 5 }, (_, _index) => (
                <svg
                  key={_index}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.85874 1.14803C8.21796 0.0424542 9.78205 0.0424547 10.1413 1.14803L11.4248 5.09818C11.5854 5.59261 12.0462 5.92736 12.566 5.92736H16.7195C17.8819 5.92736 18.3653 7.4149 17.4248 8.09818L14.0646 10.5395C13.644 10.8451 13.468 11.3867 13.6287 11.8812L14.9122 15.8313C15.2714 16.9369 14.006 17.8562 13.0656 17.173L9.70535 14.7316C9.28477 14.426 8.71525 14.426 8.29466 14.7316L4.93446 17.173C3.994 17.8562 2.72863 16.9369 3.08785 15.8313L4.37133 11.8812C4.53198 11.3867 4.35599 10.8451 3.93541 10.5395L0.575205 8.09818C-0.365252 7.4149 0.118079 5.92736 1.28055 5.92736H5.43399C5.95386 5.92736 6.41461 5.59261 6.57525 5.09818L7.85874 1.14803Z"
                    fill={
                      _index < parseInt(reviewData?.overallRating)
                        ? "#0FBEFD"
                        : "#CBD5E1"
                    }
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <div className="review-card-footer flex flex-col gap-[4px] pt-[12px]">
          {reviewData?.to_char && (
            <div className="reviewed__date x-small text-grey-500">
              {`Reviewed: ${reviewData?.to_char}`}
            </div>
          )}
          <div className="reviewed__dat e font-semibold para line-clamp-1">
            {reviewData?.courseTitle}
          </div>
          <div className="reviewed__date small text-grey-500 line-clamp-3 break-words">
            {reviewData?.comment}
          </div>
          <div className="reviewed__date font-semibold small text-primary-400 group-hover:underline">
            Read full review
          </div>
        </div>
      </a>
    </ClickTrackerWrapper>
  );
};

export default Reviewscard;
