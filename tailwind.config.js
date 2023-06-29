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
        primary: {
          DEFAULT: rgb("primary"),
          vibrant: rgb("primary-vibrant"),
          foreground: rgb("primary-foreground"),
        },
        secondary: {
          DEFAULT: rgb("secondary"),
          foreground: rgb("secondary-foreground"),
        },
        backdrop: {
          DEFAULT: rgb("backdrop"),
          foreground: rgb("backdrop-foreground"),
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
