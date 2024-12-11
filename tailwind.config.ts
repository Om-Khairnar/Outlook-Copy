import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#E54065',
        background: '#F4F5F9',
        border: '#CFD2DC',
        text: '#636363',
        'filter-button': '#E1E4EA',
        'read-bg': '#F2F2F2'
      },
    },
  },
  plugins: [],
} satisfies Config;
