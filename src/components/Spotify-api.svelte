<script context="module">
  export const apiEndpointsNames = {
    userInfo: 'user info',
    topArtists: 'top artists',
    topTracks: 'top tracks',
    playlists: 'playlists',
    userFollowedArtists: 'user followed artists',
    artist: 'Artist',
    artistTopTracks: 'Artist top track',
    artistAlbum: 'Artist album',
    artistRelatedArtists: 'Artist related artists',
    album: 'Album',
    playlist: 'Playlist',
    trackFeature: 'Track feature',
    track: 'track',
  };
</script>

<script>
  import {
    QueryClient,
    QueryClientProvider,
  } from '@sveltestack/svelte-query';
  import { isObject } from '../utils';
  import { setContext } from 'svelte';
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const fetchData = (url, method = 'GET') => {
    return fetch(url, {
      method: method,
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => {
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
      })
      .catch((err) => {
        if (err.message.toLowerCase() === 'failed to fetch') {
          throw new Error(
            'Sorry ,an unknow error happend please retry or contact technical service at xxxx@xxx.fr',
          );
        }
      });
  };
  const fetchTopArtists = (time_range = 'long_term', limit = 50) => {
    return fetchData(
      `${
        import.meta.env.VITE_API_BASE_URL
      }top/artists?time_range=${time_range}&limit=${limit}`,
    );
  };
  const fetchTopTracks = (time_range = 'long_term', limit = 50) => {
    return fetchData(
      `${
        import.meta.env.VITE_API_BASE_URL
      }top/tracks?time_range=${time_range}&limit=${limit}`,
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
  const fetchArtist = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}artist/${id}`,
    );
  };
  const fetchArtistAlbum = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}artist/${id}/album`,
    );
  };
  const fetchPlaylist = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}playlist/${id}`,
    );
  };
  const fetchArtistTopTracks = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}artist/${id}/top`,
    );
  };
  const fetchArtistRelatedArtists = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}artist/${id}/related`,
    );
  };
  const fetchAlbum = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}album/${id}`,
    );
  };
  const fetchTrack = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}track/${id}`,
    );
  };
  const fetchTrackFeature = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}audio-features/${id}`,
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
  setContext(apiEndpointsNames.artist, {
    fetchArtist: (id) => fetchArtist(id),
  });
  setContext(apiEndpointsNames.artistAlbum, {
    fetchArtistAlbum: (id) => fetchArtistAlbum(id),
  });
  setContext(apiEndpointsNames.artistTopTracks, {
    fetchArtistTopTracks: (id) => fetchArtistTopTracks(id),
  });
  setContext(apiEndpointsNames.artistRelatedArtists, {
    fetchArtistRelatedArtists: (id) => fetchArtistRelatedArtists(id),
  });
  setContext(apiEndpointsNames.album, {
    fetchAlbum: (id) => fetchAlbum(id),
  });
  setContext(apiEndpointsNames.playlist, {
    fetchPlaylist: (id) => fetchPlaylist(id),
  });
  setContext(apiEndpointsNames.trackFeature, {
    fetchTrackFeature: (id) => fetchTrackFeature(id),
  });
  setContext(apiEndpointsNames.track, {
    fetchTrack: (id) => fetchTrack(id),
  });
</script>

<!--got rid of  error message "... received an unexpected slot "default"-->
{#if false}<slot />{/if}
<slot name="navigation">no navigation was provided</slot>
<QueryClientProvider client={queryClient}>
  <slot name="content">no content was provided</slot>
</QueryClientProvider>
