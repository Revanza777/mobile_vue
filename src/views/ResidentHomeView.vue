<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { resident, demoState, formatRupiah } from '../data/demoData'

const unpaidCount = computed(() => demoState.bills.filter((bill) => !bill.paid).length)

const greeting = computed(() => {
  const hour = new Date().getHours()
  if (hour < 11) return 'Selamat pagi,'
  if (hour < 15) return 'Selamat siang,'
  if (hour < 18) return 'Selamat sore,'
  return 'Selamat malam,'
})

const features = computed(() => [
  {
    title: 'Pengajuan Surat',
    note: `${demoState.applications.length} pengajuan saat ini`,
    icon: 'bi-file-earmark-text',
    to: '/warga/surat/history',
    tone: 'red',
  },
  {
    title: 'Perubahan Identitas',
    note: 'Perbarui data di keluarga',
    icon: 'bi-person-vcard',
    to: '/warga/keluarga',
    tone: 'green',
  },
  {
    title: 'Iuran & Pembayaran',
    note: `${unpaidCount.value} tagihan belum lunas`,
    icon: 'bi-receipt',
    to: '/warga/iuran',
    tone: 'red',
  },
  {
    title: 'Keuangan RT',
    note: `${formatRupiah(2430000)} saldo saat ini`,
    icon: 'bi-wallet2',
    to: '/warga/iuran',
    tone: 'green',
  },
])
</script>

<template>
  <div class="page-stack">
    <section class="welcome-card">
      <div>
        <span class="eyebrow">{{ greeting }}</span>
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
      <RouterLink v-for="item in features" :key="item.title" :to="item.to" class="metric-card">
        <i class="bi metric-icon" :class="[item.icon, `${item.tone}-icon`]"></i>
        <strong>{{ item.title }}</strong>
        <span>{{ item.note }}</span>
      </RouterLink>
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