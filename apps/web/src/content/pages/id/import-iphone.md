---
url: cara-import-vcf-ke-iphone
title: 'Cara Import VCF ke iPhone (Semua Kontak Sekaligus)'
h1: 'Cara import file VCF ke iPhone'
description: 'Impor semua kontak dari file .vcf ke iPhone sekaligus: lewat AirDrop, Mail, app File, atau iCloud.com di komputer. Langkah untuk iOS 26 dan solusi masalah umum.'
lead: 'Dua cara untuk mengimpor seluruh isi file .vcf berisi banyak kontak: buka file di iPhone lalu ketuk “Tambahkan Semua Kontak”, atau impor di iCloud.com dan biarkan tersinkron.'
nav: 'Import ke iPhone'
summary: 'Semua kontak dari satu .vcf masuk ke iPhone: langsung di HP atau lewat iCloud.com.'
steps:
  - 'Buat file .vcf dengan [konverter](/id/) — vCard 3.0, format nomor E.164 (`+6281234567890`).'
  - 'Kirim ke iPhone: AirDrop dari Mac, email ke diri sendiri, atau simpan di iCloud Drive lalu buka di app File.'
  - 'Ketuk filenya. iOS menampilkan kontak yang ada di dalamnya; ketuk **Tambahkan Semua Kontak** (Add All Contacts) — iOS biasanya juga menyebut jumlahnya, misalnya 248 kontak. Kalau app File hanya menampilkan pratinjau, ketuk Bagikan → **Kontak**.'
  - 'Pastikan kontak masuk ke akun yang benar: Pengaturan → App → Kontak → **Akun Default** menentukan apakah kontak masuk ke iCloud, Gmail, atau “Di iPhone Saya”.'
faq:
  - q: 'iPhone hanya menampilkan kontak pertama. Ke mana yang lain?'
    a: 'Kalau file dibuka lewat pratinjau (Quick Look), hanya satu kartu yang tampil. Pakai Bagikan → Kontak, atau buka file dari Mail, Pesan, atau File, yang menampilkan daftar lengkap dengan “Tambahkan Semua Kontak”. Atau impor di iCloud.com: setiap kartu jadi kontak terpisah.'
  - q: 'Apakah perlu iCloud untuk mengimpor kontak?'
    a: 'Tidak. Membuka .vcf di HP bisa tanpa iCloud; kontak disimpan ke akun default. iCloud.com berguna kalau filenya ada di komputer.'
  - q: 'Sebagian kontak tidak masuk. Kenapa?'
    a: 'Saat mengimpor lewat Pesan, iOS hanya menambahkan kartu yang belum ada di kontak Anda. Cek duplikat dan daftar baris yang dilewati di laporan konverter.'
  - q: 'Nama tampil dengan karakter aneh setelah diimpor.'
    a: 'Kemungkinan vCard-nya versi 2.1 atau bukan UTF-8. Konversi ulang dengan vCard 3.0 — konverter ini selalu menulis UTF-8. [Kenapa nama bisa rusak](/id/nama-kontak-jadi-simbol/).'
  - q: 'Tanggal lahir tanpa tahun tampil sebagai 1604.'
    a: 'iOS memakai 1604 secara internal sebagai tanda “tanpa tahun”. Kontak yang dikonversi di sini menyimpan tanggal lahir tanpa tahun sebagai `--05-17`; kalau versi iOS Anda tetap menampilkan tahun, edit kartunya sekali dan hapus tahunnya.'
related: [import-android, import-google-contacts, home, bulk-add-contacts, excel-to-vcf, what-is-vcf]
updated: 2026-11-04
---

## Cara 1: langsung di iPhone

Ini cara tercepat kalau file sudah ada di HP atau di kotak masuk email Anda.

1. **Pindahkan file ke iPhone.** Kirim lewat AirDrop dari Mac, email ke diri sendiri, kirim lewat Pesan, atau taruh di iCloud Drive.
2. **Buka filenya.** Di Mail atau Pesan, ketuk lampirannya. Di app File, ketuk filenya; kalau yang muncul hanya pratinjau satu kartu, ketuk tombol Bagikan lalu pilih **Kontak**.
3. **Tambahkan semuanya.** Daftar menampilkan setiap kartu di file. Ketuk **Tambahkan Semua Kontak**; teks persisnya tergantung versi iOS dan bisa menyertakan jumlah kontak.
4. **Selesai.** Kontak muncul di app Kontak dan app Telepon. WhatsApp, Telegram, dan aplikasi lain melihatnya setelah sinkronisasi kontak berikutnya.

## Cara 2: iCloud.com di komputer

Cara ini didokumentasikan Apple. Cara ini juga bisa menangani file berisi banyak kontak, dan praktis kalau file .vcf ada di komputer.

1. Login di [icloud.com](https://www.icloud.com/) lalu buka **Kontak**.
2. Klik tombol **+** dan pilih **Impor Kontak** (Import Contact). Di sebagian versi halaman, yang ada justru ikon roda gigi dengan **Impor vCard**.
3. Pilih file .vcf. Setiap orang di file menjadi kontak terpisah di *Semua Kontak*.
4. Di iPhone, Kontak iCloud harus aktif: Pengaturan → [nama Anda] → iCloud → Kontak. Kontak baru masuk dalam waktu sekitar satu menit.

## Sebelum mengimpor

- **Pakai vCard 3.0.** Versi inilah yang diekspor iPhone sendiri. vCard 2.1 hanya untuk HP lama.
- **Tulis nomor dalam format internasional.** `+6281234567890` tetap berfungsi saat Anda ke luar negeri dan di aplikasi chat; nomor tanpa kode negara bisa tidak dicocokkan dengan akun WhatsApp.
- **Hapus duplikat dulu.** Tab *Duplikat* di konverter menampilkan orang yang tercatat dua kali di spreadsheet Anda; centang “Gabungkan” untuk menyatukannya.
- **Buat cadangan.** Impor mudah diulang tapi repot dibatalkan: ekspor kontak Anda yang sekarang dari iCloud.com sebelum mengimpor ratusan kontak baru.

## Membatalkan impor

iOS tidak punya fitur “batalkan impor”. Di iCloud.com, Anda bisa memilih beberapa kontak dengan Shift-klik atau Cmd-klik lalu menghapusnya sekaligus, jadi uji dulu file dengan beberapa baris sebelum mengimpor ribuan kontak.
