import { c as defineEventHandler, r as readBody, e as createError, f as sendRsvpEmail } from '../../_/nitro.mjs';
import 'nodemailer';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'ipx';
import 'node:path';

const __dbgReport = async (hypothesisId, location, msg, data = {}) => {
  var _a, _b;
  try {
    const fs = await import('node:fs');
    const p = ".dbg/rsvp-email-not-received.env";
    let u = "http://127.0.0.1:7777/event", s = "rsvp-email-not-received";
    try {
      const e = fs.readFileSync(p, "utf8");
      u = ((_a = e.match(/DEBUG_SERVER_URL=(.+)/)) == null ? void 0 : _a[1]) || u;
      s = ((_b = e.match(/DEBUG_SESSION_ID=(.+)/)) == null ? void 0 : _b[1]) || s;
    } catch {
    }
    await import('node:https').then(() => fetch(u, { method: "POST", body: JSON.stringify({ sessionId: s, runId: "post", hypothesisId, location, msg: "[DEBUG] " + msg, data, ts: Date.now() }) })).catch(() => {
    });
  } catch {
  }
};
const rsvp_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e;
  const body = await readBody(event);
  await __dbgReport("D", "rsvp.post.ts:handler", "API route called (server-root path)", { bodyKeys: Object.keys(body || {}), name: (body == null ? void 0 : body.name) ? body.name.slice(0, 30) : void 0, attendance: body == null ? void 0 : body.attendance, hasMessage: !!(body == null ? void 0 : body.message) });
  const name = ((_a = body == null ? void 0 : body.name) == null ? void 0 : _a.toString().trim()) || "";
  const attendance = ((_b = body == null ? void 0 : body.attendance) == null ? void 0 : _b.toString().trim()) || "";
  const message = ((_c = body == null ? void 0 : body.message) == null ? void 0 : _c.toString().trim()) || void 0;
  if (name.length < 2) {
    await __dbgReport("D", "rsvp.post.ts:handler", "400 \u2014 invalid name", { name, nameLen: name.length });
    throw createError({
      statusCode: 400,
      statusMessage: "Please enter your full name."
    });
  }
  if (!attendance) {
    await __dbgReport("D", "rsvp.post.ts:handler", "400 \u2014 attendance empty", { attendance });
    throw createError({
      statusCode: 400,
      statusMessage: "Please select your attendance."
    });
  }
  if (attendance !== "accept" && attendance !== "decline") {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid attendance selection."
    });
  }
  try {
    await __dbgReport("D", "rsvp.post.ts:handler", "Calling sendRsvpEmail\u2026", { name, attendance, msgLen: (_d = message == null ? void 0 : message.length) != null ? _d : 0 });
    const result = await sendRsvpEmail({ name, attendance, message });
    await __dbgReport("D", "rsvp.post.ts:handler", "sendRsvpEmail returned ok", { result });
    return {
      ok: true,
      message: "RSVP submitted successfully.",
      accepted: result.accepted,
      messageId: result.messageId
    };
  } catch (err) {
    console.error("[RSVP] Failed to send email:", err);
    await __dbgReport("D", "rsvp.post.ts:handler", "sendRsvpEmail thrown \u2014 wrapping as 500", { errStatusCode: err == null ? void 0 : err.statusCode, errStatusMessage: err == null ? void 0 : err.statusMessage, errMsg: err == null ? void 0 : err.message, errCode: err == null ? void 0 : err.code });
    if ((err == null ? void 0 : err.statusCode) === 500 && ((_e = err == null ? void 0 : err.statusMessage) == null ? void 0 : _e.includes("not configured"))) {
      throw err;
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to send RSVP. Please try again or contact us directly."
    });
  }
});

export { rsvp_post as default };
//# sourceMappingURL=rsvp.post.mjs.map
