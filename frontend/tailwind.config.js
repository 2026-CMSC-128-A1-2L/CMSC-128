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
        				"gray": {
          					"100": "#001d18",
          					"200": "rgba(255, 255, 255, 0.7)"
        				},
        				"silver": {
          					"100": "#b5c8c5",
          					"200": "#bdbdbd"
        				},
        				"aliceblue": "#f1f5f9",
        				"slategray": "#64748b"
      			},
      			"spacing": {
        				"num-180": "180px",
        				"num-1": "1px solid #f0f0f0"
      			},
      			"fontFamily": {
        				"buhun-retro-two-free": "Buhun Retro Two FREE",
        				"lora": "Lora",
        				"inter": "Inter",
        				"poppins": "Poppins"
      			},
      			"borderRadius": {
        				"num-4": "4px",
        				"num-12": "12px",
        				"num-16": "16px"
      			},
      			"padding": {
        				"num-0": "0px",
        				"num-32": "32px",
        				"num-20": "20px",
        				"num-12": "12px",
        				"num-10": "10px"
      			}
    		},
    		"fontSize": {
      			"num-14": "14px"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}