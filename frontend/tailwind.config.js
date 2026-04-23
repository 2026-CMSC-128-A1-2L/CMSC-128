/** @type {import('tailwindcss').Config} */
module.exports = {
  	"content": [
    		"./src/**/*.{js,jsx,ts,tsx}"
  	],
  	"theme": {
    		"extend": {
      			"colors": {
        				"white": "#fff",
        				"aliceblue": "#f1f5f9",
        				"dimgray": "#666",
        				"whitesmoke": {
          					"100": "#f2f2f2",
          					"200": "#f0f0f0"
        				},
        				"slategray": "#64748b",
        				"black": "#000",
        				"teal": "#096c5b",
        				"crimson": "#ef4444",
        				"lightcyan": "#cbf6ed"
      			},
      			"fontFamily": {
        				"font-poppins": ["Poppins", "sans-serif"],
        				"font-inter": ["Inter", "sans-serif"]
      			},
      			"borderRadius": {
        				"num-0": "0px",
        				"num-12": "12px",
        				"num-4": "4px"
      			},
      			"padding": {
        				"num-12": "12px",
        				"num-0": "0px",
        				"num-22": "22px",
        				"num-24": "24px"
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