export const KEYS = {
  star: 'employability-star',
  jobs: 'employability-jobs',
  home: 'employability-home',
};

// Saved on this device only, so a returning participant picks up where they left off.
export function loadSaved(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch {
    return {};
  }
}

export function save(key, state) {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Storage can be unavailable (e.g. private browsing); the app still works without it.
  }
}
