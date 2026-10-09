<script setup lang="ts">
import weddingInfo from '../../data/wedding'
import { useFadeOnScroll } from '../../composables/useFadeOnScroll'
import weddingDetailsPhoto from '../../assets/image/JM.jpg'
import cornerDown from '../../assets/image/corner_down.png'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

// const imgUrl = (prompt: string, size: string = 'landscape_16_9') =>
//   `https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=${encodeURIComponent(prompt)}&image_size=${size}`

const {
  couple,
  date,
  times,
  address,
  venues,
  detailsLabel,
  detailsHeading,
  detailsPhotoCaption,
  invitationParagraph,
  addToCalendarLabel,
  viewDirectionsLabel
} = weddingInfo

const icsEscape = (s: string): string =>
  String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n')

const addToCalendar = () => {
  const start = '20261127T070000Z'
  const end = '20261127T130000Z'
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, 'Z')

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Julius & Mariel Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${now}@wedding-jm`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${icsEscape(`${couple.combined} Wedding`)}`,
    `LOCATION:${icsEscape(address.full)}`,
    `DESCRIPTION:${icsEscape('Join us for our wedding celebration.')}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n')

  const dataUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = `${couple.groom}-${couple.bride}-wedding.ics`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${address.mapsQuery}`
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="bg-cream section-padding relative overflow-hidden"
  >
    <img
      :src="cornerDown"
      alt="Floral corner decoration"
      class="z-10 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />

    <div class="section-container relative z-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div class="relative">
        <img
          :src="weddingDetailsPhoto"
          alt="Julius and Mariel wedding portrait"
          class="aspect-[4/5] w-full rounded-lg border-8 border-warmWhite object-cover shadow-card"
        />
        <p class="mt-6 text-center font-script text-2xl text-gold md:text-3xl">
          {{ detailsPhotoCaption }}
        </p>
      </div>

      <div>
        <div class="mb-3 font-script text-3xl text-gold md:text-4xl">
          {{ detailsLabel }}
        </div>

        <h2 class="mb-6 font-serif-display text-4xl text-text md:text-5xl">
          {{ detailsHeading }}
        </h2>

        <p class="mb-10 font-serif-body text-lg leading-relaxed text-text-soft md:text-xl">
          {{ invitationParagraph }}
        </p>

        <div class="flex flex-col gap-5">
          <div class="grid grid-cols-[110px_1fr] items-baseline gap-4">
            <span class="text-sans-small-caps text-gold/90">Date</span>
            <span class="font-serif-body text-lg text-text">{{ date.fullDate }}</span>
          </div>

          <USeparator variant="horizontal" soft class="!bg-beige/60" />

          <div class="grid grid-cols-[110px_1fr] items-baseline gap-4">
            <span class="text-sans-small-caps text-gold/90">Arrival</span>
            <span class="font-serif-body text-lg text-text">{{ times.arrival }}</span>
          </div>

          <USeparator variant="horizontal" soft class="!bg-beige/60" />

          <div class="grid grid-cols-[110px_1fr] items-baseline gap-4">
            <span class="text-sans-small-caps text-gold/90">Ceremony</span>
            <span class="font-serif-body text-lg text-text">{{ times.ceremony }} · {{ venues.ceremony.name }}</span>
          </div>

          <USeparator variant="horizontal" soft class="!bg-beige/60" />

          <div class="grid grid-cols-[110px_1fr] items-baseline gap-4">
            <span class="text-sans-small-caps text-gold/90">Reception</span>
            <span class="font-serif-body text-lg text-text">{{ times.reception }} · {{ venues.reception.name }}</span>
          </div>

          <USeparator variant="horizontal" soft class="!bg-beige/60" />

          <div class="grid grid-cols-[110px_1fr] items-baseline gap-4">
            <span class="text-sans-small-caps text-gold/90">Location</span>
            <span class="font-serif-body text-lg text-text">{{ address.full }}</span>
          </div>
        </div>

        <div class="mt-10 flex flex-wrap gap-4">
          <UButton
            variant="solid"
            color="neutral"
            rounded-full
            class="bg-champagne text-warmWhite hover:bg-gold"
            @click="addToCalendar"
          >
            {{ addToCalendarLabel }}
          </UButton>

          <UButton
            variant="outline"
            color="neutral"
            rounded-full
            :href="directionsUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ viewDirectionsLabel }}
          </UButton>
        </div>
      </div>
    </div>
  </section>
</template>
