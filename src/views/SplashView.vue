<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let timer

function continueToLogin() {
  window.clearTimeout(timer)
  router.replace('/login')
}

onMounted(() => {
  timer = window.setTimeout(continueToLogin, 2600)
})

onUnmounted(() => window.clearTimeout(timer))
</script>

<template>
  <main class="splash-screen">
    <div class="splash-brand" aria-label="Layanan RT">
      <div class="brand-mark"><i class="bi bi-house-heart-fill"></i></div>
      <strong>RT</strong>
      <span>Aplikasi RT</span>
    </div>
    <p>Bersama Membangun<br />Lingkungan yang Lebih Baik</p>
    <button class="splash-skip" type="button" @click="continueToLogin">Mulai</button>
  </main>
</template>
