/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Brolink', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          50: "hsl(var(--primary) / 0.05)",
          100: "hsl(var(--primary) / 0.1)",
          200: "hsl(var(--primary) / 0.2)",
          300: "hsl(var(--primary) / 0.3)",
          400: "hsl(var(--primary) / 0.4)",
          500: "hsl(var(--primary) / 0.5)",
          600: "hsl(var(--primary) / 0.6)",
          700: "hsl(var(--primary) / 0.7)",
          800: "hsl(var(--primary) / 0.8)",
          900: "hsl(var(--primary) / 0.9)",
          950: "hsl(var(--primary) / 0.95)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          50: "hsl(var(--accent) / 0.05)",
          100: "hsl(var(--accent) / 0.1)",
          200: "hsl(var(--accent) / 0.2)",
          300: "hsl(var(--accent) / 0.3)",
          400: "hsl(var(--accent) / 0.4)",
          500: "hsl(var(--accent) / 0.5)",
          600: "hsl(var(--accent) / 0.6)",
          700: "hsl(var(--accent) / 0.7)",
          800: "hsl(var(--accent) / 0.8)",
          900: "hsl(var(--accent) / 0.9)",
          950: "hsl(var(--accent) / 0.95)",
        },
      },
    },
  },
  plugins: [],
} 