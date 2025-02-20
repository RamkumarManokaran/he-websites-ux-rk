import React from "react";
interface SkeletonNameInterface {
  skeletonName: string;
}
import PartnerSliderComponentSkeleton from "@packages/shared-components/skeleton/partnerslidercomponentskeleton";
import AdviceCourseCardSkeleton from "@packages/shared-components/skeleton/advicecoursecardskeleton";
import Discovercardskeleton from "@packages/shared-components/skeleton/discovercardskeleton";
import Reviewscardskeleton from "@packages/shared-components/skeleton/reviewscardskeleton";
import Tagcloudcardskeleton from "@packages/shared-components/skeleton/tagcloudcardskeleton";
import Testimonialcardskeleton from "@packages/shared-components/skeleton/testimonialcardskeleton";
import Wuscacomponentskeleton from "@packages/shared-components/skeleton/wuscacomponentskeleton";
import Articlesnippetskeleton from "@packages/shared-components/skeleton/articlesnippetskeleton";
import Faqskeleton from "@packages/shared-components/skeleton/faqskeleton";
import Eligibilitycriteriacardskeleton from "@packages/shared-components/skeleton/eligibilitycriteriacardskeleton";
const DynamicSkeleton: React.FC<SkeletonNameInterface> = ({ skeletonName }) => {
  const Skeleton = () => {
    switch (skeletonName) {
      case "AdviceCourseCardSkeleton":
        return <AdviceCourseCardSkeleton />;
      case "DynamicMediaComponent":
        return <Discovercardskeleton />;
      case "PageStatPodContainer":
        return <Wuscacomponentskeleton />;
      case "PageTagCloud":
        return <Tagcloudcardskeleton />;
      case "Reviews":
        return <Reviewscardskeleton />;
      case "PageMultimediaTestimonials":
        return <Testimonialcardskeleton />;
      case "PageLogo":
        return <PartnerSliderComponentSkeleton />;
      case "EligibilityCriteria":
        return <Eligibilitycriteriacardskeleton />;
      case "TextSnippet":
        return <Articlesnippetskeleton />;
      case "Faqs":
        return <Faqskeleton />;
      default:
        return <p>Loading</p>;
    }
  };
  return <Skeleton />;
};

export default DynamicSkeleton;
