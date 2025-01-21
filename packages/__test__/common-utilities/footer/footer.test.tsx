import "@testing-library/jest-dom";
import { FooterNavCollectionItem } from "@packages/lib/types/interfaces";
import { render, screen } from "@testing-library/react";
import Footer from "@packages/shared-components/common-utilities/footer/footercomponents";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import FooterIcons from "@packages/shared-components/common-utilities/footer/footericons";
import FooterAppLinks from "@packages/shared-components/common-utilities/footer/footer-applink";
import FooterNavCollection from "@packages/shared-components/common-utilities/footer/footer-navcollection";
import FooterCopyRights from "@packages/shared-components/common-utilities/footer/footer-copyrights";
jest.mock("@packages/lib/server-actions/server-action", () => ({
  graphQlFetchFunction: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Footer Component : Positive scenario", () => {
  test("Correct Rendering of icons", () => {
    render(<FooterIcons />);
  });
  test("Correct Rendering of Copy rights", () => {
    const mockedData = {
      navTitle: "© 2007-2024 IDP Connect Ltd. All rights reserved",
      navUrl: null,
    };
    render(<FooterCopyRights data={mockedData} />);
    expect(screen.getByText(mockedData.navTitle)).toBeInTheDocument();
  });
  test("Correct rednering of footer app links", () => {
    const mockData = [
      {
        primaryCtaLabel: "App store",
        primaryCtaUrl: "https://whatuni.go.link/?adj_t=cark98y",
      },
      {
        primaryCtaLabel: "Play store",
        primaryCtaUrl: "https://whatuni.go.link/?adj_t=cark98y",
      },
    ];
    render(<FooterAppLinks data={mockData} />);
    expect(screen.getByTestId("play_store")).toBeInTheDocument();
    expect(screen.getByTestId("app_store")).toBeInTheDocument();
  });

  test("Correct rendering of Nav collection items", () => {
    const mockData: FooterNavCollectionItem[] = [
      {
        navTitle: "Quick links",
        navChildC1Collection: {
          items: [
            {
              navTitle: "Editor@whatuni.com",
              navUrl: "mailto:editor@whatuni.com",
              navCtaTarget: null,
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
              navTitle: "Degree subject guides",
              navUrl: "/advice/guides/subject-guides/",
              navCtaTarget: null,
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
              navCtaTarget: "Open in new tab",
            },
          ],
        },
      },
    ];
    render(<FooterNavCollection data={mockData} />);
    mockData?.map((childItems) => {
      expect(screen.getByText(childItems.navTitle)).toBeInTheDocument();
      {
        childItems?.navChildC1Collection?.items?.map((items, index) => {
          const linkTag = expect(
            screen.getByTestId(`${items.navTitle}${index + 1}`)
          );
          if (items.navCtaTarget?.includes("new")) {
            linkTag.toHaveAttribute("target", "_blank");
          } else {
            linkTag.toHaveAttribute("target", "_parent");
          }
        });
      }
    });
  });
  test("Correct rendering of footer parent wrapper", async () => {
    const mockData = {
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
              ],
            },
          },
        ],
      },
    };
    (graphQlFetchFunction as jest.Mock).mockResolvedValue({
      data: mockData,
    });
    render(await Footer());
  });
});

describe("Footer Component : Negative scenario", () => {
  test("Copy rights not rendering", async () => {
    (graphQlFetchFunction as jest.Mock).mockResolvedValue({});
    render(await Footer());
    expect(screen.queryByTestId("footer_component")).not.toBeInTheDocument();
    expect(screen.queryByTestId("copy_rights")).not.toBeInTheDocument();
    expect(screen.queryByTestId("nav_applinks")).not.toBeInTheDocument();
  });
});
