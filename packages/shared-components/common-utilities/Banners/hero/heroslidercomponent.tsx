"use server";
import React, { Suspense } from "react";
import SearchBox from "../../searchBar/search-pod/searchbox";
import { searchAjaxFecthFunction } from "@packages/lib/server-actions/server-action";
import HeroSlider from "./slider-pod/heroSlider";
import { SliderBannerCollection } from "@packages/lib/types/interfaces";
import HeroSliderComponentSkeleton from "@packages/shared-components/skeleton/heroslidercomponentskeleton";
import makeApiCall from "@packages/REST-API/rest-api";
import getApiUrl from "@packages/REST-API/api-urls";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { searchPanelQuery } from "@packages/lib/graphQL/graphql-query";

interface PropjectProps {
  data: SliderBannerCollection;
  pageName?: any;
}

const HeroSliderComponent: React.FC<PropjectProps> = async ({
  data,
  pageName,
}) => {
  const universalSearchPanel = (
    await graphQlFetchFunction(searchPanelQuery, false)
  )?.data?.contentData?.items[0]?.universalSearchPanel
    ?.navigationElementsCollection?.items;
  const body = {
    affiliateId: 220703,
    actionType: "subject",
    keyword: "",
    qualCode: "",
    networkId: 2,
  };
  const unibody = {
    affiliateId: 220703,
    actionType: "institution",
    keyword: "",
    qualCode: "",
    networkId: 2,
  };
  const pgsbody: any = {
    affiliateId: 607022,
    actionType: "subject",
    keyword: "",
    qualCode: "",
    networkId: 2,
  };

  let course_data,
    uni_data,
    pgs_search_data = null;

  if (process.env.PROJECT === "Whatuni") {
    // [course_data, uni_data] = await Promise.all([
    //   searchAjaxFecthFunction(body),
    //   searchAjaxFecthFunction(unibody),
    // ]);
    pgs_search_data = null;
  } else if (process.env.PROJECT === "PGS") {
    const queryParams = new URLSearchParams(pgsbody).toString();
    pgs_search_data = await makeApiCall(
      getApiUrl?.subjectAjax,
      "GET",
      null,
      queryParams,
      null
    );
    uni_data = null;
    course_data = null;
  }

  return (
    <>
      <section className="bg-grey-50">
        <Suspense fallback={<HeroSliderComponentSkeleton />}>
          <div
            data-testid="hero-banner-colour"
            className={`${process.env.PROJECT === "Whatuni" ? "bg-blue-200" : "bg-green-200"} px-[16px] md:px-[20px] xl2:px-0`}
          >
            <div className="max-w-container mx-auto">
              <HeroSlider data={data} pageName={pageName} />
            </div>
          </div>
          <SearchBox
            // course_data={course_data}
            // uni_data={uni_data}
            pgs_search_data={pgs_search_data}
            universalSearchPanel={universalSearchPanel}
          />
        </Suspense>
      </section>
    </>
  );
};

export default HeroSliderComponent;
