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
        				"darkslategray": "#2f3136",
        				"aliceblue": "#f1f5f9",
        				"dimgray": "#666",
        				"black": "#000",
        				"teal": "#096c5b",
        				"lightcyan": "#cbf6ed",
        				"slategray": "#64748b"
      			},
      			"spacing": {
        				"num-1": "1px solid #f0f0f0"
      			},
      			"fontFamily": {
        				"lora": "Lora",
        				"inter": "Inter"
      			},
      			"borderRadius": {
        				"num-16": "16px"
      			},
      			"padding": {
        				"num-0": "0px",
        				"num-10": "10px",
        				"num-4": "4px"
      			}
    		},
    		"fontSize": {
      			"num-14": "14px",
      			"num-12": "12px"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}