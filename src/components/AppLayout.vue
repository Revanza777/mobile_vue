<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const role = computed(() => route.meta.role)

const residentNavigation = [
  { label: 'Beranda', icon: 'bi-house-door', to: '/warga/home', active: 'resident-home' },
  { label: 'Surat', icon: 'bi-file-earmark-text', to: '/warga/surat', active: 'resident-letter' },
  { label: 'Keluarga', icon: 'bi-people', to: '/warga/keluarga', active: 'resident-family' },
  { label: 'Iuran', icon: 'bi-receipt', to: '/warga/iuran', active: 'resident-fees' },
  { label: 'Profil', icon: 'bi-person', to: '/warga/profil', active: 'resident-profile' },
]

const rtNavigation = [
  { label: 'Beranda', icon: 'bi-house-door', to: '/rt/home', active: 'rt-home' },
  { label: 'Persetujuan', icon: 'bi-file-earmark-text', to: '/rt/persetujuan', active: 'rt-approvals' },
  { label: 'Data Warga', icon: 'bi-people', to: '/rt/perubahan-data', active: 'rt-data-review' },
  { label: 'Iuran', icon: 'bi-receipt', to: '/rt/tagihan', active: 'rt-fee' },
  { label: 'Profil', icon: 'bi-person', to: '/rt/profil', active: 'rt-profile' },
]

const navigation = computed(() => (role.value === 'rt' ? rtNavigation : residentNavigation))

function goBack() {
  if (window.history.state?.back) {
    router.back()
    return
  }
  router.push(role.value === 'rt' ? '/rt/home' : '/warga/home')
}
</script>

<template>
  <div class="app-wrapper">
    <header class="app-header">
      <button
        v-if="route.meta.showBack"
        class="header-icon"
        type="button"
        aria-label="Kembali"
        @click="goBack"
      >
        <i class="bi bi-arrow-left"></i>
      </button>
      <button
        v-else
        class="header-icon"
        type="button"
        aria-label="Buka notifikasi"
        @click="router.push(role === 'rt' ? '/rt/persetujuan' : '/warga/notifikasi')"
      >
        <i class="bi bi-bell"></i>
      </button>

      <span class="header-title">{{ route.meta.title || 'Layanan RT' }}</span>
      <span class="header-spacer"></span>
    </header>

    <main class="app-content">
      <RouterView />
    </main>

    <nav class="bottom-navigation" :aria-label="`Navigasi ${role === 'rt' ? 'RT' : 'Warga'}`">
      <RouterLink
        v-for="item in navigation"
        :key="item.label"
        :to="item.to"
        class="bottom-navigation-item"
        :class="{ active: route.path === item.to || route.path.startsWith(`${item.to}/`) }"
      >
        <i class="bi" :class="item.icon"></i>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>