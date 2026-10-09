<script setup lang="ts">
import weddingInfo from '../../data/wedding'

import { useFadeOnScroll } from '../../composables/useFadeOnScroll'
import InvitationPhoto from '../../assets/image/yellow.jpg'
import cornerTop from '../../assets/image/corner.png'
import cornerDown from '../../assets/image/corner_down.png'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="bg-cream section-padding relative overflow-hidden"
  >
    <img
      :src="cornerTop"
      alt="Floral corner decoration"
      class="z-10 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[40vw] max-h-[40vw] object-contain sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />
    <img
      :src="cornerDown"
      alt="Floral corner decoration"
      class="z-10 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />

    <div class="relative z-20 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div class="card-bordered relative bg-warmWhite p-6 shadow-soft sm:p-8 md:p-12">
        <span class="pointer-events-none absolute left-4 top-2 select-none font-serif-display leading-none text-champagne/25 text-[96px] sm:left-6 sm:top-4 sm:text-[120px] md:text-[140px]">&ldquo;</span>
        <div class="relative z-10 pt-7 sm:pt-8 md:pt-10">
          <div class="mb-3 font-script text-2xl text-gold sm:text-3xl md:text-4xl">
            {{ weddingInfo.message.label }}
          </div>
          <h2 class="mb-5 font-serif-display text-2xl leading-tight text-text sm:mb-6 sm:text-3xl md:text-4xl md:leading-tight">
            {{ weddingInfo.message.heading }}
          </h2>
          <p class="mb-8 font-serif-body text-base leading-relaxed text-text-soft sm:mb-10 sm:text-lg md:text-xl">
            {{ weddingInfo.message.text }}
          </p>
          <div class="font-script text-3xl text-gold sm:text-4xl">
            {{ weddingInfo.message.signature }}
          </div>
        </div>
      </div>

      <div class="relative h-[340px] sm:h-[420px] md:h-[560px]">
        <img
          :src="InvitationPhoto"
          alt="Julius and Mariel"
          class="h-full w-full rounded-xl object-cover shadow-card"
        />
     
      </div>
    </div>
  </section>
</template>
