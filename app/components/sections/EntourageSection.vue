<script setup lang="ts">
import weddingInfo from '../../data/wedding'

import { useFadeOnScroll } from '../../composables/useFadeOnScroll'
import cornerTop from '../../assets/image/corner.png'
import cornerDown from '../../assets/image/corner_down.png'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

const { entourage } = weddingInfo
const { principalSponsors } = entourage

const parentsBride = entourage.groups.find((g) => g.id === 'parents-bride')!
const parentsGroom = entourage.groups.find((g) => g.id === 'parents-groom')!
const maidOfHonor = entourage.groups.find((g) => g.id === 'maid-of-honor')!
const bestMan = entourage.groups.find((g) => g.id === 'best-man')!
const bridesmaids = entourage.groups.find((g) => g.id === 'bridesmaids')!
const groomsmen = entourage.groups.find((g) => g.id === 'groomsmen')!
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="relative section-padding overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-700" />
    <div
      class="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:24px_24px]"
    />

    <img
      :src="cornerTop"
      alt="Floral corner decoration"
      class="z-5 pointer-events-none absolute -top-2 -left-2 h-40 w-40 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:top-0 sm:left-0 sm:h-56 sm:w-56 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />
    <img
      :src="cornerDown"
      alt="Floral corner decoration"
      class="z-5 pointer-events-none absolute -bottom-3 -right-3 h-44 w-44 max-w-[40vw] max-h-[40vw] object-contain opacity-95 sm:bottom-0 sm:right-0 sm:h-60 sm:w-60 sm:max-w-none sm:max-h-none md:h-72 md:w-72 lg:h-80 lg:w-80"
    />

    <div class="relative z-10">
      <header class="text-center max-w-3xl mx-auto mb-16">
        <div class="text-sans-small-caps text-white/90 mb-5">{{ entourage.label }}</div>
        <h2 class="font-serif-display text-4xl md:text-6xl text-white mb-5">{{ entourage.heading }}</h2>
        <p class="font-serif-body text-lg md:text-xl text-white/85">{{ entourage.supporting }}</p>
      </header>

      <div class="md:hidden space-y-10">
        <div class="space-y-5">
          <h3 class="font-script text-2xl sm:text-3xl text-champagne-light text-center">Parents</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
              <div class="text-sans-small-caps text-champagne-light mb-3 text-center">{{ parentsBride.label }}</div>
              <ul class="flex flex-col gap-3">
                <li v-for="person in parentsBride.people" :key="person.name" class="font-serif-body text-lg text-center">{{ person.name }}</li>
              </ul>
            </div>
            <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
              <div class="text-sans-small-caps text-champagne-light mb-3 text-center">{{ parentsGroom.label }}</div>
              <ul class="flex flex-col gap-3">
                <li v-for="person in parentsGroom.people" :key="person.name" class="font-serif-body text-lg text-center">{{ person.name }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          <h3 class="font-script text-2xl sm:text-3xl text-champagne-light text-center">Wedding Party</h3>
          <div class="space-y-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
                <div class="text-sans-small-caps text-champagne-light mb-3 text-center">{{ maidOfHonor.label }}</div>
                <ul class="flex flex-col gap-3">
                  <li v-for="person in maidOfHonor.people" :key="person.name" class="font-serif-body text-lg text-center">{{ person.name }}</li>
                </ul>
              </div>
              <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
                <div class="text-sans-small-caps text-champagne-light mb-3 text-center">{{ bestMan.label }}</div>
                <ul class="flex flex-col gap-3">
                  <li v-for="person in bestMan.people" :key="person.name" class="font-serif-body text-lg text-center">{{ person.name }}</li>
                </ul>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
                <div class="text-sans-small-caps text-champagne-light mb-3 text-center">{{ bridesmaids.label }}</div>
                <ul class="grid grid-cols-2 gap-2">
                  <li v-for="person in bridesmaids.people" :key="person.name" class="font-serif-body text-base text-center">{{ person.name }}</li>
                </ul>
              </div>
              <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
                <div class="text-sans-small-caps text-champagne-light mb-3 text-center">{{ groomsmen.label }}</div>
                <ul class="grid grid-cols-2 gap-2">
                  <li v-for="person in groomsmen.people" :key="person.name" class="font-serif-body text-base text-center">{{ person.name }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          <h3 class="font-script text-2xl sm:text-3xl text-champagne-light text-center">Ninongs &amp; Ninangs</h3>
          <div class="grid grid-cols-2 gap-4">
            <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
              <div class="text-sans-small-caps text-champagne-light mb-3">Ninongs</div>
              <ul class="flex flex-col gap-2 font-serif-body text-white text-sm">
                <li v-for="n in principalSponsors.ninongs" :key="n">{{ n }}</li>
              </ul>
            </div>
            <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
              <div class="text-sans-small-caps text-champagne-light mb-3">Ninangs</div>
              <ul class="flex flex-col gap-2 font-serif-body text-white text-sm">
                <li v-for="n in principalSponsors.ninangs" :key="n">{{ n }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="space-y-5">
          <h3 class="font-script text-2xl sm:text-3xl text-champagne-light text-center">Bearers &amp; Attendants</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
              <div class="text-sans-small-caps text-champagne-light mb-3 text-center">Ring Bearer</div>
              <div class="font-serif-body text-lg text-center">{{ entourage.other.ringBearer }}</div>
            </div>
            <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-5 rounded-xl">
              <div class="text-sans-small-caps text-champagne-light mb-3 text-center">
                Flower Girl{{ entourage.other.flowerGirls.length > 1 ? 's' : '' }}
              </div>
              <ul class="flex flex-col gap-2">
                <li v-for="fg in entourage.other.flowerGirls" :key="fg" class="font-serif-body text-lg text-center">{{ fg }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden md:block">
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div
            v-for="group in [parentsBride, parentsGroom, maidOfHonor, bestMan]"
            :key="group.id"
            class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl"
          >
            <div class="text-sans-small-caps text-champagne-light mb-4 text-center">{{ group.label }}</div>
            <ul class="flex flex-col gap-3">
              <li
                v-for="person in group.people"
                :key="person.name"
                class="font-serif-body text-lg text-center"
              >
                {{ person.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl">
            <div class="text-sans-small-caps text-champagne-light mb-4 text-center">{{ bridesmaids.label }}</div>
            <ul class="grid grid-cols-2 gap-x-4 gap-y-3">
              <li
                v-for="person in bridesmaids.people"
                :key="person.name"
                class="font-serif-body text-lg text-center"
              >
                {{ person.name }}
              </li>
            </ul>
          </div>
          <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl">
            <div class="text-sans-small-caps text-champagne-light mb-4 text-center">{{ groomsmen.label }}</div>
            <ul class="grid grid-cols-2 gap-x-4 gap-y-3">
              <li
                v-for="person in groomsmen.people"
                :key="person.name"
                class="font-serif-body text-lg text-center"
              >
                {{ person.name }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mb-12">
          <h3 class="font-script text-3xl md:text-4xl text-champagne-light mb-8 text-center">Ninongs & Ninangs</h3>
          <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div class="card-bordered bg-white/10 p-6 border border-white/20 rounded-xl backdrop-blur-sm">
              <div class="text-sans-small-caps text-champagne-light mb-4">Ninongs</div>
              <ul class="flex flex-col gap-2 font-serif-body text-white">
                <li v-for="ninong in principalSponsors.ninongs" :key="ninong">{{ ninong }}</li>
              </ul>
            </div>
            <div class="card-bordered bg-white/10 p-6 border border-white/20 rounded-xl backdrop-blur-sm">
              <div class="text-sans-small-caps text-champagne-light mb-4">Ninangs</div>
              <ul class="flex flex-col gap-2 font-serif-body text-white">
                <li v-for="ninang in principalSponsors.ninangs" :key="ninang">{{ ninang }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl">
            <div class="text-sans-small-caps text-champagne-light mb-4 text-center">Ring Bearer</div>
            <div class="font-serif-body text-lg text-center">{{ entourage.other.ringBearer }}</div>
          </div>
          <div class="card-bordered bg-white/10 backdrop-blur-sm border border-white/20 text-white p-6 rounded-xl">
            <div class="text-sans-small-caps text-champagne-light mb-4 text-center">
              Flower Girl{{ entourage.other.flowerGirls.length > 1 ? 's' : '' }}
            </div>
            <ul class="flex flex-col gap-3">
              <li
                v-for="fg in entourage.other.flowerGirls"
                :key="fg"
                class="font-serif-body text-lg text-center"
              >
                {{ fg }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
