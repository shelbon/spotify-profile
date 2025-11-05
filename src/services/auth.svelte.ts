import { DateTime } from 'luxon';

const EXPIRATION_TIME = 3600 * 1000; // 1 hour in milliseconds

export const STATE = {
  refreshing: 'refreshing',
  uptodate: 'uptodate',
  expired: 'expired',
  error: 'error',
} as const;

type TokenState = typeof STATE[keyof typeof STATE];

interface TokenStore {
  value: string;
  state: TokenState;
  error?: string;
}

// Create reactive state using Svelte 5 $state rune
let tokenState = $state<TokenStore>({
  value: '',
  state: STATE.expired,
});

// Export getter to access the reactive state
export function getTokenState() {
  return tokenState;
}

// Local storage helpers
const storage = {
  setAccessToken: (token: string) => {
    storage.setTimestamp();
    localStorage.setItem('spotify_access_token', token);
  },

  setTimestamp: () => {
    localStorage.setItem('spotify_token_timestamp', DateTime.now().toISO());
  },

  setRefreshToken: (token: string) => {
    localStorage.setItem('spotify_refresh_token', token);
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem('spotify_access_token');
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('spotify_refresh_token');
  },

  getTimestamp: (): DateTime => {
    const timestamp = localStorage.getItem('spotify_token_timestamp');
    return timestamp ? DateTime.fromISO(timestamp) : DateTime.fromMillis(0);
  },

  isTokenExpired: (): boolean => {
    const diff = DateTime.now().diff(storage.getTimestamp()).milliseconds;
    return diff > EXPIRATION_TIME;
  },

  clear: () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_timestamp');
  },
};

// Fetch new access token from server
async function fetchNewAccessToken(): Promise<{ access_token: string }> {
  const refreshToken = storage.getRefreshToken();

  if (!refreshToken || refreshToken === 'undefined') {
    throw new Error('No refresh token available');
  }

  const response = await fetch(
    `${import.meta.env.VITE_SERVER_URL}refresh_token?refresh_token=${refreshToken}`
  );
  return response.json();
}

// Refresh the access token
export async function refreshAccessToken(): Promise<void> {
  try {
    tokenState.state = STATE.refreshing;
    const data = await fetchNewAccessToken();
    storage.setAccessToken(data.access_token);
    tokenState.value = data.access_token;
    tokenState.state = STATE.uptodate;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    storage.clear();
    tokenState.value = '';
    tokenState.state = STATE.error;
    tokenState.error = 'Failed to refresh token. Please login again.';
  }
}

// Initialize token from URL params or local storage
export function initializeAuth(queryParams: Record<string, string> = {}): { shouldRedirect: boolean; redirectTo?: string } {
  const { error, access_token, refresh_token } = queryParams;

  // Handle OAuth errors
  if (error) {
    console.error('OAuth error:', error);
    storage.clear();
    tokenState.value = '';
    tokenState.state = STATE.error;
    tokenState.error = `OAuth error: ${error}`;
    return { shouldRedirect: true, redirectTo: '/login' };
  }

  // Priority 1: Fresh tokens from OAuth callback (query params)
  if (access_token && refresh_token) {
    // Save both tokens from OAuth callback
    storage.setAccessToken(access_token);
    storage.setRefreshToken(refresh_token);
    tokenState.value = access_token;
    tokenState.state = STATE.uptodate;
    return { shouldRedirect: false };
  }

  // Priority 2: Check existing tokens in local storage
  const localAccessToken = storage.getAccessToken();
  const localRefreshToken = storage.getRefreshToken();

  // No tokens available at all - redirect to login
  if (!localAccessToken || localAccessToken === 'undefined') {
    tokenState.value = '';
    tokenState.state = STATE.error;
    tokenState.error = 'No access token found';
    return { shouldRedirect: true, redirectTo: '/login' };
  }

  // Check if local token is expired
  if (storage.isTokenExpired()) {
    // Try to refresh if we have a refresh token
    if (localRefreshToken && localRefreshToken !== 'undefined') {
      refreshAccessToken();
      return { shouldRedirect: false };
    } else {
      // No refresh token, need to login again
      storage.clear();
      tokenState.value = '';
      tokenState.state = STATE.error;
      tokenState.error = 'Session expired. Please login again.';
      return { shouldRedirect: true, redirectTo: '/login' };
    }
  }

  // Token exists and is valid
  tokenState.value = localAccessToken;
  tokenState.state = STATE.uptodate;
  return { shouldRedirect: false };
}

// Get current token value
export function getToken(): string {
  return tokenState.value;
}

// Auto-refresh token before expiration
let refreshTimer: number | null = null;

export function startTokenRefreshTimer(): void {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
  }

  // Refresh 5 minutes before expiration
  const refreshIn = EXPIRATION_TIME - 5 * 60 * 1000;
  refreshTimer = window.setTimeout(() => {
    refreshAccessToken();
    startTokenRefreshTimer(); // Schedule next refresh
  }, refreshIn);
}

export function stopTokenRefreshTimer(): void {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
}

export { storage };
