export const ThemeLandingPageQuery = (preview: boolean, slug: string) => {
  return `{
    contentData: pageTemplateThemedLandingPageCollection(
      limit: 1
      where: {urlSlug: "${slug}", website: {websiteName: "${process.env.PROJECT}"}}
        ${preview ? `preview : ${preview}` : ""} 
    ) {
      items {
        sys {
          id
        }
        bannerImage {
          sys {
            id
          }
          internalName
          title
          subTitle
          image {
            imageTitle
            imgAltText
            imgUpload {
              url
              height
              width
            }
          }
        }
        bodyContentCollection(limit: 1
        where: {internalName: "Article landing page - Level 1 heading - Whatuni"}
        ) {
          items {
            sys {
              id
            }
          __typename

            internalName
            cardSectionTitle
            flagComponentStyle
            mediaCardsCollection {
              items {
                ... on DynamicMediaComponent {
                  title
                  longDescription {
                    json
                  }
                }
                ... on MetaTagTopic {
                  title
                  id
                }
                ... on MetaTagSubTopic {
                  title
                  subTopic
                  parent {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
};

export const ThemeLandingSeoQuery = (slug: string) => {
  return `{contentData:pageTemplateThemedLandingPageCollection(
    limit: 1
     where: {urlSlug: "${slug}", website: {websiteName: "${process.env.PROJECT}"}}
  ) {
    items {
      seoFields {
        metaTite
        metaDescription
         metaKeywords
        canonical
      }
        robots {
        title
      }
    }
  }
}`;
};

export const ArticleQuery = (preview: boolean, slug: string) => {
  return `{
    contentData: pageTemplateThemedLandingPageCollection(
      limit: 1
      where: {urlSlug: "${slug}", website: {websiteName: "${process.env.PROJECT}"}}
        ${preview ? `preview : ${preview}` : ""} 
    ) {
      items {
        bodyContentCollection(limit: 20
        where: {internalName_not: "Article landing page - Level 1 heading - Whatuni"}
        ) {
          items {
            sys {
              id
            }
            internalName
            cardSectionTitle
            flagComponentStyle
            mediaCardsCollection {
              items {
                ... on DynamicMediaComponent {
                  title
                  longDescription {
                    json
                  }
                }
                ... on MetaTagTopic {
                  title
                  id
                }
                ... on MetaTagSubTopic {
                  title
                  subTopic
                  parent {
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;
};

export const ArtcileSliderQuery = (preview: boolean, articleArray: string) => {
  return `{
  contentData: articleCollection(
    limit: 10
    where: {OR: ${articleArray}, website: {websiteName: "${process.env.PROJECT}"}}
       ${preview ? `preview : ${preview}` : ""} 
  ) {
    items {
      pageTitle
      bannerImageCollection {
        items {
          imgAltText
          imgUpload {
            url
          }
        }
      }
      shortDescription
      modifiedDate
    }
  }
}`;
};
