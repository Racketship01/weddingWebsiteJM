<script setup lang="ts">
import { reactive, ref } from 'vue'
import weddingInfo from '../../data/wedding'
import { useFadeOnScroll } from '../../composables/useFadeOnScroll'
import cornerTop from '../../assets/image/corner.png'
import cornerDown from '../../assets/image/corner_down.png'

defineProps<{ id: string }>()

const { rootRef, visible } = useFadeOnScroll()

const { rsvp } = weddingInfo

const _toast = useToast()

const toast = new Proxy(_toast || {}, {
  get (target, prop) {
    const orig = target[prop]
    if (prop === 'add' || prop === 'update' || prop === 'remove' || prop === 'clear') {
      return function (this: any, ...args: any[]) {
        try {
          if (typeof orig === 'function') {
            return orig.apply(target, args)
          } else {
            const alt = (target as any).toasts?.value?.push
            if (prop === 'add' && typeof alt === 'function') {
              return (target as any).toasts.value.push(args[0])
            }
            __dbgClientReport('F', 'RsvpForm.vue:toast fallback', `[TOAST MISSING: ${String(prop)}]`, { args0: args[0] ? { title: (args[0] as any).title, color: (args[0] as any).color } : null, toastKeys: target ? Object.keys(target) : null })
            return args[0] ?? null
          }
        } catch (e: any) {
          __dbgClientReport('F', 'RsvpForm.vue:toast exception', `[TOAST FAILED: ${String(prop)}]`, { errMsg: e?.message })
          return args[0] ?? null
        }
      }
    }
    return orig
  }
})

const form = reactive({
  name: '',
  attendance: '',
  message: ''
})

const errors = reactive({
  name: '',
  attendance: ''
})

const isSubmitting = ref(false)
const serverError = ref('')

const __dbgClientReport = (hypothesisId: string, location: string, msg: string, data: any = {}) => {
  try {
    const body = JSON.stringify({ hypothesisId, location, msg, data, sessionId: 'rsvp-email-not-received', runId: 'post', ts: Date.now() })
    fetch('http://127.0.0.1:7778/event', { method: 'POST', body }).catch(() => {})
  } catch (_) {}
}

