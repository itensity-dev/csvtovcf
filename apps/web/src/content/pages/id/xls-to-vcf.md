---
url: convert-xls-ke-vcf
title: 'Convert XLS ke VCF: File Kontak Excel Lama jadi vCard'
h1: 'Convert XLS ke VCF'
description: 'Ubah daftar kontak .xls dari Excel 97–2003, CRM lama, dan software sinkronisasi HP jadi file VCF. Code page lama dibaca dengan benar, jadi nama tetap utuh. Tanpa upload.'
lead: 'Membaca format Excel biner lama (.xls) — termasuk file dari Excel 95, program akuntansi, dan software sinkronisasi HP — lalu menulis .vcf yang bisa diimpor HP zaman sekarang.'
nav: 'XLS ke VCF'
summary: 'File kontak .xls lama (Excel 97–2003 dan sebelumnya) jadi vCard.'
steps:
  - 'Taruh file .xls di atas. Formatnya dikenali dari isi file, jadi workbook dengan ekstensi yang salah pun tetap bisa dibuka.'
  - 'Pilih sheet kalau ada beberapa, lalu cek pratinjaunya: nama dengan huruf Kiril, Yunani, Turki, atau Eropa Tengah harus terbaca dengan benar.'
  - 'Cek pemetaan kolom dan pilih negara untuk nomor tanpa kode negara.'
  - 'Download file .vcf. Pilih vCard 2.1 hanya kalau file akan dipakai lagi di HP lama; HP sekarang butuh 3.0.'
features:
  - feature: 'Format'
    value: 'BIFF8 (.xls dari Excel 97–2003), BIFF5 (Excel 95), BIFF2–4 dan Excel 2003 XML, ditambah .xlsx dan .ods.'
  - feature: 'Code page lama'
    value: 'Teks di file .xls dari era sebelum Unicode (Windows-1250/1251/1252/1253/1254, Shift_JIS, Big5…) didekode dengan code page yang tersimpan di file.'
  - feature: 'Angka dan tanggal'
    value: 'Nomor telepon dibaca utuh; sel tanggal, termasuk sistem tanggal 1904 dari workbook Mac lama, jadi tanggal lahir.'
  - feature: 'Output'
    value: 'vCard 3.0 (default), 4.0, atau 2.1, satu file atau satu file per kontak; CSV Google; CSV Outlook.'
  - feature: 'Tidak didukung'
    value: '.xls terenkripsi (butuh kata sandi untuk dibuka), file Lotus 1-2-3 dan Quattro.'
faq:
  - q: 'Apa bedanya XLS dan XLSX?'
    a: '.xls adalah format biner yang dipakai Excel sampai versi 2003; .xlsx adalah format XML terkompresi (zip) yang dipakai sejak Excel 2007. Di sini keduanya dibaca dengan cara yang sama. Program lama dan sebagian software sinkronisasi HP masih mengekspor .xls.'
  - q: 'Nama dari file lama saya tampil sebagai `Ãëåá` atau tanda tanya. Harus bagaimana?'
    a: 'Di konverter ini seharusnya tidak: file .xls menyimpan code page-nya, dan code page itu dipakai saat membaca. Kalau huruf masih salah, kemungkinan teksnya sudah rusak saat diketik ke Excel. Buka file di Excel dan cek sel-selnya di sana.'
  - q: 'Bisakah file .xls berisi ribuan kontak dikonversi?'
    a: 'Bisa. Tidak ada batas baris; 100.000 baris selesai dalam beberapa detik. Untuk Google Kontak, pecah hasilnya jadi beberapa file berisi maksimal 3.000 kontak.'
  - q: 'Versi vCard mana yang cocok untuk HP lama?'
    a: 'vCard 2.1. Versi ini menulis teks non-Latin sebagai Quoted-Printable dengan `CHARSET=UTF-8`, yang dipahami HP buatan tahun 2000-an. Smartphone sebaiknya diberi 3.0.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, what-is-vcf, import-android]
updated: 2026-11-04
---

**XLS** adalah format file yang dipakai Excel sebelum 2007. Format ini masih sering ditemui pada daftar kontak hasil ekspor CRM lama, software akuntansi, sistem telepon kantor, dan program sinkronisasi HP. HP tidak bisa membacanya, dan Google Kontak hanya mengimpor CSV atau vCard. Konverter membaca file .xls itu sendiri, jadi Anda tidak perlu menginstal Excel.

**Code page.** Excel 97–2003 menyimpan teks sebagai Unicode, tetapi file dari Excel 95 dan beberapa program lain menyimpannya dalam code page komputer yang membuatnya — Windows-1251 untuk bahasa Rusia, 1250 untuk Polandia atau Ceko, 1254 untuk Turki. Konverter memakai code page yang tercatat di file, jadi `Иванов` tetap `Иванов`. File .vcf selalu ditulis dalam UTF-8.

**Dari baris jadi kartu.** Baris judul ditemukan otomatis. Kolom dicocokkan berdasarkan namanya dalam banyak bahasa: “No HP”, “Teléfono”, “Handy”, “Телефон”, dan “Cep Telefonu” semuanya jadi nomor telepon. Setiap baris jadi satu kartu dengan field wajib `N` dan `FN`; baris tanpa nama, nomor, email, perusahaan, atau alamat dilewati dan dicantumkan dengan nomor barisnya.

**Versi mana yang di-download.** vCard 3.0 bisa diimpor di iPhone, Android, Google Kontak, dan Outlook. vCard 2.1 tersedia untuk HP asal file .xls semacam ini: ponsel biasa (bukan smartphone) dan model Nokia atau Sony Ericsson lama. [Beda tiap versi](/id/apa-itu-file-vcf/).
