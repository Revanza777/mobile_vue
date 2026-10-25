<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()
const sidebarOpen = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape') closeSidebar()
}

watch(() => route.fullPath, closeSidebar)

onMounted(() => {
  document.body.classList.remove('sidebar-open')
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.classList.remove('sidebar-open')
  document.removeEventListener('keydown', onKeydown)
})

watch(sidebarOpen, (isOpen) => {
  document.body.classList.toggle('sidebar-open', isOpen)
})
</script>

<template>
  <div class="app-wrapper">
    <header class="app-header navbar navbar-expand bg-body">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button
              class="nav-link"
              type="button"
              :aria-expanded="sidebarOpen"
              aria-label="Buka atau tutup sidebar"
              @click="toggleSidebar"
            >
              <i class="bi bi-list"></i>
            </button>
          </li>
        </ul>

        <RouterLink to="/" class="navbar-brand">
          Layanan RT
        </RouterLink>

        <div class="ms-auto text-secondary small">
          Prototype
        </div>
      </div>
    </header>

    <aside class="app-sidebar bg-body-secondary shadow" data-bs-theme="dark">
      <div class="sidebar-brand">
        <RouterLink to="/" class="brand-link">
          <span class="brand-text fw-light">Layanan RT</span>
        </RouterLink>
      </div>

      <div class="sidebar-wrapper">
        <nav class="mt-2">
          <ul
            class="nav sidebar-menu flex-column"
            role="navigation"
            aria-label="Navigasi utama"
          >
            <li class="nav-item">
              <RouterLink to="/" class="nav-link">
                <i class="nav-icon bi bi-speedometer2"></i>
                <p>Dashboard</p>
              </RouterLink>
            </li>

            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent>
                <i class="nav-icon bi bi-envelope"></i>
                <p>Pengajuan Surat</p>
              </a>
            </li>

            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent>
                <i class="nav-icon bi bi-person-vcard"></i>
                <p>Data Identitas</p>
              </a>
            </li>

            <li class="nav-item">
              <a href="#" class="nav-link" @click.prevent>
                <i class="nav-icon bi bi-wallet2"></i>
                <p>Kas RT</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <div
      v-if="sidebarOpen"
      class="sidebar-overlay"
      aria-hidden="true"
      @click="closeSidebar"
    ></div>

    <main class="app-main">
      <div class="app-content">
        <div class="container-fluid py-4">
          <RouterView />
        </div>
      </div>
    </main>
  </div>
</template>
