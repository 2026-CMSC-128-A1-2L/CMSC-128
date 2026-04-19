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
        				"darkslategray": "#2f3136",
        				"aliceblue": "#f1f5f9",
        				"dimgray": "#666",
        				"black": "#000",
        				"silver": "#bdbdbd",
        				"gainsboro": "#d9d9d9",
        				"gray": "#757575",
        				"lightcyan": {
          					"100": "#cbf6ed",
          					"200": "rgba(203, 246, 237, 0.4)"
        				},
        				"teal": {
          					"100": "#2f8677",
          					"200": "#096c5b"
        				}
      			},
      			"spacing": {
        				"num-38_6": "38.6px",
        				"num-104": "104px",
        				"num-108_7": "108.7px",
        				"num-1": "0.6px solid #f0f0f0"
      			},
      			"fontFamily": {
        				"lora": "Lora",
        				"inter": "Inter",
        				"geist": "Geist"
      			},
      			"borderRadius": {
        				"num-7_72": "7.72px",
        				"num-0": "0px"
      			},
      			"padding": {
        				"num-0": "0px",
        				"num-32": "32px",
        				"num-10": "10px",
        				"num-15_4": "15.4px",
        				"num-6_8": "6.8px",
        				"num-4_7": "4.7px"
      			}
    		},
    		"fontSize": {
      			"num-14": "14px",
      			"num-15_45": "15.45px",
      			"num-11_59": "11.59px",
      			"num-9_1": "9.1px",
      			"num-16_46": "16.46px"
    		},
    		"lineHeight": {
      			"num-19_31": "19.31px"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}