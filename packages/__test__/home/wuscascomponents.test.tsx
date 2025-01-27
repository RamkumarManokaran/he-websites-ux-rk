import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";
import Wuscascomponents from "@packages/shared-components/common-utilities/wuscas/wuscascomponents";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the GraphQL function and Next/Image component
jest.mock("@packages/lib/server-actions/server-action");
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock Next/Link component
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("Wuscascomponents", () => {
  const props = {
    heading: "Test Heading",
    subheading: "Test Subheading",
  };
  const mockGraphQLData = {
    data: {
      contentData: {
        items: [
          {
            bodyContentCollection: {
              items: [
                {
                  __typename: "MultipleCardContainer",
                  mediaCardsCollection: {
                    items: [
                      {
                        __typename: "PageStatPodContainer",
                        cta: {
                          primaryCtaLabel: "See the winning unis",
                          primaryCtaUrl:
                            "/student-awards-winners/university-of-the-year/",
                        },
                        image: {
                          url: "/test-image-url.png",
                        },
                        statinfoCollection: {
                          items: [
                            {
                              icon: { url: "/test-icon-url.png" },
                              statNumber: "38000",
                              statLabel: "Student reviews",
                            },
                            {
                              icon: { url: "/test-icon-url1.png" },
                              statNumber: "101",
                              statLabel: "UK universities",
                            },
                            {
                              icon: { url: "/test-icon-url2.png" },
                              statNumber: "12",
                              statLabel: "years of WUSCAs",
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (graphQlFetchFunction as jest.Mock).mockResolvedValue(mockGraphQLData);
  });

  test("renders heading and subheading correctly", async () => {
    render(await Wuscascomponents(props));
    expect(screen.getByText("Test Heading")).toBeInTheDocument();
    expect(screen.getByText("Test Subheading")).toBeInTheDocument();
  });

  test("handles missing heading and subheading", async () => {
    const prop = {
      heading: undefined,
      subheading: undefined,
    };
    render(await Wuscascomponents(prop));
  });

  test("renders stats data correctly", async () => {
    render(await Wuscascomponents(props));

    expect(screen.getByText("101")).toBeInTheDocument();
    expect(screen.getByText("UK universities")).toBeInTheDocument();

    expect(screen.getByText("38000")).toBeInTheDocument();
    expect(screen.getByText("Student reviews")).toBeInTheDocument();

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("years of WUSCAs")).toBeInTheDocument();
  });

  test("renders the stat pod container with correct data", async () => {
    render(await Wuscascomponents(props));

    // Test CTA button
    const ctaButton = screen.getByText("See the winning unis");
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.closest("a")).toHaveAttribute(
      "href",
      "/student-awards-winners/university-of-the-year/"
    );

    // Test main image
    const mainImage = screen.getByRole("img", { name: /wusca/i });
    expect(mainImage).toHaveAttribute("src", "/test-image-url.png");
  });

  test("handles GraphQL errors gracefully", async () => {
    (graphQlFetchFunction as jest.Mock).mockRejectedValue(
      new Error("GraphQL Error")
    );
    try {
      render(await Wuscascomponents(props));
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
