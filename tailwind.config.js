/** @type {import('tailwindcss').Config} */
const renkler = 'gray|slate|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose';

module.exports = {
  content: ['./index.html'],
  // Uygulama listesine yeni kart eklerken CSS'i yeniden derlemeye gerek kalmasın diye
  // simge renkleri (bg-/text- [renk]-400/500/600) her zaman dahil edilir.
  safelist: [
    { pattern: new RegExp(`^bg-(${renkler})-(400|500|600)$`) },
    { pattern: new RegExp(`^text-(${renkler})-(400|500|600)$`) },
  ],
  theme: { extend: {} },
  plugins: [],
};
