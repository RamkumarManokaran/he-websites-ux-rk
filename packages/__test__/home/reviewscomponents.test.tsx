import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getReviewDetailsFunction } from "@packages/lib/server-actions/server-action";
import { reviewPayload } from "@packages/lib/api-payloads/payloads";
import Reviewscomponents from "@packages/shared-components/common-utilities/slider/reviews/reviewscomponents";

// Mock the server action
jest.mock("@packages/lib/server-actions/server-action", () => ({
  getReviewDetailsFunction: jest.fn(),
}));

// Mock Swiper components
jest.mock("swiper/react", () => ({
  Swiper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper">{children}</div>
  ),
  SwiperSlide: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="swiper-slide">{children}</div>
  ),
}));
jest.mock("swiper/modules", () => ({
  Navigation: jest.fn(),
  Pagination: jest.fn(),
  FreeMode: jest.fn(),
}));

// Mock data
const mockReviewData = {
  reviewDetail: [
    {
      id: 1,
      title: "Great Experience",
      description: "Test review description",
      rating: 5,
      author: "John Doe",
    },
    {
      id: 2,
      title: "Awesome Service",
      description: "Another test review",
      rating: 4,
      author: "Jane Smith",
    },
  ],
};
const props = {
  heading: "Honest reviews from real students",
  subheading:
    "Discover genuine insights from students to help you make the best choice.",
};

describe("Reviewscomponents", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    (getReviewDetailsFunction as jest.Mock).mockResolvedValue(mockReviewData);
  });

  test("renders the component with heading and subheading", async () => {
    render(await Reviewscomponents(props));
    expect(
      screen.getByText("Honest reviews from real students")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Discover genuine insights from students to help you make the best choice."
      )
    ).toBeInTheDocument();
  });

  test("calls getReviewDetailsFunction with correct payload", async () => {
    render(await Reviewscomponents(props));

    expect(getReviewDetailsFunction).toHaveBeenCalledWith(reviewPayload);
    expect(getReviewDetailsFunction).toHaveBeenCalledTimes(1);
  });

  test("renders review slider with correct data", async () => {
    render(await Reviewscomponents(props));
    await screen.findByTestId("review-slider");
    expect(screen.getByTestId("review-slider")).toBeInTheDocument();
  });

  test("renders view more link", async () => {
    render(await Reviewscomponents(props));
    const viewMoreLink = screen.getByText("View more");
    expect(viewMoreLink).toBeInTheDocument();
    expect(viewMoreLink.tagName).toBe("A");
  });

  test("handles empty review data", async () => {
    // Mock empty review data
    (getReviewDetailsFunction as jest.Mock).mockResolvedValue({
      reviewDetail: [],
    });
    render(await Reviewscomponents(props));
    expect(screen.getByTestId("empty-data")).toBeInTheDocument();
  });
});
