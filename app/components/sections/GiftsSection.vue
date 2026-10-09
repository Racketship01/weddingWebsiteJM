<script setup lang="ts">
import weddingInfo from '../../data/wedding'
import { useFadeOnScroll } from '../../composables/useFadeOnScroll'
import cornerTop from '../../assets/image/corner.png'
import cornerDown from '../../assets/image/corner_down.png'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

const imgUrl = (p: string, s: string = 'landscape_16_9') =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(p)}&image_size=${s}`

const { gifts } = weddingInfo
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="relative section-padding overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700" />

    <img
      :src="cornerTop"
      alt="Floral corner decoration"
      class="z-5 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />
    <img
      :src="cornerDown"
      alt="Floral corner decoration"
      class="z-5 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />

    <div class="relative z-10 max-w-3xl mx-auto">
      <div class="border border-champagne/40 bg-cream/5 backdrop-blur-sm rounded-2xl p-8 md:p-14 text-center">
        <div class="font-script text-3xl md:text-4xl text-champagne-light mb-3">{{ gifts.label }}</div>
        <h2 class="font-serif-display text-3xl md:text-5xl text-white mb-6">{{ gifts.heading }}</h2>
        <p class="font-serif-body text-lg md:text-xl text-white/90 leading-relaxed mb-12">{{ gifts.message }}</p>
      
      </div>
    </div>
  </section>
</template>
