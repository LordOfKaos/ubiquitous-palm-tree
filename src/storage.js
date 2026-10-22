const KEY = 'employability-star';

// Saved on this device only, so a returning participant sees their starting point.
export function loadSaved() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

export function save(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable (e.g. private browsing); the app still works without it.
  }
}
