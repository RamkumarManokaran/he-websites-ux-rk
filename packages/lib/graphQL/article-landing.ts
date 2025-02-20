export const HeroLandingPageQuery = (preview: boolean, slug: string) => {
  return `
{
  contentData: pageTemplateHeroLandingPageCollection(
    limit: 1
    where: {urlSlug: "${slug}", website: {websiteName: "${process.env.PROJECT}"}
    }
     ${preview ? `preview : ${preview}` : ""}
  ) {
    items {
    sys {
         id
        }
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
          internalName
          cardSectionTitle
          shortDescription
          flagComponentStyle
          mediaCardsCollection {
            items {
              ... on MetaTagTheme {
                title
              }
            }
          }
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
};

export const HeroLandingSeoQuery = (slug: string) => {
  return `{
  contentData: pageTemplateHeroLandingPageCollection(
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

export const ArticleTextSnippetQuery = `
   ... on DynamicMediaComponent {
   sys{
   id
   }
  internalName
  title
  subTitle
  description
  shortDescription
  longDescription {
    json
  }
  image {
    imgUpload {
      url
    }
  }
  cta {
    primaryCtaUrl
    primaryCtaLabel
    primaryCtaEventName
    primaryCtaTarget
  }
}
`;

export const LinksQuery = `
   ... on Navigation {
  navTitle
  navChildC1Collection {
    items {
      ... on Navigation {
        navTitle
        navUrl
        navCtaTarget
        navIcon {
          url
        }
      }
    }
  }
}
`;

export const FaqsQuery = `
 ... on PageComponentFaq {
  sys{id}
  faqComponentTitle
  faqEntriesCollection {
    
    items {
        sys{id}
      question
      answer
    }
  }
}
`;

export const NewsletterQuery = (preview: boolean, newsInternal: string) => {
  return `{
  newsLetterData: pageNewsletterSubscriptionCollection(limit: 1  
    where: {newsInternal: "${newsInternal}"}
    ${preview ? `preview : ${preview}` : ""}) {
    items {
    sys{
    id
    }
    __typename
      newsTitle
      newsDesc {
        json
      }
      newsEmail
      newsFirstName
      newsLastName
      newsEntryYear
      ctaLabel
      submitSuccessMessage
      checkboxField
    }
  }
}`;
};
