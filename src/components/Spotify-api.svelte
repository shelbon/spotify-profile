<script context="module">
  export const apiEndpointsNames = {
    userInfo: 'user info',
    topArtists: 'top artists',
    playlists: 'playlists',
    userFollowedArtists: 'user followed artists',
  };
</script>

<script>
  import {
    QueryClient,
    QueryClientProvider,
  } from '@sveltestack/svelte-query';
  import { setContext } from 'svelte';
  const queryClient = new QueryClient();
  const fetchTopArtists = () => {
    return fetch(
      `${import.meta.env.VITE_API_BASE_URL}top/artists/`,
    ).then((response) => response.json());
  };
  const fetchPlaylists = () => {
    return fetch(
      `${import.meta.env.VITE_API_BASE_URL}playlists`,
    ).then((response) => response.json());
  };
  const fetchUserInfo = () => {
    return fetch(`${import.meta.env.VITE_API_BASE_URL}user`)
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchFollowedArtists = () => {
    return fetch(`${import.meta.env.VITE_API_BASE_URL}user/following`)
      .then((response) => response.json())
      .catch((err) => {
        console.log(err);
      });
  };
  setContext(apiEndpointsNames.userFollowedArtists, {
    fetchFollowedArtists: () => fetchFollowedArtists(),
  });
  setContext(apiEndpointsNames.userInfo, {
    fetchUserInfo: () => fetchUserInfo(),
  });
  setContext(apiEndpointsNames.topArtists, {
    fetchTopArtists: () => fetchTopArtists(),
  });
  setContext(apiEndpointsNames.playlists, {
    fetchPlaylists: () => fetchPlaylists(),
  });
</script>

<!--got rid of  error message "... received an unexpected slot "default"-->
{#if false}<slot />{/if}
<slot name="navigation">no navigation was provided</slot>
<QueryClientProvider client={queryClient}>
  <slot name="content">no content was provided</slot>
</QueryClientProvider>
