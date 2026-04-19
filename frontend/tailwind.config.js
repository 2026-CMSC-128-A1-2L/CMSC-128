/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Shared Colors
        "black": "#000",
        "white": "#fff",
        "silver": "#bdbdbd",
        "lightcyan": "#cbf6ed",
        "aliceblue": "#f1f5f9",
        "dimgray": "#666",
        "gray": "#001d18",      // Added from Config 2
        "gainsboro": "#d9d9d9", // Added from Config 2

        // Conflict Resolution: Teal
        "teal": {
          "DEFAULT": "#2f8677", // Allows 'bg-teal' to work
          "100": "#2f8677",
          "200": "#096c5b"
        },

        "darkslategray": {
          "100": "#2f3136",
          "200": "#024338"
        },

        // Conflict Resolution: Whitesmoke
        "whitesmoke": {
          "DEFAULT": "#f0f0f0", // Allows 'bg-whitesmoke' to work
          "100": "#f8fafc",
          "200": "#f1f1f1",
          "300": "#f0f0f0"
        }
      },
      spacing: {
        "num-150": "150px",
        "num-258": "258px",
        "num-49": "49px",
        "num-67_5": "67.5px",
        "num-259_3": "259.3px",
        "num-291_5": "291.5px",
        "num-249_6": "249.6px",
        "num-42_8": "42.8px",
        "num-14_7": "14.7px",
        "num-1": "1px solid #f0f0f0",
        "num-1-teal": "0.9px solid #096c5b"
      },
      fontFamily: {
        "inter": "Inter",
        "lora": "Lora",
        "poppins": "Poppins"
      },
      borderRadius: {
        "num-0": "0px",
        "num-10": "10px",
        "num-8_91": "8.91px"
      },
      padding: {
        "num-0": "0px",
        "num-20": "20px"
      }
    },
    // Combined unique Font Sizes
    fontSize: {
      "num-18": "18px",
      "num-16": "16px",
      "num-14": "14px",
      "num-12": "12px",
      "num-10_7": "10.7px",
      "num-14_26": "14.26px"
    },
    // Combined unique Letter Spacing
    letterSpacing: {
      "num--0_01": "-0.01em",
      "num-0_02": "0.02em"
    },
    // Added Line Height from Config 2
    lineHeight: {
      "num-24": "24px"
    }
  },
  corePlugins: {
    "preflight": false
  }
}
