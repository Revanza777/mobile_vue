<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { demoState } from '../data/demoData'

const filters = [
  { label: 'Semua', value: 'Semua' },
  { label: 'Menunggu', value: 'Menunggu Konfirmasi' },
  { label: 'Disetujui', value: 'Disetujui' },
  { label: 'Ditolak', value: 'Ditolak' },
]
const filter = ref('Menunggu Konfirmasi')
const selectedId = ref(demoState.residentRegistrations.find((item) => item.status === 'Menunggu Konfirmasi')?.id || '')
const rejectionReason = ref('')
const feedback = ref('')
const isLoading = ref(true)
const loadError = ref('')
const registrations = ref(null)

const visibleRegistrations = computed(() => {
  const items = registrations.value || []
  return filter.value === 'Semua'
    ? items
    : items.filter((item) => item.status === filter.value)
})
const selectedRegistration = computed(() => registrations.value?.find((item) => item.id === selectedId.value))
const selectedIsVisible = computed(() => visibleRegistrations.value.some((item) => item.id === selectedId.value))

onMounted(() => {
  const source = demoState.residentRegistrations
  if (Array.isArray(source)) {
    registrations.value = source
  } else {
    loadError.value = 'Data antrean contoh tidak dapat dibaca. Coba muat ulang aplikasi.'
  }
  isLoading.value = false
})

function changeFilter(value) {
  filter.value = value
  selectedId.value = visibleRegistrations.value[0]?.id || ''
  rejectionReason.value = ''
  feedback.value = ''
}

function selectRegistration(registration) {
  selectedId.value = registration.id
  rejectionReason.value = ''
  feedback.value = ''
}

function decide(status) {
  if (!selectedRegistration.value || !selectedIsVisible.value) return

  if (status === 'Ditolak' && !rejectionReason.value.trim()) {
    feedback.value = 'Isi alasan penolakan terlebih dahulu.'
    return
  }

  const registration = selectedRegistration.value
  registration.status = status
  registration.reviewNote = status === 'Ditolak' ? rejectionReason.value.trim() : ''
  feedback.value = `Status pendaftaran contoh diubah menjadi ${status.toLowerCase()} pada sesi ini.`
  rejectionReason.value = ''
  filter.value = 'Semua'
}
</script>

<template>
  <div class="page-stack registration-page">
    <nav class="module-switch" aria-label="Bagian data warga">
      <RouterLink to="/rt/warga/pendaftaran" class="nav-link" active-class="active">Pendaftaran</RouterLink>
      <RouterLink to="/rt/warga/perubahan-data" class="nav-link" active-class="active">Perubahan Data</RouterLink>
    </nav>

    <section class="card content-card">
      <div class="card-heading">
        <span class="round-icon red-icon"><i class="bi bi-person-plus" aria-hidden="true"></i></span>
        <div>
          <h1>Antrean Pendaftaran Warga</h1>
          <p>Periksa data pendaftar sebelum memberi keputusan.</p>
        </div>
      </div>
    </section>

    <div class="filter-tabs" role="group" aria-label="Filter status pendaftaran">
      <button
        v-for="item in filters"
        :key="item.value"
        type="button"
        :class="{ selected: filter === item.value }"
        :aria-pressed="filter === item.value"
        @click="changeFilter(item.value)"
      >
        {{ item.label }}
      </button>
    </div>

    <p v-if="isLoading" class="empty-state" role="status">Menyiapkan data antrean contoh...</p>
    <p v-else-if="loadError" class="empty-state" role="alert">{{ loadError }}</p>
    <template v-else>
      <button
        v-for="registration in visibleRegistrations"
        :key="registration.id"
        type="button"
        class="history-row history-button"
        :class="{ 'row-selected': selectedId === registration.id }"
        :aria-pressed="selectedId === registration.id"
        @click="selectRegistration(registration)"
      >
        <span class="round-icon red-icon"><i class="bi bi-person" aria-hidden="true"></i></span>
        <span class="person-copy">
          <strong>{{ registration.name }}</strong>
          <small>{{ registration.date }}</small>
        </span>
        <span
          class="status-pill"
          :class="registration.status === 'Disetujui' ? 'status-green' : registration.status === 'Ditolak' ? 'status-red' : 'status-amber'"
        >
          {{ registration.status === 'Menunggu Konfirmasi' ? 'Menunggu' : registration.status }}
        </span>
      </button>

      <p v-if="!visibleRegistrations.length" class="empty-state">
        Tidak ada pendaftaran contoh dengan status ini. Pendaftaran dari aplikasi warga belum terhubung.
      </p>

      <section v-if="selectedRegistration && selectedIsVisible" class="card content-card registration-detail">
        <div class="section-heading">
          <h2>Detail Pendaftar</h2>
          <span class="status-pill status-amber">Data contoh</span>
        </div>
        <div class="person-summary">
          <span class="avatar-initial">{{ selectedRegistration.name.slice(0, 1) }}</span>
          <span class="person-copy">
            <strong>{{ selectedRegistration.name }}</strong>
            <small>{{ selectedRegistration.date }}</small>
          </span>
        </div>
        <div class="detail-pair"><span>Status pendaftaran</span><strong>{{ selectedRegistration.status }}</strong></div>
        <div class="detail-pair"><span>NIK</span><strong>{{ selectedRegistration.nik }}</strong></div>
        <div class="detail-pair"><span>Nomor KK</span><strong>{{ selectedRegistration.familyNumber }}</strong></div>
        <div class="detail-pair"><span>Nomor HP</span><strong>{{ selectedRegistration.phone }}</strong></div>
        <div class="detail-pair"><span>Alamat</span><strong>{{ selectedRegistration.address }}</strong></div>
        <div v-if="selectedRegistration.reviewNote" class="detail-pair">
          <span>Alasan penolakan</span><strong>{{ selectedRegistration.reviewNote }}</strong>
        </div>

        <template v-if="selectedRegistration.status === 'Menunggu Konfirmasi'">
          <label for="rejection-reason" class="form-label">Alasan penolakan (wajib saat menolak)</label>
          <textarea
            id="rejection-reason"
            v-model="rejectionReason"
            class="form-control"
            rows="3"
            placeholder="Tulis alasan yang akan disampaikan kepada pendaftar"
          ></textarea>
          <div class="action-pair mt-3">
            <button type="button" class="btn btn-approve" @click="decide('Disetujui')">Setujui pendaftaran</button>
            <button type="button" class="btn btn-reject" @click="decide('Ditolak')">Tolak pendaftaran</button>
          </div>
        </template>

        <p v-if="feedback" class="local-result mt-3 mb-0" role="status" aria-live="polite">{{ feedback }}</p>
      </section>
    </template>

    <p class="local-note">
      <i class="bi bi-info-circle" aria-hidden="true"></i>
      Data pendaftar dan keputusan hanya contoh lokal. Persetujuan tidak membuat akun warga aktif tanpa server admin.
    </p>
  </div>
</template>
