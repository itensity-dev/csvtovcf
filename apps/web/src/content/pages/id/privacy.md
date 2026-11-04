---
url: privasi
title: 'Privasi — csvtovcf'
h1: 'Privasi'
description: 'File kontak Anda diproses di perangkat sendiri dan tidak pernah di-upload. Apa yang disimpan csvtovcf, log apa yang ada, layanan pihak ketiga yang dipakai, dan alasannya.'
lead: 'Versi singkatnya: file Anda tidak pernah keluar dari perangkat Anda. Situs ini tidak punya akun, tidak memasang cookie pelacak, dan tidak melihat nama, nomor, atau judul kolom yang Anda konversi.'
nav: 'Privasi'
summary: 'Apa yang diproses di mana, apa yang dicatat, layanan apa yang dipakai.'
updated: 2026-11-04
---

## File Anda

- File yang Anda taruh, pilih, atau tempel dibaca oleh browser Anda dan diproses di **Web Worker di perangkat Anda**. File tidak di-upload, tidak disimpan di server, dan tidak dibagikan ke siapa pun.
- Anda bisa memeriksanya sendiri: buka developer tools di browser, tab Network, lalu konversi sebuah file. Selama konverter bekerja, yang dimuat hanya kodenya sendiri dari csvtovcf.com (pembaca spreadsheet diambil saat pertama kali Anda membuka file Excel). Tidak ada request yang berisi data Anda.
- Content-Security-Policy situs ini membatasi koneksi jaringan hanya ke csvtovcf.com. Kalau analitik diaktifkan, kebijakan itu juga mengizinkan penghitung anonim yang dijelaskan di bawah. Skrip analitik tidak pernah menerima data dari konverter.
- Saat Anda menutup atau memuat ulang tab, datanya hilang. Tidak ada yang ditulis ke penyimpanan browser Anda.

## Apa yang dilihat server

Server mengirimkan halaman dan menyimpan log akses standar: alamat IP, waktu, halaman yang diminta, jenis browser, dan halaman asal (referrer). Log ini dipakai untuk menjaga layanan tetap berjalan dan mencegah penyalahgunaan. Log disimpan paling lama 14 hari dan tidak digabungkan dengan data lain. Log tidak pernah berisi file Anda, karena file itu memang tidak pernah dikirim.

## Penyimpanan di browser Anda

- `localStorage`: pilihan tema warna Anda (terang, gelap, atau otomatis), kalau Anda mengubahnya.
- `sessionStorage`: apakah Anda sudah menutup pemberitahuan “halaman ini tersedia dalam bahasa Anda”.
- Service worker menyimpan cache file-file situs ini sendiri supaya konverter bisa dipakai offline. Service worker tidak pernah menyimpan file atau hasil konversi Anda.

csvtovcf sendiri tidak memasang cookie apa pun.

## Analitik

Secara default, situs ini berjalan **tanpa analitik**. Kalau analitik diaktifkan, kami memakai Plausible Analytics: tanpa cookie, tanpa data pribadi, dan alamat IP tidak disimpan. Yang dihitung hanya kunjungan halaman dan satu event anonim per konversi. Event itu mencatat versi vCard, format output, jenis sumber yang terdeteksi (misalnya “Google CSV”), dan jumlah kontak dalam bentuk rentang (misalnya “11–100”). Nama, nomor, alamat, nama file, dan judul kolom tidak pernah dikirim.

## Iklan

Iklan saat ini **tidak aktif**. Kalau diaktifkan, iklan hanya tampil di luar konverter. Di Kawasan Ekonomi Eropa, Inggris, dan Swiss, dialog persetujuan bersertifikat dari Google akan meminta pilihan Anda sebelum cookie iklan apa pun dipakai. Skrip iklan tidak bisa membaca data kontak Anda, karena data itu berada di Web Worker, bukan di halaman. Halaman ini akan menyebutkan penyedia iklan sebelum iklan ditayangkan.

## Tautan ke situs lain

Panduan di situs ini menautkan ke halaman bantuan Apple, Google, dan Microsoft, dan bagian bawah halaman menautkan ke alat lain dari pembuat yang sama. Situs-situs itu punya kebijakan privasi masing-masing.

## Hak Anda dan kontak

Karena kami tidak mengumpulkan data pribadi dari konverter, tidak ada data yang bisa dilihat, diekspor, atau dihapus. Untuk pertanyaan tentang log server atau apa pun di halaman ini, tulis ke **hello@csvtovcf.com**. Anda juga berhak mengajukan keluhan ke otoritas perlindungan data di negara Anda.
