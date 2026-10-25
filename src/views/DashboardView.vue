<template>
  <section>
    <div class="mb-4">
      <h1 class="mb-1">Dashboard</h1>
      <p class="text-secondary mb-0">
        Selamat datang di aplikasi layanan RT.
      </p>
    </div>

    <div class="row g-3">
      <div class="col-12 col-md-4">
        <div class="card dashboard-card text-bg-primary h-100">
          <div class="card-body">
            <h5 class="card-title">Pengajuan Surat</h5>
            <p class="card-text">
              Akses layanan pengajuan surat.
            </p>
            <button class="btn btn-light" type="button">
              Lihat layanan
            </button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card dashboard-card text-bg-success h-100">
          <div class="card-body">
            <h5 class="card-title">Data Identitas</h5>
            <p class="card-text">
              Fitur pembaruan data warga.
            </p>
            <button class="btn btn-light" type="button">
              Lihat data
            </button>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card dashboard-card text-bg-warning h-100">
          <div class="card-body">
            <h5 class="card-title">Kas RT</h5>
            <p class="card-text">
              Transparansi pemasukan dan pengeluaran.
            </p>
            <button class="btn btn-dark" type="button">
              Lihat kas
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="alert alert-info mt-4" role="alert">
      Ini adalah tampilan uji. Data belum terhubung ke backend atau database.
    </div>
  </section>
</template>

<style scoped>
.dashboard-card .card-title {
  float: none;
  margin: 0 0 0.5rem;
}
</style>


