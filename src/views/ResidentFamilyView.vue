<script setup>
import { familyMembers, resident } from '../data/demoData'
</script>

<template>
  <div class="page-stack">
    <section class="card content-card">
      <div class="card-heading">
        <span class="round-icon red-icon"><i class="bi bi-person-vcard" aria-hidden="true"></i></span>
        <div><h1>Data KK</h1><p>No. KK {{ resident.familyNumber }}</p></div>
        <span class="status-pill status-amber">Contoh</span>
      </div>
      <div class="detail-pair"><span>Alamat</span><strong>{{ resident.address }}</strong></div>
    </section>

    <section>
      <div class="section-heading"><h2>Anggota Keluarga</h2></div>
      <article v-for="member in familyMembers" :key="member.nik" class="person-row">
        <span class="avatar-initial">{{ member.name.slice(0, 1) }}</span>
        <span class="person-copy"><strong>{{ member.name }}</strong><small>{{ member.relation }}</small></span>
      </article>
    </section>

    <p class="local-note"><i class="bi bi-info-circle" aria-hidden="true"></i> Data contoh pada prototipe lokal.</p>
  </div>
</template>
