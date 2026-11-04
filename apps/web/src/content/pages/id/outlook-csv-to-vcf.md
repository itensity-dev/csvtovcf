---
url: csv-outlook-ke-vcf
title: 'CSV Outlook ke VCF: Convert Kontak Outlook jadi vCard'
h1: 'Convert CSV Outlook ke VCF'
description: 'Ubah kontak hasil ekspor Outlook (CSV, bahasa apa pun) jadi satu file VCF untuk iPhone, Android, atau Gmail. Judul kolom lokal dan encoding Windows terbaca. Tanpa upload.'
lead: 'Mengubah ekspor kontak Outlook jadi satu file .vcf. Bisa untuk judul kolom dalam bahasa Inggris, Jerman, Prancis, Rusia, dan bahasa Outlook lainnya, juga encoding Windows yang ditulis Outlook.'
nav: 'CSV Outlook ke VCF'
summary: 'Ekspor kontak Outlook (CSV, bahasa apa pun) jadi satu file vCard.'
steps:
  - 'Ekspor dari Outlook. Outlook klasik: File → Buka & Ekspor (Open & Export) → Impor/Ekspor → Ekspor ke file → Nilai yang Dipisahkan Koma (Comma Separated Values) → Kontak. Outlook baru dan Outlook.com: Orang (People) → Kelola kontak → Ekspor kontak.'
  - 'Taruh file .csv di atas. Konverter mendeteksi encoding (Outlook sering menulis Windows-1252 atau 1251, bukan UTF-8) dan pemisahnya (`;` di banyak pengaturan Eropa).'
  - 'Cek pemetaan: `Title` di Outlook adalah sapaan di depan nama (Mr., Dr.), `Job Title` adalah jabatan. Kolom kosong — Outlook mengekspor sekitar 90 kolom — disembunyikan.'
  - 'Download file .vcf lalu impor di [iPhone](/id/cara-import-vcf-ke-iphone/) atau [Android](/id/cara-import-kontak-vcf-di-android/).'
features:
  - feature: 'Versi Outlook'
    value: 'Ekspor CSV dari Outlook klasik untuk Windows (2010–2024, Microsoft 365), Outlook baru, Outlook.com, dan Outlook for Mac.'
  - feature: 'Bahasa judul kolom'
    value: 'Inggris, Jerman (`Vorname`, `Telefon geschäftlich`), Prancis (`Prénom`, `Tél. mobile`), Rusia (`Имя`, `Рабочий телефон`), Spanyol, Portugis, Italia, Belanda, Polandia, Turki.'
  - feature: 'Nomor telepon'
    value: 'Kolom Business, Home, Mobile, Primary, Company Main, Fax, dan Pager tetap dengan jenisnya; Car, Callback, ISDN, Radio jadi “lainnya”.'
  - feature: 'Alamat'
    value: 'Jalan, kota, provinsi/negara bagian, kode pos, dan negara untuk Business / Home / Other menjadi tiga entri `ADR` dengan jenisnya; Street 2 dan 3 digabung.'
  - feature: 'Nilai kosong'
    value: 'Outlook menulis tanggal kosong sebagai `0/0/00` — nilai ini diabaikan, tidak diubah jadi tahun 2000.'
  - feature: 'Tidak ikut terbawa'
    value: 'Foto, flag, “Internet Free Busy”, field pengguna 1–4 (petakan ke catatan kalau perlu).'
faq:
  - q: 'Outlook bisa menyimpan kontak sebagai vCard. Kenapa harus convert CSV?'
    a: 'Outlook menyimpan satu vCard per kontak; tidak ada ekspor semua kontak ke satu file .vcf. Ekspor CSV berisi semua orang, dan halaman ini mengubahnya jadi satu file .vcf — atau ZIP berisi satu kartu per kontak.'
  - q: 'Ekspor saya punya judul kolom bahasa Jerman (atau Prancis, Rusia…). Apakah bisa?'
    a: 'Bisa. Outlook klasik menulis judul kolom dalam bahasa antarmukanya, dan konverter mengenalinya. Panel file menampilkan “CSV Outlook, judul kolom lokal” dan bahasa yang terdeteksi.'
  - q: 'Kenapa ada `Mr.` di nama?'
    a: 'Kolom `Title` di Outlook berisi sapaan, jadi ditulis ke gelar depan nama. Kalau tidak ingin muncul di HP, atur kolom itu ke *lewati*.'
  - q: 'Nama jadi `MÃ¼ller` atau tanda tanya.'
    a: 'Encoding-nya salah terbaca. Pilih encoding yang dipakai Outlook: Windows-1252 untuk bahasa Eropa Barat (juga bahasa Indonesia), Windows-1251 untuk huruf Kiril, Windows-1250 untuk Eropa Tengah. Pratinjau langsung berubah. [Selengkapnya soal nama yang rusak](/id/nama-kontak-jadi-simbol/).'
related: [google-contacts-csv-to-vcf, import-outlook, home, garbled-contacts, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

Outlook mengekspor kontak sebagai CSV dengan sampai ~90 kolom: tiga alamat, sembilan belas field telepon, tiga email, field pengguna, dan lainnya. Untuk kebanyakan orang, sebagian besar kolom itu kosong. Konverter menyembunyikan kolom kosong, memetakan sisanya ke field vCard, dan menulis satu kartu per kontak.

**Judul kolom lokal.** Outlook klasik menamai kolom dalam bahasa antarmukanya. Dokumentasi Microsoft menyebutkan bahwa bahasa judul kolom harus sama dengan bahasa Outlook saat impor, jadi Outlook berbahasa Jerman menulis `Vorname, Nachname, Mobiltelefon`. Konverter mengenali judul-judul ini dari kata-katanya, bukan dari daftar tetap. Karena itu `Telefon geschäftlich`, `Téléphone (bureau)`, dan `Рабочий телефон` semuanya jadi nomor kantor.

**Field yang sering membingungkan konverter lain.**

- `Title` adalah sapaan (Mr., Mrs., Dr.); `Job Title` adalah jabatan.
- `Business Street`, `Business Street 2`, `Business Street 3` adalah bagian dari satu alamat.
- `E-mail Type` (`SMTP`) dan `E-mail Display Name` bukan alamat email dan dilewati.
- `Birthday` = `0/0/00` berarti “tidak ada tanggal lahir”.

**Encoding.** Outlook klasik sering menulis CSV dalam code page Windows di sistem Anda, bukan UTF-8. CSV yang disimpan ulang oleh Excel dengan pengaturan regional Eropa — atau Indonesia — memakai titik koma. Keduanya dideteksi. Kalau nama tampak salah, ganti encoding di panel file dan lihat pratinjaunya berubah.

**Kembali ke Outlook?** Untuk memindahkan kontak *ke* Outlook, CSV adalah jalur yang lebih aman: Outlook klasik mengimpor .vcf berisi banyak kontak satu kartu demi satu kartu. Pilih “CSV Outlook” di *Download sebagai*. [Panduan impor ke Outlook](/id/cara-import-kontak-ke-outlook/).
