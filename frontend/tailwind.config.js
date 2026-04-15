export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: "#001d18",
        aliceblue: "#f1f5f9",
        dimgray: "#666",
        silver: "#bdbdbd",
        lightcyan: "#cbf6ed", // use solid; keep rgba variant as a separate token if needed
        darkslategray: {
          DEFAULT: "#024338",
          100: "#2f3136",
          200: "#024338",
        },
        teal: {
          DEFAULT: "#096c5b", // Config 2's flat value becomes DEFAULT
          100: "#2f8677",
          200: "#096c5b",
          300: "rgba(9, 108, 91, 0.25)",
        },
        whitesmoke: {
          DEFAULT: "#f0f0f0",
          100: "#f8fafc",
          200: "#f3f4f6", // Config 2 wins — verify which shade your components use
          300: "#f0f0f0",
        },
      },
      spacing: {
        "num-1": "1px solid #f0f0f0",
        "num-180": "180px",
        "num-300": "300px",
      },
      fontFamily: {
        lora: "Lora",
        inter: "Inter",
        "buhun-retro-two-free": "Buhun Retro Two FREE",
      },
      borderRadius: {
        "num-4": "4px",
        "num-12": "12px",
      },
      padding: {
        "num-0": "0px",
        "num-10": "10px",
        "num-16": "16px",
        "num-20": "20px",
        "num-32": "32px",
      },
    },
    fontSize: {
      "num-14": "14px",
      "num-16": "16px",
      "num-18": "18px",
    },
    lineHeight: {
      "num-24": "24px",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
