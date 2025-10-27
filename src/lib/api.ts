// Hardcoded base URL per request (no .env usage)
export const API_BASE_URL = 'https://api.valor-games.co';

type VerifyResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  user_id?: number;
  [key: string]: unknown;
};

export async function verifyEmailToken(token: string): Promise<{
  ok: boolean;
  status: number;
  data: VerifyResponse;
}> {
  // Try preferred POST contract first
  try {
    const postRes = await fetch(`${API_BASE_URL}/api/user/verify-email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      cache: 'no-store',
    });
    const postData = (await postRes.json().catch(() => ({}))) as VerifyResponse;
    if (postRes.ok) {
      return { ok: true, status: postRes.status, data: postData };
    }
    // If POST is not OK (any status), try GET variant as fallback
    const getRes = await fetch(
      `${API_BASE_URL}/api/verify-email/${encodeURIComponent(token)}/`,
      { method: 'GET', cache: 'no-store' }
    );
    const getData = (await getRes.json().catch(() => ({}))) as VerifyResponse;
    // Prefer GET result; if GET also fails, return POST error
    return getRes.ok
      ? { ok: true, status: getRes.status, data: getData }
      : { ok: false, status: postRes.status, data: postData };
  } catch (e) {
    // Network error → try GET as a last resort
    try {
      const getRes = await fetch(`${API_BASE_URL}/api/verify-email/${encodeURIComponent(token)}/`, {
        method: 'GET',
        cache: 'no-store',
      });
      const getData = (await getRes.json().catch(() => ({}))) as VerifyResponse;
      return { ok: getRes.ok, status: getRes.status, data: getData };
    } catch (err) {
      return {
        ok: false,
        status: 0,
        data: { error: 'Network error while verifying email token' },
      };
    }
  }
}
