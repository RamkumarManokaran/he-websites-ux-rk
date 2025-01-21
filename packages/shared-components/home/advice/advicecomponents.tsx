"use server";
import { ArtcileSliderQuery } from "@packages/lib/graphQL/theme-landing";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import Advicecourseslidercomponents from "@packages/shared-components/common-utilities/slider/advicecourseslidercomponents";
import { ContentfulInspectorManager } from "@packages/lib/contentful-preview/ContentfulInspector";
const Advicecomponents = async ({
  iscontentPreview,
  articleKeyArray,
  heading,
  subheading,
  parentSysId,
}: any) => {
  function customStringify(obj: any): string {
    if (Array.isArray(obj)) {
      return `[${obj?.map(customStringify).join(", ")}]`;
    } else if (typeof obj === "object" && obj !== null) {
      return `{ ${Object.entries(obj)
        ?.map(([key, value]) => `${key}: ${customStringify(value)}`)
        .join(", ")} }`;
    } else if (typeof obj === "string") {
      return `"${obj}"`;
    } else {
      return String(obj);
    }
  }

  const newdt: any = [];
  articleKeyArray?.forEach((item: any) => {
    const obj = {
      metaTagTopics: { title: item?.title },
    };
    newdt.push(obj);
  });
  const stringifiedArray = customStringify(newdt);
  const query = ArtcileSliderQuery(iscontentPreview, stringifiedArray);
  const data = await graphQlFetchFunction(query, iscontentPreview);
  console.log(query);
  console.log("new landing pae data", data);
  return (
    <>
      {iscontentPreview && (
        <ContentfulInspectorManager
          fields={[
            {
              entryId: parentSysId,
              fieldId: "cardSectionTitle",
              targetSelector: `#advice_carosoul_heading${parentSysId}`,
            },
            {
              entryId: parentSysId,
              fieldId: "shortDescription",
              targetSelector: `#advice_carosoul_subheading${parentSysId}`,
            },
          ]}
        />
      )}
      {data?.data?.contentData?.items.length > 0 && (
        <section className="advice-container bg-grey-50">
          <div className="max-w-container mx-auto">
            <div className="advice-card-container px-[0] py-[34px] md:py-[64px]">
              <div className="advice-header px-[20px] lg:px-[0] mb-[26px] md:mb-[32px]">
                {heading && (
                  <h2
                    className="font-bold"
                    id={`advice_carosoul_heading${parentSysId}`}
                  >
                    {heading}
                  </h2>
                )}
                {subheading && (
                  <p
                    className="font-normal small mt-[8px]"
                    id={`advice_carosoul_subheading${parentSysId}`}
                  >
                    {subheading}
                  </p>
                )}
              </div>
              <div className="advice-course-container">
                <div className="advice-inner-wrap">
                  <Advicecourseslidercomponents
                    articledata={data?.data?.contentData?.items}
                    iscontentPreview={iscontentPreview}
                  />
                  {/* view more section commented */}
                  {/* <div className="flex justify-center mt-[16px] lg:mt-[28px]">
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
                  </div> */}
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
