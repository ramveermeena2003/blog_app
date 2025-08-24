export const apiFetch = async (url, opts = {}, token) => {
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  if (token) headers.Authorization = `Bearer ${token}`
  const res = await fetch(url, { ...opts, headers })
  if (!res.ok) {
    const err = await res.json().catch(()=>({error:'Request failed'}))
    throw new Error(err.error || 'Request failed')
  }
  return res.json()
}
