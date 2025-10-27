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
  try {
    // Preferred: POST /api/user/verify-email/ { token }
    const res = await fetch(`${API_BASE_URL}/api/user/verify-email/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
      cache: 'no-store',
    });
    const data = (await res.json().catch(() => ({}))) as VerifyResponse;
    return { ok: res.ok, status: res.status, data };
  } catch (e) {
    return {
      ok: false,
      status: 0,
      data: { error: 'Network error while verifying email token' },
    };
  }
}
