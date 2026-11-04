---
url: csv-google-kontak-ke-vcf
title: 'CSV Google Kontak ke VCF: Convert Google CSV jadi vCard'
h1: 'Convert CSV Google Kontak ke VCF'
description: 'Ubah CSV hasil ekspor Google Kontak (format baru atau lama) jadi file VCF untuk iPhone atau Outlook. Label, beberapa nomor dalam satu sel, dan tanggal lahir tetap ada.'
lead: 'Mengubah ekspor kontak “Google CSV” jadi file vCard. Label nomor dan email, beberapa nilai dalam satu sel (` ::: `), grup, dan tanggal lahir tanpa tahun ikut terbawa.'
nav: 'CSV Google Kontak ke VCF'
summary: 'Ekspor CSV Google Kontak (format baru dan lama) jadi vCard.'
steps:
  - 'Taruh file CSV hasil ekspor Google Kontak (Ekspor → Google CSV). Format sekarang (`First Name`, `Phone 1 - Label`) maupun format lama (`Given Name`, `Group Membership`) dikenali.'
  - 'Kolom dipetakan otomatis dan bertanda **pasti**; biasanya tidak ada yang perlu diubah.'
  - 'Pilih negara untuk nomor yang disimpan tanpa kode negara, dan tentukan apakah duplikat perlu digabung.'
  - 'Download file .vcf lalu impor di [iPhone](/id/cara-import-vcf-ke-iphone/) atau di [Outlook](/id/cara-import-kontak-ke-outlook/).'
features:
  - feature: 'Format'
    value: 'Google CSV sekarang (`First Name`, `Labels`, `E-mail 1 - Label`…) dan yang lama (`Name`, `Given Name`, `Group Membership`, `E-mail 1 - Type`…).'
  - feature: 'Beberapa nilai'
    value: 'Beberapa nomor atau email dalam satu sel, dipisahkan dengan ` ::: `, menjadi baris `TEL` / `EMAIL` terpisah lengkap dengan labelnya.'
  - feature: 'Label'
    value: 'Mobile, Work, Home, Main, Work Fax, Home Fax, Pager menjadi jenis vCard; label kustom (misalnya “WhatsApp”) disimpan sebagai `X-ABLabel`.'
  - feature: 'Grup'
    value: '`Labels` / `Group Membership` menjadi `CATEGORIES`; label sistem `* myContacts` dan `* starred` dibuang.'
  - feature: 'Tanggal'
    value: 'Tanggal lahir dengan dan tanpa tahun (`--05-17`); hari jadi dari `Event 1` tetap disimpan.'
  - feature: 'Tidak ikut terbawa'
    value: 'Foto (CSV hanya menyimpan tautannya); “File As” dan field kustom ditulis ke catatan.'
faq:
  - q: 'Google Kontak bisa ekspor vCard sendiri. Kenapa harus convert CSV?'
    a: 'Kalau Anda masih punya akun Google-nya, Ekspor → vCard adalah cara paling mudah. Pakai halaman ini kalau Anda hanya punya file CSV-nya — dikirim orang lain, diekspor bertahun-tahun lalu, atau sudah diedit di Excel — atau kalau Anda ingin merapikan nomor dan menggabungkan duplikat lebih dulu.'
  - q: 'Apa arti ` ::: ` di CSV saya?'
    a: 'Google memasukkan beberapa nilai sejenis ke satu sel dan memisahkannya dengan ` ::: `. Contohnya, dua nomor HP: `+62 812-3456-7890 ::: +62 857-1234-5678`. Keduanya jadi dua baris nomor terpisah di kartu.'
  - q: 'Apakah grup (label) tetap ada?'
    a: 'Ya, sebagai `CATEGORIES`. iPhone tidak menampilkan kategori, tapi Google Kontak, Outlook, dan sebagian besar aplikasi Android menampilkannya.'
  - q: 'Kenapa sebagian nomor ditandai tidak valid?'
    a: 'Google mengekspor nomor persis seperti saat diketik. Nomor lokal tanpa kode negara dicek dengan negara yang Anda pilih; kalau tidak cocok dengan rencana penomoran negara itu, nomor ditulis apa adanya dan diberi tanda.'
related: [outlook-csv-to-vcf, home, import-iphone, import-outlook, google-sheets-to-vcf, what-is-vcf]
updated: 2026-11-04
---

**Google CSV** adalah format tabel yang dipakai Google Kontak untuk ekspor dan impor. Formatnya berbeda dari daftar biasa. Setiap nomor, email, alamat, dan situs web punya sepasang kolom — `Phone 1 - Label` dan `Phone 1 - Value` — dan satu sel bisa berisi beberapa nilai yang dipisahkan ` ::: `. Konverter biasa sering melewatkan hal ini: `+62 812-3456-7890 ::: +62 857-1234-5678` dimasukkan ke satu field, atau labelnya hilang.

**Bagaimana label jadi jenis vCard.** Label menentukan jenis setiap baris:

| Label Google | vCard 3.0 |
| --- | --- |
| Mobile | `TEL;TYPE=CELL` |
| Work / Home | `TEL;TYPE=WORK,VOICE` / `TEL;TYPE=HOME,VOICE` |
| Work Fax / Home Fax | `TEL;TYPE=WORK,FAX` / `TEL;TYPE=HOME,FAX` |
| Main | `TEL;TYPE=MAIN` |
| kustom, misalnya “WhatsApp” | `item1.TEL` + `item1.X-ABLabel:WhatsApp` |

Tanda bintang di depan label (`* Work`) menandai nilai utama di ekspor lama; tanda itu dihapus.

**Dua format.** Google pernah mengubah nama kolom di ekspor CSV-nya. File sekarang diawali `First Name, Middle Name, Last Name`; file lama diawali `Name, Given Name, Additional Name, Family Name`, dan memakai `Type`, bukan `Label`. Keduanya dikenali otomatis — panel file menunjukkan format mana yang ditemukan.

**Tanggal lahir tanpa tahun.** Google menyimpannya sebagai `--05-17`. Tanggal itu ditulis ke vCard dalam bentuk yang sama, jadi tahunnya tetap kosong, tidak berubah jadi 1604 atau 1900.
