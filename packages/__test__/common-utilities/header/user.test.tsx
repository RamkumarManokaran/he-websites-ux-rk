import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import User from "@packages/shared-components/layout-components/header/user/user";

// Mocking `signOut` and `window.location`
jest.mock("aws-amplify/auth", () => ({
  signOut: jest.fn(),
}));

const mockSignOut = require("aws-amplify/auth").signOut;

describe("User Component", () => {
  beforeEach(() => {
    mockSignOut.mockClear();
    Object.defineProperty(window, "location", {
      value: { href: "" },
      writable: true,
    });
  });

  it("renders the user profile menu correctly", () => {
    const mockData = {
      data: {
        contentData: {
          items: [
            {
              customerProfileMenu: {
                navChildC1Collection: {
                  items: [
                    { navTitle: "Profile", navUrl: "/profile" },
                    { navTitle: "Logout", navUrl: "" },
                  ],
                },
              },
            },
          ],
        },
      },
    };

    render(<User topnav_data={mockData} />);

    // Assert that menu items are rendered
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();

    // Assert "Profile" link has the correct href
    expect(screen.getByText("Profile").closest("a")).toHaveAttribute(
      "href",
      "/profile"
    );
  });

  it("triggers logout when 'Logout' is clicked", async () => {
    const mockData = {
      data: {
        contentData: {
          items: [
            {
              customerProfileMenu: {
                navChildC1Collection: {
                  items: [{ navTitle: "Logout", navUrl: "" }],
                },
              },
            },
          ],
        },
      },
    };

    // Mock sessionStorage and document.cookie
    Object.defineProperty(window, "sessionStorage", {
      value: { clear: jest.fn() },
      writable: true,
    });

    let cookieValue = "wcache=test";
    Object.defineProperty(document, "cookie", {
      get: jest.fn(() => cookieValue),
      set: jest.fn((value) => {
        cookieValue = value;
      }),
      configurable: true,
    });

    render(<User topnav_data={mockData} />);

    const logoutLink = screen.getByText("Logout");

    // Trigger click on Logout
    fireEvent.click(logoutLink);

    // Validate `signOut` and session storage
    expect(mockSignOut).toHaveBeenCalledWith({ global: true });
    expect(window.sessionStorage.clear).toHaveBeenCalled();

    // Validate the cookie is cleared
    expect(document.cookie).toBe(
      "wcache=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    );

    // Validate redirection
    expect(window.location.href).toBe("");
  });

  it("renders 'Complete your profile' button", () => {
    render(<User topnav_data={{}} />);

    // Assert the "Complete your profile" button is rendered
    const completeProfileButton = screen.getByText("Complete your profile");
    expect(completeProfileButton).toBeInTheDocument();
    expect(completeProfileButton.closest("a")).toHaveAttribute("href", "#");
  });

  it("handles empty user profile data gracefully", () => {
    render(<User topnav_data={{}} />);

    // Assert no menu items are rendered
    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);

    // Ensure the "Complete your profile" button still renders
    expect(screen.getByText("Complete your profile")).toBeInTheDocument();
  });
});
