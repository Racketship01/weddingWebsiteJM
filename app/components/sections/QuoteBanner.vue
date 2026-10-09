<script setup lang="ts">
import weddingInfo from '../../data/wedding'
import QuoteBannerPhoto from '../../assets/image/JM8.jpg'
</script>

<template>
  <section class="relative flex min-h-[320px] items-center justify-center overflow-hidden sm:min-h-[420px] md:min-h-[560px]">
    <div
      class="absolute inset-0 bg-[length:100%_auto] sm:bg-cover bg-center sm:bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${QuoteBannerPhoto})` }"
    ></div>
    <div class="absolute inset-0 bg-black/55"></div>

    <div class="relative z-10 max-w-3xl px-6 text-center">
      <div
        v-for="(line, index) in weddingInfo.quote"
        :key="index"
        class="font-script text-4xl italic leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-7xl"
      >
        {{ line }}
      </div>
    </div>
  </section>
</template>
