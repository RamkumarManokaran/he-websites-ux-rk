import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TopLevelMenu from "@packages/shared-components/common-utilities/popups/ucas-calculator/toplevel-menu";
describe("TopLevelMenu Component", () => {
  const mockUcasGradeData = [
    {
      qualification: "UCAS Tariff Points",
      gradeOptions: "A,B,C",
      maxPoint: "30",
      maxTotalPoint: "120",
      template: "single-select",
      qualId: 1,
    },
    {
      qualification: "Credits",
      gradeOptions: "0,3,6",
      maxPoint: "45",
      maxTotalPoint: "150",
      template: "credit-selector",
      qualId: 2,
    },
  ];

  const mockQual = [
    {
      SelectedLevel: "UCAS Tariff Points",
      type: "single-select",
      gradeArray: [
        { key: "A", value: 10 },
        { key: "B", value: 20 },
      ],
    },
  ];

  const setUcasPoint = jest.fn();
  const setQual = jest.fn();
  const setQualifications = jest.fn();

  const renderComponent = () =>
    render(
      <TopLevelMenu
        ucasGradeData={mockUcasGradeData}
        ucasPoint={10}
        setUcasPoint={setUcasPoint}
        indexPosition={0}
        qual={mockQual}
        setQual={setQual}
        resetid="123"
        setQualifications={setQualifications}
      />
    );

  test("renders the component with initial data", () => {
    renderComponent();
    expect(screen.getByText("UCAS Tariff Points")).toBeInTheDocument();
  });
});
