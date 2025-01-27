"use server";
import Breadcrumblayoutcomponent from "@packages/shared-components/article-details/breadcrumb-layout/breadcrumblayoutcomponent";
import Articledescription from "@packages/shared-components/article-details/article-description/article-description";
import Authorprofile from "@packages/shared-components/article-details/author-profile/author-profile";
import Skiplink from "@packages/shared-components/article-details/skiplink/skiplink";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import dynamicComponent from "./dynamicimport";
import { articleDetailQuery } from "@packages/lib/graphQL/article-detail";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";
import dynamicComponentImports from "@packages/lib/dynamic-imports/imports";
import { Suspense } from "react";
import Loading from "./loading";
import { notFound } from "next/navigation";
import PageViewLogging from "@packages/lib/utlils/pageviewlogging";

const Page = async ({ params, searchParams }: any) => {
  const pageNameforArtcileDetail = "articleDetail";
  const searchparams = await searchParams;
  const preview =  (await searchparams?.preview) === "MY_SECRET_TOKEN" ? true : false;
  const Params = await params;
  const slugurl = `/${Params.hero}/${Params.theme}/${Params.article}`;
  const articledetaildata = await graphQlFetchFunction(articleDetailQuery(slugurl, preview),preview);
  const customDomain = process.env.PROJECT === "Whatuni" ? "https://whatuni.com" : "https://www.postgraduatesearch.com";
  const url = new URL(customDomain + slugurl);
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value as string);
      }
    });
  }
