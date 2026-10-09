<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  size?: string
  variant?: 'corner-tl' | 'corner-tr' | 'corner-bl' | 'corner-br'
}

const { size, variant } = withDefaults(defineProps<Props>(), {
  size: '160px',
  variant: 'corner-tl'
})

const wrapperClasses = computed(() => {
  const base = 'absolute pointer-events-none'
  switch (variant) {
    case 'corner-tl':
      return `${base} top-0 left-0`
    case 'corner-tr':
      return `${base} top-0 right-0 rotate-90`
    case 'corner-bl':
      return `${base} bottom-0 left-0 scale-y-[-1]`
    case 'corner-br':
      return `${base} bottom-0 right-0 rotate-180`
    default:
      return base
  }
})
</script>

<template>
  <div :class="wrapperClasses" :style="{ width: size, height: size }">
    <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" fill="none" width="100%" height="100%">
      <g transform="translate(-2, -72)">
        <path d="M20,280 C40,240 60,200 90,170 C110,150 130,140 160,135" stroke="#C9A46A" stroke-width="1.2" stroke-linecap="round" />
        <path d="M90,170 C100,160 115,152 140,148" stroke="#BFD6E5" stroke-width="1" stroke-linecap="round" />
        <path d="M160,135 C150,120 140,110 130,100" stroke="#D8C09A" stroke-width="1" stroke-linecap="round" />
        <path d="M55,230 L70,215" stroke="#BFD6E5" stroke-width="1" stroke-linecap="round" />
        <path d="M75,205 L95,190" stroke="#D8C09A" stroke-width="1" stroke-linecap="round" />
        <path d="M115,165 L130,155" stroke="#C9A46A" stroke-width="1" stroke-linecap="round" />
        <path d="M140,148 L155,140" stroke="#BFD6E5" stroke-width="1" stroke-linecap="round" />

        <path d="M18,278 C22,270 30,264 38,262 C30,258 22,252 20,244 C18,252 10,258 2,262 C10,264 18,270 18,278Z" fill="#BFD6E5" />
        <circle cx="20" cy="262" r="3" fill="#C9A46A" />

        <path d="M65,222 C70,214 78,208 86,206 C78,202 70,196 68,188 C66,196 58,202 50,206 C58,208 66,214 65,222Z" fill="#D8C09A" />
        <circle cx="68" cy="206" r="3" fill="#C9A46A" />

        <path d="M108,170 C113,162 121,156 129,154 C121,150 113,144 111,136 C109,144 101,150 93,154 C101,156 109,162 108,170Z" fill="#BFD6E5" />
        <circle cx="111" cy="154" r="3" fill="#C9A46A" />

        <path d="M150,130 C155,122 163,116 171,114 C163,110 155,104 153,96 C151,104 143,110 135,114 C143,116 151,122 150,130Z" fill="#D8C09A" />
        <circle cx="153" cy="114" r="3" fill="#C9A46A" />

        <path d="M35,248 C42,240 52,236 62,238 C52,232 44,224 42,214 C40,224 30,232 22,238 C32,236 38,240 35,248Z" fill="#C9A46A" opacity="0.9" />
        <circle cx="42" cy="234" r="2" fill="#D8C09A" />

        <path d="M130,100 C138,94 150,92 162,96 C152,90 144,82 142,72 C140,82 130,90 122,96 C132,94 132,96 130,100Z" fill="#BFD6E5" opacity="0.9" />
        <circle cx="142" cy="92" r="2" fill="#D8C09A" />

        <path d="M88,195 L92,185 L102,188 L96,198Z" fill="#BFD6E5" opacity="0.8" />
        <path d="M55,240 L58,230 L68,233 L62,243Z" fill="#D8C09A" opacity="0.8" />
        <path d="M128,155 L132,145 L142,148 L136,158Z" fill="#C9A46A" opacity="0.8" />
        <path d="M30,268 L34,258 L44,261 L38,271Z" fill="#D8C09A" opacity="0.8" />

        <path d="M78,210 C80,200 86,195 94,194" stroke="#BFD6E5" stroke-width="0.8" stroke-linecap="round" opacity="0.7" />
        <path d="M40,252 C44,246 52,242 62,242" stroke="#D8C09A" stroke-width="0.8" stroke-linecap="round" opacity="0.7" />
        <path d="M118,162 C122,156 132,152 142,152" stroke="#C9A46A" stroke-width="0.8" stroke-linecap="round" opacity="0.7" />
        <path d="M158,128 C162,120 172,116 184,116" stroke="#BFD6E5" stroke-width="0.8" stroke-linecap="round" opacity="0.7" />

        <circle cx="180" cy="110" r="2" fill="#C9A46A" />
        <circle cx="192" cy="105" r="1.5" fill="#BFD6E5" />
        <circle cx="10" cy="285" r="2" fill="#D8C09A" />
        <circle cx="5" cy="268" r="1.5" fill="#BFD6E5" />

        <path d="M200,96 C210,92 224,90 240,92" stroke="#D8C09A" stroke-width="0.6" stroke-linecap="round" opacity="0.6" />
        <path d="M10,296 C16,290 26,286 40,286" stroke="#C9A46A" stroke-width="0.6" stroke-linecap="round" opacity="0.6" />
      </g>
    </svg>
  </div>
</template>
