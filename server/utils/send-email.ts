import nodemailer from 'nodemailer'

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

export interface RsvpPayload {
  name: string
  attendance: 'accept' | 'decline' | string
  message?: string
}

export interface EmailConfig {
  smtpUser: string
  smtpPass: string
  recipient: string
}

function getConfig(): EmailConfig {
  const smtpUser = process.env.GMAIL_USER?.trim()
  const rawPass = process.env.GMAIL_APP_PASSWORD
  // FIX for H2: Google App Passwords are 16 chars, UI groups with spaces for readability.
  // Strip ALL whitespace so spaced pastes ("gvbf hizu abbv dtae") become valid.
  const smtpPass = rawPass ? rawPass.replace(/\s+/g, '') : rawPass
  const recipient = process.env.RSVP_RECIPIENT_EMAIL?.trim() || smtpUser;

  // #region debug-point A:get-config
  __dbgReport('A', 'send-email.ts:getConfig()', 'env vars snapshot', { smtpUserSet: !!smtpUser, smtpUserLen: smtpUser?.length ?? 0, smtpPassSet: !!smtpPass, smtpPassLen: smtpPass?.length ?? 0, rawPassLen: rawPass?.length ?? 0, smtpPassHadSpaces: !!(rawPass && /\s/.test(rawPass)), recipientSet: !!recipient }).catch(() => {})
  // #endregion

  if (!smtpUser || !smtpPass) {
    // #region debug-point A:get-config-missing
    __dbgReport('A', 'send-email.ts:getConfig()', 'MISSING env vars — throwing 500', { smtpUser, smtpPassMasked: smtpPass ? smtpPass.slice(0, 3) + '***' : 'UNSET', recipient }).catch(() => {})
    // #endregion
    throw createError({
      statusCode: 500,
      statusMessage: 'Email service is not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables.'
    })
  }

  return { smtpUser, smtpPass, recipient: recipient || '' }
}

function createTransporter(config: EmailConfig) {
  // #region debug-point B:create-transporter
  __dbgReport('B', 'send-email.ts:createTransporter()', 'creating nodemailer gmail transport', { smtpUser: config.smtpUser, hasPass: !!config.smtpPass, passLen: config.smtpPass.length }).catch(() => {})
  // #endregion
  // #endregion
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    }
  })
}

