import { getToken } from './auth.svelte';

interface SpotifyError {
  status: number;
  message: string;
}

interface SpotifyErrorResponse {
  error: SpotifyError;
}

// Error messages map
const ERROR_MESSAGES: Record<number, string> = {
  400: 'The requested resource could not be found.',
  401: 'Sorry, an error has occurred during the login, please reconnect.',
  403: 'Sorry, you are not allowed to have this information.',
  429: 'Please retry in a few seconds, the server has received too many requests.',
  500: 'Sorry, something went wrong. Please contact the technical staff.',
  502: 'Sorry, our server has encountered some difficulty. Please retry later.',
  503: 'Sorry, our server has encountered some difficulty. Please retry later.',
};

// Base fetch function with auth and error handling
async function fetchData<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    const data = await response.json();

    // Handle Spotify API errors
    if (data?.error) {
      const errorStatus = data.error.status;
      const detail = ERROR_MESSAGES[errorStatus] || 'An unknown error occurred.';
      data.error.detail = detail;
    }

    return data;
  } catch (err) {
    if (err instanceof Error && err.message.toLowerCase() === 'failed to fetch') {
      throw new Error(
        'Sorry, an unknown error happened. Please retry or contact technical service.'
      );
    }
    throw err;
  }
}

// API Base URL
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// User endpoints
export const userApi = {
  getProfile: () => fetchData(`${API_BASE}me`),

  getTopArtists: (timeRange: string = 'long_term', limit: number = 50) =>
    fetchData(`${API_BASE}me/top/artists?time_range=${timeRange}&limit=${limit}`),

  getTopTracks: (timeRange: string = 'long_term', limit: number = 50) =>
    fetchData(`${API_BASE}me/top/tracks?time_range=${timeRange}&limit=${limit}`),

  getPlaylists: () => fetchData(`${API_BASE}me/playlists`),

  getFollowedArtists: () => fetchData(`${API_BASE}me/following?type=artist`),
};

// Artist endpoints
export const artistApi = {
  getArtist: (id: string) => fetchData(`${API_BASE}artists/${id}`),

  getAlbums: (id: string) => fetchData(`${API_BASE}artists/${id}/albums`),

  getTopTracks: (id: string) =>
    fetchData(`${API_BASE}artists/${id}/top-tracks?country=from_token`),

  getRelatedArtists: (id: string) =>
    fetchData(`${API_BASE}artists/${id}/related-artists`),
};

// Album endpoints
export const albumApi = {
  getAlbum: (id: string) => fetchData(`${API_BASE}albums/${id}`),
};

// Track endpoints
export const trackApi = {
  getTrack: (id: string) => fetchData(`${API_BASE}tracks/${id}`),

  getAudioFeatures: (id: string) => fetchData(`${API_BASE}audio-features/${id}`),
};

// Playlist endpoints
export const playlistApi = {
  getPlaylist: (id: string) => fetchData(`${API_BASE}playlists/${id}`),
};

// Export all as a unified client
export const spotifyClient = {
  user: userApi,
  artist: artistApi,
  album: albumApi,
  track: trackApi,
  playlist: playlistApi,
};
