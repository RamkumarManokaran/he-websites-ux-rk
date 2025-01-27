"use server";
import React from "react";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { testimonial } from "@packages/lib/graphQL/graphql-query";
import TestimonialVideo from "./testimonialvideocomponents";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Testimonialcomponents = async ({
  heading,
  subheading,
  internalName,
  routename,
  contentModelName,
  iscontentPreview,
  parentSysId,
}: {
  heading: string;
  subheading: string;
  internalName: string;
  routename: string;
  contentModelName: string;
  iscontentPreview?: boolean;
  parentSysId?: string;
}) => {
  const query = homePageComponentQueryFormation(
    internalName,
    testimonial,
    routename,
    contentModelName,
    iscontentPreview
  );
  const testimonialJsonData = await graphQlFetchFunction(
    query,
    iscontentPreview
  );
  const contentfullData =
    testimonialJsonData?.data?.contentData?.items[0]?.bodyContentCollection
      ?.items[0]?.mediaCardsCollection?.items[0] || [];
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: parentSysId,
              fieldId: "cardSectionTitle",
              targetSelector: "#testimonial_heading",
            },
            {
              entryId: parentSysId,
              fieldId: "shortDescription",
              targetSelector: "#testimonial_subheading",
            },
            {
              entryId: contentfullData?.testimonialBlockRight?.sys?.id,
              fieldId: "firstname",
              targetSelector: "#firstname",
            },
            {
              entryId: contentfullData?.testimonialBlockRight?.sys?.id,
              fieldId: "shortBio",
              targetSelector: "#shortBio",
            },
            {
              entryId: contentfullData?.testimonialBlockRight?.sys?.id,
              fieldId: "testimonialText",
              targetSelector: "#testimonialText",
            },
          ]}
        />
      )}
      <section className="testimonials-container">
        <div className="max-w-container mx-auto">
          <div className="testimonials-card-container px-[16px] md:px-[20px] py-[34px] md:py-[64px] xl:px-[0]">
            <div className="testimonials-header mb-[26px] md:mb-[32px]">
              <h2 className="font-bold" id="testimonial_heading">
                {heading}
              </h2>
              <p
                className="font-normal small mt-[8px]"
                id="testimonial_subheading"
              >
                {subheading}
              </p>
            </div>
            <div className="testimonials-inner-wrap grid grid-cols-1 lg:grid-cols-2 gap-[16px]">
              <TestimonialVideo contentfullRightData={contentfullData} />
              <div className="testimonial-card grid content-between p-[24px] rounded-[8px] gap-[16px] bg-primary-500">
                <div
                  className="h5 !font-medium para-lg md:text-heading5 md:head text-white"
                  id="testimonialText"
                >
                  &ldquo;
                  {contentfullData?.testimonialBlockRight?.testimonialText}
                  &rdquo;
                </div>
                <div className="testimonial-footer">
                  <div
                    className="author-name font-semibold small text-white"
                    id="firstname"
                  >
                    {contentfullData?.testimonialBlockRight?.author?.firstName}
                  </div>
                  <p className="small text-white" id="shortBio">
                    {contentfullData?.testimonialBlockRight?.author?.shortBio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonialcomponents;
