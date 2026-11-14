<script setup>
import { RouterLink } from 'vue-router'
import { demoState, formatRupiah } from '../data/demoData'

const pendingLetters = demoState.rtApplications.filter((application) => application.status === 'Menunggu Verifikasi').length
const pendingChanges = demoState.dataChanges.filter((change) => change.status === 'Menunggu Verifikasi').length
</script>

<template>
  <div class="page-stack">
    <section class="welcome-card">
      <div>
        <span class="eyebrow">Selamat pagi,</span>
        <h1>Ketua RT</h1>
        <span class="role-pill">Pengurus RT · RT 04 RW 02</span>
      </div>
      <div class="welcome-logo"><i class="bi bi-house-heart-fill" aria-hidden="true"></i><small>Aplikasi RT</small></div>
    </section>

    <section>
      <div class="section-heading"><h2>Ringkasan Tugas RT</h2></div>
      <div class="summary-grid">
        <RouterLink to="/rt/surat/masuk" class="metric-card">
          <i class="bi bi-file-earmark-text metric-icon red-icon" aria-hidden="true"></i>
          <strong>Surat Menunggu</strong><span>{{ pendingLetters }} pengajuan</span>
        </RouterLink>
        <RouterLink to="/rt/warga/perubahan-data" class="metric-card">
          <i class="bi bi-person-vcard metric-icon green-icon" aria-hidden="true"></i>
          <strong>Perubahan Data</strong><span>{{ pendingChanges }} pengajuan</span>
        </RouterLink>
        <RouterLink to="/rt/iuran/kelola" class="metric-card">
          <i class="bi bi-cash-coin metric-icon red-icon" aria-hidden="true"></i>
          <strong>Iuran Belum Dibayar</strong><span>23 warga/KK</span>
        </RouterLink>
        <RouterLink to="/rt/iuran/kelola" class="metric-card">
          <i class="bi bi-wallet2 metric-icon green-icon" aria-hidden="true"></i>
          <strong>Kas RT</strong><span>{{ formatRupiah(2430000) }} saldo saat ini</span>
        </RouterLink>
      </div>
    </section>

    <section>
      <div class="section-heading"><h2>Pendaftaran Warga</h2></div>
      <RouterLink to="/rt/warga/pendaftaran" class="quick-link">
        <i class="bi bi-person-plus red-icon" aria-hidden="true"></i>
        <span><strong>Tinjau antrean</strong><small>Data contoh, bukan pendaftar nyata</small></span>
      </RouterLink>
    </section>

    <section>
      <div class="section-heading"><h2>Urusan RT</h2></div>
      <div class="quick-grid">
        <RouterLink to="/rt/iuran/kelola" class="quick-link"><i class="bi bi-receipt red-icon" aria-hidden="true"></i><span><strong>Buat Tagihan</strong><small>Iuran warga/KK</small></span></RouterLink>
        <RouterLink to="/rt/surat/masuk" class="quick-link"><i class="bi bi-patch-check green-icon" aria-hidden="true"></i><span><strong>Verifikasi Surat</strong><small>Cek &amp; setujui pengajuan</small></span></RouterLink>
        <RouterLink to="/rt/warga/perubahan-data" class="quick-link"><i class="bi bi-person-vcard green-icon" aria-hidden="true"></i><span><strong>Tinjau Data</strong><small>Perubahan data warga</small></span></RouterLink>
        <button class="quick-link quick-link-button" type="button" @click="demoState.lastDemoNotice = 'Pencatatan pembayaran tidak diproses pada prototipe ini.'"><i class="bi bi-cash-stack red-icon" aria-hidden="true"></i><span><strong>Catat Pembayaran</strong><small>Iuran &amp; keuangan RT</small></span></button>
      </div>
      <p v-if="demoState.lastDemoNotice" class="local-result mt-2 mb-0" role="status">{{ demoState.lastDemoNotice }}</p>
    </section>

    <section>
      <div class="section-heading"><h2>Layanan Saya</h2></div>
      <div class="quick-grid">
        <RouterLink to="/rt/surat/saya" class="quick-link"><i class="bi bi-file-earmark-person red-icon" aria-hidden="true"></i><span><strong>Surat Saya</strong><small>Ajukan dan cek riwayat</small></span></RouterLink>
        <RouterLink to="/rt/iuran/saya" class="quick-link"><i class="bi bi-receipt green-icon" aria-hidden="true"></i><span><strong>Iuran Saya</strong><small>Lihat tagihan pribadi</small></span></RouterLink>
        <RouterLink to="/rt/saya/keluarga" class="quick-link"><i class="bi bi-people green-icon" aria-hidden="true"></i><span><strong>Keluarga Saya</strong><small>Data dalam satu KK</small></span></RouterLink>
      </div>
    </section>

    <section>
      <div class="section-heading"><h2>Aktivitas Terbaru</h2><RouterLink to="/rt/surat/masuk">Lihat Semua</RouterLink></div>
      <RouterLink to="/rt/surat/masuk" class="activity-row">
        <span class="activity-icon"><i class="bi bi-file-earmark-text" aria-hidden="true"></i></span>
        <span class="activity-copy"><strong>{{ demoState.rtApplications[0]?.person }} mengajukan surat</strong><small>{{ demoState.rtApplications[0]?.date }}</small></span>
        <span class="status-pill status-amber">Menunggu</span>
      </RouterLink>
      <RouterLink to="/rt/warga/perubahan-data" class="activity-row">
        <span class="activity-icon green-icon"><i class="bi bi-person-vcard" aria-hidden="true"></i></span>
        <span class="activity-copy"><strong>Perubahan data warga</strong><small>Permintaan tinjauan lokal</small></span>
        <span class="status-pill status-amber">Menunggu</span>
      </RouterLink>
    </section>
    <p class="local-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Ringkasan menggunakan data contoh, bukan catatan RT sungguhan.</p>
  </div>
</template>
