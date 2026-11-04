---
url: cara-import-kontak-ke-outlook
title: 'Cara Import Kontak ke Outlook (File VCF dan CSV)'
h1: 'Cara import kontak ke Outlook'
description: 'Impor banyak kontak ke Outlook: CSV untuk Outlook baru, Outlook.com, dan Outlook klasik (.vcf berisi banyak kontak masuk satu per satu), plus Outlook for Mac.'
lead: 'Untuk Outlook, CSV adalah jalur impor massal. Outlook baru dan Outlook.com hanya mengimpor CSV, dan Outlook klasik meminta konfirmasi untuk setiap kartu dari .vcf berisi banyak kontak. Konverter menulis kedua format.'
nav: 'Import ke Outlook'
summary: 'CSV untuk Outlook baru dan Outlook.com, CSV atau vCard untuk Outlook klasik dan Mac.'
steps:
  - 'Di [konverter](/id/), pilih **CSV Outlook** di *Download sebagai* lalu download filenya.'
  - '**Outlook baru / Outlook.com:** Orang (People) → **Kelola kontak** (Manage contacts) → **Impor kontak** (Import contacts) → Telusuri → pilih file CSV → **Impor**.'
  - '**Outlook klasik untuk Windows:** File → **Buka & Ekspor** → **Impor/Ekspor** → *Impor dari program atau file lain* → *Nilai yang Dipisahkan Koma* → pilih file dan cara menangani duplikat → pilih folder **Kontak** → **Selesai**.'
  - 'Cek beberapa kontak. Kalau ada field yang kosong, jalankan impor lagi dan pakai **Petakan Bidang Kustom** (Map Custom Fields) di langkah terakhir wizard.'
faq:
  - q: 'Kenapa tidak mengimpor .vcf ke Outlook?'
    a: 'Outlook baru dan Outlook.com tidak bisa mengimpor file vCard. Outlook klasik membuka .vcf berisi banyak kontak satu per satu — Anda harus mengonfirmasi setiap kartu, dan pengguna sering melaporkan hanya kontak pertama yang masuk. Microsoft sendiri menyarankan lewat CSV untuk banyak kontak.'
  - q: 'Outlook saya tidak berbahasa Inggris. Apakah judul kolom CSV bahasa Inggris tetap bisa?'
    a: 'Microsoft mencatat bahwa bahasa judul kolom CSV sebaiknya sama dengan bahasa Outlook. Kalau ada field yang tetap kosong setelah impor, pakai **Petakan Bidang Kustom** di wizard impor dan seret setiap kolom ke field Outlook-nya — misalnya Mobile Phone → Mobiltelefon di Outlook berbahasa Jerman, dan seterusnya.'
  - q: 'Nama tampil sebagai `Ã¶` atau `???` setelah diimpor.'
    a: 'Outlook klasik kadang salah membaca file CSV UTF-8. Coba jalur .vcf untuk beberapa kontak sebagai pengecekan, atau buka CSV di Excel, simpan sebagai “CSV (Dipisahkan koma)” (CSV (Comma delimited)) dalam bahasa Windows Anda, lalu impor file itu.'
  - q: 'Bagaimana cara impor ke Outlook for Mac?'
    a: 'Seret file .vcf ke Orang (People), atau File → Impor. Microsoft mendokumentasikan bahwa hanya kontak pertama yang tampil di jendela, tetapi setiap kontak di vCard tetap disimpan.'
related: [outlook-csv-to-vcf, import-google-contacts, import-iphone, home, garbled-contacts, what-is-vcf]
updated: 2026-11-04
---

## File mana untuk Outlook yang mana

| Outlook | File terbaik | Jalur |
| --- | --- | --- |
| Outlook baru untuk Windows, Outlook.com, Outlook di web | CSV Outlook | Orang → Kelola kontak → Impor kontak |
| Outlook klasik untuk Windows (2016–2024, Microsoft 365) | CSV Outlook | File → Buka & Ekspor → Impor/Ekspor |
| Outlook for Mac | .vcf (vCard 3.0) | Seret ke Orang, atau File → Impor |
| Satu kontak ke Outlook mana pun | .vcf | Buka file → Simpan & Tutup |

## Outlook klasik: wizard impor

1. **File** → **Buka & Ekspor** (Open & Export) → **Impor/Ekspor** (Import/Export).
2. Pilih **Impor dari program atau file lain** (Import from another program or file) → **Berikutnya**.
3. Pilih **Nilai yang Dipisahkan Koma** (Comma Separated Values) → **Berikutnya**.
4. Cari file CSV-nya. Pilih cara menangani duplikat: *Ganti duplikat*, *Izinkan duplikat*, atau *Jangan impor duplikat*. → **Berikutnya**.
5. Pilih folder **Kontak** dari akun yang benar → **Berikutnya**.
6. Centang tindakan untuk file tersebut. Kalau bahasa Outlook bukan bahasa Inggris, klik **Petakan Bidang Kustom**, pastikan setiap kolom masuk ke field yang benar, lalu **OK** → **Selesai**.

## Isi CSV Outlook dari konverter ini

Kolom memakai nama bawaan Outlook: `First Name`, `Last Name`, `Mobile Phone`, `Business Phone`, `E-mail Address`, `Company`, `Job Title`, `Business Street`, `Birthday`, dan seterusnya. Nomor telepon masuk ke slot yang sesuai dengan jenisnya. Nomor tambahan masuk ke *Other Phone*, *Car Phone*, dan *Callback*. Apa pun yang tidak muat (email keempat, alamat keempat) ditambahkan ke *Notes*, tidak dibuang. Tanggal lahir ditulis sebagai `M/D/YYYY` — bulan dulu, bukan `dd/mm/yyyy` seperti yang biasa dipakai di Indonesia — karena itulah format yang dipakai Outlook sendiri saat mengekspor.

## Kalau hanya perlu beberapa kontak

Buka setiap .vcf (pilih “ZIP, satu .vcf per kontak” di konverter). Outlook menampilkan jendela kontak; klik **Simpan & Tutup** (Save & Close). Cara ini cukup untuk sepuluh kontak, tapi melelahkan untuk seribu.
