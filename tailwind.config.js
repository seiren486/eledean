/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary-fixed": "#dce3f0",
        "on-secondary-fixed-variant": "#3e4755",
        "on-surface-variant": "#5c403c",
        "outline-variant": "#e6bdb8",
        "on-tertiary-container": "#f5f7ff",
        "tertiary-container": "#6b727d",
        "surface-container-high": "#e7e8e9",
        "on-error": "#ffffff",
        "surface": "#f8f9fa",
        "surface-tint": "#bf0715",
        "error": "#ba1a1a",
        "secondary": "#555f6d",
        "on-secondary-container": "#596372",
        "primary-fixed": "#ffdad6",
        "surface-container-lowest": "#ffffff",
        "error-container": "#ffdad6",
        "on-secondary-fixed": "#121c28",
        "surface-container-highest": "#e1e3e4",
        "inverse-primary": "#ffb4ab",
        "surface-variant": "#e1e3e4",
        "surface-container-low": "#f3f4f5",
        "surface-bright": "#f8f9fa",
        "primary-container": "#dc2626",
        "primary": "#b70011",
        "on-tertiary-fixed-variant": "#404752",
        "outline": "#916f6b",
        "background": "#f8f9fa",
        "on-error-container": "#93000a",
        "tertiary": "#525a64",
        "primary-fixed-dim": "#ffb4ab",
        "tertiary-fixed-dim": "#c0c7d3",
        "on-tertiary-fixed": "#151c25",
        "on-primary": "#ffffff",
        "secondary-container": "#d6e0f1",
        "inverse-surface": "#2e3132",
        "on-primary-fixed-variant": "#93000b",
        "secondary-fixed-dim": "#bdc7d8",
        "on-primary-fixed": "#410002",
        "surface-dim": "#d9dadb",
        "on-surface": "#191c1d",
        "on-tertiary": "#ffffff",
        "secondary-fixed": "#d9e3f4",
        "on-background": "#191c1d",
        "on-primary-container": "#fff6f5",
        "on-secondary": "#ffffff",
        "surface-container": "#edeeef",
        "inverse-on-surface": "#f0f1f2"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-desktop": "32px",
        "section-gap": "48px",
        "container-max": "1280px",
        "margin-mobile": "16px",
        "gutter": "24px",
        "element-gap": "16px"
      },
      fontFamily: {
        "headline-xl": ["Inter"],
        "headline-xl-mobile": ["Inter"],
        "headline-md": ["Inter"],
        "body-md": ["Inter"],
        "headline-lg": ["Inter"],
        "body-lg": ["Inter"],
        "label-sm": ["Inter"]
      },
      fontSize: {
        "headline-xl": ["36px", {"lineHeight": "1.2", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-xl-mobile": ["28px", {"lineHeight": "1.2", "fontWeight": "700"}],
        "headline-md": ["20px", {"lineHeight": "1.4", "fontWeight": "600"}],
        "body-md": ["14px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "headline-lg": ["24px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "700"}],
        "body-lg": ["16px", {"lineHeight": "1.6", "fontWeight": "400"}],
        "label-sm": ["12px", {"lineHeight": "1.4", "letterSpacing": "0.01em", "fontWeight": "500"}]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
