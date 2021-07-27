<script>
  import QueryErrorMessage from '../components/QueryErrorMessage.svelte';

  import { getContext } from 'svelte';
  import {
    useQuery,
    useQueryClient,
  } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { apiEndpointsNames } from '../components/Spotify-api.svelte';
  import UserInfo from '../components/UserInfo.svelte';
  import TopArtists from '../components/TopArtists.svelte';
  import TopTracks from '../components/TopTracks.svelte';

  const { fetchUserInfo } = getContext(apiEndpointsNames.userInfo);

  const { fetchTopTracks } = getContext(apiEndpointsNames.topTracks);

  const { fetchTopArtists } = getContext(
    apiEndpointsNames.topArtists,
  );
  const { fetchPlaylists } = getContext(apiEndpointsNames.playlists);
  const { fetchFollowedArtists } = getContext(
    apiEndpointsNames.userFollowedArtists,
  );
  const queryClient = useQueryClient();

  const userInfoQuery = useQuery(
    apiEndpointsNames.userInfo,
    fetchUserInfo,
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.userInfo),
      staleTime: 50000,
    },
  );
  const topTracksQuery = useQuery(
    apiEndpointsNames.topTracks,
    fetchTopTracks,
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.topTracks),
      staleTime: 50000,
      retry: 1,
    },
  );
  const topArtistsQuery = useQuery(
    apiEndpointsNames.topArtists,
    fetchTopArtists,
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.topArtists),
      staleTime: 50000,
      retry: 1,
    },
  );
  const followedArtistsQuery = useQuery(
    apiEndpointsNames.userFollowedArtists,
    fetchFollowedArtists,
    {
      initialData: () =>
        queryClient.getQueryData(
          apiEndpointsNames.userFollowedArtists,
        ),
      staleTime: 50000,
      retry: 1,
    },
  );
  const userPlaylistsQuery = useQuery(
    apiEndpointsNames.playlists,
    fetchPlaylists,
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.playlists),
      staleTime: 50000,
      retry: 1,
    },
  );
  $: errorData = new Set();
  $: if (
    $userInfoQuery.data !== undefined &&
    'error' in $userInfoQuery.data
  ) {
    let data = {
      name: apiEndpointsNames.userInfo,
      error: $userInfoQuery.data.error,
    };
    if (!errorData.has(data)) {
      errorData.add(data);
    }
  }
  $: if (
    $topArtistsQuery.data !== undefined &&
    'error' in $topArtistsQuery.data
  ) {
    let data = {
      name: apiEndpointsNames.userFollowedArtists,
      error: $topArtistsQuery.data.error,
    };
    if (!errorData.has(data)) {
      errorData.add(data);
    }
  }
  $: if (
    $topTracksQuery.data !== undefined &&
    'error' in $topTracksQuery.data
  ) {
    let data = {
      name: apiEndpointsNames.playlists,
      error: $topTracksQuery.data.error,
    };
    if (!errorData.has(data)) {
      errorData.add(data);
    }
  }
  $: if (
    $followedArtistsQuery.data !== undefined &&
    'error' in $followedArtistsQuery.data
  ) {
    let data = {
      name: apiEndpointsNames.userFollowedArtists,
      error: $followedArtistsQuery.data.error,
    };
    if (!errorData.has(data)) {
      errorData.add(data);
    }
  }
  $: if (
    $userPlaylistsQuery.data !== undefined &&
    'error' in $userPlaylistsQuery.data
  ) {
    let data = {
      name: apiEndpointsNames.playlists,
      error: $userPlaylistsQuery.data.error,
    };
    if (!errorData.has(data)) {
      errorData.add(data);
    }
  }
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>
{#if $userInfoQuery.isLoading || $topArtistsQuery.isLoading || $topTracksQuery.isLoading || $userPlaylistsQuery.isLoading || $followedArtistsQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if errorData.size > 0}
  <QueryErrorMessage data={errorData} />
{:else}
  <div class="profile__container">
    <UserInfo
      name={$userInfoQuery.data.display_name}
      followers={$userInfoQuery.data.followers.total}
      following={$followedArtistsQuery.data.artists.total}
      image={$userInfoQuery.data.images[0]?.url}
      nbPlaylist={$userPlaylistsQuery.data !== undefined
        ? $userPlaylistsQuery.data.total
        : 0}
    />
    <TopArtists data={$topArtistsQuery.data.items} limit={5} />
    <TopTracks data={$topTracksQuery.data.items} limit={5} />
  </div>
{/if}

<style>
  .profile__container {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
  }
</style>
