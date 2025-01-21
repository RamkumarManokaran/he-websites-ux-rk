import dynamic from "next/dynamic";
const componentMap: any = {
  PageComponentRichText: () =>
    dynamic(
      () =>
        import(
          "@packages/shared-components/article-details/richtextcomponent/richtextcomponent"
        )
    ),

  Advicecourseslidercomponents: () =>
    dynamic(
      () =>
        import(
          "@packages/shared-components/common-utilities/slider/advicecourseslidercomponents"
        )
    ),
  PagePullQuotes: () =>
    dynamic(
      () =>
        import(
          "@packages/shared-components/article-details/pull-quote/pull-quote"
        )
    ),

  PageImage: () =>
    dynamic(
      () =>
        import(
          "@packages/shared-components/article-details/article-image/article-image"
        )
    ),
  PageDataTableStatic: () =>
    dynamic(
      () =>
        import(
          "@packages/shared-components/article-details/article-tables/article-tables"
        )
    ),
  PageNewsletterSubscription: () =>
    dynamic(
      () =>
        import(
          "@packages/shared-components/article-details/dont-missout/dontmissout"
        )
    ),
};

const dynamicComponent = (input: string | null | undefined) => {
  if (!input) return null; // Handle null or undefined input
  const loadComponent = componentMap[input];
  if (!loadComponent) return null; // Handle unmatched input
  return loadComponent();
};

export default dynamicComponent;
