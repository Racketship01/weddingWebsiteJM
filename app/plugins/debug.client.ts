// #region debug-point A:vue-error-handler + app:mounted
export default defineNuxtPlugin((nuxtApp) => {
  const U = 'http://127.0.0.1:7777/event'
  const S = 'app-not-rendering-blank'
  const send = (hypothesisId: string, location: string, msg: string, data: Record<string, unknown> = {}) => {
    try { fetch(U, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: S, runId: 'post', hypothesisId, location, msg: '[DEBUG] ' + msg, data, ts: Date.now() }) }).catch(() => {}) } catch (_) { /* noop */ }
  }
  const uaSafe = typeof navigator !== 'undefined' ? navigator.userAgent.substring(0, 120) : 'SSR'
  send('A', 'plugins/debug.client.ts:plugin', 'plugin:init', { ua: uaSafe })
  nuxtApp.vueApp.config.errorHandler = (err, _instance, info) => {
    send('A', 'plugins/debug.client.ts:vueApp.errorHandler', 'vue:error', { info, message: err instanceof Error ? err.message : String(err), stack: err instanceof Error ? (err.stack || '').substring(0, 500) : '' })
  }
  nuxtApp.hook('vue:error', (err) => {
    send('A', 'plugins/debug.client.ts:hook:vue:error', 'hook:vue:error', { message: err instanceof Error ? err.message : String(err), stack: err instanceof Error ? (err.stack || '').substring(0, 500) : '' })
  })
  nuxtApp.hook('app:mounted', () => {
    if (typeof window !== 'undefined') {
      const hero = document.getElementById('hero')
      const h1Text = document.querySelector('h1')?.innerText || ''
      send('A', 'plugins/debug.client.ts:hook:app:mounted', 'app:mounted', { path: window.location.pathname, heroBg: hero ? window.getComputedStyle(hero).backgroundColor : 'N/A', h1Text, sections: document.querySelectorAll('section').length, bodyTextLen: document.body.innerText.length })
    }
  })
  nuxtApp.hook('app:error', (err) => {
    send('A', 'plugins/debug.client.ts:hook:app:error', 'app:error', { message: err instanceof Error ? err.message : String(err), stack: err instanceof Error ? (err.stack || '').substring(0, 500) : '' })
  })
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (ev) => {
      send('A', 'plugins/debug.client.ts:window:error', 'window:error', { message: ev.message, filename: ev.filename || '', lineno: ev.lineno || 0, colno: ev.colno || 0, stack: (ev.error && ev.error.stack ? ev.error.stack.substring(0, 500) : '') })
    }, { once: false })
    window.addEventListener('unhandledrejection', (ev) => {
      send('A', 'plugins/debug.client.ts:window:unhandledrejection', 'unhandled:promise', { reason: String(ev.reason).substring(0, 500) })
    })
  }
})
// #endregion
