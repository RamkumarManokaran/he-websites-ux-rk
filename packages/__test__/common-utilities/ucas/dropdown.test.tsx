import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GradeDropdown from "@packages/shared-components/common-utilities/popups/ucas-calculator/grade-dropdown";
import "@testing-library/jest-dom";
import { extractValue } from "@packages/lib/utlils/ucas-functions";

jest.mock("@packages/lib/utlils/ucas-functions", () => ({
  extractValue: jest.fn(),
}));

describe("GradeDropdown Component", () => {
  const setQual = jest.fn();
  const setUcasPoint = jest.fn();
  const initialProps = {
    qual: [
      {
        gradeArray: [
          { key: "D", value: 10 },
          { key: "M", value: 6 },
          { key: "P", value: 3 },
        ],
        userEntryPoint: "15D-15M-15P",
        podSpecificPoints: 45,
      },
    ],
    setQual,
    indexPosition: 0,
    ucasPoint: 100,
    setUcasPoint,
  };

  beforeEach(() => {
    (extractValue as jest.Mock).mockImplementation((entry, key) => {
      if (key === "D") return 15;
      if (key === "M") return 10;
      if (key === "P") return 5;
      return 0;
    });
  });

  it("renders dropdown options for Distinction, Merit, and Pass", () => {
    render(<GradeDropdown {...initialProps} />);
    expect(screen.getByLabelText("Distinction")).toBeInTheDocument();
    expect(screen.getByLabelText("Merit")).toBeInTheDocument();
    expect(screen.getByLabelText("Pass")).toBeInTheDocument();
  });
});
