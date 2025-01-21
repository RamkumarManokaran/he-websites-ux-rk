"use server";
import Breadcrumblayoutcomponent from "@packages/shared-components/article-details/breadcrumb-layout/breadcrumblayoutcomponent";
import Articledescription from "@packages/shared-components/article-details/article-description/article-description";
import Authorprofile from "@packages/shared-components/article-details/author-profile/author-profile";
import Skiplink from "@packages/shared-components/article-details/skiplink/skiplink";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import dynamicComponentImports from "./dynamicimport";
import { articleDetailQuery } from "@packages/lib/graphQL/article-detail";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";
const Page = async ({ params, searchParams }: any) => {
  const searchparams = await searchParams;
  const preview =
    (await searchparams?.preview) === "MY_SECRET_TOKEN" ? true : false;
  const Params = await params;
  const slugurl = `/${Params.herohub}/${Params.money}/${Params.budgeting}/${Params.article}`;

  console.log(articleDetailQuery(slugurl, preview));
  const articledetaildata = await graphQlFetchFunction(
    articleDetailQuery(slugurl, preview),
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
  console.log("detail page", data?.bodyContentCollection?.items);
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
                    {/* <div className="rtf-innerstyle flex flex-col gap-[16px]">
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
                    </div> */}
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
