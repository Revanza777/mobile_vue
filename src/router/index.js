import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/splash' },
  { path: '/splash', name: 'splash', component: () => import('../views/SplashView.vue') },
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  {
    path: '/rt',
    component: () => import('../components/AppLayout.vue'),
    children: [
      { path: '', redirect: '/rt/home' },
      { path: 'home', name: 'rt-home', component: () => import('../views/RtHomeView.vue'), meta: { title: 'Beranda RT' } },
      { path: 'warga', redirect: '/rt/warga/pendaftaran' },
      { path: 'warga/pendaftaran', name: 'rt-registrations', component: () => import('../views/RtRegistrationView.vue'), meta: { title: 'Pendaftaran Akun Warga' } },
      { path: 'warga/perubahan-data', name: 'rt-data-review', component: () => import('../views/RtDataReviewView.vue'), meta: { title: 'Peninjauan Data Warga' } },
      { path: 'perubahan-data', redirect: '/rt/warga/perubahan-data' },
      { path: 'surat', redirect: '/rt/surat/masuk' },
      { path: 'surat/masuk', name: 'rt-approvals', component: () => import('../views/RtApprovalsView.vue'), meta: { title: 'Surat untuk Ditinjau' } },
      { path: 'surat/saya', name: 'resident-letter', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Surat Saya' } },
      { path: 'surat/saya/form', name: 'resident-letter-form', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Ajukan Surat', showBack: true } },
      { path: 'surat/saya/history', name: 'resident-letter-history', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Riwayat Surat', showBack: true } },
      { path: 'surat/saya/detail', name: 'resident-letter-detail', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Detail Pengajuan', showBack: true } },
      { path: 'surat/saya/preview', name: 'resident-letter-preview', component: () => import('../views/ResidentServiceView.vue'), meta: { title: 'Pratinjau Surat', showBack: true } },
      { path: 'iuran', redirect: '/rt/iuran/saya' },
      { path: 'iuran/saya', name: 'resident-fees', component: () => import('../views/ResidentFeesView.vue'), meta: { title: 'Iuran Saya' } },
      { path: 'iuran/saya/detail', name: 'resident-fee-detail', component: () => import('../views/ResidentFeesView.vue'), meta: { title: 'Detail Iuran Saya', showBack: true } },
      { path: 'iuran/kelola', name: 'rt-fee', component: () => import('../views/RtFeeView.vue'), meta: { title: 'Buat Tagihan Iuran', showBack: true } },
      { path: 'saya', name: 'rt-profile', component: () => import('../views/ProfileView.vue'), meta: { title: 'Profil Saya' } },
      { path: 'saya/keluarga', name: 'resident-family', component: () => import('../views/ResidentFamilyView.vue'), meta: { title: 'Keluarga Saya', showBack: true } },
      { path: 'notifikasi', name: 'rt-notifications', component: () => import('../views/ResidentNotificationsView.vue'), meta: { title: 'Notifikasi', showBack: true } },
      { path: 'tagihan', redirect: '/rt/iuran/kelola' },
      { path: 'persetujuan', redirect: '/rt/surat/masuk' },
      { path: 'profil', redirect: '/rt/saya' },
    ],
  },
  { path: '/warga/:pathMatch(.*)*', redirect: '/rt/home' },
  { path: '/:pathMatch(.*)*', redirect: '/splash' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
