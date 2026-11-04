---
url: convert-excel-ke-vcf
title: 'Cara Convert Excel ke VCF Gratis (Kontak HP & WhatsApp)'
h1: 'Convert Excel ke VCF'
description: 'Ubah daftar kontak Excel (.xlsx atau .xls) jadi file VCF untuk iPhone, Android, dan Google. Workbook dibaca langsung, jadi nomor HP panjang tidak hilang. Tanpa upload.'
lead: 'Membuka workbook Excel Anda secara langsung — tanpa langkah “Simpan sebagai CSV” — dan mengubah setiap baris jadi kartu kontak dalam satu file .vcf. Nomor yang tersimpan sebagai angka mendapatkan kembali kode negaranya; file tidak pernah keluar dari perangkat ini.'
nav: 'Excel ke VCF'
summary: 'Workbook XLSX atau XLS langsung jadi vCard, lengkap dengan pilihan sheet.'
steps:
  - 'Taruh file Excel (.xlsx, .xls, atau .ods) di atas. Kalau workbook punya beberapa sheet, pilih sheet yang berisi kontak; sheet tersembunyi diberi tanda.'
  - 'Pastikan baris judul ditemukan dan kolom sudah dipetakan ke field yang benar — “Nama”, “No HP”, “Email”, “Perusahaan” dikenali, begitu juga judul kolom dalam bahasa Inggris dan banyak bahasa lain.'
  - 'Atur negara asal nomor-nomor Anda. Excel membuang angka 0 di depan dan tanda “+” dari nomor yang disimpan sebagai angka; negara inilah yang dipakai untuk mengembalikannya.'
  - 'Download file .vcf lalu impor di HP: [iPhone](/id/cara-import-vcf-ke-iphone/), [Android](/id/cara-import-kontak-vcf-di-android/).'
features:
  - feature: 'File Excel'
    value: '.xlsx dan .xlsm (Excel 2007 ke atas), .xls (Excel 97–2003 dan yang lebih lama, termasuk code page Excel 95), .ods. Sheet mana pun; sheet tersembunyi ikut terdaftar.'
  - feature: 'Nilai sel'
    value: 'Angka dibaca utuh (`6281234567890`, tidak pernah `6,28123E+12`). Sel tanggal jadi tanggal lahir. Rumus dibaca sebagai nilai hasil hitungan terakhirnya.'
  - feature: 'Baris judul'
    value: 'Ditemukan otomatis, juga kalau ada baris judul laporan di atasnya. Hapus centang “Baris pertama adalah judul kolom” kalau sheet Anda langsung dimulai dengan data.'
  - feature: 'Perapian nomor'
    value: 'Nomor tanpa “+” atau tanpa 0 di depan dilengkapi berdasarkan negara yang dipilih dan ditulis sebagai nomor internasional seperti `+62 812-3456-7890`. Nomor yang tidak valid ditandai, tidak dibuang.'
  - feature: 'Output'
    value: 'Satu .vcf (vCard 3.0, 4.0, atau 2.1), ZIP berisi satu kartu per kontak, atau CSV Google / Outlook.'
  - feature: 'Tidak didukung'
    value: 'Workbook yang dilindungi kata sandi (hapus dulu kata sandinya di Excel), file Apple Numbers, foto kontak yang disisipkan di sel.'
faq:
  - q: 'Apakah file Excel harus disimpan sebagai CSV dulu?'
    a: 'Tidak — dan sebaiknya jangan. Saat Excel menyimpan CSV, angka ditulis sesuai tampilannya, jadi nomor yang tampil sebagai `6,28123E+12` tersimpan dengan digit terakhir yang hilang. Membaca file .xlsx secara langsung menjaga setiap digit.'
  - q: 'Nomor saya tidak punya 0 atau + di depan. Apakah tetap bisa?'
    a: 'Bisa. Pilih negara di bagian “Format nomor”; nomor seperti `81234567890` dengan negara Indonesia menjadi `+6281234567890`. Nomor yang diawali kode negara tanpa “+” (`6281234567890`) juga dikenali.'
  - q: 'Baris-baris pertama sheet saya berisi judul dan satu baris kosong. Apakah itu masalah?'
    a: 'Tidak. Baris di atas judul kolom yang sebenarnya dilewati, dan nomor baris di laporan sama dengan nomor yang ditampilkan Excel di sebelah kiri.'
  - q: 'Bisakah beberapa sheet atau workbook dikonversi sekaligus?'
    a: 'Taruh beberapa file bersamaan, hasilnya digabung jadi satu. Dalam satu workbook, konversi satu sheet, lalu ganti sheet dan download lagi.'
  - q: 'Apakah bisa dengan Excel di Mac atau LibreOffice?'
    a: 'Bisa. Konverter membaca filenya, bukan programnya: .xlsx dari Excel for Mac, Excel online, atau hasil download Google Sheets, dan .ods dari LibreOffice, semuanya bisa.'
related: [xlsx-to-vcf, xls-to-vcf, google-sheets-to-vcf, home, excel-phone-e11, import-android]
updated: 2026-11-04
---

File Excel bukan format kontak, jadi HP tidak bisa mengimpornya. File **VCF** (vCard) bisa diimpor di mana saja, dengan satu kartu per orang. Konverter membaca sel-sel di sheet, mencocokkan kolom dengan field vCard, dan menulis satu kartu untuk setiap baris.

**Kenapa membaca workbook lebih baik daripada CSV.** Di dalam file .xlsx, nomor telepon disimpan sebagai angka lengkap (sampai 15 digit), meskipun selnya menampilkan `6,28123E+12`. Baru ketika Excel *menyimpan CSV*, yang ditulis adalah teks tampilannya, dan digit yang tersembunyi hilang. Karena itu halaman ini membuka .xlsx dan .xls secara langsung. Baca selengkapnya di [kenapa Excel menampilkan nomor HP sebagai E+11 atau E+12](/id/nomor-hp-di-excel-jadi-e11/).

**Apa yang Excel lakukan pada nomor HP.** Nomor yang diketik di sel berformat Umum (General) kehilangan angka 0 di depannya (`081234567890` → `81234567890`) dan tanda plusnya (`+6281234567890` → `6281234567890`). Konverter tidak menebak secara asal. Setiap nomor diurai dengan aturan penomoran negara yang Anda pilih, lalu dicek apakah hasilnya benar-benar nomor yang ada di negara itu. Kalau nomor diawali kode telepon negara tersebut, nomor itu dianggap nomor internasional. Laporan menghitung berapa nomor yang dilengkapi dengan cara ini, dan kartu menampilkan hasilnya sebelum Anda download.

**Nomor untuk WhatsApp.** Dengan negara Indonesia dipilih, semua nomor ditulis dengan awalan +62. Dalam bentuk inilah WhatsApp mencocokkan kontak dengan akun, jadi kontak yang punya WhatsApp akan muncul setelah aplikasi memuat ulang daftar kontaknya.

**Tanggal.** Sel tanggal lahir yang berformat tanggal dibaca sebagai tanggal, apa pun format tampilannya di sheet. Tanggal berbentuk teks seperti `17/05/1990` atau `05/17/1990` juga dibaca; konverter melihat seluruh kolom untuk memutuskan apakah urutannya hari dulu atau bulan dulu.

**Kolom yang bukan field kontak** — “Catatan”, “ID Pelanggan”, “Order terakhir” — bisa dipetakan ke catatan atau dilewati. Kolom yang Anda atur ke *lewati* tidak ikut diekspor.
