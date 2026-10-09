import { ref, onMounted, onUnmounted, computed } from 'vue'

interface CountdownResult {
  readonly days: number
  readonly hours: number
  readonly minutes: number
  readonly seconds: number
  readonly isDone: boolean
}

export function useCountdown(targetIso: string) {
  const now = ref<number>(Date.now())
  const targetMs = new Date(targetIso).getTime()
  let timer: ReturnType<typeof setInterval> | null = null

  onMounted(() => {
    timer = setInterval(() => {
      now.value = Date.now()
    }, 1000)
  })

  onUnmounted(() => {
    if (timer) clearInterval(timer)
  })

  const result = computed<CountdownResult>(() => {
    const diff = targetMs - now.value
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isDone: true }
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)
    return { days, hours, minutes, seconds, isDone: false }
  })

  return result
}
