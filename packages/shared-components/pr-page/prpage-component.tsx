"use server";
import React from "react";
import Subscribecomponents from "@packages/shared-components/common-utilities/newsletter-and-subscription/subscribe-newsletter/subscribecomponents";
import Breadcrumblayoutcomponent from "@packages/shared-components/common-utilities/breadcrumb-layout/breadcrumblayoutcomponent";
import ProviderResultsCard from "./provider-results-card/provider-results-card";
import SearchFilterButtons from "@packages/shared-components/common-utilities/search-filter-buttons/search-filter-buttons";
import SearchLabels from "@packages/shared-components/sr-page/search-labels/search-labels";
import ContentfulPreviewProvider from "@packages/lib/contentful-preview/ContentfulLivePreviewProvider";
import Paginations from "@packages/shared-components/common-utilities/paginations/paginations";
import PrPageTopSection from "./PrTopSection/Pr-top-section";
const PrPageComponent = async ({ searchparams }: any) => {
  const breadcrumbData = [
    {
      url: "#",
      label: "Home",
    },
    {
      url: "#",
      label: "Scholarships",
    },
    {
      url: "",
      label: "Search results",
    },
  ];
  return (
    <>
      <section className="bg-white hidden lg:block">
        <div className="max-w-container mx-auto pt-[24px] pb-[8px]">
          <Breadcrumblayoutcomponent data={breadcrumbData} />
        </div>
      </section>
      <PrPageTopSection />
      <SearchFilterButtons />
      <SearchLabels />
      <ProviderResultsCard>
        <Paginations
        // totalPages={Math.ceil(searchResultsData?.collegeCount / 10)}
        // currentPage={searchparams?.pageNo}
        />
      </ProviderResultsCard>
      <ContentfulPreviewProvider
        locale="en-GB"
        enableInspectorMode={false}
        enableLiveUpdates={false}
        debugMode={false}
      >
        <Subscribecomponents iscontentPreview={false} />
      </ContentfulPreviewProvider>
    </>
  );
};

export default PrPageComponent;
