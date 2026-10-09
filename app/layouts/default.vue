<script setup lang="ts">
import weddingInfo from '../data/wedding'
import { ref, onMounted, onUnmounted } from 'vue'


useSeoMeta({
  title: weddingInfo.seo.title,
  ogTitle: weddingInfo.seo.title,
  description: weddingInfo.seo.description,
  ogDescription: weddingInfo.seo.description,
  ogImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=630&fit=crop',
  ogType: 'website',
  twitterCard: 'summary_large_image'
})

useHead({
  bodyAttrs: {
    class: 'bg-warmWhite text-text'
  }
})

const showBackToTop = ref(false)

const handleScroll = () => {
  showBackToTop.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo(0, 0)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <slot />

  <button
    aria-label="Back to top"
    class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-champagne text-white shadow-lg flex items-center justify-center transition-all duration-300 md:bottom-8 md:right-8 lg:bottom-10 lg:right-10"
    :class="[
      showBackToTop ? 'opacity-100 visible' : 'opacity-0 invisible'
    ]"
    @click="scrollToTop"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
    </svg>
  </button>
</template>
