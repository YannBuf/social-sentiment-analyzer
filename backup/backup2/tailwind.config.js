/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // ✅ 支持 dark 模式
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',      // 兼容老写法
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
