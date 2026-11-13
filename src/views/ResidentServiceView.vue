<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { demoState, resident } from '../data/demoData'

const route = useRoute()
const router = useRouter()
const form = ref({
  name: resident.name,
  nik: '',
  address: resident.address,
  purpose: '',
  note: '',
})
const filter = ref('Semua')
const serviceSearch = ref('')

const screen = computed(() => route.name)
const selectedApplication = computed(() => demoState.applications.find((item) => item.id === route.query.id) || demoState.applications[0])
const serviceTypes = [
  'Surat Keterangan Domisili',
  'Surat Keterangan Usaha',
  'Surat Keterangan Kelahiran',
  'Surat Keterangan Kematian',
  'Surat Pengantar Pindah',
]
const visibleServiceTypes = computed(() => serviceTypes.filter((name) => name.toLowerCase().includes(serviceSearch.value.toLowerCase())))
const historyItems = computed(() => {
  if (filter.value === 'Semua') return demoState.applications
  if (filter.value === 'Diproses') return demoState.applications.filter((item) => ['Diproses', 'Menunggu Verifikasi'].includes(item.status))
  return demoState.applications.filter((item) => item.status === filter.value)
})

function submitApplication() {
  const application = {
    id: `DEMO-${String(Date.now()).slice(-5)}`,
    name: 'Surat Keterangan Domisili',
    applicant: form.value.name,
    nik: form.value.nik,
    address: form.value.address,
    date: 'Baru saja',
    status: 'Menunggu Verifikasi',
    description: 'Surat yang menyatakan alamat tempat tinggal sementara.',
  }
  demoState.applications.unshift(application)
  demoState.rtApplications.unshift({
    id: application.id,
    name: application.name,
    person: application.applicant,
    nik: application.nik,
    date: 'Baru saja',
    status: 'Menunggu Verifikasi',
  })
  router.push('/warga/surat/history')
}
</script>

