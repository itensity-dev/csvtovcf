---
url: cara-import-kontak-ke-google-kontak
title: 'Cara Import Kontak VCF atau CSV ke Google Kontak (Gmail)'
h1: 'Cara import kontak ke Google Kontak'
description: 'Impor file .vcf (atau Google CSV) ke Google Kontak di web: Impor → Pilih file. Batasnya (3.000 per file, 25.000 per akun), label, dan cara menggabungkan duplikat.'
lead: 'Google Kontak versi web bisa mengimpor .vcf atau Google CSV dalam empat langkah. Setelah itu kontak tersinkron ke semua HP Android, ke Gmail, dan ke iPhone yang sudah ditambahkan akun Google-nya.'
nav: 'Import ke Google Kontak'
summary: 'Impor .vcf atau CSV di contacts.google.com, lengkap dengan batasnya.'
steps:
  - 'Konversi tabel Anda dengan [konverter](/id/) — .vcf (vCard 3.0) atau “CSV Google Kontak” di *Download sebagai*.'
  - 'Buka [contacts.google.com](https://contacts.google.com/) dan login dengan akun tujuan kontak.'
  - 'Klik **Impor** di menu kiri, lalu **Pilih file**, pilih filenya, dan klik **Impor**.'
  - 'Kontak yang diimpor mendapat label seperti “Diimpor pada 4/11/2026”. Buka **Gabungkan & perbaiki** (Merge & fix) untuk menyatukan duplikat dengan kontak yang sudah ada.'
faq:
  - q: 'VCF atau Google CSV — mana yang lebih baik untuk Google?'
    a: 'Keduanya diimpor lengkap. vCard menyimpan jenis nomor dan email serta bisa dipakai di aplikasi lain juga; Google CSV praktis kalau Anda ingin melihat atau mengedit daftar di spreadsheet sebelum diimpor.'
  - q: 'Berapa banyak kontak yang bisa diimpor?'
    a: 'Google meminta file berisi lebih dari 3.000 kontak dipecah, dan satu akun menampung maksimal 25.000 kontak (sekitar 20 MB tanpa foto). Pecah daftar yang lebih besar jadi beberapa file.'
  - q: 'Bagaimana cara membatalkan impor?'
    a: 'Klik label “Diimpor pada …” di menu kiri, pilih semua kontak di dalamnya (kotak centang di atas), lalu hapus. Kontak tetap ada di Sampah selama 30 hari.'
  - q: 'Kontak yang diimpor tidak muncul di HP saya.'
    a: 'Pastikan HP menyinkronkan akun Google ini. Di Android: Setelan → Sandi & akun → Google → Sinkronisasi akun → Kontak. Di iPhone: Pengaturan → App → Kontak → Akun → Gmail → Kontak aktif.'
related: [import-android, import-iphone, google-contacts-csv-to-vcf, google-sheets-to-vcf, home, bulk-add-contacts]
updated: 2026-11-04
---

## Langkah impor

1. Buka [contacts.google.com](https://contacts.google.com/) di komputer.
2. Di menu kiri, klik **Impor**.
3. Klik **Pilih file** dan pilih file .vcf atau .csv.
4. Klik **Impor**.

Google menambahkan setiap kontak yang diimpor ke label baru yang dinamai sesuai tanggal impor. Jadi hasilnya mudah dicek — atau seluruh batch bisa dihapus kalau ada yang salah.

## Batas yang perlu diketahui

| Batas | Nilai |
| --- | --- |
| Kontak per file impor | sekitar 3.000 — pecah file yang lebih besar |
| Kontak per akun | 25.000 |
| Penyimpanan kontak | 20 MB (foto tidak dihitung) |
| Satu kontak | maksimal 128 KB, 500 field |

Konverter menulis satu file untuk berapa pun jumlah kontaknya. Untuk lebih dari 3.000 baris, filter spreadsheet jadi beberapa bagian dan konversi tiap bagian, atau impor .vcf yang sama di HP Android, yang tidak punya batas per file.

## Duplikat

Google tidak menggabungkan kontak saat impor. Kalau orang yang sama diimpor dua kali, Anda mendapat dua kartu. Ada dua cara untuk menghindarinya:

- **sebelum** impor: buka tab *Duplikat* di konverter dan centang “Gabungkan” — orang dengan nomor atau email yang sama jadi satu kartu;
- **sesudah** impor: Google Kontak → **Gabungkan & perbaiki** menyarankan duplikat di seluruh akun Anda.

## Nomor telepon

Google menyimpan nomor sebagai teks, persis seperti saat diimpor. Nomor dalam bentuk internasional (`+62 812-3456-7890`) tampil dengan benar di negara mana pun, dan aplikasi chat seperti WhatsApp bisa mencocokkannya. Nomor tanpa kode negara ditafsirkan berdasarkan wilayah HP dan bisa salah saat Anda di luar negeri. Karena itu konverter menulis nomor dengan `+` secara default.
