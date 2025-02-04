import { render, screen, fireEvent } from "@testing-library/react";
import Menucategory4card from "@packages/shared-components/layout-components/megamenu/menucategory4card";
import {
  GADataLayerFn,
  currentAuthenticatedUser,
} from "@packages/lib/utlils/helper-function";
import "@testing-library/jest-dom";

// Mock the external functions
jest.mock("@packages/lib/utlils/helper-function", () => ({
  currentAuthenticatedUser: jest.fn().mockReturnValue("user123"), // Mocked string return value
  GADataLayerFn: jest.fn(),
}));

const mockData = [
  {
    flagNavItemStyle: "L2 Text",
    navTitle: "Category Title",
    navUrl: "#",
  },
  {
    flagNavItemStyle: "Other",
    navTitle: "Item 1",
    navUrl: "https://example.com/item1",
    navIcon: { url: "https://example.com/icon1.png" },
  },
  {
    flagNavItemStyle: "Other",
    navTitle: "Item 2",
    navUrl: "https://example.com/item2",
    navIcon: { url: "https://example.com/icon2.png" },
  },
];

const mockParentMenu = "parentMenuExample";

describe("Menucategory4card", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any mocks before each test
  });

  it("renders the category title", () => {
    render(<Menucategory4card data={mockData} parentMenu={mockParentMenu} />);

    // Check if the title is rendered
    const titleElement = screen.getByText("Category Title");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the correct number of items", () => {
    render(<Menucategory4card data={mockData} parentMenu={mockParentMenu} />);

    // Check if the items are rendered
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2); // Only 2 items should be rendered (excluding L2 Text)
  });

  it("renders images with the correct alt text", () => {
    render(<Menucategory4card data={mockData} parentMenu={mockParentMenu} />);

    // Check for images
    const images = screen.getAllByAltText("University logo");
    expect(images).toHaveLength(2); // Two items with images

    // Check if the src attribute contains the expected URL (optimizing query parameters are included)
    expect(images[0]).toHaveAttribute(
      "src",
      expect.stringContaining(
        "/_next/image?url=https%3A%2F%2Fexample.com%2Ficon1.png&w=640&q=75"
      )
    );
    expect(images[1]).toHaveAttribute(
      "src",
      expect.stringContaining(
        "/_next/image?url=https%3A%2F%2Fexample.com%2Ficon2.png&w=640&q=75"
      )
    );
  });

  it("calls GADataLayerFn when a link is clicked", async () => {
    render(<Menucategory4card data={mockData} parentMenu={mockParentMenu} />);

    const firstLink = screen.getByText("Item 1");
    fireEvent.click(firstLink);

    await screen.findByText("Item 1"); // Just a check to ensure the click is processed

    expect(GADataLayerFn).toHaveBeenCalledTimes(1);
    expect(GADataLayerFn).toHaveBeenCalledWith(
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
      "user123", // Now returning mocked user ID
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
      "Category Title"
    );
  });
  it("renders the correct link target when not open in a new tab", () => {
    render(<Menucategory4card data={mockData} parentMenu={mockParentMenu} />);

    const firstLink = screen.getByText("Item 1");
    // Check if the 'target' attribute is not set (i.e., it doesn't exist on the element)
    expect(firstLink).not.toHaveAttribute("target");
  });

  it("renders the correct link rel attribute when not open in a new tab", () => {
    render(<Menucategory4card data={mockData} parentMenu={mockParentMenu} />);

    const firstLink = screen.getByText("Item 1");
    // Check if the 'rel' attribute is not set (i.e., it doesn't exist on the element)
    expect(firstLink).not.toHaveAttribute("rel");
  });

  // it('renders the correct link target for new tab', () => {
  //   const newData = [
  //     {
  //       flagNavItemStyle: 'L2 Text',
  //       navTitle: 'Category Title',
  //       navUrl: '#',
  //     },
  //     {
  //       flagNavItemStyle: 'Other',
  //       navTitle: 'Item 1',
  //       navUrl: 'https://example.com/item1',
  //       navCtaTarget: 'Open in new tab',
  //       navIcon: { url: 'https://example.com/icon1.png' },
  //     },
  //   ];

  //   render(<Menucategory4card data={newData} parentMenu={mockParentMenu} />);

  //   const newTabLink = screen.getByText('Item 1');
  //   // Check if the 'target' and 'rel' attributes are set correctly for new tab
  //   expect(newTabLink).toHaveAttribute('target', '_blank');
  //   expect(newTabLink).toHaveAttribute('rel', 'noopener noreferrer');
  // });
});
