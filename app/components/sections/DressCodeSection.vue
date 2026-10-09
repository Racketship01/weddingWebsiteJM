<script setup lang="ts">
import weddingInfo from '../../data/wedding'
import dressCodeImage from '~/assets/image/dressCode.jpg'

import { useFadeOnScroll } from '../../composables/useFadeOnScroll'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

const { dressCode } = weddingInfo

const showModal = ref(false)
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="bg-warmWhite section-padding relative overflow-hidden"
  >
    

    <div class="relative z-10 max-w-3xl mx-auto">
      <h2 class="font-serif-display text-4xl md:text-5xl text-text text-center mb-10">
        {{ dressCode.heading }}
      </h2>

      <div
        class="card-bordered p-5 md:p-7 shadow-card cursor-pointer group relative transition-transform duration-500 group-hover:scale-[1.01]"
        @click="showModal = true"
      >
        <div class="relative overflow-hidden rounded-xl">
          <img
            :src="dressCodeImage"
            alt="Wedding dress code guide"
            loading="lazy"
            class="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
          <div
            class="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-lg px-4 py-3 text-center"
          >
            <p class="font-serif-body text-lg md:text-xl text-text">
              {{ dressCode.note }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- <UModal
      v-model:open="showModal"
      aria-labelledby="dresscode-title"
      aria-modal="true"
      class="!bg-black/60 !p-4 sm:!p-8"
    >
      <h2 id="dresscode-title" class="sr-only">Attire guide</h2>
      <div class="relative max-w-5xl mx-auto p-2">
        <button
          type="button"
          aria-label="Close modal"
          class="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
          @click="showModal = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          :src="dressCodeImage"
          alt="Wedding dress code guide full size"
          class="max-h-[85vh] w-auto object-contain mx-auto rounded-xl shadow-card"
        />
      </div>
    </UModal> -->
  </section>
</template>
