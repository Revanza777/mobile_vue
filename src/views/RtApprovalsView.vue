<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { demoState } from '../data/demoData'

const filter = ref('Semua')
const selectedId = ref(demoState.rtApplications[0]?.id)
const reason = ref('')
const message = ref('')
const visibleApplications = computed(() => {
  if (filter.value === 'Semua') return demoState.rtApplications
  return demoState.rtApplications.filter((application) => application.status === filter.value)
})
const selectedApplication = computed(() => demoState.rtApplications.find((application) => application.id === selectedId.value))

function setStatus(status) {
  if (!selectedApplication.value) return
  if (status === 'Ditolak' && !reason.value.trim()) {
    message.value = 'Isi alasan penolakan terlebih dahulu.'
    return
  }
  selectedApplication.value.status = status
  const related = demoState.applications.find((application) => application.id === selectedApplication.value.id)
  if (related) related.status = status
  message.value = `Status contoh diubah menjadi “${status}” di sesi ini saja.`
}
</script>

<template>
  <div class="page-stack">
    <nav class="module-switch" aria-label="Bagian surat">
      <RouterLink to="/rt/surat/masuk" class="nav-link" active-class="active">Pemeriksaan RT</RouterLink>
      <RouterLink to="/rt/surat/saya" class="nav-link" active-class="active">Surat Saya</RouterLink>
    </nav>

    <div class="filter-tabs">
      <button v-for="item in ['Semua', 'Menunggu Verifikasi', 'Disetujui', 'Ditolak']" :key="item" type="button" :class="{ selected: filter === item }" @click="filter = item">{{ item === 'Menunggu Verifikasi' ? 'Menunggu' : item }}</button>
    </div>

    <button v-for="application in visibleApplications" :key="application.id" type="button" class="history-row history-button" :class="{ 'row-selected': selectedId === application.id }" @click="selectedId = application.id; message = ''">
      <span class="round-icon red-icon"><i class="bi bi-file-earmark-text" aria-hidden="true"></i></span>
      <span class="person-copy"><strong>{{ application.name }}</strong><small>{{ application.person }} · {{ application.date }}</small></span>
      <span class="status-pill" :class="application.status === 'Disetujui' ? 'status-green' : application.status === 'Ditolak' ? 'status-red' : 'status-amber'">{{ application.status }}</span>
    </button>

    <section v-if="selectedApplication && visibleApplications.length" class="card content-card">
      <div class="section-heading"><h2>Detail Pengajuan Surat</h2><span class="status-pill status-amber">{{ selectedApplication.status }}</span></div>
      <div class="person-summary">
        <span class="avatar-initial">{{ selectedApplication.person.slice(0, 1) }}</span>
        <span class="person-copy"><strong>{{ selectedApplication.person }}</strong><small>NIK {{ selectedApplication.nik }} · RT 04 / RW 02</small></span>
      </div>
      <div class="detail-pair"><span>Jenis Surat</span><strong>{{ selectedApplication.name }}</strong></div>
      <div class="detail-pair"><span>Diajukan pada</span><strong>{{ selectedApplication.date }}</strong></div>
      <div class="document-row"><i class="bi bi-file-earmark-pdf" aria-hidden="true"></i><span><strong>surat_pengajuan.pdf</strong><small>2.4 MB · contoh</small></span><span class="status-pill status-amber">Contoh</span></div>
      <label class="form-label mt-3" for="rejection-reason">Alasan Penolakan (wajib bila menolak)</label>
      <textarea id="rejection-reason" v-model="reason" class="form-control" rows="2" maxlength="200" placeholder="Tulis alasan"></textarea>
      <div class="action-pair mt-3">
        <button class="btn btn-approve" type="button" @click="setStatus('Disetujui')"><i class="bi bi-check-lg" aria-hidden="true"></i> Setujui (demo)</button>
        <button class="btn btn-reject" type="button" @click="setStatus('Ditolak')"><i class="bi bi-x-lg" aria-hidden="true"></i> Tolak (demo)</button>
      </div>
      <p v-if="message" class="local-result mt-3 mb-0" role="status">{{ message }}</p>
    </section>
    <p v-else class="empty-state">Tidak ada pengajuan pada status ini.</p>
    <p class="local-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Persetujuan atau penolakan hanya mengubah contoh data di sesi prototipe ini.</p>
  </div>
</template>