const submit = async () => {
  serverError.value = ''
  errors.name = form.name.trim().length < 2 ? rsvp.errorName : ''
  errors.attendance = !form.attendance ? rsvp.errorAttendance : ''

  if (errors.name || errors.attendance) {
    return
  }

  isSubmitting.value = true

  // #region debug-point D+E:client-submit
  __dbgClientReport('D', 'RsvpForm.vue:submit()', '[DEBUG] client submitting form via /api/rsvp', { name: form.name.slice(0, 30), attendance: form.attendance, msgLen: form.message.length })
  // #endregion

  try {
    const response = await $fetch('/api/rsvp', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        attendance: form.attendance,
        message: form.message.trim() || undefined
      }
    })

    if (response?.ok) {
      // #region debug-point D:client-ok
      __dbgClientReport('D', 'RsvpForm.vue:submit()', '[DEBUG] /api/rsvp response ok', { ok: response.ok, messageId: (response as any).messageId, accepted: (response as any).accepted })
      // #endregion
      toast.add({
        title: rsvp.successTitle,
        description: rsvp.successDescription,
        color: 'success',
        icon: 'i-heroicons-check-circle-20-solid',
        timeout: 6000
      })
      form.name = ''
      form.attendance = ''
      form.message = ''
    } else {
      throw new Error('Unexpected response')
    }
  } catch (err: any) {
    const message = err?.data?.statusMessage || err?.message || rsvp.submitError
    serverError.value = message

    // #region debug-point D+E:client-err
    __dbgClientReport('E', 'RsvpForm.vue:submit()', '[DEBUG] /api/rsvp caught error in client', { status: err?.status, statusText: err?.statusText, statusMessage: err?.data?.statusMessage, errMsg: err?.message, errName: err?.name })
    // #endregion

    toast.add({
      title: rsvp.errorTitle,
      description: message,
      color: 'error',
      icon: 'i-heroicons-exclamation-triangle-20-solid',
      timeout: 8000
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section
    :id="id"
    ref="rootRef"
    :class="{ 'is-visible': visible, 'fade-section': true }"
    class="relative section-padding overflow-hidden"
  >
    <div class="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-700 to-primary-800" />

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

    <div class="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div class="text-white/95 text-center">
        <div class="font-script text-3xl md:text-4xl text-champagne-light mb-3">{{ rsvp.label }}</div>
        <h2 class="font-serif-display text-5xl md:text-6xl text-white mb-6">{{ rsvp.heading }}</h2>
        <p class="font-serif-body text-xl md:text-2xl text-white/85">{{ rsvp.note }}</p>
      </div>

      <div class="rsvp-card card-bordered bg-warmWhite rounded-2xl p-7 md:p-10 shadow-card">
        <UForm @submit.prevent="submit" :state="form">
          <UFormGroup label-for="name" mb-6>
            <label for="name" class="text-text font-serif-body text-lg mb-2 block">
              {{ rsvp.nameLabel }}
            </label>
            <UInput
              id="name"
              v-model="form.name"
              data-rsvp-field="name"
              size="lg"
              rounded="full"
              :ui="{
                base: 'border border-beige focus:ring focus:ring-champagne/40 bg-transparent shadow-none',
                input: 'bg-transparent text-text font-serif-body text-base placeholder:text-text-light/70 caret-text',
                wrapper: 'bg-transparent',
                placeholder: 'text-text-light/70'
              }"
              class="bg-transparent"
              :style="{ color: '#4A4A4A', caretColor: '#4A4A4A' }"
              :aria-invalid="!!errors.name"
              :aria-describedby="errors.name ? 'name-error' : undefined"
            />
            <p v-if="errors.name" id="name-error" class="text-sm text-rose-600 mt-2">{{ errors.name }}</p>
          </UFormGroup>

          <UFormGroup mb-6>
            <label class="block font-serif-body text-lg mb-3 text-text">
              {{ rsvp.attendanceLabel }}
            </label>
            <div
              role="radiogroup"
              aria-labelledby="attendance-label"
              aria-required="true"
              class="flex flex-row flex-wrap items-center gap-x-8 gap-y-2 font-serif-body text-base text-text"
            >
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="accept"
                  v-model="form.attendance"
                  class="h-4 w-4 appearance-none rounded-full border border-beige bg-transparent p-0 align-middle shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-0 checked:border-champagne checked:bg-[radial-gradient(circle,var(--wedding-champagne)_45%,transparent_48%)]"
                  :aria-checked="form.attendance === 'accept'"
                />
                <span :class="form.attendance === 'accept' ? 'text-primary font-medium' : ''">
                  {{ rsvp.acceptOption }}
                </span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="attendance"
                  value="decline"
                  v-model="form.attendance"
                  class="h-4 w-4 appearance-none rounded-full border border-beige bg-transparent p-0 align-middle shadow-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-champagne/40 focus:ring-offset-0 checked:border-champagne checked:bg-[radial-gradient(circle,var(--wedding-champagne)_45%,transparent_48%)]"
                  :aria-checked="form.attendance === 'decline'"
                />
                <span :class="form.attendance === 'decline' ? 'text-primary font-medium' : ''">
                  {{ rsvp.declineOption }}
                </span>
              </label>
            </div>
            <p v-if="errors.attendance" id="attendance-error" class="text-sm text-rose-600 mt-2">
              {{ errors.attendance }}
            </p>
          </UFormGroup>

          <UFormGroup mb-8>
            <label class="block font-serif-body text-lg mb-2 text-text">
              {{ rsvp.messageLabel }}
              <span class="text-gold text-sm"> (optional)</span>
            </label>
            <UTextarea
              v-model="form.message"
              data-rsvp-field="message"
              :rows="5"
              size="lg"
              rounded="lg"
              :ui="{
                base: 'border border-beige focus:ring focus:ring-champagne/40 bg-cream/60 shadow-none w-full',
                textarea: 'bg-cream/60 text-text font-serif-body text-base placeholder:text-text-light/70 caret-text min-h-[140px]',
                placeholder: 'text-text-light/70'
              }"
              class="w-full"
              :style="{ color: '#4A4A4A', caretColor: '#4A4A4A' }"
            />
          </UFormGroup>

          <p
            v-if="serverError"
            class="mb-6 text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl p-3"
            role="alert"
          >
            {{ serverError }}
          </p>

          <UButton
            type="submit"
            variant="solid"
            color="neutral"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            class="w-full bg-champagne hover:bg-gold text-warmWhite rounded-full py-3 mt-6 text-sm tracking-widest uppercase disabled:opacity-70 disabled:cursor-not-allowed"
            block
            size="lg"
          >
            <template #leading v-if="isSubmitting">
              <UIcon name="i-heroicons-arrow-path-20-solid" class="animate-spin" />
            </template>
            {{ isSubmitting ? rsvp.submittingLabel : rsvp.submitLabel }}
          </UButton>
        </UForm>
      </div>
    </div>
  </section>
</template>
