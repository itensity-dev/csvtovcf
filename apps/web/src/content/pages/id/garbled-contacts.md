---
url: nama-kontak-jadi-simbol
title: 'Nama Kontak Jadi Simbol Aneh Setelah Import (Ã©, ???) — Solusinya'
h1: 'Kenapa nama kontak jadi simbol aneh setelah diimpor, dan cara memperbaikinya'
description: 'Nama seperti “MÃ¼ller”, “Ð˜Ð²Ð°Ð½” atau “????” setelah impor kontak disebabkan encoding teks yang salah. Cara mengenali penyebabnya dan mengonversi file dengan benar.'
lead: 'Nama yang rusak — `MÃ¼ller`, `Ð˜Ð²Ð°Ð½`, `Èâàí`, `????` — berarti file dibaca dengan encoding teks yang berbeda dari saat file itu ditulis. Solusinya: baca file sumber dengan encoding yang benar dan tulis vCard dalam UTF-8.'
nav: 'Nama kontak jadi simbol'
summary: 'Kenali salah encoding di balik Ã©, Ð¸, atau ??? lalu perbaiki.'
faq:
  - q: 'Bisakah nama yang sudah rusak di HP diperbaiki?'
    a: 'Biasanya lebih mudah menghapus kontak hasil impor itu lalu mengimpor file yang benar. Memperbaiki langsung hanya bisa kalau kerusakannya bisa dibalik (UTF-8 yang dibaca sebagai Latin-1); tanda tanya berarti hurufnya sudah hilang.'
  - q: 'Kenapa Excel menyimpan CSV saya dengan tanda tanya?'
    a: '“CSV (Dipisahkan koma)” menyimpan dalam code page Windows di sistem Anda. Huruf di luar code page itu — huruf Kiril di PC Barat, huruf Turki ğ di PC berbahasa Jerman, huruf Arab di Windows berbahasa Indonesia — jadi `?`. Simpan sebagai “CSV UTF-8 (Dipisahkan koma)”, atau konversi file .xlsx-nya langsung.'
  - q: 'Encoding apa yang seharusnya dipakai vCard?'
    a: 'UTF-8. vCard 3.0 dan 4.0 mengasumsikannya; untuk vCard 2.1, setiap nilai non-ASCII harus disertai `CHARSET=UTF-8` dan encoding Quoted-Printable. Konverter di situs ini selalu melakukannya.'
related: [home, outlook-csv-to-vcf, what-is-vcf, import-android, import-iphone, excel-to-vcf]
updated: 2026-11-04
---

## Kenali polanya

Setiap jenis kerusakan punya bentuk khas, dan bentuk itu menunjukkan apa yang salah:

| Yang terlihat | Seharusnya | Penyebab |
| --- | --- | --- |
| `MÃ¼ller`, `JosÃ©` | Müller, José | File UTF-8 dibaca sebagai Windows-1252 / Latin-1 |
| `Ð˜Ð²Ð°Ð½ ÐŸÐµÑ‚Ñ€Ð¾Ð²` | Иван Петров | UTF-8 berhuruf Kiril dibaca sebagai Windows-1252 |
| `Èâàí Ïåòðîâ` | Иван Петров | File Windows-1251 dibaca sebagai Windows-1252 |
| `Ayþe Yýlmaz` | Ayşe Yılmaz | Windows-1254 (Turki) dibaca sebagai Windows-1252 |
| `ÇáÇÓã` | الاسم | Windows-1256 (Arab) dibaca sebagai Latin-1 |
| `Иван` → `????` | Иван | huruf hilang saat disimpan dalam code page yang tidak memuatnya |
| `Ã` atau `�` di tengah nama | — | baris panjang dipotong di tengah huruf multi-byte |

Lima kasus pertama bisa diperbaiki dari file aslinya; kasus terakhir juga, dengan mengonversi ulang memakai alat yang benar. Tanda tanya tidak bisa: hurufnya sudah diganti saat file disimpan.

Huruf Latin dasar (A–Z) tetap utuh di semua encoding ini, jadi nama Indonesia yang hanya memakai huruf biasa jarang rusak. Yang biasanya kena adalah nama dengan huruf beraksen (José, Müller), huruf Arab, aksara Mandarin, atau emoji.

## Cara memperbaikinya

1. **Kembali ke file aslinya** — CSV atau workbook Excel, bukan vCard yang rusak.
2. **Buka di [konverter](/id/).** Konverter mendeteksi encoding (UTF-8, UTF-16, Windows-1250…1258, KOI8-R, Shift_JIS, dan lainnya) dan menampilkan baris-baris pertama. Kalau nama masih terlihat salah, pilih encoding lain di daftar *Encoding*. Pratinjau langsung berubah, jadi Anda bisa melihat mana yang benar.
3. **Download vCard 3.0.** File ditulis dalam UTF-8, yang bisa dibaca semua HP zaman sekarang.
4. **Hapus kontak hasil impor yang rusak, lalu impor file baru.** Di Google Kontak, label “Diimpor pada …” memudahkan Anda menghapus seluruh batch sekaligus.

## Kenapa ini terjadi

File teks tidak menyebutkan encoding yang dipakainya. Format “CSV” klasik di Excel, ekspor CSV Outlook, dan banyak CRM menulis dalam **code page Windows** di komputernya: Windows-1252 di Eropa Barat dan Amerika (juga di Windows berbahasa Indonesia), 1251 untuk huruf Kiril, 1254 untuk Turki, 1256 untuk Arab. HP atau layanan web lalu membaca file itu sebagai UTF-8, dan setiap huruf di luar alfabet Inggris berubah jadi `�` atau hilang. Kebalikannya juga terjadi: file UTF-8 yang dibuka software yang mengharapkan Windows-1252 menampilkan dua atau tiga simbol per huruf — `Ã©` untuk `é`.

HP lama menambah masalah ketiga. HP seperti itu mengharapkan vCard 2.1 dan hanya memahami teks non-Latin kalau ditandai `CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE`. Tanpa tanda itu, file UTF-8 yang sebenarnya benar terlihat rusak di HP tersebut. Pilih **vCard 2.1** di konverter untuk HP seperti itu.

## Supaya tidak terulang

- Di Excel, pakai **File → Simpan Sebagai → CSV UTF-8**, atau lewati CSV dan konversi file .xlsx-nya.
- Di Outlook, ekspor lalu langsung konversi; jangan simpan ulang CSV-nya di Excel.
- Di Google Sheets, CSV hasil download selalu UTF-8.
