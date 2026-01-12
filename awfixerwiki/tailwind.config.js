const colors = require("tailwindcss/colors");

const prefix = "colors";
const generateColorShades = name =>
  Array.from({ length: 9 })
    .map((_, i) => (i + 1) * 100)
    .reduce(
      (acc, k) => ({
        ...acc,
        [k]: `var(--${prefix}-${name}-${k})`,
      }),
      {},
    );

const customColors = {
  foreground: `var(--${prefix}-foreground)`,
  background: `var(--${prefix}-background)`,
  secondaryBg: `var(--${prefix}-secondaryBg)`,
  gray: generateColorShades("gray"),
  pink: generateColorShades("pink"),
  blue: generateColorShades("blue"),
  yellow: generateColorShades("yellow"),
  green: generateColorShades("green"),
  red: generateColorShades("red"),
};

const fontStack = [
  "Inter",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Oxygen-Sans",
  "Ubuntu",
  "Cantarell",
  "Helvetica Neue",
  "sans-serif",
  "Apple Color Emoji",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
].join(",");

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 'media' or 'class'
  theme: {
    fontFamily: {
      sans: fontStack,
      mono: "'Fira Mono', 'Courier New', Courier, monospace",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      ...customColors,
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // background: "hsl(var(--background))",
        // foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      minWidth: {
        sidebar: "290px",
        pageNav: "200px",
        "70vw": "70vw",
        "80vw": "80vw",
        "90vw": "90vw",
        "100vw": "100vw",
      },
      minHeight: {
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
      },
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme("colors.foreground"),

            a: {
              color: "currentColor",
              textDecoration: "underline",

              "&:hover": {
                color: theme("colors.pink.500"),
              },
            },

            h1: {
              color: theme("colors.foreground"),
              fontWeight: theme("fontWeight.bold"),
            },
            h2: {
              color: theme("colors.foreground"),
              fontWeight: theme("fontWeight.bold"),
            },
            h3: {
              color: theme("colors.foreground"),
            },
            h4: {
              color: theme("colors.foreground"),
            },
            img: {
              borderRadius: "10px",
            },
            code: {
              background: "transparent",
              color: theme("colors.pink.500"),
              fontWeight: theme("fontWeight.normal"),
            },
            pre: {
              code: {
                "&::after": {
                  display: "none",
                },
              },
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
};
