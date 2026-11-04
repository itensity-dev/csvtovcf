---
url: ''
title: 'Konversi CSV ke VCF Online Gratis: Kontak jadi vCard, Tanpa Upload'
h1: 'Konversi CSV ke VCF'
description: 'Konversi daftar kontak CSV atau Excel ke file VCF (vCard) untuk Android, iPhone, Google Kontak, dan Outlook. Nomor 08xx bisa jadi +62. Berjalan di browser, tanpa upload.'
lead: 'Mengubah spreadsheet kontak jadi satu file .vcf yang bisa diimpor di iPhone, Android, Google Kontak, dan Outlook — kolom dicocokkan, nomor HP dirapikan, duplikat ditemukan. File dibaca di perangkat ini dan tidak pernah di-upload.'
nav: 'CSV ke VCF'
summary: 'Spreadsheet kontak apa pun jadi file .vcf, dengan pencocokan kolom dan perapian nomor HP.'
steps:
  - 'Taruh file CSV, Excel, atau ODS di kotak di atas, atau tempel sel dari Google Sheets. Encoding dan pemisah dideteksi otomatis; kalau pratinjau menampilkan simbol seperti `Ã©` alih-alih huruf, pilih encoding lain.'
  - 'Cek pemetaan kolom. Setiap kolom dihubungkan ke satu field vCard; yang bertanda **tebakan** sebaiknya diperiksa. Kolom yang diatur ke “lewati” tidak ikut diekspor.'
  - 'Pilih negara untuk nomor yang ditulis tanpa kode negara. Nomor disimpan sebagai `+6281234567890`, jadi bisa ditelepon dengan benar dari negara mana pun dan dikenali WhatsApp serta aplikasi chat lain.'
  - 'Download file .vcf — vCard 3.0, kecuali perangkat meminta versi lain — lalu impor: [iPhone](/id/cara-import-vcf-ke-iphone/), [Android](/id/cara-import-kontak-vcf-di-android/), [Google Kontak](/id/cara-import-kontak-ke-google-kontak/), [Outlook](/id/cara-import-kontak-ke-outlook/).'
features:
  - feature: 'Input'
    value: 'CSV, TSV, dan TXT dengan pemisah apa pun (koma, titik koma, tab, garis tegak, baris `sep=` dari Excel); XLSX, XLS, ODS dengan pilihan sheet; sel yang ditempel dari Google Sheets atau Excel. Bisa beberapa file sekaligus.'
  - feature: 'Encoding'
    value: 'UTF-8 dengan atau tanpa BOM, UTF-16, Windows-1250 sampai 1258, KOI8-R, ISO-8859, Mac Roman, Shift_JIS, GB18030, Big5, EUC-KR. Dideteksi otomatis; bisa diganti sambil melihat pratinjau langsung.'
  - feature: 'Ekspor yang dikenali'
    value: 'CSV Google Kontak (format sekarang dan lama), CSV Outlook dengan judul kolom bahasa Inggris, Jerman, Prancis, Rusia, Spanyol, Portugis, atau Turki, Connections.csv dari LinkedIn, daftar sederhana “nama + nomor” dengan atau tanpa baris judul.'
  - feature: 'Nomor telepon'
    value: 'Diubah ke format internasional dengan aturan libphonenumber; nomor HP diberi jenis seluler. Nomor yang tidak valid tetap disimpan dan diberi tanda. Nomor rusak dari Excel seperti `6,28123E+12` dan nomor yang disimpan tanpa “+” dideteksi.'
  - feature: 'Nama'
    value: 'Nama lengkap dalam satu sel dipecah jadi nama depan, tengah, dan belakang — termasuk format “Belakang, Depan”, patronimik Rusia, nama keluarga ganda Spanyol, dan partikel seperti *bin*, *binti*, *van*, atau *da*.'
  - feature: 'Duplikat'
    value: 'Dicari berdasarkan nomor telepon dan email. Penggabungan bersifat opsional; Anda melihat grupnya sebelum download.'
  - feature: 'Output'
    value: 'vCard 3.0 (default), 4.0, atau 2.1; satu .vcf atau ZIP berisi satu file per kontak; CSV Google Kontak; CSV Outlook.'
  - feature: 'Ukuran'
    value: 'Diuji dengan 100.000 baris: beberapa detik di laptop. Tidak ada batas baris — batasnya adalah memori perangkat Anda.'
  - feature: 'Privasi'
    value: 'Tanpa upload, tanpa akun, isi file tidak dilacak. Tetap bisa dipakai offline setelah kunjungan pertama.'
  - feature: 'Tidak didukung'
    value: 'Foto kontak (spreadsheet tidak punya foto), file Apple Numbers (ekspor dulu ke CSV), file Excel yang dilindungi kata sandi.'
