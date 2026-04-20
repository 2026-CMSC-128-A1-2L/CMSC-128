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
        				"dimgray": "#666",
        				"black": "#000",
        				"teal": "#096c5b",
        				"aliceblue": "#f1f5f9",
        				"slategray": "#64748b",
        				"crimson": "#ef4444",
        				"lightcyan": "#cbf6ed"
      			},
      			"spacing": {
        				"num-30": "30px",
        				"num-78": "78px"
      			},
      			"fontFamily": {
        				"inter": "Inter",
        				"poppins": "Poppins"
      			},
      			"borderRadius": {
        				"num-0": "0px",
        				"num-12": "12px",
        				"num-4": "4px"
      			},
      			"padding": {
        				"num-12": "12px",
        				"num-24": "24px",
        				"num-10": "10px",
        				"num-32": "32px",
        				"num-4": "4px",
        				"num-16": "16px",
        				"num-8": "8px",
        				"num-22": "22px"
      			}
    		},
    		"fontSize": {
      			"num-14": "14px",
      			"num-18": "18px"
    		},
    		"letterSpacing": {
      			"num--0_01": "-0.01em"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}