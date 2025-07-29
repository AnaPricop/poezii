import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],


    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                'background': colors.slate[50],   // bg-slate-50
                'surface': colors.white,          // bg-white
                'primary': colors.teal[600],
                'primary-hover': colors.teal[700],
                'text-main': colors.slate[800],
                'text-muted': colors.slate[500],
                'slate': colors.slate,
                'teal': colors.teal,
                'rose': colors.rose,
            },
        },
    },

    plugins: [forms],
};
