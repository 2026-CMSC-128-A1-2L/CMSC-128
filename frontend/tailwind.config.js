/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Animations & Keyframes
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
      },

      // Colors
      colors: {
        white: "#fff",
        black: "#000",
        gray: {
          DEFAULT: "#001d18",
          100: "#757575",
          200: "#1e1e1e",
          300: "#001d18",
          400: "rgba(0, 0, 0, 0.38)",
          500: "rgba(255, 255, 255, 0.7)",
          600: "rgba(255, 255, 255, 0.75)",
          700: "rgba(255, 255, 255, 0.5)",
          800: "rgba(255, 255, 255, 0.25)",
          900: "rgba(0, 0, 0, 0)",
        },
        darkslategray: {
          DEFAULT: "#024338",
          100: "#2f3136",
          200: "#024338",
        },
        teal: {
          DEFAULT: "#096c5b",
          100: "#2f8677",
          200: "#096c5b",
          300: "rgba(9, 108, 91, 0.25)",
        },
        whitesmoke: {
          DEFAULT: "#f0f0f0",
          100: "#f8fafc",
          200: "#f3f4f6",
          300: "#f0f0f0",
        },
        dimgray: "#666",
        aliceblue: "#f1f5f9",
        silver: "#bdbdbd",
        lightcyan: "#cbf6ed",
        azure: "#d9ebe7",
        gainsboro: "#d9d9d9",
      },

      // Spacing (Includes custom border strings)
      spacing: {
        "num-1440": "1440px",
        "num-180": "180px",
        "num-300": "300px",
        "num-1": "0.4px solid #f0f0f0",
        "num-2": "0.4px solid #096c5b",
        "num-3": "5px solid rgba(255, 255, 255, 0.7)",
        "num-4": "0.7px solid #d9d9d9",
        "num-11": "1px solid #096c5b",
        "num-6_4": "6.4px",
        "num-18_6": "18.6px",
        "num-19_1": "19.1px",
        "num-20_8": "20.8px",
        "num-21_3": "21.3px",
        "num-27_8": "27.8px",
        "num-27_9": "27.9px",
        "num-28_4": "28.4px",
        "num-29_3": "29.3px",
        "num-37": "37px",
        "num-48_7": "48.7px",
        "num-55": "55px",
        "num-65_1": "65.1px",
        "num-108_4": "108.4px",
        "num-112_6": "112.6px",
        "num-126_6": "126.6px",
        "num-138": "138px",
        "num-199": "199px",
        "num-914": "914px",
        "num-1172": "1172px",
      },

      // Border Radius
      borderRadius: {
        "num-0": "0px",
        "num-4": "4px",
        "num-10": "10px",
        "num-12": "12px",
        "num-16": "16px",
        "num-50": "50%",
        "num-3_87": "3.87px",
        "num-4_34": "4.34px",
        "num-5_57": "5.57px",
      },

      // Font Families
      fontFamily: {
        "buhun-retro-two-free": ["Buhun Retro Two FREE", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        lora: ["Lora", "serif"],
        poppins: ["Poppins", "sans-serif"],
        geist: ["Geist", "sans-serif"],
      },

      // Padding
      padding: {
        "num-0": "0px",
        "num-4_3": "4.3px",
        "num-8_7": "8.7px",
        "num-10": "10px",
        "num-11_1": "11.1px",
        "num-13_9": "13.9px",
        "num-16": "16px",
        "num-20": "20px",
        "num-32": "32px",
        "num-80": "80px",
      },

      opacity: {
        "num-0_3": "0.3",
      },
    },

    // Top-level Theme Overrides
    fontSize: {
      "num-4_64": "4.64px",
      "num-5_21": "5.21px",
      "num-6_08": "6.08px",
      "num-6_19": "6.19px",
      "num-6_95": "6.95px",
      "num-7_81": "7.81px",
      "num-8_36": "8.36px",
      "num-11_15": "11.15px",
      "num-12": "12px",
      "num-14": "14px",
      "num-16": "16px",
      "num-18": "18px",
      "num-24": "24px",
      "num-28": "28px",
      "num-36": "36px",
    },

    lineHeight: {
      "num-13_89": "13.89px",
      "num-13_94": "13.94px",
      "num-16_83": "16.83px",
      "num-24": "24px",
      "num-25": "25px",
      "num-32": "32px",
    },

    letterSpacing: {
      "num--0_01": "-0.01em",
      "num-0_02": "0.02em",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
