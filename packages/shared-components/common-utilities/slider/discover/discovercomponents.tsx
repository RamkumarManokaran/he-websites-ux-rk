"use server";
import { discoverpodQuery } from "@packages/lib/graphQL/graphql-query";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import Discoverslidercomponents from "@packages/shared-components/common-utilities/slider/discoverslidercomponents";
import React from "react";
import { homePageComponentQueryFormation } from "@packages/lib/graphQL/fetch-function";
interface DiscoverSliderInterface {
  heading: string;
  subheading: string;
  internalName: string;
  routename: string;
  contentModelName: string;
}

const Discovercomponents: React.FC<DiscoverSliderInterface> = async (props) => {
  const query = homePageComponentQueryFormation(
    props.internalName,
    discoverpodQuery,
    props.routename,
    props.contentModelName
  );
  const discovercontentfulData: any = (await graphQlFetchFunction(query)).data
    ?.contentData?.items[0]?.bodyContentCollection?.items[0]
    ?.mediaCardsCollection?.items;
  return (
    discovercontentfulData && (
      // <div className="discover-container">
      //   <div className="max-w-container mx-auto">
      //     <div className="discover-card-container px-[0] py-[34px] md:pt-[64px] md:pb-[16px]">
      //       <div className="discover-header px-[16px] md:px-[20px]  mb-[26px] xl:px-[0] md:mb-[32px]">
      //         <div
      //           className={`discover-card-container px-[0] py-[34px] ${process.env.PROJECT === "PGS" ? "md:py-[64px]" : "md:pt-[64px] md:pb-[16px]"}`}
      //         >
      //           <div className="discover-header px-[16px] md:px-[20px]  mb-[26px] xl:px-[0] md:mb-[32px]">
      //             <h2 className={`font-bold`} data-testid="discoverHeading">
      //               {props.heading}
      //             </h2>
      //             <p
      //               className={`small mt-[8px]`}
      //               data-testid="discoverSubHeading"
      //             >
      //               {props.subheading}
      //             </p>
      //           </div>
      //           <div className="discover-inner-wrap">
      //             <Discoverslidercomponents
      //               dicoverCardContentfulList={discovercontentfulData}
      //             />
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="discover-container">
        <div className="max-w-container mx-auto">
          <div
            className={`discover-card-container px-[0] py-[34px] ${process.env.PROJECT === "PGS" ? "md:py-[64px]" : "md:pt-[64px] md:pb-[16px]"}`}
          >
            <div className="discover-header px-[16px] md:px-[20px]  mb-[26px] xl:px-[0] md:mb-[32px]">
              <h2 className={`font-bold`} data-testid="discoverHeading">
                {props.heading}
              </h2>
              <p className={`small mt-[8px]`} data-testid="discoverSubHeading">
                {props.subheading}
              </p>
            </div>
            <div className="discover-inner-wrap">
              <Discoverslidercomponents
                dicoverCardContentfulList={discovercontentfulData}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Discovercomponents;
