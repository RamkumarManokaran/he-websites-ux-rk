import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Discovercomponents from "@packages/shared-components/home/discover/discovercomponents";
import Discoverslidercomponents1 from "@packages/shared-components/common-utilities/slider/discoverslidercomponents";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { discoverContentfulInterface } from "@packages/shared-components/common-utilities/slider/discoverslidercomponents";
import React from 'react';

jest.mock("swiper/react", () => ({
  Swiper: jest.fn(({ children }) => <>{children}</>),
  SwiperSlide: jest.fn(({ children }) => <>{children}</>),
}));

jest.mock("swiper/modules", () => ({
  FreeMode: jest.fn(),
  Navigation: jest.fn(),
  Pagination: jest.fn(),
}));

// CSS Imports Mock
jest.mock("swiper/css", () => {});
jest.mock("swiper/css/navigation", () => {});
jest.mock("swiper/css/pagination", () => {});

  const discoverPodList = [
        {
            "longDescription": null,
            "title": "Courses",
            "internalName": "Discover - Courses - Whatuni",
            "video": null,
            "cta": {
                "internalName": "Homepage - Courses Discover  CTA - Whatuni",
                "primaryCtaUrl": "/degrees/courses/",
                "primaryCtaLabel": null,
                "secondaryCtaUrl": null,
                "secondaryCtaLabel": null,
                "primaryCtaTarget": null,
                "secondaryCtaTarget": null,
                "flagStyle": null
            },
            "image": {
                "imageTitle": null,
                "imgAltText": "courses",
                "imgUpload": {
                    "url": "https://images.ctfassets.net/szez98lehkfm/4NX4x0aesX7abBMiTsUCDY/0b953f5873dfc1d36af1c6334827b240/discover-feature-image1x3x.webp",
                    "height": 275,
                    "width": 256
                }
            }
        },
        {
            "longDescription": null,
            "title": "Universities",
            "internalName": "Discover - Universities - Whatuni",
            "video": null,
            "cta": {
                "internalName": "Homepage - Universities Discover  CTA - Whatuni",
                "primaryCtaUrl": "/degrees/find-university/",
                "primaryCtaLabel": null,
                "secondaryCtaUrl": null,
                "secondaryCtaLabel": null,
                "primaryCtaTarget": null,
                "secondaryCtaTarget": null,
                "flagStyle": null
            },
            "image": {
                "imageTitle": null,
                "imgAltText": "university",
                "imgUpload": {
                    "url": "https://images.ctfassets.net/szez98lehkfm/6AcE8pZM1UMSFvyhXDMFyC/ea99d95f5be2da6ebaf5eef1dfd40513/discover-feature-image2x3x.webp",
                    "height": 275,
                    "width": 256
                }
            }
        },
        {
            "longDescription": null,
            "title": "Career ",
            "internalName": "Discover - Careers - Whatuni",
            "video": null,
            "cta": {
                "internalName": "Homepage - Careers Discover  CTA - Whatuni",
                "primaryCtaUrl": "/career-guides/",
                "primaryCtaLabel": null,
                "secondaryCtaUrl": null,
                "secondaryCtaLabel": null,
                "primaryCtaTarget": null,
                "secondaryCtaTarget": null,
                "flagStyle": null
            },
            "image": {
                "imageTitle": null,
                "imgAltText": "careers",
                "imgUpload": {
                    "url": "https://images.ctfassets.net/szez98lehkfm/6bFVqzPi2sSVkUfegKDpj3/138d7db9db6c216b6cdf79e43cfda229/discover-feature-image3x3x.png",
                    "height": 600,
                    "width": 558
                }
            }
        },
        {
            "longDescription": null,
            "title": "Subject Guides",
            "internalName": "Discover - Subject guides - Whatuni",
            "video": null,
            "cta": {
                "internalName": "Homepage - Subject guides Discover  CTA - Whatuni",
                "primaryCtaUrl": "/advice/subject-guides/",
                "primaryCtaLabel": null,
                "secondaryCtaUrl": null,
                "secondaryCtaLabel": null,
                "primaryCtaTarget": null,
                "secondaryCtaTarget": null,
                "flagStyle": null
            },
            "image": {
                "imageTitle": null,
                "imgAltText": "subject guides",
                "imgUpload": {
                    "url": "https://images.ctfassets.net/szez98lehkfm/1H1AAMLdZ1CLprAhLuLAHI/7940bc676602ba22189355398c65e972/discover-feature-image4x3x.png",
                    "height": 600,
                    "width": 558
                }
            }
        },
        {
            "longDescription": null,
            "title": "Open Days",
            "internalName": "Discover - Opendays - Whatuni",
            "video": null,
            "cta": {
                "internalName": "Homepage - Opendays Discover  CTA - Whatuni",
                "primaryCtaUrl": "/open-days/",
                "primaryCtaLabel": null,
                "secondaryCtaUrl": null,
                "secondaryCtaLabel": null,
                "primaryCtaTarget": null,
                "secondaryCtaTarget": null,
                "flagStyle": null
            },
            "image": {
                "imageTitle": null,
                "imgAltText": "opendays",
                "imgUpload": {
                    "url": "https://images.ctfassets.net/szez98lehkfm/7E7HyILxGhhPj03s9bc87W/cdac8ae1dedad48ccb551af5811fdb7c/discover-feature-image3x3x.png",
                    "height": 600,
                    "width": 558
                }
            }
        }
    ];

