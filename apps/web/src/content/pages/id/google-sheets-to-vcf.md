---
url: google-sheets-ke-vcf
title: 'Google Sheets ke VCF: Tempel Kontak, Dapatkan File vCard'
h1: 'Convert Google Sheets ke VCF'
description: 'Salin sel kontak dari Google Sheets, tempel di sini, lalu download file VCF untuk iPhone, Android, atau Google Kontak. Tak perlu download sheet, add-on, atau akses akun.'
lead: 'Pilih baris kontak di Google Sheets, salin, tempel di sini — lalu download file .vcf. Tanpa add-on dan tanpa akses ke akun Google Anda: sel hanya berpindah dari clipboard Anda ke halaman ini.'
nav: 'Google Sheets ke VCF'
summary: 'Tempel sel dari Google Sheets dan download file .vcf.'
steps:
  - 'Di Google Sheets, pilih baris kontak termasuk baris judul (klik nomor baris pertama, Shift+klik nomor baris terakhir), lalu salin dengan Ctrl+C (⌘C di Mac).'
  - 'Klik **Tempel sel** di atas, tempel dengan Ctrl+V, lalu tekan **Pakai sel ini**. Sel yang ditempel dipisahkan dengan tab, jadi koma di dalam nama atau alamat aman.'
  - 'Cek pemetaan kolom dan pilih negara untuk nomor tanpa kode negara.'
  - 'Download file .vcf lalu impor: di [Android](/id/cara-import-kontak-vcf-di-android/), [iPhone](/id/cara-import-vcf-ke-iphone/), atau di [Google Kontak](/id/cara-import-kontak-ke-google-kontak/).'
features:
  - feature: 'Input'
    value: 'Sel yang ditempel dari Google Sheets, Excel, LibreOffice, atau Numbers (dipisahkan tab); atau file yang di-download lewat File → Download → .xlsx atau .csv.'
  - feature: 'Akses akun'
    value: 'Tidak ada. Tanpa add-on, tanpa login, tanpa Google API: konverter hanya melihat apa yang Anda tempel.'
  - feature: 'Nomor telepon'
    value: 'Sheets sering menyimpan nomor sebagai angka (tanpa “+”, tanpa 0 di depan). Nomor dilengkapi berdasarkan negara yang dipilih dan ditulis dalam format internasional.'
  - feature: 'Output'
    value: 'vCard 3.0, 4.0, atau 2.1; satu file atau ZIP; CSV Google Kontak kalau Anda lebih suka mengimpor daftar ke Google Kontak sebagai tabel.'
  - feature: 'Batas'
    value: 'Tidak ada di konverter. Tempelan yang sangat besar (100.000+ baris) lebih lancar kalau dipakai sebagai file .xlsx hasil download.'
faq:
  - q: 'Apakah ada add-on Google Sheets untuk ini?'
    a: 'Halaman ini adalah alternatif add-on: add-on butuh izin untuk membaca spreadsheet Anda, sedangkan salin-tempel hanya memberi halaman ini sel yang Anda pilih.'
  - q: 'Sebaiknya sheet di-download sebagai CSV atau Excel?'
    a: 'Dua-duanya bisa. File → Download → Microsoft Excel (.xlsx) menyimpan angka dan tanggal sebagai nilai seperti yang diketik; CSV juga tidak masalah, karena Google Sheets menulis CSV dalam UTF-8.'
  - q: 'Nomor yang ditempel kehilangan 0 di depannya. Bisakah diperbaiki?'
    a: 'Bisa, asalkan negaranya benar: nomor nasional dilengkapi dengan kode negara. Supaya ke depannya nomor tetap seperti yang diketik, format kolomnya di Sheets lewat Format → Angka → Teks biasa (Plain text).'
  - q: 'Bisakah kontak langsung dikirim ke Google Kontak?'
    a: 'Impor file .vcf hasil download di contacts.google.com → Impor. Google menerima maksimal 3.000 kontak per file. [Panduan](/id/cara-import-kontak-ke-google-kontak/).'
related: [google-contacts-csv-to-vcf, excel-to-vcf, home, import-google-contacts, bulk-add-contacts, import-android]
updated: 2026-11-04
---

Google Sheets adalah tempat banyak daftar kontak disimpan dan dibagikan: pendaftaran acara, daftar anggota tim, ekspor data pelanggan. Untuk memasukkan orang-orang itu ke HP, sheet harus diubah jadi file **VCF** (vCard).

**Kenapa tempel, bukan add-on.** Add-on yang membuat vCard dari sheet meminta izin untuk melihat spreadsheet Anda. Menyalin sel memberi halaman ini persis apa yang Anda pilih, tidak lebih. Saat Anda menyalin dari Sheets, clipboard menyimpan sel sebagai teks yang dipisahkan tab. Konverter membaca format itu dengan tepat, termasuk baris baru di dalam sel dan tanda kutip.

**Judul kolom.** Ikut salin baris judulnya: “Nama”, “No HP”, “Email” lalu dikenali dan dipetakan otomatis. Tanpa judul, kolom dicocokkan berdasarkan isinya. Kolom email, kolom nomor, dan kolom berisi dua kata tetap ditemukan, tapi cek pemetaannya.

**Nomor di Sheets.** Seperti Excel, Google Sheets menganggap `0812 3456 7890` sebagai angka kecuali kolomnya berformat teks biasa, lalu membuang angka 0 di depannya. Konverter mengenal rencana penomoran setiap negara. Dengan negara Indonesia dipilih, `81234567890` menjadi `+6281234567890` dan dicek sebagai nomor HP yang valid — bentuk yang juga dipakai WhatsApp untuk menemukan kontak.

**Duplikat.** Sheet bersama sering memuat orang yang sama dua kali. Buka tab *Duplikat* setelah menempel: orang dengan nomor atau email yang sama dikelompokkan, dan Anda bisa menggabungkannya sebelum download.
