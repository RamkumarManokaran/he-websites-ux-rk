import { render, screen } from "@testing-library/react";
import { DynamicMediaComponent } from "@packages/lib/types/interfaces";
import "@testing-library/jest-dom";
import "@testing-library/react";
import HeroSliderCard from "@packages/shared-components/common-utilities/cards/hero-card/heroslidercard";
describe("HeroSliderCard", () => {
  const mockData: DynamicMediaComponent = {
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
                value: "Find courses, read honest reviews, get expert advice",
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
    cta: {
      internalName: "string",
      secondaryCtaUrl: "string",
      secondaryCtaLabel: "string",
      primaryCtaTarget: "string",
      secondaryCtaTarget: "string",
      flagStyle: "string",
      primaryCtaLabel: "Click Me",
      primaryCtaUrl: "https://example.com",
    },
    video: null,
    image: {
      imageTitle: null,
      imgAltText: "Hero banner",
      imgUpload: {
        url: "https://3aa195d8/hero-banner.png",
        height: 460,
        width: 362,
      },
    },
  };

  it("renders the title and description correctly", () => {
    render(<HeroSliderCard data={mockData} />);
    const title = screen.getByText("Your uni search");
    expect(title).toBeInTheDocument();
    const description = screen.getByText(
      /Find courses, read honest reviews, get expert advice/i
    );
    expect(description).toBeInTheDocument();
  });

  it("renders the CTA link when data.cta is provided", () => {
    render(<HeroSliderCard data={mockData} />);
    const ctaLink = screen.getByText(/Click Me/i);
    expect(ctaLink).toHaveAttribute("href", "https://example.com");
    expect(ctaLink).toBeInTheDocument();
  });

  it("does not render the CTA link when data.cta is not provided", () => {
    const mockData: DynamicMediaComponent = {
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
                  value: "Find courses, read honest reviews, get expert advice",
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
    };

    render(<HeroSliderCard data={mockData} />);
    const ctaLink = screen.queryByTestId("linktag");
    expect(ctaLink).not.toBeInTheDocument();
  });

  it("renders the image when data.image.imgUpload.url is provided", () => {
    render(<HeroSliderCard data={mockData} />);
    const image = screen.getByTestId("HeroImage");
    expect(image).toHaveAttribute("alt", "Hero banner");
  });

  it("does not render the image when data.image.imgUpload.url is not provided", () => {
    const mockData: DynamicMediaComponent = {
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
                  value: "Find courses, read honest reviews, get expert advice",
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
      cta: {
        internalName: "string",
        secondaryCtaUrl: "string",
        secondaryCtaLabel: "string",
        primaryCtaTarget: "string",
        secondaryCtaTarget: "string",
        flagStyle: "string",
        primaryCtaLabel: "Click Me",
        primaryCtaUrl: "https://example.com",
      },
      video: null,
      image: {
        imageTitle: null,
        imgAltText: "Hero banner",
        imgUpload: {
          url: "",
          height: 460,
          width: 362,
        },
      },
    };

    render(<HeroSliderCard data={mockData} />);
    const image = screen.queryByTestId("HeroImage");
    expect(image).toBeNull();
  });

  it("When CTA is a empty string ", () => {
    const mockData: DynamicMediaComponent = {
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
                  value: "Find courses, read honest reviews, get expert advice",
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
      cta: {
        internalName: "string",
        secondaryCtaUrl: "string",
        secondaryCtaLabel: "string",
        primaryCtaTarget: "string",
        secondaryCtaTarget: "string",
        flagStyle: "string",
        primaryCtaLabel: "Click Me",
        primaryCtaUrl: "",
      },
      video: null,
      image: {
        imageTitle: null,
        imgAltText: "Hero banner",
        imgUpload: {
          url: "",
          height: 460,
          width: 362,
        },
      },
    };

    render(<HeroSliderCard data={mockData} />);
    const ctaLink = screen.getByTestId("linktag");
    expect(ctaLink).toHaveAttribute("href", "");
  });
});
