export function articleDetailQuery(
  // category: any,
  urlSlug: any,
  // id: any,
  preview: any
) {
  const query = `{
  contentData: articleCollection(
    limit: 1
    where: {urlSlug: "${urlSlug}", website: {websiteName: "${process.env.PROJECT}"}}
    ${preview ? `preview : ${preview}` : ""}
  ) {
    items {
     sys{
    id
    }
      pageTitle
      seoFields {
        metaTite
        metaDescription
        canonical
        metaKeywords
      }
      author {
       sys{
      id
      }
        internalName
        firstName
        lastName
        middleName
        domain
        shortBio
        p2PShortBio
        longBio
        audienceGroup
        image {
         sys{
      id
      }
          imgUpload {
            url
            height
            width
          }
          imgAltText
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
      readTime
      articleType {
        title
      }
      metaTagTopicsCollection {
        items {
          title
        }
      }
      metaTagSubTopicsCollection {
        items {
          title
          subTopic
        }
      }
      metaTagCitiesCollection {
        items {
          title
          parent {
            title
          }
        }
      }
      metaTagNationsCollection {
        items {
          title
        }
      }
      metaTagRegionsCollection {
        items {
          title
        }
      }
      metaTagUserTypesCollection {
        items {
          title
        }
      }
      metaTagStudyLevelsCollection {
        items {
          title
        }
      }
      metaTagStudentYearsCollection {
        items {
          title
        }
      }
      metaTagJourneyStepsCollection {
        items {
          title
        }
      }
      metaTagSubjectCategoryL1Collection {
        items {
          title
          id
        }
      }
      metaTagSubjectCategoryL2Collection {
        items {
          title
          parent {
            title
          }
        }
      }
      skipLinks {
       sys{
      id
      }
        skipLinkTitle
        anchorLinksCollection {
          items {
           sys{
      id
      }
            urlLabel
            moreLinkUrl
            moreLinkTarget
          }
        }
      }
      bodyContentCollection {
        items {
          __typename
          ... on PageComponentRichText {
           sys{
                  id
               }
            skipLinkId
            paragraphTitle
            media {
              url
              fileName
            }
            paragraphBodyRichText {
              json
            }
          }
          ... on PagePullQuotes {
           sys{
                id
              }
            pullQuote {
              json
            }
            pullQuoteAuthor
            pullQuoteRole
          }
          ... on PageImage {
           sys{
                 id
                    }
            imgAltText
            imgUpload {
              url
            }
          }
             ... on DynamicMediaComponent {  
            title
            internalName
            backgroundColor
            longDescription {
              json
            }
            cta {
              internalName
              primaryCtaUrl
              primaryCtaLabel
              primaryCtaEventName
              secondaryCtaUrl
              secondaryCtaLabel
              primaryCtaTarget
              secondaryCtaTarget
              flagStyle
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
          }
             ... on MultipleCardContainer {
            cardSectionTitle
            shortDescription
            flagComponentStyle
            mediaCardsCollection {
              items {
                ... on MetaTagTopic {
                  title
                }
                ... on MetaTagSubTopic {
                  title
                }
              }
            }
          }
            ... on PageDataTableStatic {
            lTname
            lTtitle
            apiUrl
          }
        }
      }
    }
  }
}`;

  return query;
}

export const ArticleDetailSeoQuery = (slug: string) => {
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
