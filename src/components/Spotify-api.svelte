<script context="module">
  export const apiEndpointsNames = {
    userInfo: 'user info',
    topArtists: 'top artists',
    topTracks: 'top tracks',
    playlists: 'playlists',
    userFollowedArtists: 'user followed artists',
  };
</script>

<script>
  import {
    QueryClient,
    QueryClientProvider,
  } from '@sveltestack/svelte-query';
  import { isObject } from '../utils';
  import { setContext } from 'svelte';
  const queryClient = new QueryClient();
  const fetchData = (url, method = 'GET') => {
    return fetch(url, {
      method: method,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
        console.table({ dataBefore: data });
        if (data === {} || isObject(data.error)) {
          switch (data.error.status) {
            case 401:
              data.error.detail =
                'Sorry, an error has occurred during the login, please reconnect.';
              break;
            case 429:
              data.error.detail =
                'Please retry in xxx seconds, the server had received too many requests.';
              break;
            case 400:
              data.error.detail =
                'The requested resource could not be found.';
              break;
            case 403:
              data.error.detail =
                'Sorry,Your are not allowed to  have this information';
              break;
            case 500:
              data.error.detail =
                'Sorry,something  went wrong ,please contact the technical staff at xxxx@xxx.fr';
              break;
            case 502:
            case 503:
              data.error.detail =
                'Sorry,our server has encountered some difficulty to process your request please retry later';
              break;
          }
        }
        return data;
      });
  };
  const fetchTopArtists = () => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}top/artists`,
    );
  };
  const fetchTopTracks = () => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}top/tracks`,
    );
  };
  const fetchPlaylists = () => {
    return fetchData(`${import.meta.env.VITE_API_BASE_URL}playlists`);
  };
  const fetchUserInfo = () => {
    return fetchData(`${import.meta.env.VITE_API_BASE_URL}user`);
  };
  const fetchFollowedArtists = () => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}user/following`,
    );
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
  setContext(apiEndpointsNames.topTracks, {
    fetchTopTracks: () => fetchTopTracks(),
  });
</script>

<!--got rid of  error message "... received an unexpected slot "default"-->
{#if false}<slot />{/if}
<slot name="navigation">no navigation was provided</slot>
<QueryClientProvider client={queryClient}>
  <slot name="content">no content was provided</slot>
</QueryClientProvider>
