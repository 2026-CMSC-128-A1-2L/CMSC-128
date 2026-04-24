/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        aliceblue: "#f1f5f9",
        dimgray: "#666",
        slategray: "#64748b",
        silver: "#b5c8c5",
        gray: "#001d18",
        darkslategray: {
          DEFAULT: "#024338",
          100: "#2f3136",
          200: "#024338",
        },
        whitesmoke: {
          DEFAULT: "#f0f0f0",
          100: "#f8fafc",
          200: "#f0f0f0",
        },
        teal: {
          DEFAULT: "#096c5b",
          100: "#2f8677",
          200: "#096c5b",
        },
      },
      spacing: {
        "num-806_1": "806.1px",
        "num-749_8": "749.8px",
        "num-84_5": "84.5px",
        "num-77_4": "77.4px",
        "num-63_4": "63.4px",
        "num-56_3": "56.3px",
        "num-28_2": "28.2px",
        "num-21_1": "21.1px",
        // Kept both versions of the custom border shortcut if they differ in intent
        "num-1": "0.9px solid #f0f0f0",
        "num-1-alt": "1px solid #f0f0f0",
      },
      fontFamily: {
        lora: "Lora",
        inter: "Inter",
      },
      borderRadius: {
        "num-12": "12px",
        "num-14_08": "14.08px",
      },
      padding: {
        "num-0": "0px",
        "num-8": "8px",
        "num-8_8": "8.8px",
        "num-10": "10px",
        "num-10_6": "10.6px",
        "num-16": "16px",
        "num-21_1": "21.1px",
        "num-28_2": "28.2px",
        "num-32": "32px",
      },
    },
    fontSize: {
      "num-10_56": "10.56px",
      "num-12_32": "12.32px",
      "num-14": "14px",
      "num-18": "18px",
    },
    lineHeight: {
      "num-24": "24px",
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
