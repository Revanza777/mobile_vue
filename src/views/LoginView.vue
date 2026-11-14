<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { RT_DEVICE_CODE_STORAGE_KEY } from '../constants'

const route = useRoute()
const deviceCode = ref('')
const statusTitle = ref('Kode perangkat belum dibuat')
const statusMessage = ref('Buat kode perangkat, lalu kirim ke admin RT untuk didaftarkan.')
const feedback = ref('')
const feedbackType = ref('success')

const whatsappUrl = computed(() => {
  if (!deviceCode.value) return ''

  const message = `Permintaan pendaftaran perangkat aplikasi RT.\nKode perangkat: ${deviceCode.value}`
  return `https://wa.me/?text=${encodeURIComponent(message)}`
})

onMounted(() => {
  try {
    deviceCode.value = window.localStorage.getItem(RT_DEVICE_CODE_STORAGE_KEY) || ''
  } catch {
    feedback.value = 'Penyimpanan perangkat tidak tersedia. Kode yang dibuat hanya akan berlaku selama aplikasi terbuka.'
    feedbackType.value = 'warning'
  }

  if (deviceCode.value) {
    statusTitle.value = 'Status belum diperiksa'
    statusMessage.value = 'Kode perangkat ditemukan. Periksa status setelah admin mendaftarkannya.'
  } else if (route.query.deactivated === '1') {
    statusTitle.value = 'Akun dinonaktifkan di perangkat ini'
    statusMessage.value = 'Kode lokal telah dihapus. Untuk menggunakan aplikasi lagi, buat kode perangkat dan minta admin mendaftarkannya.'
  }
})

function createDeviceCode() {
  if (deviceCode.value) {
    feedback.value = 'Kode perangkat untuk instalasi ini sudah dibuat dan tetap digunakan.'
    feedbackType.value = 'success'
    return
  }

  if (!globalThis.crypto?.getRandomValues) {
    feedback.value = 'Perangkat ini tidak mendukung pembuatan kode yang aman.'
    feedbackType.value = 'warning'
    return
  }

  const bytes = new Uint8Array(16)
  try {
    globalThis.crypto.getRandomValues(bytes)
  } catch {
    feedback.value = 'Kode perangkat tidak dapat dibuat pada perangkat ini.'
    feedbackType.value = 'warning'
    return
  }
  const code = `RT-${Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('').toUpperCase()}`

  deviceCode.value = code
  statusTitle.value = 'Status belum diperiksa'
  statusMessage.value = 'Kode tersimpan. Kirim ke admin RT agar perangkat didaftarkan.'
  feedback.value = ''

  try {
    window.localStorage.setItem(RT_DEVICE_CODE_STORAGE_KEY, code)
  } catch {
    feedback.value = 'Kode dibuat untuk sesi ini, tetapi tidak dapat disimpan di perangkat.'
    feedbackType.value = 'warning'
  }
}

async function copyDeviceCode() {
  if (!deviceCode.value) return

  try {
    await navigator.clipboard.writeText(deviceCode.value)
    feedback.value = 'Kode perangkat berhasil disalin.'
    feedbackType.value = 'success'
  } catch {
    feedback.value = 'Penyalinan otomatis tidak tersedia. Tekan lama kode untuk menyalinnya secara manual.'
    feedbackType.value = 'warning'
  }
}

function checkRegistration() {
  statusTitle.value = 'Layanan admin belum terhubung'
  statusMessage.value = 'Status pendaftaran belum dapat diperiksa. Aplikasi belum terhubung ke server admin, jadi akses belum diberikan.'
  feedback.value = ''
}
</script>

<template>
  <main class="login-screen">
    <div class="login-content">
      <header class="login-brand">
        <div class="brand-mark"><i class="bi bi-house-heart-fill" aria-hidden="true"></i></div>
        <strong>RT</strong>
        <span>Aplikasi RT</span>
      </header>

      <section class="card login-panel">
        <div class="card-body">
          <h1 class="card-title">Aktivasi perangkat RT</h1>
          <p class="muted-copy">Daftarkan perangkat satu kali untuk membuka aplikasi RT.</p>

          <div class="status-banner warning-banner" role="status" aria-live="polite">
            <i class="bi bi-info-circle" aria-hidden="true"></i>
            <span>
              <strong>{{ statusTitle }}</strong>
              <small>{{ statusMessage }}</small>
            </span>
          </div>

          <div class="device-code-block mt-3">
            <span class="form-label">Kode perangkat</span>
            <code>{{ deviceCode || 'Belum dibuat' }}</code>
          </div>

          <div class="device-actions mt-3">
            <button class="btn btn-brand device-action-primary" type="button" @click="createDeviceCode">
              <i class="bi bi-fingerprint" aria-hidden="true"></i>
              {{ deviceCode ? 'Tampilkan kode perangkat' : 'Buat kode perangkat' }}
            </button>
            <button class="btn btn-outline-brand" type="button" :disabled="!deviceCode" @click="copyDeviceCode">
              <i class="bi bi-copy" aria-hidden="true"></i>
              Salin kode
            </button>
            <a
              v-if="deviceCode"
              class="btn btn-outline-brand"
              :href="whatsappUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="bi bi-whatsapp" aria-hidden="true"></i>
              Buka WhatsApp
            </a>
            <button v-else class="btn btn-outline-brand" type="button" disabled>
              <i class="bi bi-whatsapp" aria-hidden="true"></i>
              Buka WhatsApp
            </button>
            <button
              class="btn btn-outline-brand device-action-check"
              type="button"
              :disabled="!deviceCode"
              @click="checkRegistration"
            >
              <i class="bi bi-arrow-clockwise" aria-hidden="true"></i>
              Periksa status
            </button>
          </div>

          <p v-if="feedback" class="local-result mt-3 mb-0" :class="{ 'device-feedback-warning': feedbackType === 'warning' }" role="status" aria-live="polite">
            {{ feedback }}
          </p>

          <ol class="activation-steps mb-0">
            <li>Buat kode perangkat untuk instalasi ini.</li>
            <li>Kirim kode ke admin RT. WhatsApp akan meminta kamu memilih penerima.</li>
            <li>Setelah admin mendaftarkan perangkat, periksa statusnya di sini.</li>
          </ol>

          <RouterLink to="/rt/home" class="btn btn-outline-brand device-demo-entry">
            <i class="bi bi-box-arrow-in-right" aria-hidden="true"></i>
            Buka aplikasi RT (demo)
          </RouterLink>
          <p class="local-note device-demo-note">
            Mode demo hanya membuka tampilan aplikasi. Data dan persetujuan perangkat belum terhubung ke server.
          </p>
        </div>
      </section>

      <p class="local-note login-note">
        Kode ini mengidentifikasi instalasi aplikasi, bukan IMEI. Pemeriksaan pendaftaran dan akses otomatis memerlukan server admin.
      </p>
    </div>
  </main>
</template>
