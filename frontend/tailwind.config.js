/** @type {import('tailwindcss').Config} */
export default{
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
        				"teal": {
          					"100": "#2f8677",
          					"200": "#096c5b"
        				},
        				"slategray": "#64748b"
      			},
      			"spacing": {
        				"num-75_1": "75.1px",
        				"num-37_5": "37.5px"
      			},
      			"fontFamily": {
        				"lora": "Lora",
        				"inter": "Inter"
      			},
      			"borderRadius": {
        				"num-0": "0px",
        				"num-16": "16px",
        				"num-3_75": "3.75px"
      			},
      			"padding": {
        				"num-32": "32px",
        				"num-10": "10px",
        				"num-9_4": "9.4px"
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