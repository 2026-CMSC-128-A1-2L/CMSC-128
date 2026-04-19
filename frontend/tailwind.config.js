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
        				"dimgray": "#666",
        				"teal": "#096c5b",
        				"black": "#000",
        				"gray": "#001d18",
        				"aliceblue": "#f1f5f9",
        				"lightcyan": {
          					"100": "#cbf6ed",
          					"200": "rgba(203, 246, 237, 0.4)"
        				},
        				"silver": "#bdbdbd"
      			},
      			"spacing": {
        				"num-180": "180px",
        				"num-1": "1px solid #f0f0f0",
        				"num-2": "2px solid #f0f0f0"
      			},
      			"fontFamily": {
        				"buhun-retro-two-free": "Buhun Retro Two FREE",
        				"lora": "Lora",
        				"inter": "Inter",
        				"inherit": "inherit"
      			},
      			"borderRadius": {
        				"num-4": "4px",
        				"num-12": "12px",
        				"num-8": "8px",
        				"num-100": "100px",
        				"num-16": "16px",
        				"num-5": "5px"
      			},
      			"padding": {
        				"num-0": "0px",
        				"num-32": "32px",
        				"num-20": "20px",
        				"num-10": "10px"
      			}
    		},
    		"fontSize": {
      			"num-12": "12px",
      			"num-14": "14px",
      			"num-8": "8px",
      			"num-24": "24px",
      			"num-18": "18px"
    		},
    		"lineHeight": {
      			"num-32": "32px"
    		},
    		"letterSpacing": {
      			"num-0_02": "0.02em",
      			"num-0_04": "0.04em",
      			"num--0_01": "-0.01em"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}