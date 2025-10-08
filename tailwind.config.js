// G:\ai_therapist\tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    // Ensure this content array is correct for your project structure
    './app/**/*.{js,ts,jsx,tsx}',
    './component/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}', 
  ],
  theme: {
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'background-light': 'var(--background-light)',
  			'background-dark': 'var(--background-dark)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		screens: {
  			'min-lg': '1024px'
  		},
  		fontFamily: {
  			display: [
  				'Manrope',
  				'sans-serif'
  			]
  		},
  		borderRadius: {
  			DEFAULT: '0.5rem',
  			lg: 'var(--radius)',
  			xl: '1.5rem',
  			'4xl': '2rem',
  			full: '9999px',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
