<script setup lang="ts">
import weddingInfo from '../../data/wedding'

import FooterPhoto from '../../assets/image/JM11.jpg'





const { footer } = weddingInfo
</script>

<template>
  <footer class="relative overflow-hidden">
    <div class="min-h-[480px] md:min-h-[560px] relative flex items-center justify-center">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{
          backgroundImage: `url(${FooterPhoto})`
        }"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-800/70 to-primary-700/65" />

  

      <div class="relative z-10 px-6 text-center">
        <h2 class="font-script text-5xl md:text-7xl text-white mb-5">{{ footer.headline }}</h2>
        <p class="font-serif-body text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
          {{ footer.text }}
        </p>
        <div class="text-sans-small-caps text-champagne-light">{{ footer.eventLabel }}</div>
      </div>
    </div>

    <div class="bg-text/95 text-white/90 py-6 px-6 md:px-12">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <div class="flex flex-wrap items-center gap-6">
          <a
            v-for="link in footer.links"
            :key="link.label"
            :href="link.href"
            :target="link.href.startsWith('http') ? '_blank' : undefined"
            :rel="link.href.startsWith('http') ? 'noopener noreferrer' : undefined"
            class="font-serif-body text-base hover:text-champagne-light transition"
          >
            {{ link.label }}
          </a>
        </div>
        <div class="font-serif-body text-sm text-white/70">{{ footer.copyright }}</div>
      </div>
    </div>
  </footer>
</template>
