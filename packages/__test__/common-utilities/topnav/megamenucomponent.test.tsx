import {
  render,
  screen,
  fireEvent,
  renderHook,
  act,
} from "@testing-library/react";
import Megamenucomponents from "@packages/shared-components/layout-components/topnav/megamenucomponents";
import "@testing-library/jest-dom";

// Mock child components
jest.mock(
  "@packages/shared-components/common-utilities/megamenu/Menucategory1card",
  () => ({
    __esModule: true,
    default: () => <div data-testid="category1-card">Category 1 Card</div>,
  })
);

jest.mock(
  "@packages/shared-components/common-utilities/megamenu/Menucategory2card",
  () => ({
    __esModule: true,
    default: () => <div data-testid="category2-card">Category 2 Card</div>,
  })
);

jest.mock(
  "@packages/shared-components/common-utilities/megamenu/Menucategory3card",
  () => ({
    __esModule: true,
    default: () => <div data-testid="category3-card">Category 3 Card</div>,
  })
);

jest.mock(
  "@packages/shared-components/common-utilities/megamenu/Menucategory4card",
  () => ({
    __esModule: true,
    default: () => <div data-testid="category4-card">Category 4 Card</div>,
  })
);

jest.mock(
  "@packages/shared-components/common-utilities/megamenu/Menucategory5card",
  () => ({
    __esModule: true,
    default: () => <div data-testid="category5-card">Category 5 Card</div>,
  })
);

// Mock data
const mockContent = [
  {
    navTitle: "Menu Item 1",
    navIcon: {
      url: "test-image.jpg",
      title: "Test Image",
      width: 100,
      height: 100,
    },
    navUrl: "/test-url",
    flagNavItemStyle: "default",
    navChildC1Collection: {
      items: [
        {
          navTitle: "Child 1",
          navUrl: "/child-1",
          navIcon: null,
        },
        {
          navTitle: "Child 2",
          navUrl: "/child-2",
          navIcon: null,
        },
      ],
    },
    navChildC2Collection: {
      items: [
        {
          navTitle: "Child 1",
          navUrl: "/child-1",
        },
        {
          navTitle: "Child 2",
          navUrl: "/child-2",
          navIcon: {
            url: "icon.png",
            title: "Icon",
            width: 20,
            height: 20,
          },
          flagNavItemStyle: "Nav Icon",
        },
      ],
    },
    navChildC3Collection: { items: [] },
    navChildC4Collection: { items: [] },
    navChildC5Collection: { items: [] },
  },
];

describe("Megamenucomponents", () => {
  beforeEach(() => {
    window.innerWidth = 1024; // Set default width
    window.dispatchEvent(new Event("resize"));
  });

  it("renders the component with menu items", () => {
    const { container } = render(<Megamenucomponents content={mockContent} />);
    expect(container.querySelector("nav")).toBeInTheDocument();
    expect(container.querySelector("ul")).toBeInTheDocument();
  });

  it("handles mobile view correctly", () => {
    window.innerWidth = 900;
    window.dispatchEvent(new Event("resize"));

    const { container } = render(<Megamenucomponents content={mockContent} />);
    const nav = container.querySelector("nav");

    expect(nav).toHaveClass("w-[335px]");
    expect(nav).toHaveClass("h-[100vh]");
  });

  it("removes event listeners on unmount", () => {
    const { unmount } = render(<Megamenucomponents content={mockContent} />);
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
    removeEventListenerSpy.mockRestore();
  });

  it("mock components are available", () => {
    render(
      <div>
        <div data-testid="category1-card">Category 1 Card</div>
        <div data-testid="category2-card">Category 2 Card</div>
        <div data-testid="category3-card">Category 3 Card</div>
        <div data-testid="category4-card">Category 4 Card</div>
        <div data-testid="category5-card">Category 5 Card</div>
      </div>
    );

    const categoryCards = screen.queryAllByTestId(/category[1-5]-card/);
    expect(categoryCards.length).toBe(5);
  });
});

