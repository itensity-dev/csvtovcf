---
url: apa-itu-file-vcf
title: 'Apa Itu File VCF? Penjelasan vCard Versi 2.1, 3.0, dan 4.0'
h1: 'Apa itu file VCF (vCard)?'
description: 'File VCF adalah vCard: kartu kontak berupa teks biasa yang bisa diimpor semua HP dan aplikasi email. Isinya, beda versi 2.1, 3.0, dan 4.0, serta cara membukanya.'
lead: 'File VCF adalah vCard: teks biasa yang berisi satu atau beberapa kartu kontak — nama, nomor telepon, email, alamat, tanggal lahir — dalam standar yang dipahami semua HP dan program email.'
nav: 'Apa itu file VCF'
summary: 'Isi sebuah vCard dan beda versi 2.1, 3.0, dan 4.0.'
faq:
  - q: 'Bagaimana cara membuka file VCF?'
    a: 'Di HP, ketuk filenya: iPhone dan Android akan menawarkan untuk menambahkan kontaknya. Di komputer, klik dua kali untuk membukanya di buku alamat (Kontak di Mac, Outlook atau Orang/People di Windows). Editor teks apa pun bisa menampilkan teks mentahnya.'
  - q: 'Bisakah satu file VCF berisi banyak kontak?'
    a: 'Bisa. File itu hanyalah beberapa blok `BEGIN:VCARD … END:VCARD` yang berurutan. iPhone, Android, dan Google Kontak mengimpor semuanya sekaligus; Outlook klasik satu per satu.'
  - q: 'Versi mana yang sebaiknya dipakai?'
    a: 'vCard 3.0 untuk HP, Google, dan Outlook. 4.0 hanya kalau ada aplikasi yang memintanya; 2.1 untuk ponsel lama yang bukan smartphone.'
  - q: 'Apakah file VCF aman dibuka?'
    a: 'vCard adalah teks biasa tanpa makro atau kode. Risikonya sama seperti lampiran lain dari pengirim yang tidak dikenal: data kontaknya sendiri bisa menyesatkan.'
  - q: 'Apa bedanya .vcf dan .vcard?'
    a: 'Tidak ada — kedua ekstensi dipakai untuk format yang sama. Tipe MIME-nya `text/vcard` (software lama memakai `text/x-vcard`).'
related: [home, garbled-contacts, import-iphone, import-android, excel-to-vcf, bulk-add-contacts]
updated: 2026-11-04
---

## Isinya

vCard adalah teks. Setiap kartu diawali `BEGIN:VCARD` dan diakhiri `END:VCARD`; setiap baris di antaranya adalah satu properti:

```text
BEGIN:VCARD
VERSION:3.0
N:Santoso;Budi;;;
FN:Budi Santoso
TEL;TYPE=CELL:+6281234567890
EMAIL;TYPE=INTERNET,WORK:budi@example.co.id
ORG:CV Santoso Jaya
TITLE:Pemilik
ADR;TYPE=WORK:;;Jl. Sudirman No. 22;Jakarta Selatan;DKI Jakarta;12190;Indonesia
BDAY:1990-05-17
NOTE:Kenal di pameran dagang
END:VCARD
```

Properti yang paling umum:

| Properti | Arti |
| --- | --- |
| `N` | Bagian nama: nama keluarga; nama depan; nama tengah; gelar depan; gelar belakang |
| `FN` | Nama tampilan |
| `TEL` | Nomor telepon, dengan jenis seperti `CELL`, `WORK`, `HOME`, `FAX` |
| `EMAIL` | Alamat email |
| `ADR` | Alamat: kotak pos; info tambahan; jalan; kota; wilayah; kode pos; negara |
| `ORG`, `TITLE` | Perusahaan (dan departemen), jabatan |
| `BDAY`, `ANNIVERSARY` | Tanggal |
| `NOTE`, `URL`, `CATEGORIES` | Catatan, situs web, grup |

## Tiga versi

| | vCard 2.1 | vCard 3.0 | vCard 4.0 |
| --- | --- | --- | --- |
| Terbit | 1996, Versit Consortium | 1998, [RFC 2426](https://www.rfc-editor.org/rfc/rfc2426) | 2011, [RFC 6350](https://www.rfc-editor.org/rfc/rfc6350) |
| Teks non-Latin | `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE` | UTF-8 secara default | hanya UTF-8 |
| Parameter jenis | `TEL;CELL;VOICE` | `TEL;TYPE=CELL` | `TEL;TYPE=cell`, nomor sebagai URI `tel:` |
| Wajib | `N` | `N`, `FN` | `FN` |
| Pemakaian umum | HP lama, sebagian ekspor Android | iPhone, Android, Google, Outlook | server CardDAV, aplikasi yang lebih baru |

**vCard 3.0** adalah pilihan aman: versi inilah yang diekspor iOS dan Google Kontak, dan semua aplikasi impor bisa membacanya. **4.0** merapikan formatnya (misalnya tanggal lahir tanpa tahun sebagai `--0517`, nomor sebagai `tel:+6281234567890`), tapi tidak semua aplikasi impor menanganinya dengan konsisten. **2.1** penting untuk HP buatan tahun 2000-an, yang tidak memahami UTF-8 kecuali setiap nilai non-Latin dienkode sebagai Quoted-Printable.

## Detail yang bisa menggagalkan impor

- **Akhir baris** harus CRLF.
- **Baris panjang** dilipat pada 75 byte: baris dipotong dan baris berikutnya diawali spasi. Konverter yang buruk memotong huruf multi-byte di tengah, dan Anda melihat `�` di tengah nama.
- **Koma dan titik koma** di dalam nilai harus di-escape (`\,` `\;`), kalau tidak, alamat seperti “Ruko Blok A, Lantai 2” jadi berantakan.
- **Encoding**: file vCard 3.0 yang ditulis dalam Windows-1251, bukan UTF-8, menampilkan huruf Kiril sebagai simbol di semua HP.

[Konverter di situs ini](/id/) menulis semua ini dengan benar di setiap versi, dan Anda bisa melihat teks persis kartu pertama di tab *Teks vCard* sebelum download.
