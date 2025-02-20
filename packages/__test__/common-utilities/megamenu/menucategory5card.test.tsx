import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Menucategory5card from "@packages/shared-components/layout-components/megamenu/menucategory5card"; // adjust the import path
import * as helperFunctions from "@packages/lib/utlils/helper-function";
import "@testing-library/jest-dom";
// Mock the `GADataLayerFn` and `currentAuthenticatedUser` functions
jest.mock("@packages/lib/utlils/helper-function", () => ({
  GADataLayerFn: jest.fn(),
  currentAuthenticatedUser: jest.fn().mockResolvedValue("user123"),
}));

describe("Menucategory5card", () => {
  const mockData = [
    {
      flagNavItemStyle: "L2 Text",
      navTitle: "Category 1",
      navUrl: "https://example.com/category1",
      navIcon: { url: "https://example.com/icon1.png" },
      navCtaTarget: "Open in new tab",
    },
    {
      flagNavItemStyle: "L2 Text",
      navTitle: "Item 1",
      navUrl: "https://example.com/item1",
      navIcon: { url: "https://example.com/icon1.png" },
      navCtaTarget: "Open in new tab",
    },
    {
      flagNavItemStyle: "L2 Text",
      navTitle: "Item 2",
      navUrl: "https://example.com/item2",
      navIcon: { url: "https://example.com/icon2.png" },
      navCtaTarget: "Open in new tab",
    },
  ];

  const mockParentMenu = "Main Menu";

  it("renders the component correctly", () => {
    render(<Menucategory5card data={mockData} parentMenu={mockParentMenu} />);

    // Check if the category title is rendered
    expect(screen.getByText("Category 1")).toBeInTheDocument();

    // Check if each item is rendered
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();

    // Check if images are rendered
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("calls GADataLayerFn when a menu item is clicked", async () => {
    render(<Menucategory5card data={mockData} parentMenu={mockParentMenu} />);

    // Simulate a click on the first item
    const firstItem = screen.getByText("Item 1");
    fireEvent.click(firstItem);

    // Wait for async code to finish (if necessary)
    await waitFor(() => {
      expect(helperFunctions.GADataLayerFn).toHaveBeenCalledTimes(1);
      expect(helperFunctions.GADataLayerFn).toHaveBeenCalledWith(
        "ga_contentful_events",
        "header_clicks",
        "NA",
        "NA",
        "NA",
        "NA",
        "homepage",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "in_year",
        "user123", // This is from the mockAuthenticatedUser
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        "NA",
        `${process.env.PROJECT}`,
        "Item 1",
        "https://example.com/item1",
        mockParentMenu,
        "Category 1"
      );
    });
  });

  it("renders the menu items with the correct attributes", () => {
    render(<Menucategory5card data={mockData} parentMenu={mockParentMenu} />);

    // Check the first item's link
    const link = screen.getByText("Item 1").closest("a");
    expect(link).toHaveAttribute("href", "https://example.com/item1");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders the images with correct alt text", () => {
    render(<Menucategory5card data={mockData} parentMenu={mockParentMenu} />);

    // Get all images by alt text
    const images = screen.getAllByAltText("University logo");

    // Check if the correct number of images is rendered
    expect(images).toHaveLength(2); // 2 images in your mock data

    // You can also check the 'src' of the images to make sure they're correct
    expect(images[0]).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fexample.com%2Ficon1.png&w=640&q=75"
    );
    expect(images[1]).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fexample.com%2Ficon2.png&w=640&q=75"
    );
  });
});
