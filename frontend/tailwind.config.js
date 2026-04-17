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
        				"aliceblue": "#f1f5f9",
        				"dimgray": "#666",
        				"black": "#000",
        				"silver": {
          					"100": "#b5c8c5",
          					"200": "#bdbdbd"
        				},
        				"lightcyan": "#cbf6ed",
        				"teal": "#096c5b",
        				"darkolivegreen": "#224c25",
        				"gray": "rgba(0, 0, 0, 0.38)"
      			},
      			"spacing": {
        				"num-30_6": "30.6px",
        				"num-30_8": "30.8px",
        				"num-30": "30px",
        				"num-30_2": "30.2px"
      			},
      			"fontFamily": {
        				"lora": "Lora",
        				"inter": "Inter",
        				"poppins": "Poppins"
      			},
      			"padding": {
        				"num-32": "32px",
        				"num-0": "0px",
        				"num-12": "12px"
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