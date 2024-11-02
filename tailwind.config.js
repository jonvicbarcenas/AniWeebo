/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                customBlue: '', // Add your custom blue color
            },
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require('@vidstack/react/tailwind.cjs')({
            selector: '.media-player',
            prefix: 'media',
        }),
    ],
}