console.log("Final URL:", url.toString());
console.log(articledetaildata,"as")
  if (articledetaildata?.data?.contentData?.items.length < 1) {
    console.log("notfound")
    notFound();
  }

  console.dir(articledetaildata, "Asddddddddddddddddddddd");
  const data = articledetaildata?.data?.contentData?.items[0];
  console.log(data,"datatataaa")
  const customLabels = [data?.articleType?.title,data?.metaTagThemeCollection?.items[0]?.title,data?.pageTitle]
  function generateBreadcrumbData(currentPath:any) {
    const sanitizedPath = currentPath.endsWith("/")
      ? currentPath.slice(0, -1)
      : currentPath;
    console.log(sanitizedPath,"sanitizedPath")
    const pathSegments = sanitizedPath.split("/").filter((segment:any) => segment);
   console.log(pathSegments,"pathSegments")
    // Construct breadcrumb data
    const breadcrumbData = pathSegments.map((segment:any, index:any) => {
      const url =
        index === pathSegments.length - 1
          ? "" // No URL for the last breadcrumb
          : "/" + pathSegments.slice(0, index + 1).join("/"); // Build URL for each segment
  
      return {
        url,
        label: customLabels[index] || segment.replace(/-/g, " ").replace(/\b\w/g, (char:any) => char.toUpperCase()),
      };
    });
  console.log(breadcrumbData,"breadcrumbData");
    breadcrumbData.unshift({
      url: "/",
      label: "Home",
    });
  
    return breadcrumbData;
  }
  
  const breadcrumbData = generateBreadcrumbData(slugurl);
  
  const jsonLd = {
    "@context":"http://schema.org",
    "@type":"Article",
    "headline":data?.seoFields?.metaTite,
    "url":url,	
    "thumbnailUrl":data?.bannerImageCollection?.items[0]?.imgUpload?.url,
    "image":data?.bannerImageCollection?.items[0]?.imgUpload?.url,	
    "dateCreated":data?.modifiedDate,
    "datePublished":data?.modifiedDate,
    "dateModified":data?.modifiedDate,
    "creator":{"@type":"Person","name":data?.author?.firstName ?? "" + data?.author?.middleName ?? "" +  data?.author?.lastName ?? ""},
    "author":{"@type":"Person","name":data?.author?.firstName ?? "" + data?.author?.middleName ?? "" +  data?.author?.lastName ?? ""},
    "publisher":{"@type":"Organization","name":"Whatuni",
    "logo":{"@type":"http://schema.org/ImageObject",
    "url":"https://images-dom.prod.aws.idp-connect.com/wu-cont/images/logo_print.png"}},
    "mainEntityOfPage":{"@type":"WebPage",
    "@id":url},
    "keywords":[""]
  }
  return (
    <>
      <script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd)
        }}
      />
    <Suspense fallback={<Loading />}>
      <>
      <PageViewLogging pageNameLocal={pageNameforArtcileDetail} gaData={{page_name: pageNameforArtcileDetail, article_category: Params.money}} csData={{eventType: "PageViewed", pageName: pageNameforArtcileDetail, articleTopic: Params.article}}/>
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
                <Articledescription propsdata={data} preview={preview} url={Params?.money} />
              </div>
            </section>
            <section className="lg:pb-[40px]">
              <div className="max-w-container mx-auto px-[16px] md:px-[20px] xl:px-[0]">
                <Authorprofile preview={preview} propsdata={data} />
              </div>
            </section>
            <section>
              <div className="max-w-container mx-auto ">
                <div className="flex flex-col lg:flex-row gap-[20px]">
                  <Skiplink propsdata={data} preview={preview} />
                  <div className="w-full article-details-aside">
                    <section className="pb-[40px] px-[16px] md:px-[20] xl:px-[0]">
                      <div className="rtf-innerstyle flex flex-col gap-[16px]">
                        {data?.bodyContentCollection?.items?.map(
                          (dt: any, index: any) => {
                            if (
                              dt?.__typename === "MultipleCardContainer" &&
                              dt?.flagComponentStyle !== "ArticleCarousal"
                            ) {
                              console.log("inside the if")
                            } else {
                              const Component: any = dynamicComponent(
                                dt?.__typename
                              );
                              if (!Component) {
                                return null;
                              }
                              return (
                                <Component
                                  key={index}
                                  propsdata={dt}
                                  urlParams={Params}
                                  preview={preview}
                                />
                              );
                            }
                          }
                        )}
                      </div>
                     
                      {/* <section className="pt-[40px]">
                    <Ctabanner />
                  </section> */}
                    </section>
                    {data?.bodyContentCollection?.items?.map(
                          (dt: any, index: any) => {
                            if (
                              dt?.__typename === "MultipleCardContainer" &&
                              dt?.flagComponentStyle !== "ArticleCarousal"
                            ) {
                              const Component: any = dynamicComponentImports(
                                dt?.flagComponentStyle
                              );
                              if (!Component) {
                                return null;
                              }
                              return (
                                <Component
                                  key={index}
                                  heading={dt?.cardSectionTitle}
                                  subheading={dt?.shortDescription}
                                  internalName={dt?.internalName}
                                  callAction={dt?.callToAction}
                                  parentSysId={dt?.sys?.id}
                                  routename={slugurl}
                                  articleKeyArray={
                                    dt?.mediaCardsCollection?.items
                                  }
                                  contentModelName={"articleCollection"}
                                  iscontentPreview={preview}
                                />
                              );
                            } 
                          }
                        )}
                  </div>
                </div>
              </div>
            </section>

            {/* Slider section  */}
            <section className="bg-grey-50">
              <div className="max-w-container mx-auto">
                {data?.bodyContentCollection?.items?.map(
                  (dt: any, index: any) => {
                    console.log("inside ooooooooooo")
                    if (
                      dt?.__typename === "MultipleCardContainer" &&
                      dt?.flagComponentStyle === "ArticleCarousal"
                    ) {
                      console.log("insid ethe",dt)
                      const Component: any = dynamicComponentImports(
                        dt?.flagComponentStyle
                      );
                      if (!Component) {
                        return null;
                      }
                      return (
                        <Component
                          key={index}
                          heading={dt?.cardSectionTitle}
                          subheading={dt?.shortDescription}
                          internalName={dt?.internalName}
                          callAction={dt?.callToAction}
                          parentSysId={dt?.sys?.id}
                          routename={slugurl}
                          articleKeyArray={dt?.mediaCardsCollection?.items}
                          contentModelName={"articleCollection"}
                          iscontentPreview={preview}
                        />
                      );
                    }
                  }
                )}
              </div>
            </section>

          </div>
        </ContentfulPreviewProvider>
      </>
    </Suspense>

    </>
  );
};

export default Page;
