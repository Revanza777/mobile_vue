<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { demoState, formatRupiah } from '../data/demoData'

const targetType = ref('Per Individu')
const recipient = ref('Seluruh Warga')
const feeType = ref('Iuran Kebersihan')
const amount = ref(10000)
const period = ref('Oktober')
const year = ref('2025')
const dueDate = ref('2025-10-31')
const note = ref('')
const message = ref('')
const total = computed(() => Number(amount.value || 0))

function publishInvoice() {
  if (recipient.value === 'Warga Tertentu') {
    message.value = 'Pemilihan warga tertentu tidak tersedia pada prototipe ini. Tidak ada tagihan yang dibuat.'
    demoState.lastDemoNotice = message.value
    return
  }
  message.value = `Simulasi tagihan ${feeType.value} sebesar ${formatRupiah(total.value)} ditampilkan untuk ${recipient.value}. Tidak diterbitkan ke server.`
  demoState.lastDemoNotice = message.value
}
</script>

<template>
  <form class="page-stack" @submit.prevent="publishInvoice">
    <nav class="module-switch" aria-label="Bagian iuran">
      <RouterLink to="/rt/iuran/saya" class="nav-link" active-class="active">Iuran Saya</RouterLink>
      <RouterLink to="/rt/iuran/kelola" class="nav-link" active-class="active">Kelola Iuran RT</RouterLink>
    </nav>

    <section class="content-card form-card">
      <label class="form-label" for="fee-kind">Jenis Iuran <span class="required">*</span></label>
      <select id="fee-kind" v-model="feeType" class="form-select">
        <option>Iuran Kebersihan</option>
        <option>Iuran Keamanan</option>
      </select>

      <label class="form-label">Dasar Perhitungan <span class="required">*</span></label>
      <div class="segmented-control"><button type="button" :class="{ selected: targetType === 'Per Individu' }" @click="targetType = 'Per Individu'">Per Individu</button><button type="button" :class="{ selected: targetType === 'Per KK' }" @click="targetType = 'Per KK'">Per KK</button></div>

      <label class="form-label" for="fee-amount">Nominal <span class="required">*</span></label>
      <div class="input-prefix"><span>Rp</span><input id="fee-amount" v-model.number="amount" class="form-control" type="number" min="1" required /></div>
      <small class="form-hint">Contoh: 10.000</small>

      <label class="form-label">Periode <span class="required">*</span></label>
      <div class="period-fields">
        <select v-model="period" class="form-select" aria-label="Bulan tagihan"><option>Oktober</option><option>November</option><option>Desember</option></select>
        <select v-model="year" class="form-select" aria-label="Tahun tagihan"><option>2025</option><option>2026</option></select>
      </div>

      <fieldset class="recipient-choice">
        <legend>Target Penerima <span class="required">*</span></legend>
        <label><input v-model="recipient" type="radio" value="Seluruh Warga" /> <span><strong>Seluruh Warga</strong><small>Tagihan akan dibuat untuk warga yang memenuhi ketentuan.</small></span></label>
        <label><input v-model="recipient" type="radio" value="Warga Tertentu" /> <span><strong>Pilih Warga atau KK</strong><small>Pilih warga/KK tertentu yang akan ditagih.</small></span></label>
      </fieldset>
      <p v-if="recipient === 'Warga Tertentu'" class="local-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Pilihan warga/KK tertentu belum tersedia pada prototipe.</p>

      <label class="form-label" for="fee-due">Jatuh Tempo <span class="required">*</span></label>
      <input id="fee-due" v-model="dueDate" class="form-control" type="date" required />
      <label class="form-label" for="fee-note">Catatan (opsional)</label>
      <textarea id="fee-note" v-model="note" class="form-control" rows="2" maxlength="200" placeholder="Tambahkan catatan"></textarea>
      <small class="form-hint text-end">{{ note.length }}/200</small>
    </section>

    <section class="content-card invoice-summary">
      <h2><i class="bi bi-check-circle-fill" aria-hidden="true"></i> Ringkasan</h2>
      <strong>{{ feeType }} · {{ targetType }}</strong>
      <span>{{ formatRupiah(total) }} · {{ period }} {{ year }}</span>
      <small>Data penerima tidak diproses untuk penagihan sungguhan.</small>
    </section>
    <button class="btn btn-brand w-100" type="submit"><i class="bi bi-send" aria-hidden="true"></i> Simulasikan Terbitkan Tagihan</button>
    <div v-if="message" class="local-result" role="status">{{ message }}</div>
    <p class="local-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Tombol hanya menampilkan hasil simulasi lokal; tidak ada tagihan yang diterbitkan atau disimpan ke server.</p>
  </form>
</template>
