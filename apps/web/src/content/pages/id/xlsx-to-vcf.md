---
url: convert-xlsx-ke-vcf
title: 'Convert XLSX ke VCF: Kontak dari Workbook Excel jadi vCard'
h1: 'Convert XLSX ke VCF'
description: 'Ubah sheet kontak .xlsx jadi file VCF (vCard). Pilih sheet, nomor HP dan tanggal tetap utuh, hasilnya satu .vcf untuk iPhone, Android, atau Google. Tanpa upload.'
lead: 'Pilih sheet dari workbook .xlsx Anda dan dapatkan file .vcf dengan satu kartu per baris. Nomor HP dibaca utuh dan sel tanggal jadi tanggal lahir.'
nav: 'XLSX ke VCF'
summary: 'Workbook Excel modern (.xlsx) jadi vCard, dengan pilihan sheet.'
steps:
  - 'Taruh file .xlsx di atas. Sheet pertama yang terlihat dan berisi data akan dibuka; ganti sheet lewat daftar “Sheet”.'
  - 'Lihat pratinjau baris-baris pertama: huruf kolomnya sama seperti di Excel, begitu juga nomor barisnya.'
  - 'Cek pemetaan kolom, lalu atur negara untuk nomor dan versi vCard (3.0 cocok untuk semua HP saat ini).'
  - 'Download file .vcf — atau ZIP berisi satu file per kontak kalau Anda perlu melampirkan kartu satu per satu.'
features:
  - feature: 'Workbook'
    value: '.xlsx, .xlsm, dan .xlsb; setiap sheet bisa dipilih, sheet tersembunyi diberi tanda.'
  - feature: 'Rumus'
    value: 'Yang dipakai adalah nilai hasil hitungan terakhir, misalnya nama yang disusun dengan `=B2&" "&C2`.'
  - feature: 'Sel gabungan dan sel kosong'
    value: 'Sel yang di-merge dibaca sekali, di sel kiri atasnya. Kolom kosong disembunyikan di panel pemetaan.'
  - feature: 'Angka panjang'
    value: 'Sampai 15 digit dibaca dengan tepat — batas presisi Excel sendiri. Deretan digit yang lebih panjang harus disimpan sebagai teks di Excel.'
  - feature: 'Output'
    value: 'vCard 3.0, 4.0, atau 2.1; satu file atau ZIP; CSV Google atau Outlook.'
faq:
  - q: 'Kenapa tidak ekspor sheet ke CSV lalu konversi CSV-nya?'
    a: 'Karena ekspor CSV di Excel menulis apa yang ditampilkan sel. Nomor yang tampil sebagai `6,28123E+12` diekspor dengan digit yang terpotong. File .xlsx masih menyimpan angka lengkapnya, jadi konversi workbook-nya langsung.'
  - q: 'Kontak saya tersebar di beberapa sheet. Bisakah digabung?'
    a: 'Konversi setiap sheet lalu impor file-filenya satu per satu, atau salin dulu semua baris ke satu sheet. Menggabungkan beberapa file didukung: taruh semuanya bersamaan.'
  - q: 'Bagaimana tanggal lahir di Excel dibaca?'
    a: 'Sel berformat tanggal dibaca sebagai tanggal, apa pun format tampilannya. Tanggal berbentuk teks juga dibaca: `17/05/1990`, `05/17/1990`, `1990-05-17`, `17 Mei 1990`, dengan nama bulan dalam 13 bahasa.'
  - q: 'Apakah rumus atau makro dijalankan?'
    a: 'Tidak. Makro tidak pernah dijalankan. Sel berisi rumus dibaca sebagai nilai yang disimpan Excel di dalam file.'
related: [excel-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, import-iphone, excel-phone-e11]
updated: 2026-11-04
---

File **.xlsx** adalah arsip ZIP berisi bagian-bagian XML: satu untuk setiap sheet, ditambah teks bersama dan gaya sel. Konverter membukanya di browser Anda dengan [SheetJS](https://sheetjs.com/) dan membaca sel dari sheet yang Anda pilih. Tidak ada yang dikirim ke mana pun.

**Angka dan teks.** Excel menyimpan nomor telepon sebagai angka atau sebagai teks. Kalau disimpan sebagai angka, `0` di depan dan `+` hilang. Konverter mengembalikannya berdasarkan negara yang Anda pilih dan mengecek setiap hasil dengan rencana penomoran negara itu. Nomor yang tidak lolos ditulis apa adanya dan diberi tanda, jadi tidak ada yang hilang diam-diam. Kalau lebih dari beberapa nomor dalam satu kolom terdampak, catatan di bawah nama file menyebutkan jumlahnya.

**Tanggal.** Excel menyimpan tanggal sebagai jumlah hari sejak 1900 (atau 1904 di workbook Mac lama). Konverter membaca jenis sel dan mengubah sel tanggal yang asli jadi nilai `BDAY`. Tanggal lahir tanpa tahun (`--05-17`) tetap tanpa tahun.

**Pemetaan.** Panel pemetaan menampilkan setiap kolom yang tidak kosong dengan huruf kolom, judul, dan contoh nilainya. Ubah pemetaan lewat daftarnya; daftar kedua mengatur jenisnya, jadi Anda bisa menandai kolom sebagai seluler, kantor, atau rumah. Perubahan langsung diterapkan ke pratinjau kartu.

Untuk kasus umum dan input CSV, lihat [konverter CSV ke VCF](/id/).
