<script setup lang="ts">
import weddingInfo from '../../data/wedding'
import { useCountdown } from '../../composables/useCountdown'
import CountdownPhoto from '../../assets/image/JM2.jpg'

defineProps<{ id: string }>()

const countdown = useCountdown(weddingInfo.countdown.target)


</script>

<template>
  <section
    :id="id"
    class="relative h-auto overflow-hidden px-6 py-24 md:py-32"
  >
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${CountdownPhoto})` }"
    ></div>
    <div class="absolute inset-0 bg-gradient-to-b from-primary-600/85 via-primary-500/80 to-primary-600/85"></div>

    <div class="relative z-10 mx-auto max-w-4xl text-center">
      <div class="mb-6 text-sans-small-caps text-white/90">
        {{ weddingInfo.countdown.label }}
      </div>
      <h2 class="mb-14 font-serif-display text-4xl text-white md:text-6xl">
        {{ weddingInfo.countdown.heading }}
      </h2>

      <div aria-live="polite">
        <div v-if="!countdown.isDone" class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-10">
          <div class="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md md:h-36 md:w-36">
            <span class="font-serif-display text-4xl font-bold md:text-5xl">{{ countdown.days }}</span>
            <span class="mt-1 text-[10px] text-white/80 md:text-xs text-sans-small-caps">Days</span>
          </div>
          <div class="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md md:h-36 md:w-36">
            <span class="font-serif-display text-4xl font-bold md:text-5xl">{{ countdown.hours }}</span>
            <span class="mt-1 text-[10px] text-white/80 md:text-xs text-sans-small-caps">Hours</span>
          </div>
          <div class="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md md:h-36 md:w-36">
            <span class="font-serif-display text-4xl font-bold md:text-5xl">{{ countdown.minutes }}</span>
            <span class="mt-1 text-[10px] text-white/80 md:text-xs text-sans-small-caps">Minutes</span>
          </div>
          <div class="mx-auto flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md md:h-36 md:w-36">
            <span class="font-serif-display text-4xl font-bold md:text-5xl">{{ countdown.seconds }}</span>
            <span class="mt-1 text-[10px] text-white/80 md:text-xs text-sans-small-caps">Seconds</span>
          </div>
        </div>
        <div v-else class="py-10 font-script text-4xl text-champagne-light md:text-6xl" aria-live="polite">
          {{ weddingInfo.countdown.doneMessage }}
        </div>
      </div>
    </div>
  </section>
</template>
