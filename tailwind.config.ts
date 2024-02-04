import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    screens: {
      'xs': '360px',      // Extra small screens (phones, less than 360px)
      'sm': '640px',      // Small screens (phones, 360px and up)
      'md': '768px',      // Medium screens (tablets, 640px and up)
      'lg': '1024px',     // Large screens (laptops/desktops, 1024px and up)
      'xl': '1280px',     // Extra large screens (large laptops/desktops, 1280px and up)
      '2xl': '1536px',    // 2 extra large screens (larger laptops/desktops, 1536px and up)
      // Add more custom screen sizes if needed
    },
    extend: {

      colors: {
        "siteBlue": "#675FFF",
        "mauve": "#E1BOFF"
      }
    },

    // extend: {

    // },
  },
  plugins: [],
}
export default config
