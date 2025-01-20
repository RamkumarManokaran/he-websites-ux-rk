import Breadcrumblayoutcomponent from "@packages/shared-components/article-details/breadcrumb-layout/breadcrumblayoutcomponent";
import Articledescription from "@packages/shared-components/article-details/article-description/article-description";
import Authorprofile from "@packages/shared-components/article-details/author-profile/author-profile";
import Pullquote from "@packages/shared-components/article-details/pull-quote/pull-quote";
import Ctabanner from "@packages/shared-components/article-details/cta-banner/cta-banner";
import Articleimage from "@packages/shared-components/article-details/article-image/article-image";
import Articletables from "@packages/shared-components/article-details/article-tables/article-tables";
import Findoutmore from "@packages/shared-components/article-details/findoutmore/findout-more";
import Skiplink from "@packages/shared-components/article-details/skiplink/skiplink";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import dynamicComponentImports from "./dynamicimport";
import { articleDetailQuery } from "@packages/lib/graphQL/article-detail";
import Dontmissout from "@packages/shared-components/article-details/dont-missout/dontmissout";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";

const Page = async ({ params, searchParams }: any) => {
  // console.log(await params, await searchParams?.preview);
  const preview =
    (await searchParams?.preview) === "MY_SECRET_TOKEN" ? true : false;
  const category = "money";
  const title = "the-best-resources-for-saving-money-at-university";
  const id = "121213";
  const articledetaildata = await graphQlFetchFunction(
    articleDetailQuery(category, title, id, preview),
    preview
  );
  console.dir(articledetaildata, "Asddddddddddddddddddddd");
  const data = articledetaildata?.data?.contentData?.items[0];

  const breadcrumbData = [
    // {
    //   url: "#",
    //   Imgurl: "/assets/icons/breadcrumbs-home-icon.svg"
    // },
    {
      url: "#",
      label: "Home",
    },
    {
      url: "#",
      label: "Payments",
    },
    {
      url: "#",
      label: "Online payments",
    },
    {
      url: "",
      label: "Overview",
    },
  ];

  return (
    <>
      <ContentfulPreviewProvider
        locale="en-GB"
        enableInspectorMode={preview}
        enableLiveUpdates={preview}
        debugMode={preview}
      >
        <div className="bg-white">
          <section className="pt-[16px] pb-[40px]">
            <div className="max-w-container mx-auto px-[16px] md:px-[20px] xl:px-[0]">
              <Breadcrumblayoutcomponent
                propsdata={breadcrumbData}
                preview={preview}
              />
            </div>
          </section>

          <section className="pb-[40px]">
            <div className="max-w-container mx-auto px-[16px] md:px-[20px] xl:px-[0]">
              <Articledescription propsdata={data} preview={preview} />
            </div>
          </section>

          <section className="lg:pb-[40px]">
            <div className="max-w-container mx-auto px-[16px] md:px-[20px] xl:px-[0]">
              <Authorprofile preview={preview} propsdata={data} />
            </div>
          </section>

          <section>
            <div className="max-w-container mx-auto px-[16px] xl:px-[0]">
              <div className="flex flex-col lg:flex-row gap-[20px]">
                <Skiplink propsdata={data} preview={preview} />
                <div className="w-full article-details-aside">
                  <section className="pb-[40px]">
                    <div className="rtf-innerstyle flex flex-col gap-[16px]">
                      {data?.bodyContentCollection?.items?.map(
                        (dt: any, index: any) => {
                          const Component: any = dynamicComponentImports(
                            dt?.__typename
                          );
                          return (
                            <Component
                              key={index}
                              propsdata={dt}
                              preview={preview}
                            />
                          );
                        }
                      )}
                      {/* <div>
                      <b>
                      <i style={{ color: "red" }}>
                      --------------------------------------below Component
                      are static------------------------------------
                      </i>
                      </b>
                      </div>
                      <Articleimage />
                    <Pullquote />
                    <Articletables />
                    <Findoutmore /> */}
                    </div>
                    {/* <section className="pt-[40px]">
                    <Ctabanner />
                  </section> */}
                  </section>
                  {/* <Dontmissout /> */}
                </div>
              </div>
            </div>
          </section>

          {/* Slider section  */}
          <section className="bg-grey-50">
            <div className="max-w-container mx-auto">
              {/* <Advicecourseslidercomponents categoryTag={false} adviceBgWhite={false} /> */}
            </div>
          </section>
          {/* Slider section END */}
          {/* Slider section  */}
          <section className="bg-white">
            <div className="max-w-container mx-auto">
              {/* <Advicecourseslidercomponents categoryTag={true} adviceBgWhite={true} /> */}
            </div>
          </section>
          {/* Slider section END */}
          {/* Slider section  */}
          <section className="bg-grey-50">
            <div className="max-w-container mx-auto">
              {/* <Advicecourseslidercomponents categoryTag={true} adviceBgWhite={false} /> */}
            </div>
          </section>
          {/* Slider section END */}
          {/* Slider section  */}
          <section className="bg-white">
            <div className="max-w-container mx-auto">
              {/* <Advicecourseslidercomponents categoryTag={true} adviceBgWhite={true} /> */}
            </div>
          </section>
          {/* Slider section END */}
        </div>
      </ContentfulPreviewProvider>
    </>
  );
};

export default Page;
