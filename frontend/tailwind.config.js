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
        				"aliceblue": "#f1f5f9",
        				"dimgray": "#666",
        				"teal": {
          					"100": "#2f8677",
          					"200": "#096c5b"
        				},
        				"black": "#000",
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
        				"num-12": "12px",
        				"num-16": "16px"
      			},
      			"padding": {
        				"num-0": "0px",
        				"num-80": "80px",
        				"num-32": "32px",
        				"num-10": "10px",
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