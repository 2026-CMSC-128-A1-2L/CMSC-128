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
        				"darkslategray": "#2f3136",
        				"aliceblue": "#f1f5f9",
        				"dimgray": "#666",
        				"black": "#000",
        				"teal": {
          					"100": "#2f8677",
          					"200": "#096c5b"
        				}
      			},
      			"fontFamily": {
        				"lora": "Lora",
        				"inter": "Inter"
      			},
      			"borderRadius": {
        				"num-16": "16px"
      			},
      			"padding": {
        				"num-32": "32px",
        				"num-10": "10px",
        				"num-0": "0px"
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