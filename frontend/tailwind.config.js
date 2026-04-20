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
        				"teal": "#096c5b",
        				"black": "#000",
        				"slategray": "#64748b",
        				"honeydew": "#e6ffe7",
        				"lightcyan": "#cbf6ed",
        				"gray": "rgba(11, 37, 28, 0)",
        				"crimson": "#ef4444"
      			},
      			"spacing": {
        				"num-200": "200px"
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
        				"num-32": "32px",
        				"num-10": "10px",
        				"num-24": "24px",
        				"num-4": "4px"
      			}
    		},
    		"fontSize": {
      			"num-14": "14px"
    		},
    		"lineHeight": {
      			"num-24": "24px"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}