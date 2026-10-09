<script setup lang="ts">
import weddingInfo from '../../data/wedding'

import { useFadeOnScroll } from '../../composables/useFadeOnScroll'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

const { reminders } = weddingInfo
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="bg-cream section-padding relative overflow-hidden"
  >


    <div class="max-w-6xl mx-auto">
      <header class="text-center max-w-2xl mx-auto mb-14">
        <div class="font-script text-3xl md:text-4xl text-gold mb-2">{{ reminders.label }}</div>
        <h2 class="font-serif-display text-4xl md:text-5xl text-text mb-4">{{ reminders.heading }}</h2>
      </header>

      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(card, i) in reminders.cards"
          :key="card.id"
          class="card-bordered p-7 md:p-8 bg-warmWhite shadow-soft hover:shadow-card transition"
        >
          <div class="w-10 h-10 rounded-full bg-champagne/20 text-gold font-serif-display font-bold text-lg flex items-center justify-center mb-5">
            {{ i + 1 }}
          </div>
          <h3 class="font-serif-display text-xl md:text-2xl text-text mb-3">{{ card.title }}</h3>
          <p class="font-serif-body text-base md:text-lg leading-relaxed text-text-soft">{{ card.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
