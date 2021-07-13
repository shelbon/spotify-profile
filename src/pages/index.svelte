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

  const { fetchFollowedArtists } = getContext(
    apiEndpointsNames.userFollowedArtists,
  );

  const { fetchPlaylists } = getContext(apiEndpointsNames.playlists);
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
  const userPlaylistsQuery = useQuery(
    apiEndpointsNames.playlists,
    fetchPlaylists,
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.playlists),
      staleTime: 50000,
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
    },
  );

  let errorData = new Set();
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
{#if $userInfoQuery.isLoading || $followedArtistsQuery.isLoading || $userPlaylistsQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if $userInfoQuery.isError || $userPlaylistsQuery.isError || $followedArtistsQuery.isError}
  <p>{$userInfoQuery.error}</p>
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
    <TopArtists
      data={$followedArtistsQuery.data.artists.items}
      limit={5}
    />
    <TopTracks data={$userPlaylistsQuery.data.items} />
  </div>
{/if}

<style>
  .profile__container {
    display: flex;
    flex-flow: column;
  }
</style>
