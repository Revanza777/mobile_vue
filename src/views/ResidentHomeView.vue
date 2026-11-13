<script setup>
import { RouterLink } from 'vue-router'
import { resident, demoState, formatRupiah } from '../data/demoData'

const quickLinks = [
  { title: 'Buat Surat', note: 'Pengajuan surat', icon: 'bi-file-earmark-plus', to: '/warga/surat', tone: 'red' },
  { title: 'Perubahan Identitas', note: 'Perbarui data keluarga', icon: 'bi-person-vcard', to: '/warga/keluarga', tone: 'green' },
  { title: 'Iuran & Pembayaran', note: 'Lihat kewajiban iuran', icon: 'bi-receipt', to: '/warga/iuran', tone: 'green' },
  { title: 'Keuangan RT', note: 'Lihat ringkasan kas', icon: 'bi-wallet2', to: '/warga/iuran', tone: 'red' },
]

const unpaidCount = demoState.bills.filter((bill) => !bill.paid).length
</script>

<template>
  <div class="page-stack">
    <section class="welcome-card">
      <div>
        <span class="eyebrow">Selamat pagi,</span>
        <h1>{{ resident.name }}</h1>
        <span class="role-pill">Warga RT 04 RW 02</span>
      </div>
      <div class="welcome-logo"><i class="bi bi-house-heart-fill"></i><small>Layanan Warga</small></div>
    </section>

    <RouterLink to="/warga/keluarga" class="summary-card family-summary">
      <div class="summary-icon"><i class="bi bi-person-vcard"></i></div>
      <div class="summary-main">
        <strong>Keluarga Anda</strong>
        <span>4 anggota keluarga</span>
      </div>
      <span class="inline-link">Lihat Detail <i class="bi bi-chevron-right"></i></span>
    </RouterLink>

    <section class="summary-grid">
      <RouterLink to="/warga/surat/history" class="metric-card">
        <i class="bi bi-file-earmark-text metric-icon red-icon"></i>
        <strong>Pengajuan Surat</strong>
        <span>{{ demoState.applications.length }} pengajuan saat ini</span>
      </RouterLink>
      <RouterLink to="/warga/keluarga" class="metric-card">
        <i class="bi bi-person-vcard metric-icon green-icon"></i>
        <strong>Perubahan Identitas</strong>
        <span>Perbarui data di keluarga</span>
      </RouterLink>
      <RouterLink to="/warga/iuran" class="metric-card">
        <i class="bi bi-receipt metric-icon red-icon"></i>
        <strong>Iuran &amp; Pembayaran</strong>
        <span>{{ unpaidCount }} tagihan belum lunas</span>
      </RouterLink>
      <RouterLink to="/warga/iuran" class="metric-card">
        <i class="bi bi-wallet2 metric-icon green-icon"></i>
        <strong>Keuangan RT</strong>
        <span>{{ formatRupiah(2430000) }} saldo saat ini</span>
      </RouterLink>
    </section>

    <section>
      <div class="section-heading"><h2>Akses Cepat</h2></div>
      <div class="quick-grid">
        <RouterLink v-for="item in quickLinks" :key="item.title" :to="item.to" class="quick-link">
          <i class="bi" :class="[item.icon, `${item.tone}-icon`]"></i>
          <span><strong>{{ item.title }}</strong><small>{{ item.note }}</small></span>
        </RouterLink>
      </div>
    </section>

    <section>
      <div class="section-heading">
        <h2>Aktivitas Terbaru</h2>
        <RouterLink to="/warga/surat/history">Lihat Semua</RouterLink>
      </div>
      <RouterLink
        v-for="application in demoState.applications.slice(0, 2)"
        :key="application.id"
        :to="{ path: '/warga/surat/detail', query: { id: application.id } }"
        class="activity-row"
      >
        <span class="activity-icon"><i class="bi bi-file-earmark-text"></i></span>
        <span class="activity-copy">
          <strong>{{ application.applicant }} mengajukan {{ application.name }}</strong>
          <small>{{ application.date }}</small>
        </span>
        <span class="status-pill" :class="application.status === 'Disetujui' ? 'status-green' : 'status-amber'">
          {{ application.status }}
        </span>
        <i class="bi bi-chevron-right activity-chevron"></i>
      </RouterLink>
    </section>
  </div>
</template>
