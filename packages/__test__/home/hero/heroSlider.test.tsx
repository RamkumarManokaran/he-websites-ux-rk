import { render, screen } from "@testing-library/react";
import { SliderBannerCollection } from "@packages/lib/types/interfaces";
import HeroSlider from "@packages/shared-components/common-utilities/Banners/hero/slider-pod/heroSlider";
import "@testing-library/jest-dom";
import "@testing-library/react";
jest.mock(
  "@packages/shared-components/common-utilities/cards/hero-card/heroslidercard",
  () => jest.fn(() => <div data-testid="hero-slider-card" />)
);
jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="parent_swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));
jest.mock("swiper/css", () => jest.fn());
jest.mock("swiper/css/pagination", () => jest.fn());
jest.mock("swiper/css/effect-fade", () => jest.fn());

jest.mock("swiper/modules", () => ({
  Autoplay: jest.fn(),
  EffectFade: jest.fn(),
  Pagination: jest.fn(),
}));

describe("HeroSlider", () => {
  const mockData: SliderBannerCollection = {
    items: [
      {
        __typename: "DynamicMediaComponent",
        longDescription: {
          json: {
            nodeType: "document",
            data: {},
            content: [
              {
                nodeType: "paragraph",
                data: {},
                content: [
                  {
                    nodeType: "text",
                    value:
                      "Find courses, read honest reviews, get expert advice",
                    marks: [],
                    data: {},
                  },
                ],
              },
            ],
          },
        },
        title: "Your uni search",
        internalName: "Homepage - Banner - Whatuni",
        cta: null,
        video: null,
        image: {
          imageTitle: null,
          imgAltText: "Hero banner",
          imgUpload: {
            url: "https://images.ctfassets.net/szez98lehkfm/3gBdzHXucWKFh2Tht18q8/9a241336f74a85eb9075f2c23aa195d8/hero-banner.png",
            height: 460,
            width: 362,
          },
        },
      },
      {
        __typename: "DynamicMediaComponent",
        longDescription: {
          json: {
            data: {},
            content: [
              {
                data: {},
                content: [
                  {
                    data: {},
                    marks: [],
                    value:
                      "Book an Open Day to see the campus in action and get a first-hand experience of uni life",
                    nodeType: "text",
                  },
                ],
                nodeType: "paragraph",
              },
            ],
            nodeType: "document",
          },
        },
        title: "Find your perfect fit",
        internalName: "Homepage - Banner 2 - Whatuni",
        video: null,
        cta: {
          internalName: "Homepage - Banner 2 CTA - Whatuni",
          primaryCtaUrl: null,
          primaryCtaLabel: "Book my spot",
          secondaryCtaUrl: null,
          secondaryCtaLabel: null,
          primaryCtaTarget: null,
          secondaryCtaTarget: null,
          flagStyle: null,
        },
        image: {
          imageTitle: null,
          imgAltText: "Home page banner image",
          imgUpload: {
            url: "https://images.ctfassets.net/szez98lehkfm/3i9K1OgxSgjkQX9bsZUn8s/9909498c8433cee490fc69de506177b6/hero-banner1.png",
            height: 522,
            width: 468,
          },
        },
      },
    ],
  };

  //   it("renders the swiper component with correct data", () => {
  //     render(<HeroSlider data={mockData} />);
  //     const swiper = screen.getByTestId("parent_swiper");
  //     expect(swiper).toBeInTheDocument();
  //     const slides = screen.getAllByTestId(/slider/);
  //     expect(slides.length).toBe(mockData.items.length);
  //     slides.forEach((slide, index) => {
  //       expect(slide).toContainElement(screen.getByTestId("hero-slider-card"));
  //     });
  //   });
  it("should handle empty data gracefully", () => {
    render(<HeroSlider data={mockData} />);
    const slides = screen.queryAllByTestId(/slider/);
    const len = mockData.items.length;
    expect(slides.length).toBe(len);
  });
  it("should handle empty data gracefully", () => {
    render(<HeroSlider data={{ items: [] }} />);
    const slides = screen.queryAllByTestId(/slider/);
    expect(slides.length).toBe(0);
  });
});
