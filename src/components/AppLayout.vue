<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navigation = [
  { label: 'Beranda', icon: 'bi-house-door', to: '/rt/home', activePrefix: '/rt/home' },
  { label: 'Warga', icon: 'bi-people', to: '/rt/warga/pendaftaran', activePrefix: '/rt/warga' },
  { label: 'Surat', icon: 'bi-file-earmark-text', to: '/rt/surat/masuk', activePrefix: '/rt/surat' },
  { label: 'Iuran', icon: 'bi-receipt', to: '/rt/iuran/saya', activePrefix: '/rt/iuran' },
  { label: 'Saya', icon: 'bi-person', to: '/rt/saya', activePrefix: '/rt/saya' },
]

function isActive(item) {
  return route.path === item.activePrefix || route.path.startsWith(`${item.activePrefix}/`)
}

function goBack() {
  if (window.history.state?.back) {
    router.back()
    return
  }
  router.push('/rt/home')
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
        <i class="bi bi-arrow-left" aria-hidden="true"></i>
      </button>
      <RouterLink
        v-else
        to="/rt/notifikasi"
        class="header-icon"
        aria-label="Buka notifikasi"
      >
        <i class="bi bi-bell" aria-hidden="true"></i>
      </RouterLink>

      <span class="header-title">{{ route.meta.title || 'Aplikasi RT' }}</span>
      <span class="header-spacer"></span>
    </header>

    <main class="app-content">
      <RouterView />
    </main>

    <nav class="bottom-navigation" aria-label="Navigasi RT">
      <RouterLink
        v-for="item in navigation"
        :key="item.label"
        :to="item.to"
        class="bottom-navigation-item"
        :class="{ active: isActive(item) }"
        :aria-current="isActive(item) ? 'page' : undefined"
      >
        <i class="bi" :class="item.icon" aria-hidden="true"></i>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>