import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'xwhite': '#FAF9F6',
        'xblue' : '#003049',
        'xblue1' : '#0F3F59',
        'xmetal' : '#2b303a',
        'xorange': '#d64933',
        'xorange1': '#D96756',
        'xyellow': '#F77F00',
        'xblack': '#1d232a'
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
}
export default config;