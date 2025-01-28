"use server";
import { reviewPayload } from "@packages/lib/api-payloads/payloads";
import { getReviewDetailsFunction } from "@packages/lib/server-actions/server-action";
import ClickTrackerWrapper from "@packages/lib/utlils/clicktrackerwrapper";
import {
  CallToAction,
  ReviewDetailsList,
} from "@packages/lib/types/interfaces";
import Reviewslidercomponents from "@packages/shared-components/common-utilities/slider/reviewslidercomponents";
import React, { Suspense } from "react";

interface ReviewProps {
  heading?: string | undefined;
  subheading?: string | undefined;
  callAction?: CallToAction;
  pageName?: any;
  category?:any;
  subCategory?:any;
}
const Reviewscomponents: React.FC<ReviewProps> = async ({
  heading,
  subheading,
  callAction,
  pageName,
  category,
  subCategory,
}) => {
  const jsonResponse: ReviewDetailsList =
    await getReviewDetailsFunction(reviewPayload);
  if (!jsonResponse?.reviewDetail?.length) {
    return <div data-testid="empty-data"></div>;
  }
  return (
    <Suspense>
      <section className="reviews-container" data-testid="reviews-container">
        <div className="max-w-container mx-auto">
          <div className="reviews-card-container py-[34px] lg:py-[60px] lg:px-[0]">
            <div className="reviews-header px-[16px] md:px-[20px] xl:px-[0] mb-[26px] md:mb-[32px]">
              <h2 className="font-bold">{heading}</h2>
              <p className="font-normal small mt-[8px]">{subheading}</p>
            </div>
            <div className="reviews-inner-wrap">
              <Reviewslidercomponents
                reviewData={jsonResponse?.reviewDetail}
                pageName={pageName}
                data-testid="review-slider"
                data-review-count={jsonResponse.reviewDetail.length}
                parent_category={category}
                sub_Category={subCategory}
              />
              <div className="flex justify-center mt-[16px] lg:mt-[28px]">
                <ClickTrackerWrapper
                  gaData={{
                    event: "ga_contentful_events",
                    eventName: `${callAction?.primaryCtaEventName}`,
                    cta_name: `${callAction?.primaryCtaLabel}`,
                    cta_url: `${callAction?.primaryCtaUrl}`,
                    article_category: "",
                    page_name: pageName,
                    clearing: "in_year",
                  }}
                >
                  <a
                    href={`${callAction?.primaryCtaUrl}`}
                    className="flex items-center w-fit font-semibold para text-primary-400 hover:underline gap-[8px]"
                  >
                    {callAction?.primaryCtaLabel}
                    <svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.4814 0.814819L14.6666 6M14.6666 6L9.4814 11.1852M14.6666 6L1.33325 6"
                        stroke="#3460DC"
                        strokeWidth="1.48148"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </ClickTrackerWrapper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
};

export default Reviewscomponents;
