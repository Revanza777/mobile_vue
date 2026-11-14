<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { demoState, formatRupiah, resident } from '../data/demoData'

const route = useRoute()
const isDetail = computed(() => route.name === 'resident-fee-detail')
const mode = ref('Per Individu')
const total = computed(() => demoState.bills.reduce((sum, bill) => sum + bill.amount, 0))

const paidCount = computed(() => demoState.bills.filter((bill) => bill.paid).length)
const allPaid = computed(() => demoState.bills.length > 0 && paidCount.value === demoState.bills.length)
const statusLabel = computed(() => {
  if (demoState.bills.length === 0) return 'Belum ada tagihan'
  if (allPaid.value) return 'Lunas'
  if (paidCount.value === 0) return 'Belum lunas'
  return 'Lunas sebagian'
})
const statusClass = computed(() => (allPaid.value ? 'status-green' : 'status-amber'))
</script>

<template>
  <div v-if="!isDetail" class="page-stack">
    <div class="segmented-control"><button type="button" :class="{ selected: mode === 'Per Individu' }" @click="mode = 'Per Individu'">Per Individu</button><button type="button" :class="{ selected: mode === 'Per KK' }" @click="mode = 'Per KK'">Per KK</button></div>
    <section class="content-card total-card">
      <div class="card-heading">
        <span class="round-icon green-icon"><i class="bi bi-cash-stack"></i></span>
        <div><h1>Total Kewajiban Keluarga</h1><p>Periode: Oktober 2025</p></div>
        <span class="status-pill" :class="statusClass">{{ statusLabel }}</span>
      </div>
      <strong class="amount-large">{{ formatRupiah(total) }}</strong>
    </section>

    <section>
      <div class="section-heading"><h2>Rincian Iuran</h2></div>
      <article v-for="bill in demoState.bills" :key="bill.id" class="bill-row">
        <span class="round-icon" :class="bill.paid ? 'green-icon' : 'red-icon'"><i class="bi bi-receipt"></i></span>
        <span class="person-copy">
          <strong>{{ bill.name }} ({{ bill.unit }})</strong>
          <small v-if="mode === 'Per Individu' && bill.unitAmount">{{ bill.period }} · {{ formatRupiah(bill.unitAmount) }} × {{ bill.quantity }} warga = {{ formatRupiah(bill.amount) }}</small>
          <small v-else>{{ bill.period }} · {{ formatRupiah(bill.amount) }}</small>
        </span>
        <span class="status-pill" :class="bill.paid ? 'status-green' : 'status-amber'">{{ bill.paid ? 'Lunas' : 'Belum' }}</span>
      </article>
      <RouterLink to="/warga/iuran/detail" class="text-action">Lihat detail tagihan individu <i class="bi bi-chevron-right"></i></RouterLink>
    </section>

    <section class="content-card">
      <div class="section-heading"><h2>Riwayat Pembayaran</h2></div>
      <div class="detail-pair"><span>20 Okt 2025 · Iuran Kebersihan</span><strong>{{ formatRupiah(25000) }} · Tunai</strong></div>
    </section>
    <p class="local-note"><i class="bi bi-info-circle"></i> Tampilan rincian saja; pembayaran tidak diproses di prototipe.</p>
  </div>

  <div v-else class="page-stack">
    <section class="content-card">
      <div class="card-heading">
        <span class="avatar-initial">S</span>
        <div><h1>{{ resident.name }}</h1><p>{{ resident.nik }}</p></div>
      </div>
    </section>
    <section class="content-card">
      <div class="section-heading"><h2>Rincian Tagihan</h2><span class="status-pill status-green">Lunas</span></div>
      <div class="detail-pair"><span>Iuran Keamanan (Per Individu)</span><strong>{{ formatRupiah(25000) }}</strong></div>
      <div class="detail-pair"><span>Periode</span><strong>Oktober 2025</strong></div>
    </section>
    <section class="content-card">
      <div class="section-heading"><h2>Riwayat Pembayaran</h2></div>
      <div class="detail-pair"><span>20 Okt 2025</span><strong>{{ formatRupiah(25000) }} · Tunai</strong></div>
    </section>
    <div class="payment-info"><i class="bi bi-shield-check"></i><span><strong>Detail Tagihan Individu</strong><small>Hanya dapat diakses oleh pemiliknya.</small></span></div>
    <p class="local-note"><i class="bi bi-info-circle"></i> Informasi pembayaran ini hanya contoh lokal.</p>
  </div>
</template>