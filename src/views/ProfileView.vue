<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { familyMembers, resident } from '../data/demoData'

const route = useRoute()
const router = useRouter()

const isRt = computed(() => route.meta.role === 'rt')
const initial = computed(() => resident.name.charAt(0))

function logout() {
  router.push('/login')
}
</script>

<template>
  <div class="page-stack">
    <section v-if="!isRt" class="content-card">
      <div class="card-heading">
        <span class="avatar-initial">{{ initial }}</span>
        <div>
          <h1>{{ resident.name }}</h1>
          <p>{{ resident.nik }}</p>
        </div>
        <span class="status-pill status-green">Warga</span>
      </div>
      <div class="detail-pair"><span>Nomor KK</span><strong>{{ resident.familyNumber }}</strong></div>
      <div class="detail-pair"><span>Alamat</span><strong>{{ resident.address }}</strong></div>
      <div class="detail-pair"><span>Anggota keluarga</span><strong>{{ familyMembers.length }} orang</strong></div>
      <RouterLink to="/warga/keluarga" class="text-action">
        Lihat profil keluarga <i class="bi bi-chevron-right"></i>
      </RouterLink>
    </section>

    <section v-else class="content-card">
      <div class="card-heading">
        <span class="avatar-initial"><i class="bi bi-person-badge"></i></span>
        <div>
          <h1>Pengurus RT</h1>
          <p>RT 04 RW 02</p>
        </div>
        <span class="status-pill status-green">RT</span>
      </div>
      <div class="detail-pair"><span>Wilayah</span><strong>RT 04 RW 02</strong></div>
      <div class="detail-pair"><span>Peran</span><strong>Pengurus RT</strong></div>
    </section>

    <button type="button" class="btn btn-outline-brand w-100" @click="logout">
      <i class="bi bi-box-arrow-right"></i> Keluar
    </button>

    <p class="local-note"><i class="bi bi-info-circle"></i> Data profil ini hanya contoh lokal.</p>
  </div>
</template>