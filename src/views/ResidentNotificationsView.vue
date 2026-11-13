<script setup>
import { computed, ref } from 'vue'
import { demoState } from '../data/demoData'

const filter = ref('Semua')
const notifications = [
  { type: 'Surat', icon: 'bi-file-earmark-check', title: 'Pengajuan surat disetujui', detail: 'Surat Keterangan Domisili telah diperbarui.', date: '22 Okt 2025 · 10:25' },
  { type: 'Pengingat', icon: 'bi-cash-coin', title: 'Pembayaran iuran terverifikasi', detail: 'Iuran kebersihan periode Oktober 2025.', date: '21 Okt 2025 · 08:15' },
  { type: 'Pengingat', icon: 'bi-bell', title: 'Pengingat pembayaran', detail: 'Jatuh tempo iuran kebersihan pada 25 Okt 2025.', date: '20 Okt 2025 · 09:00' },
  { type: 'Sistem', icon: 'bi-megaphone', title: 'Informasi RT', detail: 'Jadwal gotong royong lingkungan RT 04.', date: '18 Okt 2025 · 10:30' },
  { type: 'Sistem', icon: 'bi-person-vcard', title: 'Pembaruan Data', detail: 'Pengajuan perubahan identitas sedang diproses.', date: '16 Okt 2025 · 14:20' },
]
const visibleNotifications = computed(() => filter.value === 'Semua'
  ? notifications
  : notifications.filter((notification) => notification.type === filter.value))

function markRead() {
  demoState.notificationsRead = true
}
</script>

<template>
  <div class="page-stack">
    <div class="filter-tabs">
      <button v-for="item in ['Semua', 'Pengingat', 'Sistem']" :key="item" type="button" :class="{ selected: filter === item }" @click="filter = item">{{ item }}</button>
    </div>
    <button class="text-action text-action-button" type="button" @click="markRead">
      {{ demoState.notificationsRead ? 'Semua telah ditandai dibaca di sesi ini' : 'Tandai dibaca' }}
    </button>
    <article v-for="notification in visibleNotifications" :key="notification.title" class="notification-row" :class="{ 'notification-read': demoState.notificationsRead }">
      <span class="round-icon red-icon"><i class="bi" :class="notification.icon"></i></span>
      <span class="person-copy"><strong>{{ notification.title }}</strong><small>{{ notification.detail }}</small><small>{{ notification.date }}</small></span>
      <i class="bi bi-chevron-right"></i>
    </article>
    <p class="local-note"><i class="bi bi-info-circle"></i> Notifikasi ini adalah data contoh lokal.</p>
  </div>
</template>
