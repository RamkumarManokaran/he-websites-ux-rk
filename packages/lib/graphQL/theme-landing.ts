export const ThemeLandingPageQuery = (preview: boolean, slug: string) => {
  return `{
    contentData: pageTemplateThemedLandingPageCollection(
      limit: 1
      where: {urlSlug: "${slug}", website: {websiteName: "${process.env.PROJECT}"}}
         ${preview ? `preview : ${preview}` : ""} 
    ) {
      items {
        pageTitle
        sys {id}
        gaPageName
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
        bodyContentCollection(limit: 10) {
          items {
            sys {
              id
            }
          __typename
            internalName
            cardSectionTitle
            flagComponentStyle
            shortDescription
            longDescription
            mediaCardsCollection {
            items {
              ... on MetaTagTheme {
                title
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
      order: modifiedDate_DESC
       ${preview ? `preview : ${preview}` : ""} 
  ) {
    items {
    sys{id}
      pageTitle
      urlSlug
      metaTagTopicsCollection {
        items {
          title
        }
      }
      metaTagSubTopicsCollection {
        items {
          ... on MetaTagTopic {
            title
          }
          ... on MetaTagSubTopic {
            title
          }
        }
      }
      bannerImageCollection {
        items {
        sys{
        id
        }
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
