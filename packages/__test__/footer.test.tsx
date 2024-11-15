import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Footer from "@packages/shared-components/common-utilities/footer/footercomponents";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import { FooterDataInterface } from "@packages/lib/types/interfaces";
jest.mock("@packages/lib/server-actions/server-action", () => ({
  graphQlFetchFunction: jest.fn(),
}));
const footerData: FooterDataInterface = {
  footerNavBtmCollection: {
    items: [
      {
        navTitle: "© 2007-2024 IDP Connect Ltd. All rights reserved",
        navUrl: null,
      },
    ],
  },
  navApplinksCollection: {
    items: [
      {
        primaryCtaLabel: "App store",
        primaryCtaUrl: "https://whatuni.go.link/?adj_t=cark98y",
      },
      {
        primaryCtaLabel: "Play store",
        primaryCtaUrl: "https://whatuni.go.link/?adj_t=cark98y",
      },
    ],
  },
  footerNavCollection: {
    items: [
      {
        navTitle: "Quick links",
        navChildC1Collection: {
          items: [
            {
              navTitle: "Editor@whatuni.com",
              navUrl: "mailto:editor@whatuni.com",
              navCtaTarget: null,
            },
            {
              navTitle: "Contact us",
              navUrl: "/about-us/contact-us/",
              navCtaTarget: "Open in same tab",
            },
          ],
        },
      },
      {
        navTitle: "Browse",
        navChildC1Collection: {
          items: [
            {
              navTitle: "Courses",
              navUrl: "/degrees/courses/",
              navCtaTarget: "Open in same tab",
            },
            {
              navTitle: "Universities",
              navUrl: "/degrees/find-university/",
              navCtaTarget: "Open in same tab",
            },
          ],
        },
      },
      {
        navTitle: "Popular subjects",
        navChildC1Collection: {
          items: [
            {
              navTitle: "Acting",
              navUrl: "/degree-courses/search?subject=acting",
              navCtaTarget: "Open in same tab",
            },
            {
              navTitle: "Physics",
              navUrl: "/degree-courses/search?subject=physics",
              navCtaTarget: "Open in same tab",
            },
          ],
        },
      },
    ],
  },
};

describe("Footer Component", () => {
  it("Correct rendering of  Footer component", async () => {
    (graphQlFetchFunction as jest.Mock).mockResolvedValue({
      footerData,
    });
    const FooterComp = await Footer();
    const { getByTestId } = render(FooterComp);
    expect(getByTestId("footer_component")).toBeInTheDocument();
  });

  it("Correct rendering of (icons)", async () => {
    (graphQlFetchFunction as jest.Mock).mockResolvedValue({
      footerData,
    });

    const FooterComp = await Footer();
    render(FooterComp);
    expect(screen.getByTestId("facebook_icon")).toBeInTheDocument();
    expect(screen.getByTestId("twitter_icon")).toBeInTheDocument();
    expect(screen.getByTestId("instagram_icon")).toBeInTheDocument();
    expect(screen.getByTestId("tiktok_icon")).toBeInTheDocument();
  });

  it("Correct looping of data: (title and child menu)", async () => {
    (graphQlFetchFunction as jest.Mock).mockResolvedValue({
      footerData,
    });

    const FooterComp = await Footer();
    render(FooterComp);
    waitFor(() => {
      footerData.footerNavCollection.items.map((items, index) => {
        expect(screen.getByTestId(`section${index + 1}`)).toBeInTheDocument();
        const UpperCase = items.navTitle.toUpperCase();
        expect(screen.getByText(UpperCase)).toBeInTheDocument();

        {
          items?.navChildC1Collection?.items?.map((childItem, childIndex) => {
            expect(screen.getByTestId(`childMenu${childIndex + 1}`));
            expect(screen.getByText(childItem.navTitle)).toBeInTheDocument();
          });
        }
      });
    });
  });
});
