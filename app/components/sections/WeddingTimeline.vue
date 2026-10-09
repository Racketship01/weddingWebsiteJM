<script setup lang="ts">
import weddingInfo from '../../data/wedding'

import { useFadeOnScroll } from '../../composables/useFadeOnScroll'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

const schedule = weddingInfo.schedule
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="bg-cream section-padding relative overflow-hidden"
  >
   

    <div class="mx-auto mb-16 max-w-5xl text-center">
      <div class="mb-2 font-script text-3xl text-gold md:text-4xl">
        {{ schedule.label }}
      </div>
      <h2 class="mb-4 font-serif-display text-4xl text-text md:text-5xl">
        {{ schedule.heading }}
      </h2>
      <p class="font-serif-body text-lg text-text-soft md:text-xl">
        {{ schedule.supporting }}
      </p>
    </div>

    <div class="mt-16 relative">
      <div class="hidden max-w-5xl mx-auto lg:flex lg:flex-row justify-between items-start relative">
        <div class="absolute top-6 left-1/2 -translate-x-1/2 w-[72%] h-px bg-champagne/50 z-0"></div>

        <div
          v-for="(ev, i) in schedule.events"
          :key="ev.id"
          class="flex-1 relative z-10 flex flex-col items-center px-4"
        >
          <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-champagne bg-warmWhite font-serif-display text-xl font-bold text-gold shadow-soft">
            {{ i + 1 }}
          </div>
          <h3 class="mb-2 font-serif-display text-2xl text-text">{{ ev.title }}</h3>
          <div class="mb-3 text-sans-small-caps text-gold">{{ ev.time }}</div>
          <p class="mx-auto max-w-xs font-serif-body text-base text-text-soft md:text-lg">
            {{ ev.description }}
          </p>
        </div>
      </div>

      <div class="relative ml-6 border-l-2 border-champagne/40 pl-4 lg:hidden block">
        <div
          v-for="(ev, i) in schedule.events"
          :key="ev.id"
          class="relative mb-14 last:mb-0"
        >
          <div class="absolute -left-[34px] top-0 flex h-11 w-11 items-center justify-center rounded-full border-2 border-champagne bg-warmWhite font-serif-display font-bold text-gold shadow-soft">
            {{ i + 1 }}
          </div>
          <div class="ml-4 pt-1">
            <h3 class="mb-1 font-serif-display text-xl text-text md:text-2xl">{{ ev.title }}</h3>
            <div class="mb-2 text-sm text-sans-small-caps text-gold">{{ ev.time }}</div>
            <p class="font-serif-body text-base text-text-soft">
              {{ ev.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
