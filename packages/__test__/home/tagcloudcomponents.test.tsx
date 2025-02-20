import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // For additional matchers like toBeInTheDocument
import HeadersearchWrapper from "@packages/shared-components/layout-components/header/headerWrapper";
import { searchAjaxFecthFunction } from "@packages/lib/server-actions/server-action";
import Search from "@packages/shared-components/layout-components/header/search-pod/header-search";

// Mock the `searchAjaxFecthFunction`
jest.mock("@packages/lib/server-actions/server-action", () => ({
  searchAjaxFecthFunction: jest.fn(),
}));

// Mock the `Search` component
jest.mock("./header-search", () =>
  jest.fn(() => <div data-testid="search-component"></div>)
);

const mockCourseData = { courses: ["Course1", "Course2"] };
const mockUniData = { universities: ["University1", "University2"] };

describe("HeadersearchWrapper", () => {
  test("should render the Search component with data from both API calls", async () => {
    (searchAjaxFecthFunction as jest.Mock)
      .mockResolvedValueOnce(mockCourseData) // Mock response for `body`
      .mockResolvedValueOnce(mockUniData); // Mock response for `unibody`

    render(await HeadersearchWrapper());

    // Check if the API calls were made with the correct arguments
    expect(searchAjaxFecthFunction).toHaveBeenCalledWith({
      affiliateId: 220703,
      actionType: "subject",
      keyword: "",
      qualCode: "",
      networkId: 2,
    });
    expect(searchAjaxFecthFunction).toHaveBeenCalledWith({
      affiliateId: 220703,
      actionType: "institution",
      keyword: "",
      qualCode: "",
      networkId: 2,
    });

    // Verify the `Search` component is rendered
    const searchComponent = screen.getByTestId("search-component");
    expect(searchComponent).toBeInTheDocument();

    // Verify the props passed to the `Search` component
    expect(Search).toHaveBeenCalledWith(
      { course_data: mockCourseData, uni_data: mockUniData },
      {}
    );
  });

  test("should render the Search component when API responses are empty", async () => {
    (searchAjaxFecthFunction as jest.Mock)
      .mockResolvedValueOnce({ courses: [] }) // Mock empty response for `body`
      .mockResolvedValueOnce({ universities: [] }); // Mock empty response for `unibody`

    render(await HeadersearchWrapper());

    // Check if the Search component is rendered even with empty data
    const searchComponent = screen.getByTestId("search-component");
    expect(searchComponent).toBeInTheDocument();

    // Verify the props passed to the `Search` component
    expect(Search).toHaveBeenCalledWith(
      { course_data: { courses: [] }, uni_data: { universities: [] } },
      {}
    );
  });
});
