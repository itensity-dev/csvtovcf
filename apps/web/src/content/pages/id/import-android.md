---
url: cara-import-kontak-vcf-di-android
title: 'Cara Import Kontak VCF di Android (Samsung, Xiaomi, OPPO, vivo)'
h1: 'Cara import kontak VCF di HP Android'
description: 'Impor semua kontak dari file .vcf di HP Android: app Google Kontak, Samsung, Xiaomi/Redmi/POCO, juga OPPO, vivo, dan realme. Jalur menu persis dan solusi masalah umum.'
lead: 'Android bisa mengimpor file .vcf berisi banyak kontak sekaligus. Jalur menunya tergantung aplikasi Kontak: Google Kontak di Pixel dan banyak HP lain, aplikasi bawaan Samsung di HP Galaxy.'
nav: 'Import ke Android'
summary: 'Jalur menu untuk Google Kontak, Samsung, dan Xiaomi, plus cara umum untuk OPPO, vivo, realme.'
steps:
  - 'Buat file .vcf dengan [konverter](/id/) (vCard 3.0) lalu pindahkan ke HP: download langsung di HP, atau salin ke folder Download.'
  - '**App Google Kontak:** buka Kontak → **Atur** (tab bawah) → **Impor dari file** → pilih file .vcf → pilih akun Google.'
  - '**Kontak Samsung:** buka Kontak → menu ☰ → **Kelola kontak** → **Impor atau ekspor kontak** → **Impor** → pilih lokasi file → centang file .vcf → pilih tempat menyimpan (Samsung account, Google, telepon) → **Impor**.'
  - 'Buka app Kontak dan cek beberapa kartu. Simpan ke akun Google kalau Anda ingin kontak ada di perangkat lain dan di Gmail.'
faq:
  - q: 'Saya tidak menemukan “Impor” di app Google Kontak.'
    a: 'Di versi sekarang, menu ini ada di tab **Atur** di bagian bawah → Impor dari file. Di versi lama: menu (☰) → Setelan → Impor, atau “Perbaiki & kelola” (Fix & manage) → Impor dari file. Versi terbaru memindahkannya ke tab Atur.'
  - q: 'Kontak sebaiknya disimpan di mana?'
    a: 'Di akun Google, kalau Anda ingin kontak dicadangkan dan ada di semua perangkat (juga di Gmail). Penyimpanan “Telepon” atau “Perangkat” hanya menyimpan kontak di HP ini, dan kontak ikut hilang bersama HP-nya.'
  - q: 'Nama tampil sebagai simbol di HP Samsung saya.'
    a: 'Konversi ulang dengan vCard 3.0, bukan 2.1. Versi 2.1 menulis teks non-Latin sebagai Quoted-Printable, dan sebagian HP salah mendekodenya.'
  - q: 'Kontak baru tidak muncul di WhatsApp.'
    a: 'WhatsApp mencocokkan kontak berdasarkan nomor internasional lengkap. Konversi dengan format nomor E.164 (`+6281234567890`) dan negara yang benar, lalu muat ulang kontak di WhatsApp (Chat baru → ⋮ → Muat ulang).'
  - q: 'Bisakah CSV langsung diimpor di Android?'
    a: 'App Google Kontak di HP tidak bisa mengimpor CSV; versi web di contacts.google.com bisa. Dengan mengubahnya ke .vcf, Anda bisa langsung mengimpor di HP.'
related: [import-iphone, import-google-contacts, home, bulk-add-contacts, google-sheets-to-vcf, excel-to-vcf]
updated: 2026-11-04
---

## App Google Kontak (Pixel, Motorola, Nokia, OnePlus, dan lainnya)

App Google Kontak sudah terpasang di HP Pixel dan banyak HP lain. App ini juga bisa dipasang di HP Android mana pun lewat Google Play.

1. Buka **Kontak**.
2. Ketuk **Atur** di bagian bawah layar.
3. Ketuk **Impor dari file**.
4. Pilih file .vcf di pemilih file (biasanya di *Download*).
5. Kalau Anda punya beberapa akun, pilih akun Google tujuan. Semua kartu di file diimpor sekaligus.

Google Kontak menampung maksimal 25.000 kontak per akun. Untuk daftar yang sangat besar, impor bertahap per beberapa ribu kontak.

## Samsung Galaxy (Kontak Samsung, One UI)

1. Buka **Kontak**.
2. Ketuk menu **☰** (tiga garis).
3. Ketuk **Kelola kontak** (Manage contacts).
4. Ketuk **Impor atau ekspor kontak** (versi lama: *Impor/Ekspor kontak*).
5. Ketuk **Impor**, pilih penyimpanan tempat file berada (*Penyimpanan internal*), centang file .vcf, lalu ketuk **Selesai**.
6. Pilih tempat menyimpan — *Samsung account*, akun *Google*, atau *Telepon* — lalu ketuk **Impor**.

Label bisa sedikit berbeda antarversi One UI, tapi jalur lewat **Kelola kontak** sudah sama selama bertahun-tahun.

## Xiaomi, Redmi, POCO (MIUI / HyperOS)

Di HP yang memakai app Kontak bawaan Xiaomi: Kontak → **⋮** → **Setelan** → **Impor dan ekspor** → **Impor dari penyimpanan** (Settings → Import and export → Import from storage), lalu pilih filenya. HP yang memakai app Google Kontak mengikuti langkah Google di atas.

## OPPO, vivo, realme, dan HP lain: buka filenya

Menu di app Kontak bawaan OPPO, vivo, dan realme berbeda-beda antarversi. Cara yang berlaku di hampir semua HP: buka **File Manager** (Pengelola File), cari file .vcf (biasanya di folder *Download*), ketuk filenya, lalu pilih **Kontak** saat ditanya mau dibuka dengan aplikasi apa. Cara yang sama juga bisa dipakai untuk file .vcf dari lampiran email. Proses impornya sama, hanya saja akun tujuan dipilih di dialog berikutnya.

## Sebelum mengimpor

- **vCard 3.0, UTF-8.** Itulah yang ditulis konverter ini secara default dan yang diekspor Android sendiri.
- **Nomor internasional.** `+6281234567890` alih-alih `0812-3456-7890` membuat WhatsApp dan aplikasi chat lain bisa mencocokkan kontak, dan nomor tetap berfungsi saat roaming.
- **Satu file.** Satu .vcf berisi semua kontak lebih mudah daripada ratusan file kecil; pakai opsi ZIP hanya kalau ada sistem yang meminta satu kartu per file.
