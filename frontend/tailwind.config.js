/** @type {import('tailwindcss').Config} */
module.exports = {
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
        				"aliceblue": "#f1f5f9",
        				"silver": "#bdbdbd",
        				"lightcyan": "#cbf6ed",
        				"crimson": "#ef4444"
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
        				"num-0": "0px",
        				"num-12": "12px",
        				"num-4": "4px"
      			},
      			"padding": {
        				"num-32": "32px",
        				"num-20": "20px",
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