import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "lg:grid-cols-1",
    "lg:grid-cols-2",
    "lg:grid-cols-3",
    "lg:grid-cols-4",
    "lg:grid-cols-5",
    "lg:grid-cols-6",
    "lg:col-span-1",
    "lg:col-span-2",
    "lg:col-span-3",
    "lg:col-span-4",
    "lg:col-span-5",
    "lg:col-span-6",
    "lg:col-span-7",
    "bg-success-400",
    "bg-success-700",

    // Blue colors
    "bg-blue-50",
    "bg-blue-100",
    "bg-blue-200",
    // Grey colors
    "bg-grey-50",
    "bg-grey-100",
    "bg-grey-200",
    // Green colors
    "bg-green-50",
    "bg-green-100",
    "bg-green-200",
    // Orange colors
    "bg-orange-50",
    "bg-orange-100",
    "bg-orange-200",
    "bg-positive-light",
  ],
  theme: {
    maxWidth: {
      container: "1216px",
    },
    screens: {
      xs: "350px",
      sm: "575px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xl2: "1300px",
      xxl: "1400px",
      xxl2: "1600px",
      xxxl: "1920px",
    },
    fontFamily: {
      farro: ["Farro", "sans-serif"],
      inter: ["Inter", "sans-serif"],
    },
    fontSize: {
      "heading-xl": ["5.2rem", "6.7rem"], //'52px','67px'
      "heading-lg": ["4.4rem", "5.7rem"], //'44px','57px'
      heading1: ["4rem", "5.2rem"], //'40px','52px'
      heading2: ["3.6rem", "4.7rem"], //'36px','47px'
      heading3: ["3.2rem", "4.2rem"], //'32px','42px'
      heading4: ["2.8rem", "3.6rem"], //'28px', '36px'
      heading5: ["2.4rem", "3.1rem"], //'24px', '31px'
      heading6: ["2rem", "2.6rem"], //'20px', '26 px'
      "para-lg": ["1.8rem", "2.4rem"], //'18px', '24px'
      para: ["1.6rem", "2.4rem"], //'16px', '24px'
      small: ["1.4rem", "2.1rem"], //'14px', '21px'
      "x-small": ["1.2rem", "1.8rem"], //'12px','18px'
      "xs-small": ["1rem", "2rem"], //'10px','20px'
      overline: ["1.4rem", "1.2rem"], //'14px', '12px'
    },
    extend: {
      colors: {
        "success-400": "#34D399",
        "success-700": "#047857",
        //"blue-50":"#EDFCFF",
        //"blue-100": "#C8F0F5",
        //"blue-200": "#0FBEFD",
        //"blue-300": "#0086F8",
        //"blue-500": "#3460DC",
        grey300: "#333",
        grey400: "#707070",
        grey500: "#767676",
        grey600: "#e6e6e6",
        grey900: "#0F172A",
        neutral50: "#F8FAFC",
        neutral100: "#F1F5F9",
        neutral200: "#E2E8F0",
        neutral300: "#CBD5E1",
        neutral400: "#94A3B8",
        green200: "#B4E646",
        blue: {
          50: "#EDFCFF",
          100: "#C8F0F5",
          200: "#0FBEFD",
          300: "#0086F8",
          400: "#4664DC",
          500: "#3460DC",
        },
        green: {
          50: "#F1F4FD",
          100: "#FDFAAF",
          200: "#B4E646",
        },
        orange: {
          50: "#FFF7E0",
          100: "#FFF0BE",
          200: "#FFD700",
          600: "#C5422B",
        },
        grey: {
          50: "#F9FAFB",
          100: "#F2F2F2",
          200: "#D9D9D9",
          300: "#ADB2B6",
          400: "#82898F",
          500: "#5C656E",
          600: "#333F48",
          700: "#767676",
          900: "#0F172A",
        },
        neutral: {
          100: "#EFEFF1",
          700: "#3B3D52",
        },
        primary: {
          50: "#EDFCFF",
          100: "#C8F0F5",
          200: "#0FBEFD",
          300: "#0086F8",
          400: "#4664DC",
          500: "#0657AD",
        },
        secondary: {
          50: "#F1F4FD",
          100: "#FDFAAF",
          200: "#B4E646",
          300: "#51C21A",
          400: "#0ACBA0",
          500: "#1E8782",
        },
        tertiary: {
          50: "#FFF7E0",
          100: "#FFF0BE",
          200: "#FFD700",
          300: "#FFA514",
          400: "#FF8300",
          500: "#973A14",
          600: "#BC5B00",
        },
        positive: {
          default: "#168721",
          light: "#EEF2C0",
          dark: "#106519",
        },
        negative: {
          default: "#BC0000",
          light: "#FFEEEE",
          dark: "#800101",
        },
        desturctive: {
          600: "#B01030",
        },
      },
      backgroundImage: {
        gradientBlack:
          "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
        gradientBlack1:
          "linear-gradient(180deg, rgba(0,0,0,0) 50.5%, rgba(0,0,0,1) 100%)",
        gradient1: "linear-gradient(98.41deg, #6EE7B7 0%, #F59E0B 100%)",
        gradient2: "linear-gradient(98.41deg, #00BBFD 0%, #3460DC 100%)",
        gradient3: "linear-gradient(98.41deg, #10B981 0%, #00BBFD 100%)",
        gradient4: "linear-gradient(98.41deg, #0A28A3 0%, #34D399 100%)",
        gradient5: "linear-gradient(98.41deg, #FCD34D 0%, #69D8FF 100%)",
        gradient6: "linear-gradient(98.41deg, #87E0FF 0%, #FEF3C7 100%)",
        gradient7: "linear-gradient(98.41deg, #6EE7B7 0%, #BAEDFF 100%)",
        gradient8: "linear-gradient(98.41deg, #D97706 0%, #87E0FF 100%)",
        gradient9: "linear-gradient(98.41deg, #0A28A3 0%, #00A4DD 100%)",
        gradient10: "linear-gradient(98.41deg, #34D399 0%, #059669 100%)",
        gradient11:
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 58.78%)",
      },
      boxShadow: {
        "custom-1":
          "0px 2px 4px -2px rgba(16, 24, 40, 0.1), 0px 4px 6px -1px rgba(16, 24, 40, 0.1)",
        "custom-2": "0px 1px 2px 0px rgba(16,24,40,0.05)",
        "custom-3":
          "0px 1px 2px -1px rgba(16, 24, 40, 0.1), 0px 1px 3px 0px rgba(16, 24, 40, 0.1)",
        "custom-4":
          "0px 2px 4px -2px rgba(16, 24, 40, 0.1),0px -2px 6px -1px rgba(16,24,40,0.07)",
        "custom-5":
          "0px 4px 6px -4px rgba(16,24,40,0.1),0px 10px 15px -3px rgba(16,24,40,0.1)",
        "custom-6": "0px 25px 50px -12px rgba(16, 24, 40, 0.25)",
        "custom-7": "inset 0 -4px 0 0 rgba(15,190,253,1)",
        "custom-8": "0px 6px 12px 0px rgba(0, 0, 0, 0.11)",
        "custom-9":
          "0px 4px 6px -4px rgba(16, 24, 40, 0.1), 0px 10px 15px -3px rgba(16, 24, 40, 0.1)",
        "custom-10":
          "0px 1px 2px -1px rgba(16, 24, 40, 0.1), 0px -2px 3px 0px rgba(16, 24, 40, 0.1)",
        "custom-11":
          "0px 2px 3px 0px rgba(0, 0, 0, 0.168), 0px 0px 3px 0px rgba(0, 0, 0, 0.084)",
        "custom-12": "0 10px 15px -3px rgba(16, 24, 40, 0.102",
      },
      backdropBlur: {
        "custom-1": "261px",
      },
    },
  },
  plugins: [],
};
export default config;
