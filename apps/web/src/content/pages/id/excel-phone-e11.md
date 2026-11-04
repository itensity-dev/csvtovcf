---
url: nomor-hp-di-excel-jadi-e11
title: 'Nomor HP di Excel Jadi E+11 atau E+12? Penyebab dan Solusinya'
h1: 'Kenapa Excel mengubah nomor HP jadi E+11 atau E+12'
description: 'Excel menampilkan angka 12 digit atau lebih dalam notasi ilmiah dan menyimpan CSV dalam bentuk itu, sehingga digit hilang. Cara mendapatkan nomor lengkap dan mencegahnya.'
lead: 'Excel menampilkan angka dengan 12 digit atau lebih dalam notasi ilmiah — `6281234567890` jadi `6,28123E+12`. Itu hanya format tampilan, sampai Anda menyimpan CSV: saat itu Excel menulis teks yang sudah dipendekkan, dan digit yang hilang tidak ada lagi di file.'
nav: 'Nomor HP jadi E+11'
summary: 'Notasi ilmiah, digit hilang, angka 0 hilang — penyebab dan solusinya.'
faq:
  - q: 'Bisakah nomor asli dipulihkan dari CSV yang berisi E+12?'
    a: 'Tidak. CSV hanya berisi digit yang tampil, misalnya `6,28123E+12`; sisanya tidak ada di file. Kembali ke workbook Excel (yang masih menyimpan nomor lengkap) atau ke sumber aslinya.'
  - q: 'Kenapa angka 0 di depan hilang?'
    a: 'Excel menganggap `081234567890` yang diketik di sel berformat Umum sebagai angka 81234567890, dan angka tidak punya nol di depan. Hal yang sama terjadi pada `+` di nomor internasional. Format kolom sebagai Teks sebelum mengetik atau menempel.'
  - q: 'Apakah konverter memperbaiki nomor-nomor ini?'
    a: 'Sebisa mungkin. Nomor yang kehilangan 0 atau `+` di depannya dilengkapi berdasarkan negara yang Anda pilih dan dicek dengan rencana penomorannya. Notasi ilmiah yang semua digitnya masih utuh (`6,28123456789E+12`) dipulihkan. `6,28123E+12` yang digitnya sudah hilang ditandai di laporan, tidak pernah ditebak.'
  - q: 'Adakah pengaturan Excel untuk mencegahnya?'
    a: 'Di Microsoft 365 untuk Windows: File → Opsi → Data → Konversi data otomatis (Automatic data conversion), hapus centang opsi untuk menyimpan 15 digit pertama angka panjang dan menampilkannya dalam notasi ilmiah (“Keep first 15 digits of long numbers…”) serta opsi menghapus nol di depan (“Remove leading zeros”). Pengaturan ini berlaku untuk data baru yang Anda ketik atau buka.'
related: [excel-to-vcf, xlsx-to-vcf, home, garbled-contacts, bulk-add-contacts, google-sheets-to-vcf]
updated: 2026-11-04
---

## Apa yang terjadi, langkah demi langkah

1. **Mengetik atau menempel.** Nomor telepon di sel dengan format bawaan *Umum* (General) disimpan sebagai angka. Angka `0` dan `+` di depan langsung hilang: `+6281234567890` → 6281234567890.
2. **Menampilkan.** Dalam format Umum, Excel menampilkan angka 12 digit atau lebih dalam notasi ilmiah kalau kolomnya sempit: `6,28123E+12` (atau `6.28123E+12`, tergantung pemisah desimal di pengaturan regional). Di dalam sel, angka lengkapnya masih tersimpan (Excel menyimpan sampai 15 digit signifikan).
3. **Menyimpan sebagai CSV.** CSV adalah teks biasa, dan Excel menulis setiap sel sesuai *tampilannya*. Sekarang file berisi `6,28123E+12`, dan digit terakhir `4567890` hilang. Microsoft sudah mendokumentasikan perilaku ini sejak Excel 97.

Langkah 3 inilah yang merusak data. Sebelum itu, nomor masih bisa diselamatkan.

## Cara menyelamatkan nomor

- **Pakai workbook-nya, bukan CSV.** Taruh file .xlsx atau .xls di [konverter Excel ke VCF](/id/convert-excel-ke-vcf/): konverter membaca angka yang tersimpan, bukan tampilannya.
- **Atau lebarkan kolom dan ubah formatnya.** Pilih kolom → Format Sel → **Angka** dengan 0 desimal (atau format kustom `0`). Digit lengkap muncul; simpan lagi sebagai CSV.
- **Kalau Anda hanya punya CSV-nya,** digit yang hilang tidak bisa dipulihkan. Cari daftar aslinya.

## Cara mencegahnya

- **Format kolom nomor sebagai Teks sebelum memasukkan nomor** (Beranda → Format Angka → Teks). Dengan begitu `+62 812-3456-7890` tetap persis seperti diketik, lengkap dengan tanda plus dan tanda hubungnya.
- **Impor CSV sebagai teks**, jangan klik dua kali filenya: Data → Dari Teks/CSV → *Transformasi Data* (Transform Data) → atur kolom nomor jadi *Teks*.
- **Microsoft 365:** File → Opsi → Data → *Konversi data otomatis*: matikan penghapusan nol di depan dan penyimpanan 15 digit dalam notasi ilmiah.
- **Simpan nomor dalam format internasional** (`+62…`) di sumbernya. Nomor seperti ini paling aman kalau disimpan sebagai teks.

## Apa yang dilakukan konverter pada nomor yang rusak

| Di file | Hasil | Ditampilkan sebagai |
| --- | --- | --- |
| `81234567890` + negara Indonesia | `+6281234567890` | valid |
| `6281234567890` (tanpa `+`) | `+6281234567890` | “Tanda + yang hilang ditambahkan” |
| `6,28123456789E+12` | `+6281234567890` | “Dipulihkan dari notasi Excel” |
| `6,28123E+12` | ditulis apa adanya | “Rusak oleh Excel”, merah |

Nomor yang rusak tidak pernah “dilengkapi” dengan digit karangan. Nomor itu ditandai di kartu dan dicantumkan di tab *Peringatan* lengkap dengan nomor barisnya, jadi Anda bisa memperbaikinya di sumbernya.
