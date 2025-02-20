export const Seoquery = `{
  contentData: homepageCollection(
    limit: 1
    where: {urlSlug: "/", website: {websiteName:"${process.env.PROJECT}"}}
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

export const Headerquery = `{
  contentData: headerCollection(
    limit: 1
    where: {internalName: "${process.env.PROJECT} Header", website: {websiteName: "${process.env.PROJECT}"}}
  ) {
    items {
      websiteLogo {
        url
        width
        height
      }
      headerTrackingScripts
      headerMainMenuCollection(limit: 10) {
        items {
          navName
          navTitle
          navUrl
          navIcon {
            url
            width
            height
          }
          navChildC1Collection(limit: 20) {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navCtAlabel
                navIcon {
                  url
                  width
                  height
                }
                navCtaTarget
                flagNavItemStyle
              }
            }
          }
          navChildC2Collection(limit: 20) {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navCtAlabel
                navIcon {
                  url
                  width
                  height
                }
                navCtaTarget
                flagNavItemStyle
              }
            }
          }
          navChildC3Collection(limit: 20) {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navCtAlabel
                navIcon {
                  url
                  width
                  height
                }
                navCtaTarget
                flagNavItemStyle
              }
            }
          }
          navChildC4Collection(limit: 20) {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navCtAlabel
                navIcon {
                  url
                  width
                  height
                }
                navCtaTarget
                flagNavItemStyle
              }
            }
          }
        }
      }
      customerProfileMenu {
        ... on Navigation {
          navName
          navUrl
          navTitle
          navCtaTarget
          flagNavItemStyle
          navChildC1Collection {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navCtaTarget
              }
            }
          }
          navChildC2Collection {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navCtaTarget
              }
            }
          }
          navChildC3Collection {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navCtaTarget
              }
            }
          }
          navChildC4Collection {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navCtaTarget
              }
            }
          }
        }
      }
      universalSearchPanel {
        internalName
        navigationElementsCollection(limit: 5) {
          items {
            ... on Navigation {
              navName
              navTitle
              navUrl
              navCtAlabel
              navIcon {
                url
                width
                height
              }
              navCtaTarget
              flagNavItemStyle
            }
          }
        }
      }
      shortlistMenu {
        ... on LinkPanel {
          navigationElementsCollection(limit: 5) {
            items {
              ... on Navigation {
                navTitle
                navChildC1Collection(limit: 5) {
                  items {
                    ... on Navigation {
                      navName
                      navTitle
                      navUrl
                      navCtAlabel
                      navIcon {
                        url
                        width
                        height
                      }
                      navCtaTarget
                      flagNavItemStyle
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
export const footerQuery = `{
  footerNavigationCollection(where: {footerName: "Footer - ${process.env.PROJECT}"}) {
    items {
      footerNavCollection(limit: 3) {
        items {
          navTitle
          navChildC1Collection(limit: 10) {
            items {
              ... on Navigation {
                navTitle
                navUrl
                navCtaTarget
              }
            }
          }
        }
      }
      footerNavBtmCollection(limit: 1) {
        items {
          navTitle
          navUrl
        }
      }
      navApplinksCollection(limit: 5) {
        items {
          primaryCtaLabel
          primaryCtaUrl
          primaryCtaTarget
          primaryCtaEventName
        }
      }
      navSocialLinksCollection(limit: 1) {
        items {
          navName
          navUrl
          navChildC1Collection(limit: 10) {
            items {
              ... on Navigation {
                navName
                navTitle
                navUrl
                navIcon {
                  url
                  width
                  height
                }
                navCtaTarget
              }
            }
          }
        }
      }
    }
  }
}`;
export const statsPodQuery = `
... on PageStatPodContainer {
sys{
id
}
  bgColor
  marginPadding
  statPodContainerName
  statinfoCollection {
    items {
      internalName
      statLabel
      icon {
        url
        width
        height
        title
      }
      statNumber
    }
  }
  image {
  sys{id}
    url
    width
    height
    title
  }
  cta {
    internalName
    primaryCtaLabel
    primaryCtaUrl
    primaryCtaEventName
  }
}
`;
export const homePageQuery = `{
  contentData: homepageCollection(
    limit: 1
    where: {urlSlug: "/", website: {websiteName: "${process.env.PROJECT}"}}
  ) {
    items {
      gaPageName
      pageTitle
      shortDescription
      seoFields {
        metaTite
        metaDescription
      }
      robots {
        title
      }
      sliderBannerCollection(limit: 5) {
        items {
          __typename
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
            video {
              videoTitle
              videoIntName
              videoDesc
              externalVideoUrl
              videoUpload {
                url
                width
                height
              }
            }
          }
        }
      }
      bodyContentCollection(limit: 10) {
        items {
          __typename
          ... on MultipleCardContainer {
            internalName
            cardSectionTitle
            shortDescription
            longDescription
            flagComponentStyle
            callToAction {
              ... on CallToActionCta {
                internalName
                primaryCtaLabel
                primaryCtaEventName
                primaryCtaUrl
                primaryCtaTarget
                flagStyle
              }
            }
          }
        }
      }
    }
  }
}`;

export const tagCloudQuery = `
... on PageTagCloud {
tagName
tagUrl
eventName
}`;

export const partnerLogo = `
 ... on PageLogo {
  logoName
  logoImage {
    url
    width
    height
  }
  logoLink
}`;

export const discoverpodQuery = `
... on DynamicMediaComponent {
sys{
   id
   }
  internalName
  title
  subTitle
  shortDescription
  backgroundColor
  longDescription {
    json
  }
  image {
  sys{
  id
  }
    imageTitle
    imgIntName
    imgUpload {
      url
      width
      height
    }
    imgAltText
  }
  video {
    videoIntName
    videoTitle
    videoDesc
    videoAltText
    videoTranscript
    thumbnail {
      url
      width
      height
      title
    }
    videoUpload {
      url
      width
      height
      title
    }
  }
  cta {
    internalName
    primaryCtaUrl
    secondaryCtaUrl
    primaryCtaLabel
    primaryCtaEventName
    secondaryCtaLabel
    primaryCtaTarget
    secondaryCtaTarget
    flagStyle
  }
}`;

export const testimonial = `
 ... on PageMultimediaTestimonials {
  sys{
     id
     }
  sectionTitle
  multimediaBlockLeft {
    ... on PageVideo {
    sys{
       id
       }
      videoIntName
      videoAltText
      thumbnail{
        url
        width
        height
        fileName
      }
      videoUpload {
        url
        width
        height
        title
      }
    }
    ... on PageImage {
    sys{
    id
    }
      imgIntName
      imgAltText
      imgUpload {
        url
        width
        height
        title
      }
    }
  }
  testimonialBlockRight {
    internalName
    ... on PageTestimonial {
    sys{
    id
    }
      testimonialText
      author {
        firstName
        lastName
        middleName
        shortBio
      }
    }
  }
}
  `;

export const searchPanelQuery = `{
  contentData: headerCollection(
    limit: 1
    where: {internalName: "${process.env.PROJECT} Header", website: {websiteName: "${process.env.PROJECT}"}}
  ) {
    items {

 
      universalSearchPanel {
        internalName
        navigationElementsCollection(limit: 5) {
          items {
            ... on Navigation {
              navName
              navTitle
              navUrl
              navCtAlabel
              navIcon {
                url
                width
                height
              }
              navCtaTarget
              flagNavItemStyle
            }
          }
        }
      }

    }
  }
}`;
