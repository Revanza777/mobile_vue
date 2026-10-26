# Panduan AI Agent

## Konteks Proyek
- Aplikasi ini adalah aplikasi Android layanan RT.
- Stack utama: Vue 3, Vite, Vue Router, AdminLTE 4, dan Capacitor.
- UI/UX dirancang terpisah. Gunakan desain yang diberikan sebagai acuan susunan, konten, dan alur setiap layar.
- Implementasikan UI dengan Vue dan AdminLTE 4. Aplikasi mobile ini tidak menggunakan sidebar.

## Teknologi dan Dependensi
- Gunakan Bootstrap dan Bootstrap Icons yang sudah terpasang.
- Palet warna dari desain boleh digunakan, meskipun berbeda dari tema bawaan AdminLTE.
- Jangan menambahkan dependensi atau library UI secara diam-diam.
- Jika tugas tampaknya membutuhkan dependensi baru, jelaskan alasan, manfaat, dan dampaknya. Tunggu kesepakatan sebelum memasang atau mengubah dependensi.
- Terapkan aturan persetujuan yang sama untuk perubahan Capacitor, Android/Gradle, izin aplikasi, SDK, dan konfigurasi build.

## Struktur dan Modularitas
- `src/components/AppLayout.vue` mengatur kerangka bersama, seperti header, navigasi yang dipakai bersama, dan footer jika diperlukan. Jangan tambahkan sidebar.
- `src/views/` berisi halaman aplikasi.
- Pisahkan isi setiap halaman dari kerangka bersama agar perubahan satu bagian tidak mengharuskan penulisan ulang bagian lain.
- Buat komponen terpisah untuk UI yang digunakan berulang, tetapi hindari abstraksi yang tidak diperlukan.
- Jangan menaruh konten khusus halaman di `AppLayout.vue`.

## Aturan Implementasi
- Periksa struktur, komponen, dan pola kode yang sudah ada sebelum mengubah proyek.
- Kerjakan hanya ruang lingkup yang diminta. Ubah file sesedikit mungkin dan pertahankan pekerjaan yang sudah ada.
- Ikuti desain dan kebutuhan yang diberikan. Jangan mengarang fitur, data, teks, alur, atau elemen visual yang tidak diminta.
- Hindari kode duplikat, placeholder yang tidak diminta, kompleksitas yang tidak perlu, dan perubahan di luar tugas.
- Jika desain atau instruksi belum menjelaskan sesuatu yang penting, tanyakan sebelum membuat asumsi yang mengubah perilaku aplikasi.

## Pemeriksaan dan Laporan
- Setelah perubahan kode, jalankan `npm run build`, kecuali pengguna meminta untuk tidak menjalankan pemeriksaan atau perubahan yang dibuat memang tidak berkaitan dengan build.
- Laporkan file yang diubah, ringkasan perubahan, serta hasil pemeriksaan yang benar-benar dijalankan.
- Jangan menyatakan build, pengujian, atau pemeriksaan berhasil jika belum dijalankan atau gagal.
- Sebutkan masalah yang tersisa secara langsung; jangan menyamarkan hasil atau mengklaim pekerjaan selesai jika belum.

## Batas Perubahan
- Jangan mengubah dependensi, lockfile, konfigurasi Capacitor, proyek Android/Gradle, izin aplikasi, SDK, atau konfigurasi build tanpa persetujuan pengguna. Permintaan eksplisit pengguna untuk melakukan perubahan tersebut sudah merupakan persetujuan; jangan meminta persetujuan lagi. Jelaskan rencana dan dampaknya saat relevan, lalu lanjutkan sesuai ruang lingkup permintaan.
- Jika perubahan tersebut diperlukan, berhenti sebelum mengubahnya dan jelaskan perubahan yang diperlukan serta alasannya.