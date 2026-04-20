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
        				"slategray": "#64748b",
        				"crimson": "#ef4444",
        				"lightcyan": "#cbf6ed"
      			},
      			"spacing": {
        				"num-30": "30px"
      			},
      			"fontFamily": {
        				"lora": "Lora",
        				"inter": "Inter",
        				"poppins": "Poppins"
      			},
      			"borderRadius": {
        				"num-12": "12px",
        				"num-0": "0px",
        				"num-4": "4px"
      			},
      			"padding": {
        				"num-32": "32px",
        				"num-22": "22px"
      			}
    		},
    		"fontSize": {
      			"num-14": "14px",
      			"num-15_11": "15.11px"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}