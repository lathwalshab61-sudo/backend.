const API_BASE = import.meta.env.VITE_API_URL || '';

/**
 * Check backend API and database health
 */
export async function getHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('API Health Check Error:', err.message);
    return { status: 'offline', error: err.message };
  }
}

/**
 * Fetch recent analyses for the dashboard
 */
export async function getRecentAnalyses() {
  try {
    const res = await fetch(`${API_BASE}/api/recent-analyses`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch recent analyses from API, using fallback:', err.message);
    return null;
  }
}

/**
 * Fetch case archive list
 */
export async function getCases() {
  try {
    const res = await fetch(`${API_BASE}/api/cases`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch cases from API, using fallback:', err.message);
    return null;
  }
}

/**
 * Upload and run AI analysis on a fingerprint image file
 */
export async function analyzeFingerprint(file) {
  const formData = new FormData();
  formData.append('fingerprint', file);

  const res = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.error || `Upload failed with HTTP ${res.status}`);
  }

  return await res.json();
}
