import { sendRsvpEmail, type RsvpPayload } from '../utils/send-email'

// #region debug-point helpers:report
const __dbgReport = async (hypothesisId: string, location: string, msg: string, data: any = {}) => {
  try {
    const fs = await import('node:fs'); const p = '.dbg/rsvp-email-not-received.env'
    let u = 'http://127.0.0.1:7777/event', s = 'rsvp-email-not-received'
    try { const e = fs.readFileSync(p, 'utf8'); u = (e.match(/DEBUG_SERVER_URL=(.+)/)?.[1]) || u; s = (e.match(/DEBUG_SESSION_ID=(.+)/)?.[1]) || s } catch {}
    await import('node:https').then(() => fetch(u, { method: 'POST', body: JSON.stringify({ sessionId: s, runId: 'post', hypothesisId, location, msg: '[DEBUG] ' + msg, data, ts: Date.now() }) })).catch(() => {})
  } catch {}
}
// #endregion

export default defineEventHandler(async (event) => {
  const body = await readBody<RsvpPayload>(event);
  // #region debug-point D:route-entry
  await __dbgReport('D', 'rsvp.post.ts:handler', 'API route called (server-root path)', { bodyKeys: Object.keys(body || {}), name: body?.name ? body.name.slice(0, 30) : undefined, attendance: body?.attendance, hasMessage: !!body?.message });
  // #endregion

  const name = body?.name?.toString().trim() || ''
  const attendance = body?.attendance?.toString().trim() || ''
  const message = body?.message?.toString().trim() || undefined

  if (name.length < 2) {
    // #region debug-point D:validation-name
    await __dbgReport('D', 'rsvp.post.ts:handler', '400 — invalid name', { name, nameLen: name.length });
    // #endregion
    throw createError({
      statusCode: 400,
      statusMessage: 'Please enter your full name.'
    })
  }

  if (!attendance) {
    // #region debug-point D:validation-attendance
    await __dbgReport('D', 'rsvp.post.ts:handler', '400 — attendance empty', { attendance });
    // #endregion
    throw createError({
      statusCode: 400,
      statusMessage: 'Please select your attendance.'
    })
  }

  if (attendance !== 'accept' && attendance !== 'decline') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid attendance selection.'
    })
  }

  try {
    // #region debug-point D:send-call
    await __dbgReport('D', 'rsvp.post.ts:handler', 'Calling sendRsvpEmail…', { name, attendance, msgLen: message?.length ?? 0 });
    // #endregion
    const result = await sendRsvpEmail({ name, attendance, message })

    // #region debug-point D:send-ok
    await __dbgReport('D', 'rsvp.post.ts:handler', 'sendRsvpEmail returned ok', { result });
    // #endregion
    return {
      ok: true,
      message: 'RSVP submitted successfully.',
      accepted: result.accepted,
      messageId: result.messageId
    }
  } catch (err: any) {
    console.error('[RSVP] Failed to send email:', err)

    // #region debug-point D:send-exception
    await __dbgReport('D', 'rsvp.post.ts:handler', 'sendRsvpEmail thrown — wrapping as 500', { errStatusCode: err?.statusCode, errStatusMessage: err?.statusMessage, errMsg: err?.message, errCode: err?.code });
    // #endregion

    if (err?.statusCode === 500 && err?.statusMessage?.includes('not configured')) {
      throw err
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to send RSVP. Please try again or contact us directly.'
    })
  }
})
