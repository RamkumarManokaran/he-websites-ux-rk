import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestimonialVideo from "@packages/shared-components/common-utilities/testimonials/testimonialvideocomponents";
import "@testing-library/jest-dom";

describe("TestimonialVideo", () => {
  const mockData = {
    multimediaBlockLeft: {
      videoUpload: {
        url: "/path/to/video.mp4",
        width: 600,
        height: 316,
      },
      thumbnail: {
        url: "/path/to/thumbnail.jpg",
        width: 600,
        height: 316,
      },
    },
  };

  test("renders the video thumbnail initially", () => {
    render(<TestimonialVideo contentfullRightData={mockData} />);
    const thumbnailImage = screen.getByAltText("video thumbnail image");
    expect(thumbnailImage).toBeInTheDocument();
    expect(thumbnailImage).toHaveAttribute(
      "data-src",
      "/path/to/thumbnail.jpg"
    );
  });

  test("plays the video when play icon is clicked", () => {
    render(<TestimonialVideo contentfullRightData={mockData} />);
    const playIcon = screen.getByAltText(""); // Ensure the play icon has a recognizable alt or use a test ID
    const videoElement = screen.getByTestId(
      "video-element"
    ) as HTMLVideoElement;

    // Mock the play function
    const playMock = jest
      .spyOn(videoElement, "play")
      .mockImplementation(() => Promise.resolve());

    // Simulate play icon click
    fireEvent.click(playIcon);

    // Verify that play was called
    expect(playMock).toHaveBeenCalled();

    // Cleanup mock
    playMock.mockRestore();
  });

  test("handles missing multimedia data gracefully", () => {
    render(<TestimonialVideo contentfullRightData={{}} />);
    const thumbnailImage = screen.queryByAltText("video thumbnail image");

    // Assert that the thumbnail is not rendered
    expect(thumbnailImage).not.toBeInTheDocument();
  });
});
