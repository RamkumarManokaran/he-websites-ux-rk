export const ColcLandingPageQuery = `
{
  contentData: pageTemplateLandingPageCollection(
    limit: 1
    where: {urlSlug: "/student-finance", website: {websiteName: "${process.env.PROJECT}"}}
  ) {
    items {
      bodyContentCollection(
        limit: 10
      ) {
        items {
          internalName
          cardSectionTitle
          shortDescription
          flagComponentStyle
          callToAction {
            ... on CallToActionCta {
              primaryCtaUrl
              primaryCtaLabel
              primaryCtaTarget
              primaryCtaEventName
            }
          }
        }
      }
    }
  }
}
 `;

export const ColcLandingPageSeoQuery = `
 {
   contentData: pageTemplateLandingPageCollection(
     limit: 1
     where: {urlSlug: "/student-finance", website: {websiteName: "${process.env.PROJECT}"}}
   ) {
     items {
       seoFields {
         metaTite
         metaDescription
       }
      
     }
   }
 }
  `;

export const BannersQuery = `
... on DynamicMediaComponent {
  title
  internalName
  longDescription {
    json
  }
  image {
    imageTitle
    imgAltText
    imgUpload {
      url
      height
      width
    }
  }
}`;
