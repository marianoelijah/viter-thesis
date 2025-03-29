/** @type {import('tailwindcss').Config} */

const colors = [
	"myred",
	"myyellow",
	"accent",
	"light",
	"dark",
	"orange",
	"primary",
	"secondary",
	"line",
	"alert",
	"success",
	"warning",
	"info",
	"body",
  ];
  
  const colorObject = colors.reduce((acc, color) => {
	acc[color] = `rgba(var(--${color}), <alpha-value>)`;
	return acc;
  }, {});
  
  export default {
	darkMode: ["class"],
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		textColor: colorObject,
		backgroundColor: colorObject,
		borderColor: colorObject,
		stroke: colorObject,
		fill: colorObject,
		animation: {
		  rotate: "rotate 2s linear infinite",
		  loading: "loading 1.5s ease-in infinite",
		  shake: "shake 1.5s ease-in both",
		},
		backgroundImage: {
		  skeleton: "linear-gradient(90deg, transparent, rgba(var(--secondary), .8), transparent )",
		},
		borderRadius: {
		  lg: "var(--radius)",
		  md: "calc(var(--radius) - 2px)",
		  sm: "calc(var(--radius) - 4px)",
		},
		colors: {
		  background: "hsl(var(--background))",
		  foreground: "hsl(var(--foreground))",
		  card: {
			DEFAULT: "hsl(var(--card))",
			foreground: "hsl(var(--card-foreground))",
		  },
		  popover: {
			DEFAULT: "hsl(var(--popover))",
			foreground: "hsl(var(--popover-foreground))",
		  },
		  primary: {
			DEFAULT: "hsl(var(--primary))",
			foreground: "hsl(var(--primary-foreground))",
		  },
		  secondary: {
			DEFAULT: "hsl(var(--secondary))",
			foreground: "hsl(var(--secondary-foreground))",
		  },
		  muted: {
			DEFAULT: "hsl(var(--muted))",
			foreground: "hsl(var(--muted-foreground))",
		  },
		  accent: {
			DEFAULT: "hsl(var(--accent))",
			foreground: "hsl(var(--accent-foreground))",
		  },
		  destructive: {
			DEFAULT: "hsl(var(--destructive))",
			foreground: "hsl(var(--destructive-foreground))",
		  },
		  border: "hsl(var(--border))",
		  input: "hsl(var(--input))",
		  ring: "hsl(var(--ring))",
		  chart: {
			"1": "hsl(var(--chart-1))",
			"2": "hsl(var(--chart-2))",
			"3": "hsl(var(--chart-3))",
			"4": "hsl(var(--chart-4))",
			"5": "hsl(var(--chart-5))",
		  },
		},
	  },
	  keyframes: {
		rotate: {
		  "100%": { transform: "rotate(360deg)" },
		},
		loading: {
		  "0%": { transform: "translateX(-100%)" },
		  "100%": { transform: "translateX(100%)" },
		},
		shake: {
		  "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
		  "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
		  "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
		  "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
		},
	  },
	},
	plugins: [require("tailwindcss-animate")],
  };
  