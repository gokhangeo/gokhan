# Yönetici Portalı

GitHub Pages: https://gokhangeo.github.io/gokhan/

## Yeni uygulama (link) eklemek

`index.html` içindeki `UYGULAMALAR` listesinde ilgili bölüme tek satır ekleyin:

```js
{ ad: 'Yeni Uygulama', aciklama: 'Kısa açıklama', url: 'https://...', renk: 'bg-teal-500', simge: 'belge' },
```

- `tkgm` ve `projects` bölümlerinde `renk` bir `bg-...` sınıfıdır, `other` bölümünde `text-...` sınıfıdır.
- `simge`, aynı dosyadaki `SIMGELER` listesindeki adlardan biridir.
- Kategori kartlarındaki "N uygulama" sayıları otomatik hesaplanır.

## CSS (Tailwind)

Sayfa, derlenmiş `assets/tailwind.css` dosyasını kullanır. `bg-`/`text-` + renk + `400/500/600`
sınıfları her zaman dahildir, bu yüzden yeni link eklemek için derleme gerekmez.

HTML'de **daha önce hiç kullanılmamış** bir Tailwind sınıfı kullanırsanız CSS'i yeniden derleyin:

```bash
npm install        # yalnızca ilk sefer
npm run build:css
```

Ardından `assets/tailwind.css` dosyasını da commit'leyin.