<template>
  <div v-if="screen === 'resident-letter'" class="page-stack">
    <label class="search-field">
      <i class="bi bi-search"></i>
      <input v-model="serviceSearch" aria-label="Cari jenis surat" placeholder="Cari jenis surat..." />
    </label>

    <template v-for="label in visibleServiceTypes" :key="label">
      <RouterLink v-if="label === 'Surat Keterangan Domisili'" to="/warga/surat/form" class="service-row">
        <span class="round-icon red-icon"><i class="bi bi-file-earmark-text"></i></span>
        <span class="person-copy"><strong>{{ label }}</strong><small>Surat yang menyatakan alamat tempat tinggal sementara.</small></span>
        <i class="bi bi-chevron-right"></i>
      </RouterLink>
      <div v-else class="service-row">
        <span class="round-icon red-icon"><i class="bi bi-file-earmark-text"></i></span>
        <span class="person-copy"><strong>{{ label }}</strong><small>Formulir layanan surat RT.</small></span>
      </div>
    </template>
    <p v-if="visibleServiceTypes.length === 0" class="empty-state">Jenis surat tidak ditemukan.</p>
    <RouterLink to="/warga/surat/history" class="text-action">Riwayat Pengajuan Surat <i class="bi bi-chevron-right"></i></RouterLink>
  </div>

  <form v-else-if="screen === 'resident-letter-form'" class="page-stack" @submit.prevent="submitApplication">
    <section class="content-card">
      <div class="card-heading">
        <span class="round-icon red-icon"><i class="bi bi-file-earmark-text"></i></span>
        <div><h1>Surat Keterangan Domisili</h1><p>Surat yang menyatakan alamat tempat tinggal sementara.</p></div>
      </div>
      <div class="form-section-title">Data Pemohon</div>
      <label class="form-label" for="applicant-name">Nama Lengkap <span class="required">*</span></label>
      <input id="applicant-name" v-model="form.name" class="form-control" required />
      <label class="form-label" for="applicant-nik">NIK <span class="required">*</span></label>
      <input id="applicant-nik" v-model="form.nik" class="form-control" inputmode="numeric" required placeholder="Masukkan NIK" />
      <label class="form-label" for="applicant-address">Alamat Lengkap <span class="required">*</span></label>
      <textarea id="applicant-address" v-model="form.address" class="form-control" rows="2" required></textarea>
      <label class="form-label" for="application-purpose">Keperluan <span class="required">*</span></label>
      <input id="application-purpose" v-model="form.purpose" class="form-control" required placeholder="Tuliskan keperluan" />
      <label class="form-label" for="application-note">Keterangan Tambahan</label>
      <textarea id="application-note" v-model="form.note" class="form-control" rows="2" placeholder="Tulis keterangan tambahan"></textarea>
      <button class="btn btn-brand w-100 mt-3" type="submit"><i class="bi bi-send"></i> Ajukan Surat (demo)</button>
    </section>
    <p class="local-note"><i class="bi bi-info-circle"></i> Pengajuan hanya disimulasikan dan tidak dikirim ke server.</p>
  </form>

  <div v-else-if="screen === 'resident-letter-history'" class="page-stack">
    <div class="filter-tabs">
      <button v-for="item in ['Semua', 'Diproses', 'Disetujui', 'Ditolak']" :key="item" type="button" :class="{ selected: filter === item }" @click="filter = item">{{ item }}</button>
    </div>
    <RouterLink v-for="application in historyItems" :key="application.id" :to="{ path: '/warga/surat/detail', query: { id: application.id } }" class="history-row">
      <span class="round-icon red-icon"><i class="bi bi-file-earmark-text"></i></span>
      <span class="person-copy"><strong>{{ application.name }}</strong><small>No. {{ application.id }} · {{ application.date }}</small></span>
      <span class="status-pill" :class="application.status === 'Disetujui' ? 'status-green' : 'status-amber'">{{ application.status }}</span>
      <i class="bi bi-chevron-right"></i>
    </RouterLink>
    <p v-if="historyItems.length === 0" class="empty-state">Belum ada pengajuan pada status ini.</p>
    <p class="local-note"><i class="bi bi-info-circle"></i> Riwayat ini hanya tersimpan sementara selama prototipe dibuka.</p>
  </div>

  <div v-else-if="screen === 'resident-letter-detail'" class="page-stack">
    <section class="content-card">
      <div class="card-heading">
        <span class="round-icon red-icon"><i class="bi bi-file-earmark-text"></i></span>
        <div><h1>{{ selectedApplication?.name }}</h1><p>No. {{ selectedApplication?.id }} · {{ selectedApplication?.date }}</p></div>
      </div>
    </section>
    <div class="status-banner"><i class="bi bi-clock-history"></i><span><strong>{{ selectedApplication?.status }}</strong><small>Pengajuan ini sedang ditinjau pada tampilan demo.</small></span></div>
    <section class="content-card">
      <div class="section-heading"><h2>Data Pengajuan</h2></div>
      <div class="detail-pair"><span>Nama Pemohon</span><strong>{{ selectedApplication?.applicant }}</strong></div>
      <div class="detail-pair"><span>NIK</span><strong>{{ selectedApplication?.nik }}</strong></div>
      <div class="detail-pair"><span>Jenis Surat</span><strong>{{ selectedApplication?.name }}</strong></div>
      <div class="detail-pair"><span>Alamat</span><strong>{{ selectedApplication?.address || resident.address }}</strong></div>
      <div class="detail-pair"><span>Keperluan</span><strong>Administrasi</strong></div>
    </section>
    <button class="btn btn-brand w-100" type="button" @click="router.push({ path: '/warga/surat/preview', query: { id: selectedApplication?.id } })">Lihat Preview Surat</button>
    <p class="local-note"><i class="bi bi-info-circle"></i> Status dan data bukan hasil verifikasi RT sungguhan.</p>
  </div>

  <div v-else class="page-stack">
    <section class="letter-preview content-card">
      <div class="letter-emblem"><i class="bi bi-shield-fill"></i></div>
      <p class="letter-kicker">PEMERINTAH DESA<br />KECAMATAN SETEMPAT</p>
      <hr />
      <h1>SURAT KETERANGAN DOMISILI</h1>
      <p>Yang bertanda tangan di bawah ini, Ketua RT 04 RW 02, menerangkan bahwa:</p>
      <dl>
        <div><dt>Nama</dt><dd>{{ selectedApplication?.applicant }}</dd></div>
        <div><dt>NIK</dt><dd>{{ selectedApplication?.nik }}</dd></div>
        <div><dt>Alamat</dt><dd>{{ selectedApplication?.address || resident.address }}</dd></div>
      </dl>
      <p>Adalah benar bertempat tinggal pada alamat tersebut.</p>
      <div class="letter-signature">Contoh tampilan surat<br /><strong>Ketua RT (demo)</strong></div>
    </section>
    <p class="local-note"><i class="bi bi-info-circle"></i> Pratinjau ilustratif, bukan surat resmi atau dokumen yang disahkan.</p>
  </div>
</template>
