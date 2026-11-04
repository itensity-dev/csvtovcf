---
url: tentang
title: 'Tentang csvtovcf — siapa pembuatnya dan cara kerjanya'
h1: 'Tentang csvtovcf'
description: 'csvtovcf adalah konverter gratis dan open source dari spreadsheet kontak ke vCard yang berjalan penuh di browser. Siapa pembuatnya, dari mana dananya, cara menghubungi.'
lead: 'csvtovcf mengubah spreadsheet kontak jadi file vCard tanpa mengirimnya ke mana pun. Ini proyek independen kecil dengan mesin konversi open source.'
nav: 'Tentang'
summary: 'Siapa pembuat csvtovcf, cara kerjanya, dan cara menghubungi kami.'
updated: 2026-11-04
---

## Apa ini

csvtovcf.com mengubah daftar kontak dari Excel, Google Sheets, Google Kontak, Outlook, LinkedIn, atau CRM apa pun jadi file **vCard (.vcf)** yang bisa diimpor HP dan program email. Situs ini dibuat karena pilihan yang ada sebelumnya hanya dua: program desktop berbayar dengan versi uji coba sepuluh kontak, atau situs web yang meng-upload buku alamat Anda ke server lalu menebak-nebak kolomnya.

**Fakta:**

- Diluncurkan: November 2026. Halaman ini terakhir diperbarui pada tanggal yang tercantum di bawah.
- Bahasa: Inggris, Spanyol, Portugis (Brasil), Indonesia, Turki, Jerman, Prancis, Rusia.
- Format: masuk CSV, TSV, XLSX, XLS, ODS; keluar vCard 2.1, 3.0, 4.0, CSV Google, dan CSV Outlook.
- Harga: gratis, tanpa akun, tanpa batas baris.

## Cara kerjanya

Halaman dimuat sekali. Setelah itu, setiap langkah — membaca file, mendeteksi encoding, mencocokkan kolom, merapikan nomor telepon, menulis vCard — berjalan di Web Worker di browser Anda. Tidak ada yang di-upload, dan setelah kunjungan pertama konverter bisa dipakai offline. [Halaman privasi](/id/privasi/) menjelaskan dengan rinci apa yang dikirim dan tidak dikirim lewat jaringan.

Mesin konversinya open source dengan lisensi MIT: [github.com/itensity-dev/csvtovcf](https://github.com/itensity-dev/csvtovcf), dan tersedia di npm sebagai [`csvtovcf`](https://www.npmjs.com/package/csvtovcf). Nomor telepon dicek dengan [libphonenumber-js](https://gitlab.com/catamphetamine/libphonenumber-js); spreadsheet dibaca dengan [SheetJS](https://sheetjs.com/). Semua library dan font tercantum di [halaman lisensi](/id/lisensi/).

## Siapa pembuatnya

csvtovcf dibuat oleh seorang developer independen yang juga mengelola beberapa alat lain yang masing-masing punya satu fungsi: [ibangenerator.io](https://ibangenerator.io/), [metasnitch.com](https://metasnitch.com/), [woff2tottf.com](https://woff2tottf.com/), [vtttosrt.com](https://vtttosrt.com/), dan lainnya yang tercantum di bagian bawah setiap halaman. Masing-masing mengerjakan satu tugas dan tidak butuh akun.

## Kontak

Laporan bug, kolom yang salah dicocokkan, HP yang tidak mau mengimpor file: tulis ke **hello@csvtovcf.com** atau buka issue di [GitHub](https://github.com/itensity-dev/csvtovcf/issues). Kalau sebuah file dikonversi dengan salah, jelaskan kolom-kolomnya dan beri satu contoh baris karangan — mohon jangan kirim data kontak asli.

csvtovcf tidak berafiliasi dengan Apple, Google, Microsoft, Samsung, atau LinkedIn; nama produk mereka dipakai hanya untuk menjelaskan kompatibilitas.
