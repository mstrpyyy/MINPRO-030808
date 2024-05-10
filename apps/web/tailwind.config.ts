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
        'xgreen': '#6AB600',
        'xdark' : '#1D232A',
        'xgreen3': '#73C600',
        'xgreen2' : '#3ba99c',
        'xgreen1': '#69d1c5',
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