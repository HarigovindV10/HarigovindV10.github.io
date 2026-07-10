/**
 * Cloudflare Pages Function — contact form handler.
 * Route: POST /api/contact
 *
 * Sends the message via Resend FROM contact@harigovindvalsakumar.com with
 * Reply-To set to the visitor's email, so replying goes straight to them.
 * The Resend API key lives in the RESEND_API_KEY environment variable (secret)
 * and never reaches the browser.
 */

const TO_ADDRESS = "contact@harigovindvalsakumar.com";
const FROM_ADDRESS = "Portfolio Contact <contact@harigovindvalsakumar.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: real users leave this empty; bots fill it. Pretend success.
  if (data.company) return json({ success: true });

  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const subject = (data.subject || "").trim();
  const message = (data.message || "").trim();

  const errors = {};
  if (!name || name.length > 100) errors.name = "Please enter your name.";
  if (!email || email.length > 254 || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";
  if (!subject || subject.length > 200) errors.subject = "Please enter a subject.";
  if (!message || message.length > 5000) errors.message = "Please enter a message.";
  if (Object.keys(errors).length) return json({ errors }, 422);

  if (!env.RESEND_API_KEY) {
    return json({ error: "Email service is not configured." }, 500);
  }

  const text =
    `New message from your portfolio contact form:\n\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Subject: ${subject}\n\n` +
    `${message}\n`;

  const html =
    `<h2>New portfolio contact message</h2>` +
    `<p><strong>Name:</strong> ${escapeHtml(name)}<br>` +
    `<strong>Email:</strong> ${escapeHtml(email)}<br>` +
    `<strong>Subject:</strong> ${escapeHtml(subject)}</p>` +
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      reply_to: email,
      subject: `[Portfolio] ${subject}`,
      text,
      html,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text();
    console.error("Resend error:", resp.status, detail);
    return json({ error: "Could not send your message. Please try again." }, 502);
  }

  return json({ success: true });
}

// Reject non-POST methods cleanly.
export async function onRequest(context) {
  if (context.request.method === "POST") return onRequestPost(context);
  return json({ error: "Method not allowed." }, 405);
}
