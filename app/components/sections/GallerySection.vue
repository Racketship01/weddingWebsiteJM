<script setup lang="ts">
import weddingInfo from '../../data/wedding'

import { useFadeOnScroll } from '../../composables/useFadeOnScroll'
import jm1 from '~/assets/image/yellow3.jpg'
import jm2 from '~/assets/image/JM13.jpg'
import jm3 from '~/assets/image/yellow5.jpg'
import jm4 from '~/assets/image/JM10.jpg'
import jm5 from '~/assets/image/yellow2.jpg'
import jm6 from '~/assets/image/JM11.jpg'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

const galleryImages = [
  { src: jm1, alt: 'Julius and Mariel photo 1' },
  { src: jm2, alt: 'Julius and Mariel photo 2' },
  { src: jm3, alt: 'Julius and Mariel photo 3' },
  { src: jm4, alt: 'Julius and Mariel photo 4' },
  { src: jm5, alt: 'Julius and Mariel photo 5' },
  { src: jm6, alt: 'Julius and Mariel photo 6' }
]

const { gallery } = weddingInfo
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="bg-warmWhite section-padding relative overflow-hidden"
  >
    

    <div class="relative z-10">
      <header class="text-center max-w-2xl mx-auto mb-14">
        <div class="font-script text-3xl md:text-4xl text-gold mb-2">{{ gallery.label }}</div>
        <h2 class="font-serif-display text-4xl md:text-5xl text-text mb-4">{{ gallery.heading }}</h2>
        <p class="font-serif-body text-lg text-text-soft">{{ gallery.supporting }}</p>
      </header>

      <div
        class="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4"
      >
        <div
          v-for="(img, idx) in galleryImages"
          :key="idx"
          class="aspect-square overflow-hidden rounded-lg shadow-soft"
        >
          <img
            :src="img.src"
            :alt="img.alt"
            loading="lazy"
            class="w-full h-full object-cover object-center rounded-lg hover:scale-[1.03] transition-all duration-500 ease-out"
          />
        </div>
      </div>
    </div>
  </section>
</template>
