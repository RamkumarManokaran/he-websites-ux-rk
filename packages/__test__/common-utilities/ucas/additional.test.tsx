import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddQualification from "@packages/shared-components/common-utilities/popups/ucas-calculator/additional-qual";
import "@testing-library/jest-dom";
jest.mock("@packages/lib/utlils/ucas-functions", () => ({
  getSelectedGrade: jest.fn(() => 1),
  parseGradeString: jest.fn(() => [
    { key: "A", value: 10 },
    { key: "B", value: 5 },
  ]),
}));

const mockRemoveQual = jest.fn();
const mockSetQual = jest.fn();
const mockSetQualifications = jest.fn();
const mockSetUcasPoint = jest.fn();

const defaultProps = {
  removeQual: mockRemoveQual,
  qualOrder: 1,
  ucasGradeData: [
    {
      qualification: "UCAS Tariff Points",
      gradeOptions: "A,B",
      maxPoint: "20",
      maxTotalPoint: "60",
      template: "single-select",
      qualId: 123,
    },
  ],
  ucasPoint: 100,
  setUcasPoint: mockSetUcasPoint,
  indexPosition: 0,
  qual: [
    {
      SelectedLevel: "Test Level",
      type: "single-select",
      gradeArray: [
        { key: "A", value: 10 },
        { key: "B", value: 5 },
      ],
      podSpecificPoints: 30,
    },
  ],
  setQual: mockSetQual,
  setQualifications: mockSetQualifications,
};

describe("AddQualification Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders qualification label and dropdown trigger", () => {
    render(<AddQualification {...defaultProps} />);
    expect(screen.getByText(/1 qualification/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Level/i)).toBeInTheDocument();
  });

  it("opens and closes the dropdown on click", () => {
    render(<AddQualification {...defaultProps} />);

    const dropdownTrigger = screen.getByText(/Test Level/i);
    expect(screen.queryByText(/UCAS Tariff Points/i)).not.toBeInTheDocument();

    fireEvent.click(dropdownTrigger);
    expect(screen.getByText(/UCAS Tariff Points/i)).toBeInTheDocument();

    fireEvent.click(dropdownTrigger);
    expect(screen.queryByText(/UCAS Tariff Points/i)).not.toBeInTheDocument();
  });

  it("calls changeUcasLevel when a dropdown item is clicked", () => {
    render(<AddQualification {...defaultProps} />);
    const dropdownTrigger = screen.getByText(/Test Level/i);
    fireEvent.click(dropdownTrigger);

    const ucasItem = screen.getByText(/UCAS Tariff Points/i);
    fireEvent.click(ucasItem);

    expect(mockSetQual).toHaveBeenCalled();
    expect(mockSetUcasPoint).toHaveBeenCalledWith(70);
  });

  it("renders single-select grade buttons and handles selection", () => {
    render(<AddQualification {...defaultProps} />);

    const gradeButtons = screen.getAllByRole("button", { name: /A|B/i });
    const gradeButtonA = gradeButtons.find((btn) => btn.textContent === "A");
    const gradeButtonB = gradeButtons.find((btn) => btn.textContent === "B");

    if (gradeButtonA && gradeButtonB) {
      fireEvent.click(gradeButtonA);
      expect(mockSetQual).toHaveBeenCalled();
      fireEvent.click(gradeButtonB);
      expect(mockSetQual).toHaveBeenCalledTimes(2);
    } else {
      throw new Error("Grade buttons A or B not found");
    }
  });
});
