"use server";
import { ArtcileSliderQuery } from "@packages/lib/graphQL/theme-landing";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import Advicecourseslidercomponents from "@packages/shared-components/common-utilities/slider/advicecourseslidercomponents";
const Advicecomponents = async ({
  iscontentPreview,
  articleKeyString,
  heading,
  subheading,
}: any) => {
  const query = ArtcileSliderQuery(iscontentPreview, articleKeyString);
  const data = await graphQlFetchFunction(query, iscontentPreview);
  console.log(data);
  return (
    <>
      {data?.data?.contentData?.items.length > 0 && (
        <section className="advice-container bg-grey-50">
          <div className="max-w-container mx-auto">
            <div className="advice-card-container px-[0] py-[34px] md:py-[64px]">
              <div className="advice-header px-[20px] lg:px-[0] mb-[26px] md:mb-[32px]">
                {heading && <h2 className="font-bold">{heading}</h2>}
                {subheading && (
                  <p className="font-normal small mt-[8px]">{subheading}</p>
                )}
              </div>
              <div className="advice-course-container">
                <div className="advice-inner-wrap">
                  <Advicecourseslidercomponents />
                  <div className="flex justify-center mt-[16px] lg:mt-[28px]">
                    <a
                      href="#"
                      className="flex items-center w-fit font-semibold small text-primary-400 hover:underline gap-[8px]"
                    >
                      View more
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Advicecomponents;
