/** @type {import('tailwindcss').Config} */
export default {
  "content": [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  "theme": {
    "extend": {
      "colors": {
        "darkslategray": {
          "100": "#2f3136",
          "200": "#024338"
        },
        "whitesmoke": {
          "100": "#f8fafc",
          "200": "#f0f0f0"
        },
        "teal": "#096c5b",
        "dimgray": "#666",
        "silver": "#b5c8c5",
        "white": "#fff",
        "aliceblue": "#f1f5f9",
        "slategray": "#64748b",
        "black": "#000"
      },
      "spacing": {
        "num-806_1": "806.1px",
        "num-84_5": "84.5px",
        "num-63_4": "63.4px",
        "num-21_1": "21.1px",
        "num-749_8": "749.8px",
        "num-56_3": "56.3px",
        "num-28_2": "28.2px",
        "num-77_4": "77.4px",
        "num-1": "0.9px solid #f0f0f0"
      },
      "fontFamily": {
        "lora": "Lora",
        "inter": "Inter"
      },
      "borderRadius": {
        "num-14_08": "14.08px"
      },
      "padding": {
        "num-0": "0px",
        "num-10": "10px",
        "num-32": "32px",
        "num-8": "8px",
        "num-8_8": "8.8px",
        "num-28_2": "28.2px",
        "num-21_1": "21.1px",
        "num-10_6": "10.6px"
      }
    },
    "fontSize": {
      "num-14": "14px",
      "num-12_32": "12.32px",
      "num-10_56": "10.56px"
    },
    "letterSpacing": {
      "num-0_02": "0.02em"
    }
  },
  "corePlugins": {
    "preflight": false
  }
}
