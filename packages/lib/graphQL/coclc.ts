export const ColcSeo = `{
    contentData: pageTemplateLandingPageCollection(
      limit: 1
      where: {urlSlug: "/student-cost-of-living-calculator", website: {websiteName: "${process.env.PROJECT}"}}
    ) {
      items {
        seoFields {
          seoFieldsName
          metaTite
          canonical
          metaDescription
        }
        robots {
          title
        }
      }
    }
  }`;
