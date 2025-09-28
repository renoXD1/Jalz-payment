````markdown name=README.md
```markdown
# JULIANJOKI — Template Toko Joki Roblox (Statis)

Template ini adalah situs statis sederhana untuk menjual jasa joki Roblox. Mudah diedit: cukup ubah file `products.json` dan `config.json` tanpa menyentuh HTML.

File penting:
- config.json — atur nama toko (`storeName`), gambar hero (`heroImage`), dan teks sub.
- products.json — daftar layanan/joki. Setiap item: id, name, price, desc, img, available.
- index.html, styles.css, script.js — tampilan dan logika.

Cara edit cepat:
- Ubah atau tambahkan item di `products.json`. Contoh:
  {
    "id": "j4",
    "name": "Joki Custom",
    "price": 12.5,
    "desc": "Deskripsi singkat",
    "img": "https://...",
    "available": true
  }
- Ganti gambar hero di `config.json` dengan URL gambar baru.

Men-deploy:
- Push repo ke GitHub (branch `main`) lalu aktifkan GitHub Pages di Settings → Pages (root) untuk hosting gratis.
- Atau gunakan Vercel/Netlify untuk deploy (lebih mudah untuk custom domain dan HTTPS otomatis).

Pembayaran:
- Saat ini demo checkout hanya menampilkan keranjang. Untuk pembayaran nyata:
  - Integrasi PayPal Buttons (client-side) untuk tombol pembayaran cepat.
  - Atau gunakan Stripe Checkout (membutuhkan server/serverless untuk membuat session).
  - Alternatif sederhana: tampilkan instruksi transfer manual di halaman checkout dan konfirmasi manual.

Keamanan & catatan:
- Jangan menyimpan kredensial di file publik.
- Untuk layanan joki: pastikan kebijakan dan izin pemain diperhatikan — hindari praktik yang melanggar kebijakan platform.

Butuh bantuan tambahan?
- Saya bisa tambahkan integrasi PayPal/WhatsApp atau sistem konfirmasi otomatis jika mau. Tinggal bilang: metode pembayaran apa.
```
```