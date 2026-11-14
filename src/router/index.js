import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/splash',
    },
    {
      path: '/splash',
      name: 'splash',
      component: () => import('../views/SplashView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/warga',
      component: () => import('../components/AppLayout.vue'),
      meta: { role: 'warga' },
      children: [
        { path: '', redirect: '/warga/home' },
        { path: 'home', name: 'resident-home', component: () => import('../views/ResidentHomeView.vue'), meta: { title: 'Beranda Warga', role: 'warga', showBell: true } },
        { path: 'keluarga', name: 'resident-family', component: () => import('../views/ResidentFamilyView.vue'), meta: { title: 'Profil Keluarga', role: 'warga', showBack: true } },
        { path: 'iuran', name: 'resident-fees', component: () => import('../views/ResidentFeesView.vue'), meta: { title: 'Iuran & Pembayaran', role: 'warga', showBack: true } },
        { path: 'iuran/detail', name: 'resident-fee-detail', component: () => import('../views/ResidentFeesView.vue'), meta: { title: 'Detail Tagihan Individu', role: 'warga', showBack: true } },
        { path: 'surat', name: 'resident-letter', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Pengajuan Surat', role: 'warga' } },
        { path: 'surat/form', name: 'resident-letter-form', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Formulir Surat Keterangan Domisili', role: 'warga', showBack: true } },
        { path: 'surat/history', name: 'resident-letter-history', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Riwayat Pengajuan Surat', role: 'warga', showBack: true } },
        { path: 'surat/detail', name: 'resident-letter-detail', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Detail Pengajuan Surat', role: 'warga', showBack: true } },
        { path: 'surat/preview', name: 'resident-letter-preview', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Preview Surat', role: 'warga', showBack: true } },
        { path: 'notifikasi', name: 'resident-notifications', component: () => import('../views/ResidentNotificationsView.vue'), meta: { title: 'Notifikasi & Pengingat', role: 'warga' } },
        { path: 'profil', name: 'resident-profile', component: () => import('../views/ProfileView.vue'), meta: { title: 'Profil Saya', role: 'warga' } },
      ],
    },
    {
      path: '/rt',
      component: () => import('../components/AppLayout.vue'),
      meta: { role: 'rt' },
      children: [
        { path: '', redirect: '/rt/home' },
        { path: 'home', name: 'rt-home', component: () => import('../views/RtHomeView.vue'), meta: { title: 'Beranda RT', role: 'rt', showBell: true } },
        { path: 'tagihan', name: 'rt-fee', component: () => import('../views/RtFeeView.vue'), meta: { title: 'Buat Tagihan Iuran', role: 'rt', showBack: true } },
        { path: 'persetujuan', name: 'rt-approvals', component: () => import('../views/RtApprovalsView.vue'), meta: { title: 'Persetujuan Surat', role: 'rt' } },
        { path: 'perubahan-data', name: 'rt-data-review', component: () => import('../views/RtDataReviewView.vue'), meta: { title: 'Peninjauan Perubahan Data', role: 'rt' } },
        { path: 'profil', name: 'rt-profile', component: () => import('../views/ProfileView.vue'), meta: { title: 'Profil Saya', role: 'rt' } },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/splash',
    },
  ],
})

export default router