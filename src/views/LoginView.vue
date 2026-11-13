<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="login-screen">
    <div class="login-brand">
      <div class="brand-mark"><i class="bi bi-house-heart-fill"></i></div>
      <strong>RT</strong>
      <span>Layanan Warga</span>
    </div>

    <section class="login-panel">
      <h1>Masuk ke akun Anda</h1>
      <p class="muted-copy">Gunakan NIK atau username untuk login</p>
      <label class="form-label" for="demo-nik">NIK atau Username</label>
      <div class="input-with-icon">
        <i class="bi bi-person"></i>
        <input id="demo-nik" class="form-control" autocomplete="username" placeholder="NIK atau Username" />
      </div>
      <label class="form-label mt-3" for="demo-password">Kata sandi</label>
      <div class="input-with-icon">
        <i class="bi bi-lock"></i>
        <input id="demo-password" class="form-control" type="password" autocomplete="current-password" placeholder="Kata sandi" />
      </div>
      <div class="d-flex justify-content-between align-items-center mt-3 small">
        <label class="remember-option"><input type="checkbox" /> Ingat saya</label>
        <span class="text-muted">Akses demo</span>
      </div>

      <div class="demo-access">
        <RouterLink to="/warga/home" class="btn btn-brand w-100">
          Masuk sebagai Warga <span class="demo-tag">demo</span>
        </RouterLink>
        <RouterLink to="/rt/home" class="btn btn-outline-brand w-100">
          Masuk sebagai RT <span class="demo-tag">demo</span>
        </RouterLink>
      </div>
      <p class="demo-disclaimer">
        Pilihan di atas hanya navigasi demo lokal, bukan autentikasi atau keamanan sungguhan.
        Data contoh dan tindakan tidak dikirim atau disimpan ke server.
      </p>
    </section>
  </main>
</template>