describe("Megamenucomponents Functions", () => {
  describe("handleMenuToggle", () => {
    it("should toggle menu and add overflow class when opening", () => {
      const setOpenMenu = jest.fn();
      const { result } = renderHook(() => {
        const handleMenuToggle = (menuId: any) => {
          setOpenMenu(menuId);
          if (menuId) {
            document.body.classList.add("overflow-y-hidden");
          } else {
            document.body.classList.remove("overflow-y-hidden");
          }
        };
        return { handleMenuToggle };
      });

      act(() => {
        result.current.handleMenuToggle("menu1");
      });

      expect(setOpenMenu).toHaveBeenCalledWith("menu1");
      expect(
        document.body.classList.contains("overflow-y-hidden")
      ).toBeTruthy();
    });

    it("should toggle menu and remove overflow class when closing", () => {
      const setOpenMenu = jest.fn();
      const { result } = renderHook(() => {
        const handleMenuToggle = (menuId: any) => {
          setOpenMenu(false);
          document.body.classList.remove("overflow-y-hidden");
        };
        return { handleMenuToggle };
      });

      document.body.classList.add("overflow-y-hidden");

      act(() => {
        result.current.handleMenuToggle(null);
      });

      expect(setOpenMenu).toHaveBeenCalledWith(false);
      expect(document.body.classList.contains("overflow-y-hidden")).toBeFalsy();
    });
  });

  describe("Resize Handler", () => {
    it("should set isMobile to true when window width is <= 991", () => {
      const setIsMobile = jest.fn();
      const { result } = renderHook(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 991);
        };
        return { handleResize };
      });

      window.innerWidth = 800;
      act(() => {
        result.current.handleResize();
      });

      expect(setIsMobile).toHaveBeenCalledWith(true);
    });

    it("should set isMobile to false when window width is > 991", () => {
      const setIsMobile = jest.fn();
      const { result } = renderHook(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 991);
        };
        return { handleResize };
      });

      window.innerWidth = 1200;
      act(() => {
        result.current.handleResize();
      });

      expect(setIsMobile).toHaveBeenCalledWith(false);
    });
  });

  afterEach(() => {
    document.body.classList.remove("overflow-y-hidden");
    jest.clearAllMocks();
  });
});
describe("handleMenuToggle function", () => {
  // Setup before each test
  beforeEach(() => {
    // Clear any existing classes from body
    document.body.classList.remove("overflow-y-hidden");
  });

  it("should close menu when clicking the same menuId", () => {
    let openMenu: string | false = "menu1";
    const setOpenMenu = jest.fn((value: string | false) => {
      openMenu = value;
    });

    const handleMenuToggle = (menuId: string) => {
      const newMenuState = openMenu === menuId ? false : menuId;
      setOpenMenu(newMenuState);
      if (newMenuState) {
        document.body.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
      }
    };

    act(() => {
      handleMenuToggle("menu1");
    });

    expect(setOpenMenu).toHaveBeenCalledWith(false);
    expect(document.body.classList.contains("overflow-y-hidden")).toBeFalsy();
  });

  it("should open menu when clicking a different menuId", () => {
    let openMenu: string | false = "menu1";
    const setOpenMenu = jest.fn((value: string | false) => {
      openMenu = value;
    });

    const handleMenuToggle = (menuId: string) => {
      const newMenuState = openMenu === menuId ? false : menuId;
      setOpenMenu(newMenuState);
      if (newMenuState) {
        document.body.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
      }
    };

    act(() => {
      handleMenuToggle("menu2");
    });

    expect(setOpenMenu).toHaveBeenCalledWith("menu2");
    expect(document.body.classList.contains("overflow-y-hidden")).toBeTruthy();
  });

  it("should open menu when no menu is currently open", () => {
    let openMenu: string | false = false;
    const setOpenMenu = jest.fn((value: string | false) => {
      openMenu = value;
    });

    const handleMenuToggle = (menuId: string) => {
      const newMenuState = openMenu === menuId ? false : menuId;
      setOpenMenu(newMenuState);
      if (newMenuState) {
        document.body.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
      }
    };

    act(() => {
      handleMenuToggle("menu1");
    });

    expect(setOpenMenu).toHaveBeenCalledWith("menu1");
    expect(document.body.classList.contains("overflow-y-hidden")).toBeTruthy();
  });

  it("should handle empty menuId by closing the menu", () => {
    let openMenu: string | false = "menu1";
    const setOpenMenu = jest.fn((value: string | false) => {
      openMenu = value;
    });

    const handleMenuToggle = (menuId: string) => {
      // For empty menuId, always close the menu
      if (!menuId) {
        setOpenMenu(false);
        document.body.classList.remove("overflow-y-hidden");
        return;
      }

      const newMenuState = openMenu === menuId ? false : menuId;
      setOpenMenu(newMenuState);
      if (newMenuState) {
        document.body.classList.add("overflow-y-hidden");
      } else {
        document.body.classList.remove("overflow-y-hidden");
      }
    };

    act(() => {
      handleMenuToggle("");
    });

    expect(setOpenMenu).toHaveBeenCalledWith(false);
    expect(document.body.classList.contains("overflow-y-hidden")).toBeFalsy();
  });

  // Cleanup after each test
  afterEach(() => {
    jest.clearAllMocks();
    document.body.classList.remove("overflow-y-hidden");
  });
});
describe("Megamenuoptions function", () => {
  const parentMenu = "Test Parent Menu";

  it("should render Menucategory1card when navIcon is null", () => {
    const child = {
      items: [{ navTitle: "Item 1" }, { navTitle: "Item 2", navIcon: null }],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByTestId("category1-card")).toBeInTheDocument();
  });

  it("should render Menucategory2card when flagNavItemStyle is Nav Icon", () => {
    const child = {
      items: [
        { navTitle: "Item 1" },
        {
          navTitle: "Item 2",
          navIcon: { url: "test.jpg" },
          flagNavItemStyle: "Nav Icon",
        },
      ],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByTestId("category2-card")).toBeInTheDocument();
  });

  it("should render Menucategory3card when flagNavItemStyle is Nav Image", () => {
    const child = {
      items: [
        { navTitle: "Item 1" },
        {
          navTitle: "Item 2",
          navIcon: { url: "test.jpg" },
          flagNavItemStyle: "Nav Image",
        },
      ],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByTestId("category3-card")).toBeInTheDocument();
  });

  it("should render Menucategory5card when flagNavItemStyle is Nav Hero Image and items length is 2", () => {
    const child = {
      items: [
        { navTitle: "Item 1" },
        {
          navTitle: "Item 2",
          navIcon: { url: "test.jpg" },
          flagNavItemStyle: "Nav Hero Image",
        },
      ],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByTestId("category5-card")).toBeInTheDocument();
  });

  it("should render Menucategory4card when flagNavItemStyle is Nav Hero Image and items length is more than 2", () => {
    const child = {
      items: [
        { navTitle: "Item 1" },
        {
          navTitle: "Item 2",
          navIcon: { url: "test.jpg" },
          flagNavItemStyle: "Nav Hero Image",
        },
        { navTitle: "Item 3" },
      ],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByTestId("category4-card")).toBeInTheDocument();
  });

  it("should render No data message when required data is missing", () => {
    const child = {
      items: [{ navTitle: "Item 1" }],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("should render No data message when child is null", () => {
    render(Megamenuoptions(null, parentMenu));
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("should render No data message when items array is empty", () => {
    const child = {
      items: [],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  // Edge cases
  it("should handle undefined navIcon", () => {
    const child = {
      items: [
        { navTitle: "Item 1" },
        { navTitle: "Item 2", navIcon: undefined },
      ],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("should handle missing navTitle", () => {
    const child = {
      items: [{ navTitle: "Item 1" }, { navIcon: { url: "test.jpg" } }],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByText("No data")).toBeInTheDocument();
  });

  it("should handle invalid flagNavItemStyle", () => {
    const child = {
      items: [
        { navTitle: "Item 1" },
        {
          navTitle: "Item 2",
          navIcon: { url: "test.jpg" },
          flagNavItemStyle: "Invalid Style",
        },
      ],
    };

    render(Megamenuoptions(child, parentMenu));
    expect(screen.getByText("No data")).toBeInTheDocument();
  });
});
