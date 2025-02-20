"use client";
import { render, screen, waitFor, act } from "@testing-library/react";
import UcasComponent from "@packages/shared-components/common-utilities/popups/ucas-calculator/ucascomponent";
import { fetchAuthSession } from "aws-amplify/auth";
import { getCookie } from "@packages/lib/utlils/helper-function";
import { ucasAjax } from "@packages/lib/api-payloads/payloads";
jest.mock("aws-amplify/auth");
jest.mock("@packages/lib/utlils/helper-function");
const mockUcasGradeData = [
  {
    qualId: "1",
    qualification: "Level 3",
    maxPoint: "120",
    maxTotalPoint: "120",
    template: "points",
    gradeOptions: "A*-E",
  },
  {
    qualId: "2",
    qualification: "Access to HE Diploma",
    maxPoint: "45",
    maxTotalPoint: "45",
    template: "credits",
    gradeOptions: "Pass-Distinction",
  },
  {
    qualId: "3",
    qualification: "UCAS Tariff Points",
    maxPoint: "168",
    maxTotalPoint: "168",
    template: "range",
    gradeOptions: null,
  },
];

const mockUserGradeDetails = {
  ucasPoint: 120,
  userStudyLevelEntry: [{ qualId: 1, userEntryPoint: "A" }],
};

const mockFetch = (data: any) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(data),
    })
  ) as jest.Mock;
};

describe("UcasComponent", () => {
  beforeEach(() => {
    (fetchAuthSession as jest.Mock).mockResolvedValue({
      tokens: { idToken: "mockToken" },
    });
    (getCookie as jest.Mock).mockReturnValue(null);
    mockFetch({
      gradeFilterList: mockUcasGradeData,
      userGradeDetails: mockUserGradeDetails,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<UcasComponent isUcasOpen={true} onClose={jest.fn()} />);
  });
});
