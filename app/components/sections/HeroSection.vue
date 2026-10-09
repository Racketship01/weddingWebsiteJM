<script setup lang="ts">
import weddingInfo from '../../data/wedding'
import heroBg from '../../assets/image/JM5.jpg'
import cornerTop from '../../assets/image/corner.png'
import cornerDown from '../../assets/image/corner_down.png'

const scrollToDetails = () => {
  const target = document.getElementById('details')
  if (target) {
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' })
  }
}

const { couple, date, hashtag, heroLabel, heroSupporting, heroCta } = weddingInfo
</script>

<template>
  <section id="hero" class="relative min-h-screen w-full overflow-hidden">
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat bg-primary-700"
      :style="{
        backgroundImage: `url(${heroBg})`
      }"
    />
    <div class="absolute inset-0 bg-gradient-to-br from-primary-600/85 via-primary-500/70 to-powderBlue-soft/55" />

    <div class="pointer-events-none absolute inset-3 z-20 rounded-sm border border-white/20 sm:inset-5 md:inset-10 lg:inset-14 md:border-white/25" />

    <img
      :src="cornerTop"
      alt="Floral corner decoration"
      class="z-20 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[45vw] max-h-[45vw] object-contain sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />
    <img
      :src="cornerDown"
      alt="Floral corner decoration"
      class="z-20 pointer-events-none absolute -bottom-2 -right-2 h-40 w-40 max-w-[45vw] max-h-[45vw] object-contain sm:bottom-0 sm:right-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />

    <div class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-20 pb-28 text-center sm:px-6 md:px-10">
      <div class="text-[11px] mb-4 tracking-[0.25em] uppercase text-white/90 sm:text-sans-small-caps sm:mb-6 md:mb-8 md:text-[13px]">
        {{ heroLabel }}
      </div>

      <h1 class="mb-3 font-serif-display leading-none text-white text-[2.75rem] sm:mb-4 sm:text-5xl sm:leading-tight md:mb-6 md:text-7xl lg:text-8xl">
        {{ couple.combined }}
      </h1>

      <p class="mb-5 max-w-xl font-serif-body text-base italic leading-relaxed text-white/90 sm:mb-6 sm:text-lg md:mb-8 md:max-w-2xl md:text-xl lg:text-2xl">
        {{ heroSupporting }}
      </p>

      <div class="mb-3 text-[11px] tracking-[0.2em] uppercase text-white/85 sm:text-sans-small-caps md:mb-4 md:text-[13px]">
        {{ date.fullDate }}
      </div>

      <div class="mb-8 font-script text-xl text-champagne-light sm:mb-10 sm:text-2xl md:text-3xl">
        {{ hashtag }}
      </div>

      <UButton
        rounded-full
        class="bg-champagne px-7 py-3 text-[11px] tracking-[0.2em] uppercase text-warmWhite transition hover:bg-gold sm:px-10 sm:py-4 sm:text-sm md:px-12"
        @click="scrollToDetails"
      >
        {{ heroCta }}
      </UButton>
    </div>

    <!-- <div
      class="z-30 absolute bottom-40 right-3 flex h-20 w-20 flex-col items-center justify-center rounded-full bg-primary-900/85 shadow-card backdrop-blur-sm ring-1 ring-champagne/40 sm:bottom-44 sm:right-5 sm:h-24 sm:w-24 sm:ring-2 md:bottom-28 md:right-16 md:h-28 md:w-28 lg:h-32 lg:w-32"
    >
      <div class="text-[8px] uppercase tracking-[0.2em] text-champagne-light sm:text-[10px] md:text-[11px]">
        {{ date.month }}
      </div>
      <div class="font-serif-display text-2xl font-bold leading-none text-warmWhite sm:text-3xl md:text-3xl lg:text-4xl">
        {{ date.day }}
      </div>
      <div class="text-[8px] uppercase tracking-[0.2em] text-champagne-light sm:text-[10px] md:text-[11px]">
        {{ date.year }}
      </div>
    </div> -->

    <button
      aria-label="Scroll down"
      class="z-20 absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 animate-bounce sm:bottom-8 md:bottom-10"
      @click="scrollToDetails"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 sm:h-8 sm:w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  </section>
</template>
