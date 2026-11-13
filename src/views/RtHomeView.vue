<script setup>
import { RouterLink } from 'vue-router'
import { demoState, formatRupiah } from '../data/demoData'

const pendingLetters = demoState.rtApplications.filter((application) => application.status === 'Menunggu Verifikasi').length
const pendingChanges = demoState.dataChanges.filter((change) => change.status === 'Menunggu Verifikasi').length
</script>

<template>
  <div class="page-stack">
    <section class="welcome-card rt-welcome">
      <div>
        <span class="eyebrow">Selamat pagi,</span>
        <h1>Ketua RT</h1>
        <span class="role-pill">Pengurus RT · RT 04 RW 02</span>
      </div>
      <div class="welcome-logo"><i class="bi bi-house-heart-fill"></i><small>Layanan Warga</small></div>
    </section>

    <section>
      <div class="section-heading"><h2>Ringkasan Warga &amp; Keuangan</h2></div>
      <div class="summary-grid">
        <RouterLink to="/rt/persetujuan" class="metric-card">
          <i class="bi bi-file-earmark-text metric-icon red-icon"></i>
          <strong>Surat Menunggu</strong><span>{{ pendingLetters }} pengajuan</span>
        </RouterLink>
        <RouterLink to="/rt/perubahan-data" class="metric-card">
          <i class="bi bi-person-vcard metric-icon green-icon"></i>
          <strong>Perubahan Data</strong><span>{{ pendingChanges }} pengajuan</span>
        </RouterLink>
        <RouterLink to="/rt/tagihan" class="metric-card">
          <i class="bi bi-cash-coin metric-icon red-icon"></i>
          <strong>Iuran Belum Dibayar</strong><span>23 warga/KK</span>
        </RouterLink>
        <RouterLink to="/rt/tagihan" class="metric-card">
          <i class="bi bi-wallet2 metric-icon green-icon"></i>
          <strong>Kas RT</strong><span>{{ formatRupiah(2430000) }} saldo saat ini</span>
        </RouterLink>
      </div>
    </section>

    <section>
      <div class="section-heading"><h2>Aksi Cepat</h2></div>
      <div class="quick-grid">
        <RouterLink to="/rt/tagihan" class="quick-link"><i class="bi bi-receipt red-icon"></i><span><strong>Buat Tagihan</strong><small>Iuran warga/KK</small></span></RouterLink>
        <RouterLink to="/rt/persetujuan" class="quick-link"><i class="bi bi-patch-check green-icon"></i><span><strong>Verifikasi Surat</strong><small>Cek &amp; setujui pengajuan</small></span></RouterLink>
        <RouterLink to="/rt/perubahan-data" class="quick-link"><i class="bi bi-person-vcard green-icon"></i><span><strong>Tinjau Data</strong><small>Perubahan data warga</small></span></RouterLink>
        <button class="quick-link quick-link-button" type="button" @click="demoState.lastDemoNotice = 'Pencatatan pembayaran tidak diproses pada prototipe ini.'"><i class="bi bi-cash-stack red-icon"></i><span><strong>Catat Pembayaran</strong><small>Iuran &amp; keuangan RT</small></span></button>
      </div>
      <p v-if="demoState.lastDemoNotice" class="local-result mt-2 mb-0" role="status">{{ demoState.lastDemoNotice }}</p>
    </section>

    <section>
      <div class="section-heading"><h2>Aktivitas Terbaru</h2><RouterLink to="/rt/persetujuan">Lihat Semua</RouterLink></div>
      <RouterLink to="/rt/persetujuan" class="activity-row">
        <span class="activity-icon"><i class="bi bi-file-earmark-text"></i></span>
        <span class="activity-copy"><strong>{{ demoState.rtApplications[0]?.person }} mengajukan surat</strong><small>{{ demoState.rtApplications[0]?.date }}</small></span>
        <span class="status-pill status-amber">Menunggu</span>
      </RouterLink>
      <RouterLink to="/rt/perubahan-data" class="activity-row">
        <span class="activity-icon green-icon"><i class="bi bi-person-vcard"></i></span>
        <span class="activity-copy"><strong>Perubahan data warga</strong><small>Permintaan tinjauan lokal</small></span>
        <span class="status-pill status-amber">Menunggu</span>
      </RouterLink>
    </section>
    <p class="local-note"><i class="bi bi-info-circle"></i> Ringkasan menggunakan data contoh, bukan catatan RT sungguhan.</p>
  </div>
</template>
