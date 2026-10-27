/*
  Subscribe endpoint. Cloudflare Pages picks up this directory from the repo
  root with no config; Astro's trailingSlash and build.format do not apply to
  a Function route.

  It stands in front of a Google Apps Script web app so the script URL never
  reaches the page source, so the POST is same-origin and needs no CORS, and
  so the panel gets a real success or failure instead of an opaque one.

  Both values come from Cloudflare environment variables, Production and
  Preview. Neither appears in this repo.
    SUBSCRIBE_ENDPOINT  the Apps Script /exec URL
    SUBSCRIBE_SECRET    the shared string the script checks
*/

type Env = {
  SUBSCRIBE_ENDPOINT?: string;
  SUBSCRIBE_SECRET?: string;
};

type Context = {
  request: Request;
  env: Env;
};

/** A human has to find the dot, open the panel and type an address. */
const MIN_DWELL_MS = 2500;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function str(value: unknown, max: number): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export async function onRequestPost(context: Context): Promise<Response> {
  const endpoint = context.env.SUBSCRIBE_ENDPOINT ?? '';
  const secret = context.env.SUBSCRIBE_SECRET ?? '';

  // Named loudly and on purpose. A stray character pasted after /exec in the
  // Cloudflare variable fails here rather than as a mystery fetch error, so
  // read this name before suspecting the code.
  if (!endpoint.endsWith('/exec')) return json({ ok: false, error: 'endpoint-misconfigured' }, 500);
  if (!secret) return json({ ok: false, error: 'secret-missing' }, 500);

  let body: Record<string, unknown>;
  try {
    body = (await context.request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'bad request' }, 400);
  }

  // Honeypot. A filled field is a bot, and a bot is told it worked rather than
  // handed a signal to retry against.
  if (str(body.website, 200) !== '') return json({ ok: true });

  const dwell = Number(body.dwell);
  if (!Number.isFinite(dwell) || dwell < MIN_DWELL_MS) {
    return json({ ok: false, error: 'too quick' }, 400);
  }

  const email = str(body.email, 254);
  if (!EMAIL.test(email)) return json({ ok: false, error: 'bad address' }, 400);

  // Stored verbatim: the wording shown on the panel is what makes the consent
  // showable in a year.
  const consent = str(body.consent, 300);
  if (consent === '') return json({ ok: false, error: 'consent required' }, 400);

  const page = str(body.page, 200) || '/';

  let result: { ok?: unknown; error?: unknown };
  try {
    // The redirect trap. A successful doPost returns 302 to a one-time
    // script.googleusercontent.com/macros/echo URL that only serves GET, and
    // a 302 followed by a client is re-issued as a GET. So redirect: 'follow'
    // lands on a Google Drive error page and reports failure after the row
    // was written and the email sent. Follow it by hand instead.
    const first = await fetch(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ secret, email, consent, page }),
      redirect: 'manual',
    });

    // An uncaught script error returns an error page from script.google.com
    // with no Location header at all, so the fallback is not optional.
    const location = first.headers.get('location');
    const final = location ? await fetch(location) : first;
    const text = await final.text();
    try {
      result = JSON.parse(text) as { ok?: unknown; error?: unknown };
    } catch {
      return json({ ok: false, error: 'upstream-unreadable' }, 502);
    }
  } catch {
    return json({ ok: false, error: 'upstream-unreachable' }, 502);
  }

  if (result.ok === true) return json({ ok: true });
  return json({ ok: false, error: str(result.error, 60) || 'failed' }, 502);
}
