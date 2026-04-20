/** @type {import('tailwindcss').Config} */
module.exports = {
  	"content": [
    		"./src/**/*.{js,jsx,ts,tsx}"
  	],
  	"theme": {
    		"extend": {
      			"colors": {
        				"whitesmoke": "#f0f0f0",
        				"white": "#fff",
        				"darkslategray": "#024338",
        				"dimgray": "#666",
        				"teal": {
          					"100": "#2f8677",
          					"200": "#096c5b"
        				},
        				"black": "#000",
        				"aliceblue": "#f1f5f9",
        				"lightcyan": "#cbf6ed",
        				"slategray": "#64748b"
      			},
      			"spacing": {
        				"num-180": "180px",
        				"num-280": "280px",
        				"num-220": "220px",
        				"num-12_8": "12.8px",
        				"num-1": "1px solid #f0f0f0"
      			},
      			"fontFamily": {
        				"buhun-retro-two-free": "Buhun Retro Two FREE",
        				"inter": "Inter",
        				"lora": "Lora",
        				"poppins": "Poppins"
      			},
      			"borderRadius": {
        				"num-100": "100px",
        				"num-4": "4px",
        				"num-12": "12px",
        				"num-16": "16px",
        				"num-10": "10px",
        				"num-0": "0px",
        				"num-8": "8px"
      			},
      			"padding": {
        				"num-24": "24px",
        				"num-0": "0px",
        				"num-20": "20px",
        				"num-32": "32px",
        				"num-12": "12px",
        				"num-10": "10px",
        				"num-4": "4px"
      			}
    		},
    		"fontSize": {
      			"num-14": "14px",
      			"num-24": "24px",
      			"num-12": "12px",
      			"num-18": "18px"
    		},
    		"lineHeight": {
      			"num-32": "32px"
    		},
    		"letterSpacing": {
      			"num-0_02": "0.02em",
      			"num--0_01": "-0.01em"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}