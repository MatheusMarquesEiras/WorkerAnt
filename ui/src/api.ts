// ---------------------------------------------------------------------------
// API helpers — all calls go through the Vite proxy to FastAPI on :3333
// ---------------------------------------------------------------------------

export interface FileItem {
  file_name: string;
  fileUuid: string;
}

export interface UserInfo {
  id: number;
  user: string;
  userUuid: string;
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function checkOk(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail ?? `HTTP ${res.status}`);
  }
  return res;
}

// --- Auth ---

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch('/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }),
  });
  await checkOk(res);
  const { access_token } = await res.json();
  localStorage.setItem('token', access_token);
}

export async function register(username: string, password: string): Promise<void> {
  const res = await fetch('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username, password }),
  });
  await checkOk(res);
  const { access_token } = await res.json();
  localStorage.setItem('token', access_token);
}

export function logout(): void {
  localStorage.removeItem('token');
}

// --- User ---

export async function getMe(): Promise<UserInfo> {
  const res = await fetch('/users/me', { headers: authHeaders() });
  await checkOk(res);
  return res.json();
}

export async function getUserFiles(): Promise<FileItem[]> {
  const res = await fetch('/users/files', { headers: authHeaders() });
  await checkOk(res);
  return res.json();
}

// --- Files ---

export async function uploadFiles(files: File[]): Promise<void> {
  const form = new FormData();
  files.forEach((f) => form.append('files', f));
  const res = await fetch('/services/upload', {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  });
  await checkOk(res);
}

export async function downloadFile(fileUuid: string, fileName: string): Promise<void> {
  const res = await fetch(`/services/download/${fileUuid}`, {
    headers: authHeaders(),
  });
  await checkOk(res);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}
