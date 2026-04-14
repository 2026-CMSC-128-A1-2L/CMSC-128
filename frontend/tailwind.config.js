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
          					"100": "#f1f1f1",
          					"200": "#f0f0f0"
        				},
        				"darkslategray": "#2f3136",
        				"black": "#000",
        				"teal": "#096c5b",
        				"gray": "#001d18",
        				"dimgray": "#666",
        				"lightcyan": "rgba(203, 246, 237, 0.4)",
        				"silver": "#bdbdbd",
        				"dodgerblue": "#448aff"
      			},
      			"spacing": {
        				"num-740": "740px",
        				"num-360": "360px",
        				"num-312": "312px",
        				"num-700": "700px",
        				"num-3": "3px",
        				"num-60": "60px",
        				"num-1": "1px solid #f0f0f0"
      			},
      			"fontFamily": {
        				"lora": "Lora",
        				"inter": "Inter",
        				"inherit": "inherit"
      			},
      			"borderRadius": {
        				"num-16": "16px"
      			},
      			"padding": {
        				"num-0": "0px",
        				"num-10": "10px",
        				"num-4": "4px",
        				"num-24": "24px",
        				"num-19": "19px",
        				"num-8": "8px"
      			}
    		},
    		"fontSize": {
      			"num-14": "14px",
      			"num-18": "18px",
      			"num-inherit": "inherit"
    		},
    		"lineHeight": {
      			"num-24": "24px",
      			"num-32": "32px"
    		},
    		"letterSpacing": {
      			"num--0_01": "-0.01em"
    		}
  	},
  	"corePlugins": {
    		"preflight": false
  	}
}