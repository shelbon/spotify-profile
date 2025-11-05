<script>
  import {
    QueryClient,
    QueryClientProvider,
  } from '@sveltestack/svelte-query';
  import { onMount, setContext } from 'svelte';
  import { apiEndpointsNames } from '../services/spotify-api';
  import { activeRoute, goto } from '@roxi/routify';
  import {
    getTokenState,
    STATE,
    initializeAuth,
    startTokenRefreshTimer,
    stopTokenRefreshTimer,
    getToken,
  } from '../services/auth.svelte';
  import { spotifyClient } from '../services/spotify-client';
  import Wave from './Wave.svelte';

  // Query client configuration
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  let { children } = $props();
  // Check if we have a valid token on mount
  onMount(() => {
    // Initialize auth to load token from localStorage
    const authResult = initializeAuth({});

    if (authResult.shouldRedirect && authResult.redirectTo) {
      // No valid token, redirect to login
      $goto('/login');
      return;
    }

    // Token loaded successfully, start refresh timer
    startTokenRefreshTimer();

    // Clean up timer on destroy
    return () => {
      stopTokenRefreshTimer();
    };
  });

  // Get reactive token state
  const tokenState = getTokenState();

  // Watch for token errors and redirect to login
  $effect(() => {
    if (tokenState.state === STATE.error) {
      console.error('Token error:', tokenState.error);
      $goto('/login');
    }
  });

  // Set up context for all API endpoints
  setContext(apiEndpointsNames.userInfo, {
    fetchUserInfo: () => spotifyClient.user.getProfile(),
  });

  setContext(apiEndpointsNames.userTopArtists, {
    fetchUserTopArtists: () => spotifyClient.user.getTopArtists(),
  });

  setContext(apiEndpointsNames.userTopTracks, {
    fetchUserTopTracks: () => spotifyClient.user.getTopTracks(),
  });

  setContext(apiEndpointsNames.userPlaylists, {
    fetchUserPlaylists: () => spotifyClient.user.getPlaylists(),
  });

  setContext(apiEndpointsNames.userFollowedArtists, {
    fetchUserFollowedArtists: () =>
      spotifyClient.user.getFollowedArtists(),
  });

  setContext(apiEndpointsNames.artist, {
    fetchArtist: (id) => spotifyClient.artist.getArtist(id),
  });

  setContext(apiEndpointsNames.artistAlbum, {
    fetchArtistAlbum: (id) => spotifyClient.artist.getAlbums(id),
  });

  setContext(apiEndpointsNames.artistTopTracks, {
    fetchArtistTopTracks: (id) =>
      spotifyClient.artist.getTopTracks(id),
  });

  setContext(apiEndpointsNames.artistRelatedArtists, {
    fetchArtistRelatedArtists: (id) =>
      spotifyClient.artist.getRelatedArtists(id),
  });

  setContext(apiEndpointsNames.album, {
    fetchAlbum: (id) => spotifyClient.album.getAlbum(id),
  });

  setContext(apiEndpointsNames.playlist, {
    fetchPlaylist: (id) => spotifyClient.playlist.getPlaylist(id),
  });

  setContext(apiEndpointsNames.track, {
    fetchTrack: (id) => spotifyClient.track.getTrack(id),
  });

  setContext(apiEndpointsNames.trackFeature, {
    fetchTrackFeature: (id) =>
      spotifyClient.track.getAudioFeatures(id),
  });
</script>

{#if tokenState.state === STATE.uptodate}
  <QueryClientProvider client={queryClient}>
    {@render children?.()}
  </QueryClientProvider>
{:else if tokenState.state === STATE.error}
  <div class="loading-container">
    <p>Redirecting to login...</p>
  </div>
{:else}
  <div class="loading-container">
    <Wave size="60" color="#1db954" unit="px" duration="1s" />
  </div>
{/if}

<style>
  .loading-container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    margin-bottom: var(--nav-height);
    min-height: 100vh;
  }
</style>