function buildHtml(payload: RsvpPayload, config: EmailConfig): string {
  const attendanceLabel =
    payload.attendance === 'accept'
      ? '<span style="color:#16a34a;font-weight:700;">Joyfully Accepts ✅</span>'
      : payload.attendance === 'decline'
        ? '<span style="color:#dc2626;font-weight:700;">Regretfully Declines ❌</span>'
        : `<span style="font-weight:700;">${payload.attendance}</span>`

  const messageBlock = payload.message
    ? `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #eee;"><strong style="color:#4b5563;">Message:</strong></td>
      <td style="padding:12px 16px;border-bottom:1px solid #eee;">${payload.message.replace(/\n/g, '<br>')}</td>
    </tr>`
    : ''

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New RSVP Response</title>
</head>
<body style="margin:0;padding:0;font-family:Inter,'Helvetica Neue',Arial,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);border:1px solid #e5e7eb;">
    <div style="background:linear-gradient(135deg,#AFC8DC 0%,#D8C09A 100%);padding:32px 40px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:600;">New RSVP Response</h1>
      <p style="margin:8px 0 0;color:rgba(255,255,255,0.92);font-size:14px;letter-spacing:0.5px;">Wedding · November 27, 2026</p>
    </div>
    <div style="padding:24px 40px;">
      <table style="width:100%;border-collapse:collapse;font-size:15px;color:#1f2937;">
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #eee;width:40%;"><strong style="color:#4b5563;">Guest Name:</strong></td>
          <td style="padding:12px 16px;border-bottom:1px solid #eee;">${payload.name}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #eee;"><strong style="color:#4b5563;">Attendance:</strong></td>
          <td style="padding:12px 16px;border-bottom:1px solid #eee;">${attendanceLabel}</td>
        </tr>${messageBlock}
        <tr>
          <td style="padding:12px 16px;"><strong style="color:#4b5563;">Submitted:</strong></td>
          <td style="padding:12px 16px;">${new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}</td>
        </tr>
      </table>
    </div>
    <div style="padding:16px 40px 28px;background:#f9fafb;border-top:1px solid #eee;text-align:center;color:#6b7280;font-size:12px;">
      This RSVP was submitted via the wedding invitation website.
    </div>
  </div>
</body>
</html>`
}

function buildText(payload: RsvpPayload): string {
  const attendanceLabel =
    payload.attendance === 'accept'
      ? 'Joyfully Accepts'
      : payload.attendance === 'decline'
        ? 'Regretfully Declines'
        : payload.attendance

  let text = `New RSVP Response\n`
  text += `==================\n\n`
  text += `Guest Name: ${payload.name}\n`
  text += `Attendance: ${attendanceLabel}\n`
  if (payload.message) {
    text += `Message: ${payload.message}\n`
  }
  text += `Submitted: ${new Date().toLocaleString('en-PH', { timeZone: 'Asia/Manila' })}\n`
  return text
}

export async function sendRsvpEmail(payload: RsvpPayload) {
  const config = getConfig()
  const transporter = createTransporter(config)

  const attendanceShort = payload.attendance === 'accept' ? 'ACCEPT' : payload.attendance === 'decline' ? 'DECLINE' : 'RESPONSE'
  const subject = `[RSVP ${attendanceShort}] ${payload.name} — Wedding Nov 27`

  // #region debug-point B:verify-transporter
  let verifyOk: any = null
  try { verifyOk = await transporter.verify() } catch (vErr: any) { verifyOk = { errCode: vErr?.code, errMsg: vErr?.message, errName: vErr?.name, errResponse: typeof vErr?.response === 'string' ? vErr.response.slice(0, 300) : vErr?.response } }
  __dbgReport('B', 'send-email.ts:sendRsvpEmail()', 'transporter verify result', { verify: verifyOk, subject, to: config.recipient, from: config.smtpUser }).catch(() => {})
  // #endregion

  try {
    const mailOptions = {
      from: `"Wedding RSVP" <${config.smtpUser}>`,
      to: config.recipient,
      replyTo: config.smtpUser,
      subject,
      text: buildText(payload),
      html: buildHtml(payload, config)
    }

    const tAny: any = transporter as any
    let info: any = null
    let strategy = ''

    if (tAny && typeof tAny.sendMail === 'function') {
      strategy = 'top_sendMail_callback'
      info = await (new Promise<any>((resolve, reject) => {
        try {
          const result = (tAny as any).sendMail(mailOptions, (err: any, val: any) => {
            if (err) reject(err); else resolve(val)
          })
          if (result && typeof result.then === 'function') {
            result.then(resolve as any, reject as any)
          }
        } catch (syncErr: any) {
          reject(syncErr)
        }
      }))
    } else if (tAny && tAny.transporter && typeof tAny.transporter.sendMail === 'function') {
      strategy = 'inner_transporter_sendMail'
      info = await (new Promise<any>((resolve, reject) => {
        try {
          const result = tAny.transporter.sendMail(mailOptions, (err: any, val: any) => {
            if (err) reject(err); else resolve(val)
          })
          if (result && typeof result.then === 'function') {
            result.then(resolve as any, reject as any)
          }
        } catch (syncErr: any) {
          reject(syncErr)
        }
      }))
    } else {
      const topKeys = tAny ? Object.keys(tAny) : []
      const innerKeys = tAny && tAny.transporter ? Object.keys(tAny.transporter) : []
      throw new TypeError('No usable sendMail on transporter object. topKeys=' + topKeys.join(',') + ' innerKeys=' + innerKeys.join(','))
    }

    // #region debug-point B:sendmail-success
    __dbgReport('B', 'send-email.ts:sendRsvpEmail()', 'sendMail succeeded', { strategy, accepted: info?.accepted, rejected: info?.rejected, messageId: info?.messageId, response: info?.response }).catch(() => {})
    // #endregion

    return {
      accepted: info?.accepted || [config.recipient],
      messageId: info?.messageId || ''
    }
  } catch (err: any) {
    // #region debug-point B:sendmail-error
    __dbgReport('B', 'send-email.ts:sendRsvpEmail()', 'sendMail FAILED', { errCode: err?.code, errMsg: err?.message, errName: err?.name, errCommand: err?.command, errResponseCode: err?.responseCode, errResponse: typeof err?.response === 'string' ? err.response.slice(0, 300) : err.response, causeMsg: err?.cause?.message, causeCode: err?.cause?.code }).catch(() => {})
    // #endregion
    throw err
  }
}
