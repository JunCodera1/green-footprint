/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: 'var(--primary-50)',
                    100: 'var(--primary-100)',
                    200: 'var(--primary-200)',
                    300: 'var(--primary-300)',
                    400: 'var(--primary-400)',
                    500: 'var(--primary-500)',
                    600: 'var(--primary-600)',
                    700: 'var(--primary-700)',
                    800: 'var(--primary-800)',
                    900: 'var(--primary-900)',
                },
            },
            animation: {
                'pulse-soft': 'pulse-soft 2s infinite',
                'float': 'float 3s ease-in-out infinite',
                'shine': 'shine 1.5s infinite',
            },
            transitionProperty: {
                'height': 'height',
                'spacing': 'margin, padding',
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },
    plugins: [],
} 