faq:
  - q: 'Apakah daftar kontak saya di-upload ke suatu tempat?'
    a: 'Tidak. Browser Anda membaca file, lalu Web Worker di perangkat Anda yang mengonversinya. Untuk mengeceknya, buka developer tools (F12), masuk ke tab Network, lalu konversi sebuah file: tidak ada request yang membawa data Anda. Setelah kunjungan pertama, konverter juga bisa dipakai tanpa koneksi internet.'
  - q: 'Versi vCard mana yang sebaiknya dipilih?'
    a: 'vCard 3.0. iPhone, Android, Google Kontak, dan Outlook semuanya bisa mengimpornya. Pilih 4.0 hanya kalau ada aplikasi yang memintanya, dan 2.1 untuk HP lama (ponsel biasa, Nokia atau Sony Ericsson lama) yang menampilkan huruf rusak dengan 3.0.'
  - q: 'Kenapa nomor HP saya tampil sebagai 6,28123E+12?'
    a: 'Excel menampilkan angka panjang itu dalam notasi ilmiah, dan CSV ikut disimpan dalam bentuk itu, jadi digit aslinya sudah tidak ada di file. Format kolom nomor sebagai Teks di Excel lalu ekspor ulang — atau langsung pakai file .xlsx-nya, karena di sana nomor lengkapnya masih tersimpan. [Kenapa ini terjadi](/id/nomor-hp-di-excel-jadi-e11/).'
  - q: 'Apakah nama dengan huruf beraksen, huruf Arab, atau aksara Mandarin tetap utuh?'
    a: 'Ya, asalkan encoding-nya terbaca dengan benar. Konverter mendeteksinya dan menampilkan baris-baris pertama; kalau Anda melihat `Ã©`, `Ð¸`, atau tanda tanya, pilih encoding lain di daftar. File .vcf selalu ditulis dalam UTF-8, yang bisa dibaca semua HP zaman sekarang.'
  - q: 'Bisakah semua kontak ditambahkan ke iPhone sekaligus?'
    a: 'Bisa. Kirim satu file .vcf itu ke iPhone lewat AirDrop, Mail, atau app File, buka, lalu ketuk “Tambahkan Semua Kontak”. [Panduan langkah demi langkah](/id/cara-import-vcf-ke-iphone/).'
  - q: 'Berapa banyak kontak yang bisa dikonversi?'
    a: 'Konverter tidak punya batas. Google Kontak menerima maksimal 3.000 kontak per file impor dan 25.000 per akun; pecah daftar yang lebih besar jadi beberapa file.'
  - q: 'Benar-benar gratis?'
    a: 'Ya — tanpa akun, tanpa watermark, tanpa batas baris. Mesin konversinya open source dengan lisensi MIT.'
related: [excel-to-vcf, google-contacts-csv-to-vcf, outlook-csv-to-vcf, import-iphone, import-android, garbled-contacts]
updated: 2026-11-04
---

**VCF** (vCard) adalah format standar untuk kartu kontak: semua HP dan aplikasi email bisa mengimpornya. CSV hanyalah tabel, dan HP tidak bisa mengimpor tabel. Konverter ini mengubah setiap baris jadi satu kartu:

```text
BEGIN:VCARD
VERSION:3.0
N:Santoso;Budi;;;
FN:Budi Santoso
TEL;TYPE=CELL:+6281234567890
EMAIL;TYPE=INTERNET:budi@example.co.id
ORG:CV Santoso Jaya
BDAY:1990-05-17
END:VCARD
```

**Kenapa default-nya vCard 3.0.** Versi 3.0 ([RFC 2426](https://www.rfc-editor.org/rfc/rfc2426)) adalah format yang dipakai iPhone, Android, dan Google Kontak sendiri saat mengekspor kontak, jadi bisa diimpor dengan mulus di mana saja. Versi 4.0 ([RFC 6350](https://www.rfc-editor.org/rfc/rfc6350)) lebih baru, tapi tidak menambahkan apa pun yang dibutuhkan buku telepon. Versi 2.1 ada untuk HP lama: teks non-Latin ditulis dalam Quoted-Printable dengan `CHARSET=UTF-8`, satu-satunya bentuk yang dipahami HP tersebut.

**Isi file.** Setiap kartu punya dua field wajib: `N` (bagian-bagian nama) dan `FN` (nama tampilan). Kalau sebuah baris tidak punya nama, yang dipakai adalah nama perusahaan, lalu email, lalu nomornya. Teks di-escape dan baris panjang dilipat pada 75 byte tanpa memotong huruf di tengah, jadi huruf Kiril, Arab, Mandarin, dan emoji sampai dengan utuh. Akhir baris memakai CRLF, sesuai standar.

**Jenis nomor.** Kolom bernama “No HP”, “Handphone”, “Ponsel”, “WA”, atau “Mobile” menjadi `TYPE=CELL`. Untuk kolom nomor umum seperti “Nomor Telepon”, rencana penomoran negara yang menentukan: nomor HP jadi seluler, nomor telepon rumah atau kantor tetap “telepon”.

**Untuk WhatsApp.** WhatsApp mencocokkan kontak berdasarkan nomor internasional lengkap. Dengan negara Indonesia dipilih, `0812-3456-7890` ditulis sebagai `+6281234567890`, jadi kontak yang punya akun WhatsApp akan muncul setelah WhatsApp memuat ulang daftar kontaknya.

**Sisanya.** Kolom yang tidak dibutuhkan bisa diatur ke *lewati*. Tanggal yang tidak bisa dibaca konverter tidak dibuang; tanggal itu dimasukkan ke catatan. Setiap baris yang dilewati dicantumkan dengan nomor barisnya — sama seperti yang ditampilkan Excel — beserta alasannya.

Baca juga: [apa itu file VCF dan beda tiap versinya](/id/apa-itu-file-vcf/), [kenapa nama kontak jadi simbol aneh setelah diimpor](/id/nama-kontak-jadi-simbol/).
