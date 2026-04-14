/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        darkslategray: {
          DEFAULT: "#024338", // Combined from Config 2
          100: "#2f3136",
          200: "#024338"
        },
        aliceblue: "#f1f5f9",
        dimgray: "#666",
        teal: {
          100: "#2f8677",
          200: "#096c5b",
          300: "rgba(9, 108, 91, 0.25)"
        },
        lightcyan: "#cbf6ed",
        gray: "#001d18",
        whitesmoke: {
          DEFAULT: "#f0f0f0",
          100: "#f8fafc",
          200: "#f0f0f0"
        },
        white: "#fff",
        silver: "#bdbdbd"
      },
      spacing: {
        "num-1": "1px solid #f0f0f0",
        "num-180": "180px"
      },
      fontFamily: {
        "lora": "Lora",
        "inter": "Inter",
        "buhun-retro-two-free": "Buhun Retro Two FREE"
      },
      borderRadius: {
        "num-4": "4px",
        "num-12": "12px"
      },
      padding: {
        "num-0": "0px",
        "num-10": "10px",
        "num-16": "16px",
        "num-20": "20px",
        "num-32": "32px"
      }
    },
    // Note: Placing these directly under 'theme' (instead of 'extend') 
    // will overwrite Tailwind's default text sizing (text-sm, text-lg, etc.)
    // Preserved here exactly as your Figma export generated them.
    fontSize: {
      "num-14": "14px",
      "num-18": "18px"
    },
    lineHeight: {
      "num-24": "24px"
    }
  },
  corePlugins: {
    preflight: false
  }
}
