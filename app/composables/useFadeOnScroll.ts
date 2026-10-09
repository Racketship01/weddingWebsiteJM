import { ref, onMounted, onUnmounted } from 'vue'

export function useFadeOnScroll(threshold: number = 0.12) {
  const visible = ref<boolean>(false)
  const rootRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      visible.value = true
      return
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      visible.value = true
      return
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.value = true
            if (rootRef.value) observer?.unobserve(rootRef.value)
          }
        }
      },
      { threshold }
    )
    if (rootRef.value) observer.observe(rootRef.value)
  })

  onUnmounted(() => {
    if (observer && rootRef.value) observer.unobserve(rootRef.value)
    observer?.disconnect()
  })

  return { rootRef, visible }
}
