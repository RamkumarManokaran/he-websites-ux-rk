export function articleDetailQuery(
  category: any,
  title: any,
  id: any,
  preview: any
) {
  const query = `{
  contentData: articleCollection(
    limit: 1
    ${preview ? `preview : ${preview}` : ""}
    where: {urlSlug: "${title}", website: {websiteName: "${process.env.PROJECT}"}}
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
        }
      }
    }
  }
}`;

  return query;
}
