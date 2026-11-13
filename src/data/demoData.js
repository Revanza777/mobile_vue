import { reactive } from 'vue'

export const resident = {
  name: 'Siti Nurhaliza',
  nik: '3201••••••••0007',
  address: 'Jl. Melati No. 12, RT 04 RW 02',
  familyNumber: '3201••••••••0001',
}

export const familyMembers = [
  { name: 'Siti Nurhaliza', relation: 'Kepala Keluarga', nik: '3201••••••••0007' },
  { name: 'Ahmad Fauzi', relation: 'Suami', nik: '3201••••••••0012' },
  { name: 'Aisyah Putri', relation: 'Anak', nik: '3201••••••••0024' },
  { name: 'Rizky Pratama', relation: 'Anak', nik: '3201••••••••0031' },
]

export const residentBills = [
  { id: 'kebersihan', name: 'Iuran Kebersihan', amount: 50000, unit: 'Per KK', period: 'Oktober 2025', paid: true },
  { id: 'keamanan', name: 'Iuran Keamanan', amount: 100000, unitAmount: 25000, quantity: 4, unit: 'Per Individu', period: 'Oktober 2025', paid: true },
]

export const residentApplications = [
  {
    id: 'SKD-2025-001',
    name: 'Surat Keterangan Domisili',
    applicant: resident.name,
    nik: resident.nik,
    address: resident.address,
    date: '22 Okt 2025 · 09:12',
    status: 'Menunggu Verifikasi',
    description: 'Surat yang menyatakan alamat tempat tinggal sementara.',
  },
  {
    id: 'SPP-2025-008',
    name: 'Surat Pengantar Pindah',
    applicant: 'Andi Wijaya',
    nik: '3201••••••••0016',
    address: 'Jl. Mawar No. 8, RT 04 RW 02',
    date: '21 Okt 2025 · 14:30',
    status: 'Diproses',
    description: 'Surat pengantar untuk keperluan pindah.',
  },
  {
    id: 'SKL-2025-013',
    name: 'Surat Keterangan Kelahiran',
    applicant: 'Rina Oktaviani',
    nik: '3201••••••••0021',
    address: 'Jl. Kenanga No. 3, RT 04 RW 02',
    date: '20 Okt 2025 · 10:45',
    status: 'Disetujui',
    description: 'Surat keterangan kelahiran.',
  },
]

export const rtApplications = [
  { id: 'SKD-2025-001', name: 'Surat Keterangan Domisili', person: resident.name, nik: resident.nik, date: '22 Okt 2025 · 09:12', status: 'Menunggu Verifikasi' },
  { id: 'SPP-2025-008', name: 'Surat Pengantar Pindah', person: 'Andi Wijaya', nik: '3201••••••••0016', date: '21 Okt 2025 · 14:30', status: 'Menunggu Verifikasi' },
  { id: 'SKL-2025-013', name: 'Surat Keterangan Kelahiran', person: 'Rina Oktaviani', nik: '3201••••••••0021', date: '20 Okt 2025 · 10:45', status: 'Menunggu Verifikasi' },
  { id: 'SKU-2025-020', name: 'Surat Keterangan Usaha', person: 'Budi Santoso', nik: '3201••••••••0032', date: '19 Okt 2025 · 10:45', status: 'Menunggu Verifikasi' },
]

export const dataChanges = [
  { id: 'CHG-2025-01', person: 'Rina Oktaviani', nik: '3201••••••••0021', change: 'Perubahan Alamat', before: 'Jl. Melati No. 12', after: 'Jl. Mawar No. 18', date: '22 Okt 2025 · 10:20', status: 'Menunggu Verifikasi' },
  { id: 'CHG-2025-02', person: 'Budi Santoso', nik: '3201••••••••0032', change: 'Perubahan Anggota KK', before: '3 anggota', after: '4 anggota', date: '21 Okt 2025 · 16:45', status: 'Menunggu Verifikasi' },
  { id: 'CHG-2025-03', person: 'Dewi Lestari', nik: '3201••••••••0044', change: 'Perubahan Nomor HP', before: '08•••1234', after: '08•••5678', date: '20 Okt 2025 · 13:10', status: 'Menunggu Verifikasi' },
]

export const demoState = reactive({
  applications: [...residentApplications],
  rtApplications: [...rtApplications],
  dataChanges: [...dataChanges],
  bills: [...residentBills],
  notificationsRead: false,
  lastDemoNotice: '',
})

export function formatRupiah(amount) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`
}
