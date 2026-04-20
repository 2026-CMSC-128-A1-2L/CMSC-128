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
        				"gray": "rgba(255, 255, 255, 0.7)",
        				"teal": "#096c5b",
        				"black": "#000",
        				"silver": "#b5c8c5",
        				"slategray": "#64748b"
      			},
      			"fontFamily": {
        				"lora": "Lora",
        				"inter": "Inter",
        				"poppins": "Poppins"
      			},
      			"borderRadius": {
        				"num-16": "16px"
      			},
      			"padding": {
        				"num-0": "0px",
        				"num-32": "32px",
        				"num-10": "10px",
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