//const iscoverPodListJson: discoverContentfulInterface = JSON.parse(discoverPodList);
jest.mock('../../../lib/server-actions/server-action', () => ({
    graphQlFetchFunction: jest.fn()
  }));


describe("Test the Discoverslidercomponents1", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (graphQlFetchFunction as jest.Mock).mockResolvedValue(iscoverPodListJson);
  });

  //
  it("The count of slider created for desktop device", async () => {
    render(<Discoverslidercomponents1 internalName="" />);
    let cardCount: number = 0;
    {
      iscoverPodListJson?.data?.contentData?.items?.map(async (discoverObj) => {
        if (discoverObj != null) {
          return discoverObj?.bodyContentCollection?.items?.map(
            async (mediaCardsCollectionItems, index) => {
              if (
                mediaCardsCollectionItems?.mediaCardsCollection?.items !=
                  null &&
                mediaCardsCollectionItems.mediaCardsCollection.items[index] !=
                  null
              ) {
                return mediaCardsCollectionItems?.mediaCardsCollection?.items?.map(
                  async (discoverItems, index) => {
                    if (
                      discoverItems?.title != null &&
                      discoverItems?.title != undefined
                    ) {
                      const discoverImageElement =
                        await screen.findAllByTestId("discoverImageId");
                      const cardTitleElement =
                        await screen.findAllByTestId("cardTitle");

                      expect(discoverImageElement[index]).toHaveAttribute(
                        "data-testsrc",
                        discoverItems.image.imgUpload.url
                      );
                      expect(cardTitleElement[index]).toHaveTextContent(
                        discoverItems.title
                      );
                      cardCount = cardCount + 1;
                    }
                  }
                );
              }
            }
          );
        }
        return <></>;
      });
    }
    const discovercardDesktopElement = await screen.findAllByTestId(
      "discovercardDesktop"
    );
    //expect(discovercardDesktopElement?.length).toBe(cardCount);
  });
describe("Test the Discoverslidercomponents1", () => {
  //
  it("The count of slider created for desktop device", async () => {
    render(
      <Discoverslidercomponents1 dicoverCardContentfulList={discoverPodList} />
    );
    let cardCount: number = 0;
    {
      discoverPodList?.map(async (discoverItems: any, index: number) => {
        const discoverImageElement =
          await screen.findAllByTestId("discoverImageId");
        const cardTitleElement = await screen.findAllByTestId("cardTitle");

        expect(discoverImageElement[index]).toHaveAttribute(
          "data-testsrc",
          discoverItems.image.imgUpload.url
        );
        expect(cardTitleElement[index]).toHaveTextContent(discoverItems.title);
        cardCount = cardCount + 1;
      });
    }
  });

  test("The count of slider created for mobile device", async () => {
    let cardCount: number = 0;
    const resizeSpy = jest.spyOn(window, "dispatchEvent");
    window.innerWidth = 480;
    // Trigger the window resize event.
    global.dispatchEvent(new Event("resize"));

    render(
      <Discoverslidercomponents1 dicoverCardContentfulList={discoverPodList} />
    );


        {discoverPodList?.map(async (discoverItems: any, index: number) => {
                        cardCount = cardCount + 1;
                        const discoverImageElement = await screen.findAllByTestId("discoverImageId");
                        const cardTitleElement = await screen.findAllByTestId("cardTitle");
                        
                        expect(discoverImageElement[index]).toHaveAttribute("data-testsrc", discoverItems.image.imgUpload.url);
                        expect(cardTitleElement[index]).toHaveTextContent(discoverItems.title);
        })}

          const discovercardDesktopElement = await screen.findAllByTestId("discovercardMobile");
          expect(discovercardDesktopElement?.length).toBe(cardCount);
    })
