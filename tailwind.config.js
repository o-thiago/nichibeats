function rgb(varName) {
  return () => {
    return `rgb(var(--${varName}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        backdrop: {
          DEFAULT: rgb("backdrop"),
          foreground: rgb("backdrop-foreground"),
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
};
