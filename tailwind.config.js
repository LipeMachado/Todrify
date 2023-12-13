/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'bg': '#252525',
        'bg2': '#212121',
        'bg3': '#181818',
        'danger': '#fe6854',
        'primary': '#7263F3',
        'primary2': '#705DF2',
        'primary3': '#9385f2',
        'white': '#fff',
        'primaryGreen': '#6FCF97',
        'primaryGreenGrad': 'linear-gradient(91deg, #F56693 0, #6FCF97 90.46%)',
      },
      colors: {
        gray: {
          '0': '#f8f8f8',
          '1': '#dbe1e8',
          '2': '#b2becd',
          '3': '#6c7983',
        },
        'danger': '#fe6854',
        'primary': '#7263F3',
        'primary2': '#705DF2',
        'white': '#fff',
        'primaryGreen': '#6FCF97',
        'primaryGreenGrad': 'linear-gradient(91deg, #F56693 0, #6FCF97 90.46%)',
        'icons': 'rgba(249, 249, 249, 0.35)',
        'icons2': 'rgba(249, 249, 249, 0.75)',
        'icons3': 'rgba(249, 249, 249, 0.08)',
      },
      boxShadow: {
        'shadow1': '4px 4px 84px rgba(16, 10, 86, 0.04)',
        'shadow2': '0px 48px 77px rgba(8, 18, 69, 0.07)',
        'shadow3': '0 14px 40px rgb(0 0 0 / 25%)',
      },
      fontSize: {
        'clamph1': "clamp(1.5rem, 2vw, 2.5rem)",
        'clampinput': "clamp(1rem, 2vw, 1.2rem)",
        'clampinputbutton': "clamp(1rem, 2vw, 1.2rem)",
        'clampicon': "clamp(1.2rem, 2vw, 2rem)",
      },
    },
  },
  plugins: [],
}

