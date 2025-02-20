import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OurPartnerComponent from "@packages/shared-components/common-utilities/our-partners/ourpartnercomponent";
import { graphQlFetchFunction } from "@packages/lib/server-actions/server-action";

jest.mock("swiper/react", () => ({
    Swiper: ({ children }: any) => <div>{children}</div>,
    SwiperSlide: ({ children }: any) => <div>{children}</div>,
  }));
  
  jest.mock("swiper/modules", () => ({
    Autoplay: jest.fn(),
    EffectFade: jest.fn(),
    Pagination: jest.fn(),
  }));

// Mock the GraphQL fetch function
jest.mock("@packages/lib/server-actions/server-action", () => ({
    graphQlFetchFunction: jest.fn(),
  }));
  
  describe("OurPartnerComponent", () => {
    const mockPartnerData = {
      data: {
        contentData: {
          items: [
            {
              bodyContentCollection: {
                items: [
                  {
                    mediaCardsCollection: {
                      items: [
                        {
                          logoName: "Logo - Heriot watt - Whatuni",
                          logoLink: null,
                          logoImage: { url: "https://images.ctfassets.net/szez98lehkfm/4oXpqApH…ac4/715b97b3b231d9deed80980f220cd2aa/partner1.png", width: 64, height: 64 },
                        },
                        {
                          logoName: "Logo - Aberdeen - Whatuni",
                          logoLink: null,
                          logoImage: { url: "https://images.ctfassets.net/szez98lehkfm/22oV7Fwu…q92/edd2033a02f0c056d2f28ffd7f7dcc8d/partner2.png", width: 64, height: 64 },
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
      // Reset mock implementation before each test
      (graphQlFetchFunction as jest.Mock).mockResolvedValue(mockPartnerData);
    });
  
    test("fetches and displays partner logos correctly", async () => {
      render(<OurPartnerComponent heading="Partnered with over 100 universities" />);
  
      // Check if the heading is rendered
      expect(screen.getByText(/Partnered with over 100 universities/i)).toBeInTheDocument();
  
      // Wait for the logos to load and check if the images are rendered
      await waitFor(() => {
        const logos = screen.getAllByRole("img");
        expect(logos.length).toBe(2); // Expect 2 logos to be rendered
  
        // Check the first logo
        expect(logos[0]).toHaveAttribute("data-src", "https://images.ctfassets.net/szez98lehkfm/4oXpqApH…ac4/715b97b3b231d9deed80980f220cd2aa/partner1.png");
        expect(logos[0]).toHaveAttribute("alt", "Logo - Heriot watt - Whatuni");
  
        // Check the second logo
        expect(logos[1]).toHaveAttribute("data-src", "https://images.ctfassets.net/szez98lehkfm/22oV7Fwu…q92/edd2033a02f0c056d2f28ffd7f7dcc8d/partner2.png");
        expect(logos[1]).toHaveAttribute("alt", "Logo - Aberdeen - Whatuni");
      });
    });
  
    test("displays the correct heading passed via props", () => {
      render(<OurPartnerComponent heading="Partnered with over 100 universities" />);
      
      // Check that the heading passed in props is displayed correctly
      expect(screen.getByText(/Partnered with over 100 universities/i)).toBeInTheDocument();
    });
  
    test("handles empty partner data gracefully", async () => {
      // Mock the GraphQL function to return empty data
      (graphQlFetchFunction as jest.Mock).mockResolvedValueOnce({
        data: {
          contentData: {
            items: [
              {
                bodyContentCollection: {
                  items: [
                    {
                      mediaCardsCollection: {
                        items: [],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      });
  
      render(<OurPartnerComponent heading="Partnered with over 100 universities" />);
  
      // Wait for the logos to load
      await waitFor(() => {
        const logos = screen.queryAllByRole("img");
        expect(logos.length).toBe(0); // No logos should be displayed
      });
    });
  });