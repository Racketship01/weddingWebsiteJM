<script setup lang="ts">
import HeroSection from '../components/sections/HeroSection.vue'
import StickyNavigation from '../components/sections/StickyNavigation.vue'
import WeddingDetails from '../components/sections/WeddingDetails.vue'
import CountdownTimer from '../components/sections/CountdownTimer.vue'
import InvitationMessage from '../components/sections/InvitationMessage.vue'
import QuoteBanner from '../components/sections/QuoteBanner.vue'
import WeddingTimeline from '../components/sections/WeddingTimeline.vue'
import EntourageSection from '../components/sections/EntourageSection.vue'
import GallerySection from '../components/sections/GallerySection.vue'
import VenueSection from '../components/sections/VenueSection.vue'
import DressCodeSection from '../components/sections/DressCodeSection.vue'
import GiftsSection from '../components/sections/GiftsSection.vue'
import RemindersSection from '../components/sections/RemindersSection.vue'
import RsvpForm from '../components/sections/RsvpForm.vue'
import SiteFooter from '../components/sections/SiteFooter.vue'
</script>

<template>
  <div>
    <header>
      <HeroSection />
    </header>

    <StickyNavigation />

    <main>
      <WeddingDetails id="details" />
      <CountdownTimer id="countdown" />
      <InvitationMessage id="message" />
      <QuoteBanner />
      <WeddingTimeline id="schedule" />
      <EntourageSection id="entourage" />
      <GallerySection id="gallery" />
      <VenueSection id="venue" />
      <DressCodeSection id="dresscode" />
      <GiftsSection id="gifts" />
      <RemindersSection id="reminders" />
      <RsvpForm id="rsvp" />
    </main>

    <SiteFooter />
  </div>
</template>
