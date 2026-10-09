<script setup lang="ts">
import weddingInfo from '../../data/wedding'
import VenuePhoto from '../../assets/image/paco2.png'
import VenuePhoto2 from '../../assets/image/paco.png'
import { useFadeOnScroll } from '../../composables/useFadeOnScroll'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

const imgUrl = (p: string, s: string = 'landscape_16_9') =>
  `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(p)}&image_size=${s}`

const { venues, venueSection } = weddingInfo
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="relative section-padding overflow-hidden"
  >
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{
        backgroundImage: `url(${VenuePhoto})`
      }"
    />
    <div class="absolute inset-0 bg-gradient-to-br from-primary-800/90 via-primary-700/85 to-primary-800/95" />

    <div class="relative z-10 max-w-6xl mx-auto">
      <header
        class="max-w-3xl mx-auto bg-primary-700/70 backdrop-blur-md border border-white/15 rounded-3xl p-8 md:p-14 mb-14 text-center"
      >
        <div class="font-script text-3xl md:text-4xl text-champagne-light mb-3">{{ venueSection.label }}</div>
        <h2 class="font-serif-display text-4xl md:text-5xl text-white mb-5">{{ venueSection.heading }}</h2>
        <p class="font-serif-body text-lg md:text-xl text-white/90">{{ venueSection.supporting }}</p>
      </header>

      <div class="grid md:grid-cols-2 gap-8">
        <div class="card-bordered bg-warmWhite rounded-2xl overflow-hidden shadow-card">
          <img
            :src="VenuePhoto2"
            alt="Ceremony venue"
            loading="lazy"
            class="w-full h-56 object-cover"
          />
          <div class="p-7">
            <h3 class="font-serif-display text-2xl text-text mb-1">{{ venues.ceremony.name }}</h3>
            <div class="text-sans-small-caps text-gold mb-4">{{ venues.ceremony.time }}</div>

            <div
              class="h-36 rounded-lg relative bg-gradient-to-br from-powderBlue-soft/80 via-primary-100/70 to-beige/70 border border-champagne/30 overflow-hidden mb-5"
            >
              <svg
                class="absolute inset-0 w-full h-full"
                viewBox="0 0 400 144"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g stroke="rgba(74,74,74,0.12)" stroke-width="1">
                  <path d="M0,36 H400" />
                  <path d="M0,72 H400" />
                  <path d="M0,108 H400" />
                  <path d="M80,0 V144" />
                  <path d="M160,0 V144" />
                  <path d="M240,0 V144" />
                  <path d="M320,0 V144" />
                </g>
                <g stroke="rgba(74,74,74,0.08)" stroke-width="0.7" stroke-linecap="round">
                  <path d="M40,20 C80,28 120,18 180,30" />
                  <path d="M200,90 C260,80 300,100 380,96" />
                  <path d="M60,110 C120,104 180,120 260,112" />
                </g>
              </svg>
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-primary-600 drop-shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.54 22.351a.75.75 0 0 0 .92 0C16.701 20.025 22 15.17 22 10.148 22 5.704 18.522 2 14.25 2 11.57 2 9.179 3.653 8 6.246 6.821 3.653 4.43 2 1.75 2-2.522 2 2 5.704 2 10.148c0 5.022 5.299 9.877 9.54 12.203Z"
                    clip-rule="evenodd"
                  />
                  <circle cx="12" cy="10" r="3" fill="#FFFDFC" />
                </svg>
              </div>
            </div>

            <UButton
              block
              variant="solid"
              color="neutral"
              class="bg-primary-500 hover:bg-primary-600 text-white rounded-full"
              :href="venues.ceremony.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ venueSection.ceremonyButton }}
            </UButton>
          </div>
        </div>

        <div class="card-bordered bg-warmWhite rounded-2xl overflow-hidden shadow-card">
          <img
            :src="imgUrl('modern events place ballroom interior reception elegant manila', 'landscape_4_3')"
            alt="Reception venue"
            loading="lazy"
            class="w-full h-56 object-cover"
          />
          <div class="p-7">
            <h3 class="font-serif-display text-2xl text-text mb-1">{{ venues.reception.name }}</h3>
            <div class="text-sans-small-caps text-gold mb-4">{{ venues.reception.time }}</div>

            <div
              class="h-36 rounded-lg relative bg-gradient-to-br from-beige/80 via-champagne-light/60 to-warmWhite/70 border border-champagne/30 overflow-hidden mb-5"
            >
              <svg
                class="absolute inset-0 w-full h-full"
                viewBox="0 0 400 144"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <g stroke="rgba(74,74,74,0.12)" stroke-width="1">
                  <path d="M0,30 H400" />
                  <path d="M0,72 H400" />
                  <path d="M0,114 H400" />
                  <path d="M100,0 V144" />
                  <path d="M200,0 V144" />
                  <path d="M300,0 V144" />
                </g>
                <g stroke="rgba(74,74,74,0.08)" stroke-width="0.7" stroke-linecap="round">
                  <path d="M20,60 C80,50 140,70 200,58" />
                  <path d="M160,120 C240,110 300,130 400,118" />
                  <path d="M40,20 C100,30 160,10 260,24" />
                </g>
              </svg>
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-primary-600 drop-shadow"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M11.54 22.351a.75.75 0 0 0 .92 0C16.701 20.025 22 15.17 22 10.148 22 5.704 18.522 2 14.25 2 11.57 2 9.179 3.653 8 6.246 6.821 3.653 4.43 2 1.75 2-2.522 2 2 5.704 2 10.148c0 5.022 5.299 9.877 9.54 12.203Z"
                    clip-rule="evenodd"
                  />
                  <circle cx="12" cy="10" r="3" fill="#FFFDFC" />
                </svg>
              </div>
            </div>

            <UButton
              block
              variant="solid"
              color="neutral"
              class="bg-primary-500 hover:bg-primary-600 text-white rounded-full"
              :href="venues.reception.mapsUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ venueSection.receptionButton }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
