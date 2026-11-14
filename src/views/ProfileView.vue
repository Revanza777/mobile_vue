<script setup>
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { RT_DEVICE_CODE_STORAGE_KEY } from '../constants'
import { familyMembers, resident } from '../data/demoData'

const router = useRouter()
const initial = computed(() => resident.name.charAt(0))
const deactivateDialog = ref(null)
const deactivateError = ref('')

function returnToLogin() {
  router.push('/login')
}

function openDeactivateDialog() {
  deactivateError.value = ''
  deactivateDialog.value?.showModal()
}

function closeDeactivateDialog() {
  deactivateDialog.value?.close()
}

function handleDeactivateKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault()
    deactivateError.value = ''
    closeDeactivateDialog()
  }
}

function deactivateAccount() {
  try {
    window.localStorage.removeItem(RT_DEVICE_CODE_STORAGE_KEY)
  } catch {
    deactivateError.value = 'Kode perangkat tidak dapat dihapus. Periksa pengaturan penyimpanan perangkat, lalu coba lagi.'
    return
  }

  closeDeactivateDialog()
  router.replace({ path: '/login', query: { deactivated: '1' } })
}
</script>

<template>
  <div class="page-stack">
    <section class="card content-card">
      <div class="card-heading">
        <span class="avatar-initial">{{ initial }}</span>
        <div>
          <h1>{{ resident.name }}</h1>
          <p>{{ resident.nik }}</p>
        </div>
        <span class="status-pill status-green">Pengurus RT</span>
      </div>
      <div class="detail-pair"><span>Wilayah</span><strong>RT 04 RW 02</strong></div>
      <div class="detail-pair"><span>Nomor KK</span><strong>{{ resident.familyNumber }}</strong></div>
      <div class="detail-pair"><span>Alamat</span><strong>{{ resident.address }}</strong></div>
      <div class="detail-pair"><span>Anggota keluarga</span><strong>{{ familyMembers.length }} orang</strong></div>
      <RouterLink to="/rt/saya/keluarga" class="text-action">
        Lihat data keluarga <i class="bi bi-chevron-right" aria-hidden="true"></i>
      </RouterLink>
    </section>

    <section>
      <div class="section-heading"><h2>Layanan Pribadi</h2></div>
      <div class="quick-grid">
        <RouterLink to="/rt/surat/saya" class="quick-link"><i class="bi bi-file-earmark-person red-icon" aria-hidden="true"></i><span><strong>Surat Saya</strong><small>Ajukan atau cek riwayat</small></span></RouterLink>
        <RouterLink to="/rt/iuran/saya" class="quick-link"><i class="bi bi-receipt green-icon" aria-hidden="true"></i><span><strong>Iuran Saya</strong><small>Lihat tagihan pribadi</small></span></RouterLink>
      </div>
    </section>

    <button type="button" class="btn btn-outline-brand w-100" @click="returnToLogin">
      <i class="bi bi-box-arrow-right" aria-hidden="true"></i> Kembali ke login demo
    </button>

    <button type="button" class="btn btn-deactivate w-100" @click="openDeactivateDialog">
      <i class="bi bi-person-x" aria-hidden="true"></i> Nonaktifkan akun
    </button>

    <p class="local-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Data profil ini hanya contoh lokal.</p>
  </div>

  <dialog
    ref="deactivateDialog"
    class="account-dialog"
    aria-labelledby="deactivate-title"
    aria-describedby="deactivate-description"
    @cancel="deactivateError = ''"
    @keydown="handleDeactivateKeydown"
  >
    <div class="account-dialog-body">
      <h2 id="deactivate-title">Nonaktifkan akun RT?</h2>
      <p id="deactivate-description">
        Kode perangkat yang tersimpan di perangkat ini akan dihapus dan aplikasi kembali ke halaman aktivasi.
        Pada prototipe ini, akun di server admin tidak berubah.
      </p>
      <p v-if="deactivateError" class="alert alert-danger py-2" role="alert">{{ deactivateError }}</p>
      <div class="action-pair">
        <button type="button" class="btn btn-outline-brand" @click="closeDeactivateDialog">Batal</button>
        <button type="button" class="btn btn-deactivate" @click="deactivateAccount">Nonaktifkan akun</button>
      </div>
    </div>
  </dialog>
</template>
