const base = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
export class ApiError extends Error {
  constructor(message: string, public status: number) { super(message); }
}
let refreshPromise: Promise<unknown> | null = null;

export async function api<T>(path: string, init: RequestInit = {}, retry = true): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${base}/api${path}`, {
      ...init, credentials: 'include',
      headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'rccg-web', ...init.headers },
    });
  } catch { throw new ApiError('Cannot reach the server. Please try again.', 0); }
  if (response.status === 401 && retry && (path.startsWith('/admin/') || path === '/auth/me')) {
    refreshPromise ??= api('/auth/refresh', { method: 'POST' }, false).finally(() => { refreshPromise = null; });
    await refreshPromise;
    return api<T>(path, init, false);
  }
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new ApiError(typeof body.detail === 'string' ? body.detail : 'The request failed. Please check your entries.', response.status);
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

export const errorMessage = (error: unknown) => error instanceof Error ? error.message : 'Something went wrong. Please try again.';
export const contentChanged = () => window.dispatchEvent(new Event('church-content-changed'));
