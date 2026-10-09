<script setup lang="ts">
import { ref } from 'vue'
import weddingInfo from '../../data/wedding'
import { useScrollSpy } from '../../composables/useScrollSpy'

const navItems = [
  { id: 'details', label: 'Details' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'entourage', label: 'Entourage' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'venue', label: 'Venue' },
  { id: 'dresscode', label: 'Attire' },
  { id: 'reminders', label: 'Reminders' },
  { id: 'rsvp', label: 'RSVP' }
] as const

const { activeSection } = useScrollSpy(
  ['details', 'schedule', 'entourage', 'gallery', 'venue', 'dresscode', 'reminders', 'rsvp'],
  140
)

const mobileMenu = ref(false)

const toggleMenu = () => {
  mobileMenu.value = !mobileMenu.value
}

const closeMenu = () => {
  mobileMenu.value = false
}

const { couple } = weddingInfo
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-beige/60 bg-cream/95 shadow-soft backdrop-blur transition">
    <div class="hidden md:block">
      <div class="mx-auto flex max-w-wedding items-center justify-between py-3 px-6">
        <a href="#hero" class="font-serif-display text-lg text-burgundy md:text-xl">
          {{ couple.combined }}
        </a>

        <div class="flex gap-6 md:gap-8">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="'#' + item.id"
            :class="[
              'text-[13px] font-medium uppercase tracking-[0.18em] transition',
              activeSection === item.id
                ? 'font-bold text-burgundy underline decoration-2 underline-offset-8 decoration-gold'
                : 'text-burgundy/80 hover:text-burgundy'
            ]"
          >
            {{ item.label }}
          </a>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between py-3 px-5 md:hidden">
      <a href="#hero" class="font-serif-display text-lg text-burgundy">
        {{ couple.combined }}
      </a>

      <button
        aria-label="Open menu"
        class="flex h-10 w-10 items-center justify-center rounded-full border border-burgundy/20 text-burgundy"
        @click="toggleMenu"
      >
        <svg
          v-if="!mobileMenu"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div
      v-if="mobileMenu"
      class="absolute inset-x-0 top-full border-b border-beige/60 bg-cream shadow-soft md:hidden"
    >
      <div class="flex flex-col">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="'#' + item.id"
          class="border-b border-beige/40 px-6 py-4 text-sm uppercase tracking-[0.18em] text-burgundy"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </nav>
</template>
