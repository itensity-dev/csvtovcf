---
url: cara-memasukkan-banyak-kontak-sekaligus
title: 'Cara Memasukkan Banyak Kontak ke HP Sekaligus dari Excel'
h1: 'Cara memasukkan banyak kontak ke HP sekaligus'
description: 'Masukkan ratusan kontak dari daftar Excel atau CSV ke iPhone atau HP Android dalam satu langkah: ubah jadi satu file VCF, lalu impor. Juga untuk WhatsApp dan Telegram.'
lead: 'Tidak perlu mengetik kontak satu per satu. Ubah daftar jadi satu file .vcf lalu impor — HP menambahkan semua kontak dalam satu langkah, dan aplikasi chat mengambilnya dari buku telepon.'
nav: 'Tambah banyak kontak ke HP'
summary: 'Dari spreadsheet jadi ratusan kontak HP dalam sekali impor.'
steps:
  - 'Masukkan kontak ke spreadsheet: satu baris per orang, dengan baris judul berisi “Nama” dan “No HP” (kolom lain boleh ditambahkan).'
  - 'Taruh file di [konverter](/id/) dan pilih negara asal nomor; nomor ditulis dengan kode negara internasional (+62… untuk Indonesia).'
  - 'Download satu file .vcf berisi semua kontak.'
  - 'Impor: di [Android](/id/cara-import-kontak-vcf-di-android/) lewat Kontak → Atur → Impor dari file; di [iPhone](/id/cara-import-vcf-ke-iphone/) dengan membuka file lalu mengetuk “Tambahkan Semua Kontak”.'
faq:
  - q: 'Berapa banyak kontak yang bisa diimpor HP sekaligus?'
    a: 'Ribuan. Satu .vcf berisi beberapa ribu kartu bisa diimpor di iPhone dan Android. Google Kontak versi web meminta file berisi maksimal 3.000 kontak dan menampung 25.000 kontak per akun.'
  - q: 'Apakah kontak akan muncul di WhatsApp atau Telegram?'
    a: 'Ya, asalkan nomornya dalam format internasional dan aplikasi sudah memuat ulang kontaknya. Nomor tanpa kode negara sering tidak dicocokkan dengan akun.'
  - q: 'Apakah perlu aplikasi atau program berbayar?'
    a: 'Tidak. App Kontak bawaan HP bisa mengimpor file .vcf, dan konverter di situs ini gratis serta berjalan di browser.'
  - q: 'Bisakah kontak yang diimpor dihapus nanti?'
    a: 'Di Google Kontak, hapus label “Diimpor pada …” beserta kontaknya. Di iPhone, hapus lewat iCloud.com, tempat Anda bisa memilih banyak kontak sekaligus. Uji dulu dengan file pendek.'
related: [import-android, import-iphone, home, excel-to-vcf, google-sheets-to-vcf, excel-phone-e11]
updated: 2026-11-04
---

## Cara tercepat

HP tidak bisa mengimpor spreadsheet, tapi bisa mengimpor file **vCard (.vcf)**, dan satu file bisa berisi berapa pun kontak. Jadi alurnya: spreadsheet → satu .vcf → impor.

**Siapkan spreadsheet.** Satu baris per orang. Minimal ada kolom nama dan kolom nomor; kolom email, perusahaan, dan tanggal lahir juga dikenali. Nama bisa dalam satu kolom (“Nama lengkap”) atau dua kolom (“Nama depan”, “Nama belakang”).

**Konversi.** [Konverter](/id/) mengenali kolom, menulis nomor dalam format internasional, dan memperingatkan nomor yang tampak tidak valid — sebelum nomor itu masuk ke HP Anda. Orang yang tercatat dua kali bisa digabung.

**Impor.** Satu file, satu ketukan di HP. Detailnya untuk [Android](/id/cara-import-kontak-vcf-di-android/) dan [iPhone](/id/cara-import-vcf-ke-iphone/).

## Untuk WhatsApp, Telegram, dan Signal

Aplikasi chat membaca buku telepon dan mencari setiap nomor dalam bentuk internasional. Dua hal menentukan apakah kontak muncul:

- **Kode negara.** `+62 812 3456 7890` dicocokkan; `0812 3456 7890` hanya dicocokkan kalau negara HP itu sendiri Indonesia. Konverter menambahkan kode dari negara yang Anda pilih.
- **Muat ulang.** Setelah impor, buka layar chat baru di aplikasinya. Di WhatsApp Android: ⋮ → Muat ulang (Refresh).

Menambahkan kontak secara massal hanya untuk mengirim pesan ke orang asing adalah spam dan bisa membuat akun diblokir. Pakai cara ini untuk orang yang memang menunggu kabar dari Anda: tim, anggota, pelanggan yang memberikan nomornya.

## Daftar besar

- **Pecah untuk Google Kontak.** Impor versi web menerima sekitar 3.000 kontak per file. Filter sheet jadi beberapa bagian dan konversi tiap bagian.
- **Pilih akun.** Kontak yang disimpan di akun Google atau iCloud dicadangkan dan muncul di semua perangkat Anda. Penyimpanan “hanya di HP” tetap di perangkat ini saja.
- **Cek sebelum impor.** Laporan konverter mencantumkan baris yang dilewati, nomor tidak valid, dan duplikat, lengkap dengan nomor baris yang bisa Anda temukan di Excel.
