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
          "200": "#f3f4f6",
          "300": "#f0f0f0"
        },
        "darkslategray": {
          "100": "#2f3136",
          "200": "#024338"
        },
        "aliceblue": "#f1f5f9",
        "dimgray": "#666",
        "black": "#000",
        "teal": "#096c5b",
        "gray": "#001d18",
        "lightcyan": "rgba(203, 246, 237, 0.36)"
      },
      "spacing": {
        "num-300": "300px",
        "num-1": "1px solid #f0f0f0"
      },
      "fontFamily": {
        "lora": "Lora",
        "inter": "Inter"
      },
      "padding": {
        "num-0": "0px",
        "num-10": "10px",
        "num-20": "20px"
      }
    },
    "fontSize": {
      "num-14": "14px",
      "num-16": "16px"
    }
  },
  "corePlugins": {
    "preflight": false
  }
}
