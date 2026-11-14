<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { demoState } from '../data/demoData'

const filter = ref('Semua')
const selectedId = ref(demoState.dataChanges[0]?.id)
const message = ref('')
const visibleChanges = computed(() => filter.value === 'Semua'
  ? demoState.dataChanges
  : demoState.dataChanges.filter((change) => change.status === filter.value))
const selectedChange = computed(() => demoState.dataChanges.find((change) => change.id === selectedId.value))

function updateChange(status) {
  if (!selectedChange.value) return
  selectedChange.value.status = status
  message.value = `Status tinjauan contoh diubah menjadi “${status}” di sesi ini saja.`
}
</script>

<template>
  <div class="page-stack">
    <nav class="module-switch" aria-label="Bagian data warga">
      <RouterLink to="/rt/warga/pendaftaran" class="nav-link" active-class="active">Pendaftaran</RouterLink>
      <RouterLink to="/rt/warga/perubahan-data" class="nav-link" active-class="active">Perubahan Data</RouterLink>
    </nav>

    <div class="filter-tabs">
      <button v-for="item in ['Semua', 'Menunggu Verifikasi', 'Disetujui', 'Ditolak']" :key="item" type="button" :class="{ selected: filter === item }" @click="filter = item">{{ item === 'Menunggu Verifikasi' ? 'Menunggu' : item }}</button>
    </div>
    <button v-for="change in visibleChanges" :key="change.id" type="button" class="history-row history-button" :class="{ 'row-selected': selectedId === change.id }" @click="selectedId = change.id; message = ''">
      <span class="round-icon red-icon"><i class="bi bi-person-vcard" aria-hidden="true"></i></span>
      <span class="person-copy"><strong>{{ change.change }}</strong><small>{{ change.person }} · {{ change.date }}</small></span>
      <span class="status-pill" :class="change.status === 'Disetujui' ? 'status-green' : change.status === 'Ditolak' ? 'status-red' : 'status-amber'">{{ change.status === 'Menunggu Verifikasi' ? 'Menunggu Verifikasi' : change.status }}</span>
    </button>

    <section v-if="selectedChange && visibleChanges.length" class="content-card">
      <div class="section-heading"><h2>Detail Peninjauan Perubahan Data</h2><span class="status-pill status-amber">{{ selectedChange.status }}</span></div>
      <div class="person-summary"><span class="avatar-initial">{{ selectedChange.person.slice(0, 1) }}</span><span class="person-copy"><strong>{{ selectedChange.person }}</strong><small>NIK {{ selectedChange.nik }} · RT 04 / RW 02</small></span></div>
      <div class="detail-pair"><span>Jenis Perubahan</span><strong>{{ selectedChange.change }}</strong></div>
      <div class="compare-grid">
        <div><span class="compare-icon"><i class="bi bi-person" aria-hidden="true"></i></span><strong>Data Lama</strong><small>{{ selectedChange.before }}</small></div>
        <div><span class="compare-icon green-icon"><i class="bi bi-geo-alt" aria-hidden="true"></i></span><strong>Data Baru</strong><small>{{ selectedChange.after }}</small></div>
      </div>
      <div class="document-row"><i class="bi bi-paperclip" aria-hidden="true"></i><span><strong>Bukti Pendukung</strong><small>lampiran contoh</small></span><span class="status-pill status-amber">Contoh</span></div>
      <div class="status-banner warning-banner"><i class="bi bi-info-circle" aria-hidden="true"></i><span>Peninjauan ini hanya contoh dan tidak mengubah data identitas warga.</span></div>
      <div class="action-triple mt-3">
        <button class="btn btn-outline-brand" type="button" @click="updateChange('Perlu Perbaikan')">Minta Perbaikan</button>
        <button class="btn btn-reject" type="button" @click="updateChange('Ditolak')">Tolak</button>
        <button class="btn btn-approve" type="button" @click="updateChange('Disetujui')">Setujui</button>
      </div>
      <p v-if="message" class="local-result mt-3 mb-0" role="status">{{ message }}</p>
    </section>
    <p v-else class="empty-state">Tidak ada perubahan pada status ini.</p>
    <p class="local-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Tindakan hanya mengubah status contoh pada sesi prototipe, tidak memperbarui data warga.</p>
  </div>
</template>
