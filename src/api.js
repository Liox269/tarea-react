// Cliente de la API
// React (5173) se comunica con Express (3000)

const API = 'http://localhost:3000/api';

export async function request(
  ruta,
  { method = 'GET', body, token } = {}
) {
  const headers = {};

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API}${ruta}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || 'Error en la petición');
  }

  return data;
}