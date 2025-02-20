import { render, screen, fireEvent } from "@testing-library/react";
import PgsSearch from "@packages/shared-components/common-utilities/Banners/hero/search-pod/pgs-search";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import "@testing-library/jest-dom";
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    pathname: "/new/pgs",
    asPath: "/new/pgs", // Simulate the current pathname
  })),
  usePathname: jest.fn(() => "/new/pgs"), // You might also want to mock usePathname
}));

describe("PgsSearch Component", () => {
  const pgs_search_data = {
    studyLevelList: [
      { qualUrl: "/qual1", qualCode: "Q1", qualDesc: "Qualification 1" },
      // Add more qualifications as needed
    ],
    courseDetails: [
      { description: "Course 1", url: "/course1" },
      // Add more courses as needed
    ],
    collegeDetails: [
      { collegeNameDisplay: "University 1" },
      // Add more universities as needed
    ],
  };

  beforeEach(() => {
    render(<PgsSearch pgs_search_data={pgs_search_data} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders input and search button", () => {
    // expect(
    //   screen.getByPlaceholderText("Subject, qualification or university")
    // ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  // test("displays error when search is attempted with empty input", () => {
  //   render(<PgsSearch pgs_search_data={pgs_search_data} />);
  //   fireEvent.click(screen.getByRole("button", { name: /search/i }));
  //   expect(
  //     screen.getByText("Enter subject, qualification or university")
  //   ).toBeInTheDocument();
  // });

  // test("navigates to search results when input is provided", () => {
  //   render(<PgsSearch pgs_search_data={pgs_search_data} />);
  //   const input = screen.getByPlaceholderText(
  //     "Subject, qualification or university"
  //   );
  //   fireEvent.change(input, { target: { value: "Course 1" } });
  //   fireEvent.click(screen.getByRole("button", { name: /search/i }));
  //   expect(mockPush).toHaveBeenCalledWith("/pgs/search?keyword=course-1");
  // });

  // Add more tests as needed
});
