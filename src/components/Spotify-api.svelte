<script context="module">
  export const apiEndpointsNames = {
    userInfo: 'user info',
    userTopArtists: ' user top artists',
    userTopTracks: ' user top tracks',
    userPlaylists: 'user playlists',
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
  import { getHashParams, isObject, STATE } from '../utils';
  import { onMount, setContext, tick } from 'svelte';
  import { DateTime } from 'luxon';
  import { redirect } from '@roxi/routify';

  import { Wave } from 'svelte-loading-spinners';
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const EXPIRATION_TIME = 3600 * 1000;
  const localStorage = window.localStorage;
  $: token = {
    value: '',
    state: STATE.expired,
  };

  const setLocalAccessToken = (token) => {
    setTokenTimestamp();
    localStorage.setItem('spotify_access_token', token);
  };
  const setTokenTimestamp = () => {
    localStorage.setItem(
      'spotify_token_timestamp',
      DateTime.now().toISO(),
    );
  };
  const setLocalRefreshToken = (token) => {
    localStorage.setItem('spotify_refresh_token', token);
  };
  const getLocalRefreshToken = () => {
    return localStorage.getItem('spotify_refresh_token');
  };
  const getLocalAccessToken = () => {
    return localStorage.getItem('spotify_access_token');
  };
  const getTokenTimestamp = () => {
    return DateTime.fromISO(
      localStorage.getItem('spotify_token_timestamp'),
    );
  };
  const getAccessToken = () => {
    try {
      const { error, access_token, refresh_token } = getHashParams();

      if (error) {
        console.error(error);
        refreshAccessToken();
      }

      if (
        DateTime.now().diff(getTokenTimestamp()).milliseconds >
        EXPIRATION_TIME
      ) {
        token.state = STATE.refreshing;

        refreshAccessToken();
      }
      const localAccessToken = getLocalAccessToken();
      const localRefreshToken = getLocalRefreshToken();

      if (
        localAccessToken === 'undefined' &&
        typeof access_token === 'undefined'
      ) {
        $redirect('/login');
      }
      // If there is no REFRESH token in local storage, set it as `refresh_token` from params
      if (!localRefreshToken || localRefreshToken === 'undefined') {
        setLocalRefreshToken(refresh_token);
      }

      // If there is no ACCESS token in local storage, set it and return `access_token` from params
      if (!localAccessToken || localAccessToken === 'undefined') {
        setLocalAccessToken(access_token);
        return access_token;
      }
      return localAccessToken;
    } catch (e) {
      $redirect('/login');
    }
  };
  const refreshAccessToken = async () => {
    const data = await fetchNewAccessToken();
    const { access_token } = data;

    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  };

  onMount(() => {
    token.value = getAccessToken();
    tick().then(() => {
      setTimeout(() => {
        token.state = STATE.uptodate;
      }, 3000);
    });

    setTimeout(() => {
      token.value = getAccessToken();

      tick().then(() => {
        setTimeout(() => {
          token.state = STATE.uptodate;
        }, 3000);
      });
    }, EXPIRATION_TIME);
  });

  const fetchData = (url, opts = {}, method = 'GET') => {
    return fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      ...opts,
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

        throw new Error(err);
      });
  };

  const fetchUserTopArtists = (
    time_range = 'long_term',
    limit = 50,
  ) => {
    return fetchData(
      `${
        import.meta.env.VITE_API_BASE_URL
      }me/top/artists?time_range=${time_range}&limit=${limit}`,
    );
  };
  const fetchNewAccessToken = () => {
    return fetchData(
      `${
        import.meta.env.VITE_SERVER_URL
      }refresh_token?refresh_token=${getLocalRefreshToken()}`,
    );
  };
  const fetchUserTopTracks = (
    time_range = 'long_term',
    limit = 50,
  ) => {
    return fetchData(
      `${
        import.meta.env.VITE_API_BASE_URL
      }me/top/tracks?time_range=${time_range}&limit=${limit}`,
    );
  };
  const fetchUserPlaylists = () => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}me/playlists`,
    );
  };
  const fetchUserInfo = () => {
    return fetchData(`${import.meta.env.VITE_API_BASE_URL}me`);
  };
  const fetchUserFollowedArtists = () => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}me/following?type=artist`,
    );
  };
  const fetchArtist = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}artists/${id}`,
    );
  };
  const fetchArtistAlbum = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}artists/${id}/albums`,
    );
  };
  const fetchPlaylist = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}playlists/${id}`,
    );
  };
  const fetchArtistTopTracks = (id) => {
    return fetchData(
      `${
        import.meta.env.VITE_API_BASE_URL
      }artists/${id}/top-tracks?country=from_token`,
    );
  };
  const fetchArtistRelatedArtists = (id) => {
    return fetchData(
      `${
        import.meta.env.VITE_API_BASE_URL
      }artists/${id}/related-artists`,
    );
  };
  const fetchAlbum = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}albums/${id}`,
    );
  };
  const fetchTrack = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}tracks/${id}`,
    );
  };
  const fetchTrackFeature = (id) => {
    return fetchData(
      `${import.meta.env.VITE_API_BASE_URL}audio-features/${id}`,
    );
  };
  setContext(apiEndpointsNames.userFollowedArtists, {
    fetchUserFollowedArtists: () => fetchUserFollowedArtists(),
  });
  setContext(apiEndpointsNames.userInfo, {
    fetchUserInfo: () => fetchUserInfo(),
  });
  setContext(apiEndpointsNames.userTopArtists, {
    fetchUserTopArtists: () => fetchUserTopArtists(),
  });
  setContext(apiEndpointsNames.userPlaylists, {
    fetchUserPlaylists: () => fetchUserPlaylists(),
  });
  setContext(apiEndpointsNames.userTopTracks, {
    fetchUserTopTracks: () => fetchUserTopTracks(),
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

{#if token.state === STATE.uptodate}<QueryClientProvider
    client={queryClient}
  >
    <slot name="content">no content was provided</slot>
  </QueryClientProvider>
{:else}
  <div
    style="display: flex;
flex-flow: column;
justify-content: center;
margin-bottom: var(--nav-height);
min-height: 100vh;"
  >
    <Wave size="60" color="#1db954" unit="px" duration="1s" />
  </div>
{/if}
