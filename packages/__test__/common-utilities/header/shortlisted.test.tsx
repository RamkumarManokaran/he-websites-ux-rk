import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Shortlisted from "@packages/shared-components/layout-components/header/shortlisted/shortlisted";

describe("Shortlisted Component", () => {
  it("renders the list items correctly when data is provided", () => {
    const mockData = {
      data: {
        contentData: {
          items: [
            {
              shortlistMenu: {
                navigationElementsCollection: {
                  items: [
                    {
                      navChildC1Collection: {
                        items: [
                          { navTitle: "Item 1", navUrl: "/item1" },
                          { navTitle: "Item 2", navUrl: "/item2" },
                          { navTitle: "Item 3", navUrl: "/item3" },
                        ],
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    };

    render(<Shortlisted topnav_data={mockData} />);

    // Assert the list items are rendered
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();

    // Assert the anchor tags' href attributes
    expect(screen.getByText("Item 1").closest("a")).toHaveAttribute(
      "href",
      "/item1"
    );
    expect(screen.getByText("Item 2").closest("a")).toHaveAttribute(
      "href",
      "/item2"
    );
    expect(screen.getByText("Item 3").closest("a")).toHaveAttribute(
      "href",
      "/item3"
    );
  });

  it('renders the "Compare" button with correct href', () => {
    const mockData = {
      data: {
        contentData: {
          items: [
            {
              shortlistMenu: {
                navigationElementsCollection: {
                  items: [
                    {
                      navChildC1Collection: {
                        items: [],
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    };

    render(<Shortlisted topnav_data={mockData} />);

    // Assert the "Compare" button
    const compareButton = screen.getByText("Compare");
    expect(compareButton).toBeInTheDocument();
    expect(compareButton.closest("a")).toHaveAttribute(
      "href",
      "/degrees/comparison"
    );
  });

  it("handles empty data gracefully", () => {
    const mockData = {};

    render(<Shortlisted topnav_data={mockData} />);

    // Ensure no list items are rendered
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);

    // Ensure the "Compare" button still renders
    const compareButton = screen.getByText("Compare");
    expect(compareButton).toBeInTheDocument();
  });
});
