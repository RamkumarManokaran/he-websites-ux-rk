import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { usePathname, useRouter } from "next/navigation";
// Import NextRouter
import Header from "@packages/shared-components/layout-components/header/headercomponents"; // Adjust the path as needed
// import uni_data from "@packages/lib/mockdata/uni_data.json";
// import course_data from "@packages/lib/mockdata/course_data.json";
// import topnav_data from "@packages/lib/mockdata/topnav_data.json";
// import exp from "constants";

// Mocking useRouter with the correct type
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    pathname: "/something",
    asPath: "/something", // Simulate the current pathname
  })),
  usePathname: jest.fn(() => "/something"), // Mock usePathname to return a fixed pathname
}));
const uni_data = [{ id: 1, name: "University 1" }];
const course_data = [{ id: 1, name: "Course 1" }];
const topnav_data = [{ id: 1, name: "Nav Item 1" }];

describe("Header Component", () => {
  beforeEach(() => {
    render(
      <Header
        uni_data={uni_data}
        course_data={course_data}
        topnav_data={topnav_data}
      />
    );
  });

  test("should render the Header component", () => {
    expect(screen.getByText("Find a course")).toBeInTheDocument();
    expect(screen.getByText("Find a uni")).toBeInTheDocument();
    expect(screen.getByAltText("Whatuni Logo")).toBeInTheDocument();
  });

  test("should render the user and shortlist menu", () => {
    expect(screen.getByLabelText("User")).toBeInTheDocument();
    expect(screen.getByLabelText("Shortlist")).toBeInTheDocument();
  });

  // test("should open and close the user menu", () => {
  //   const userButton = screen.getByLabelText("User");

  //   fireEvent.click(userButton); // Simulate user clicking the button to open the menu
  //   expect(screen.getByText("My profile")).toBeInTheDocument(); // Verify that menu opens

  //   fireEvent.click(userButton); // Simulate user clicking again to close the menu
  //   expect(screen.queryByText("My profile")).not.toBeInTheDocument();

  //   // Verify that menu closes
  // });
  // test("should open and close the shortlist menu", () => {
  //   const shortlistButton = screen.getByLabelText("Shortlist");

  //   fireEvent.click(shortlistButton); // Simulate user clicking the button to open the menu
  //   expect(screen.getByText("Favourites")).toBeInTheDocument(); // Verify that menu opens

  //   fireEvent.click(shortlistButton); // Simulate user clicking again to close the menu
  //   expect(screen.queryByText("Favourites")).not.toBeInTheDocument();
  // });

  // test("should open and close the search menu and set path to /something", () => {
  //   // Mocking the usePathname hook to simulate the path "/something"
  //   expect(usePathname()).toBe("/something");
  //   const searchButton = screen.getByLabelText("Search");
  //   expect(searchButton).toBeInTheDocument();
  //   // Verify that the pathname is set to /something
  //   // expect(usePathname()).toBe("/something");
  // });

  // test("chcek for / path", () => {
  //   usePathname.mockReturnValue("/"); // Mock usePathname to return "/"
  //   useRouter.mockReturnValue({
  //     push: jest.fn(),
  //     pathname: "/",
  //     asPath: "/",
  //   });

  //   // expect(searchButton).not.toBeInTheDocument();
  //   expect(usePathname()).toBe("/");
  //   expect(screen.queryByLabelText("Search")).not.toBeInTheDocument();
  //   // expect(searchButton).not.toBeInTheDocument();
  // });
  // test("test in mobile view", () => {
  //   global.innerWidth = 500;
  //   fireEvent.resize(window);
  //   expect(screen.queryByText("Find a course")).not.toBeInTheDocument();
  // });
  // test("handle click outside", () => {
  //   const shortlistButton = screen.getByLabelText("Shortlist");
  //   fireEvent.click(shortlistButton); // Simulate user clicking the button to open the menu
  //   expect(screen.getByText("Favourites")).toBeInTheDocument(); // Verify that menu opens
  //   fireEvent.click(document.body);
  //   expect(screen.queryByText("Favourites")).not.toBeInTheDocument();
  // });
});
