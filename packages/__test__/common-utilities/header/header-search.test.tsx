import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Additional matchers
import Search from "@packages/shared-components/layout-components/header/search-pod/header-search";
import emitter from "@packages/lib/eventEmitter/eventEmitter";
import CourseTab from "@packages/shared-components/common-utilities/searchBar/search-input-pods/coursetab";
import UniversityTab from "@packages/shared-components/common-utilities/searchBar/search-input-pods/universitytab";
import AdviceTab from "@packages/shared-components/common-utilities/searchBar/search-input-pods/advicetab";
import { CourseData, UniData } from "@packages/lib/types/interfaces";
// Mock the components
jest.mock("@packages/shared-components/home/search-input-pods/coursetab", () =>
  jest.fn(() => <div data-testid="course-tab">CourseTab Content</div>)
);

jest.mock(
  "@packages/shared-components/home/search-input-pods/universitytab",
  () =>
    jest.fn(() => <div data-testid="university-tab">UniversityTab Content</div>)
);

jest.mock("@packages/shared-components/home/search-input-pods/advicetab", () =>
  jest.fn(() => <div data-testid="advice-tab">AdviceTab Content</div>)
);

// Mock the event emitter
jest.mock("@packages/lib/eventEmitter/eventEmitter", () => ({
  emit: jest.fn(),
}));

const mockCourseData: CourseData = { courses: ["Course1", "Course2"] };
const mockUniData: UniData = { universities: ["University1", "University2"] };

describe("Search Component", () => {
  test("should render the component with initial state", () => {
    render(<Search course_data={mockCourseData} uni_data={mockUniData} />);

    // Verify that the "Courses" tab is active by default
    const coursesTab = screen.getByText("Courses");
    expect(coursesTab).toHaveClass("bg-black text-white");

    // Verify that the CourseTab component is rendered
    const courseTabContent = screen.getByTestId("course-tab");
    expect(courseTabContent).toBeInTheDocument();
  });

  test("should switch tabs correctly", () => {
    render(<Search course_data={mockCourseData} uni_data={mockUniData} />);

    // Click the "Universities" tab
    const universitiesTab = screen.getByText("Universities");
    fireEvent.click(universitiesTab);

    // Verify that the Universities tab is active
    expect(universitiesTab).toHaveClass("bg-black text-white");

    // Verify that the UniversityTab component is rendered
    const universityTabContent = screen.getByTestId("university-tab");
    expect(universityTabContent).toBeInTheDocument();

    // Verify that the CourseTab component is not rendered
    const courseTabContent = screen.queryByTestId("course-tab");
    expect(courseTabContent).not.toBeInTheDocument();

    // Click the "Advice" tab
    const adviceTab = screen.getByText("Advice");
    fireEvent.click(adviceTab);

    // Verify that the Advice tab is active
    expect(adviceTab).toHaveClass("bg-black text-white");

    // Verify that the AdviceTab component is rendered
    const adviceTabContent = screen.getByTestId("advice-tab");
    expect(adviceTabContent).toBeInTheDocument();

    // Verify that the UniversityTab component is not rendered
    expect(screen.queryByTestId("university-tab")).not.toBeInTheDocument();
  });

  test("should emit the correct action on close button click", () => {
    render(<Search course_data={mockCourseData} uni_data={mockUniData} />);

    // Click the close button
    const closeButton = screen.getByLabelText("close-button");
    fireEvent.click(closeButton);

    // Verify that the emitter was called with the correct arguments
    expect(emitter.emit).toHaveBeenCalledWith("rightMenuActionclose", "SEARCH");
  });
});
