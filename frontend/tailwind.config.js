/** @type {import('tailwindcss').Config} */
export default {
  "content": [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  "theme": {
    "extend": {
      "colors": {
        "white": "#fff",
        "whitesmoke": {
          "100": "#f8fafc",
          "200": "#f0f0f0"
        },
        "darkslategray": {
          "100": "#2f3136",
          "200": "#024338"
        },
        "gray": "#001d18",
        "aliceblue": "#f1f5f9",
        "teal": {
          "100": "#2f8677",
          "200": "#096c5b"
        },
        "azure": "#eafbf8",
        "black": "#000",
        "silver": "#bdbdbd",
        "dimgray": "#666",
        "crimson": "#ef4444",
        "lightcyan": "#cbf6ed",
        "status": {
          "paid": "#0c8873",
          "paid-light": "#5dc2a8",
          "overdue": "#c00f0f",
          "overdue-light": "#e44f4f",
          "partial": "#fa7900",
          "partial-light": "#ffc273",
          "pending": "#c29722",
          "pending-light": "#f6b709"
        }
      },
      "spacing": {
        "num-200": "200px",
        "num-1": "1px solid #f0f0f0"
      },
      "fontFamily": {
        "lora": "Lora",
        "inter": "Inter",
        "poppins": "Poppins"
      },
      "borderRadius": {
        "num-100": "100px",
        "num-10": "10px",
        "num-5": "5px",
        "num-8": "8px",
        "num-6": "6px",
        "md": "6px"
      },
      "padding": {
        "num-8": "8px",
        "num-12": "12px",
        "num-0": "0px",
        "num-10": "10px"
      },
      "fontSize": {
        "num-14": "14px",
        "num-24": "24px",
        "num-18": "18px",
        "sm": "14px",
        "xs": "12px"
      },
      "letterSpacing": {
        "num--0_01": "-0.01em",
        "num-0_04": "0.04em",
        "num-0_02": "0.02em"
      },
      "boxShadow": {
        "md": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }
    },
    "fontSize": {
      "num-12": "12px"
    }
  },
  "corePlugins": {
    "preflight": false
  }
}