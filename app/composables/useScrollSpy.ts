import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sectionIds: string[], offset: number = 120) {
  const activeSection = ref<string>(sectionIds[0] ?? '')

  let scrollListener: (() => void) | null = null

  const updateActive = () => {
    const scrollPos = window.scrollY + offset
    let current: string = sectionIds[0] ?? ''

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el && el.offsetTop <= scrollPos) {
        current = id
      }
    }

    activeSection.value = current
  }

  onMounted(() => {
    updateActive()
    scrollListener = () => window.requestAnimationFrame(updateActive)
    window.addEventListener('scroll', scrollListener, { passive: true })
  })

  onUnmounted(() => {
    if (scrollListener) {
      window.removeEventListener('scroll', scrollListener)
    }
  })

  return { activeSection }
}
