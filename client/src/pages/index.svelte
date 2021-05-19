<script>
  import { getContext } from 'svelte';
  import { useQuery, useQueryClient } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { apiEndpointsNames } from '../components/Spotify-api.svelte';
  import UserInfo from '../components/userInfo.svelte';
  const { fetchUserInfo } = getContext(apiEndpointsNames.userInfo);
  const { fetchFollowedArtists } = getContext(
    apiEndpointsNames.userFollowedArtists
  );
  const { fetchPlaylists } = getContext(apiEndpointsNames.playlists);
  const queryClient = useQueryClient();
  const userInfoQuery = useQuery(apiEndpointsNames.userInfo, fetchUserInfo, {
    initialData: () => queryClient.getQueryData(apiEndpointsNames.userInfo),
    staleTime: 50000,
  });
  const userPlaylistsQuery = useQuery(
    apiEndpointsNames.playlists,
    fetchPlaylists,
    {
      initialData: () => queryClient.getQueryData(apiEndpointsNames.playlists),
      staleTime: 50000,
    }
  );
  const followedArtistsQuery = useQuery(
    apiEndpointsNames.userFollowedArtists,
    fetchFollowedArtists,
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.userFollowedArtists),
      staleTime: 50000,
    }
  );
  $: console.table({
    userInfo: $userInfoQuery.data,
    followed: $followedArtistsQuery.data,
    playlists: $userPlaylistsQuery.data,
  });
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

{#if $userInfoQuery.isLoading || $followedArtistsQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if $userInfoQuery.error || $userInfoQuery.data.error !== undefined || $followedArtistsQuery.data.error !== undefined || $followedArtistsQuery.error || $userPlaylistsQuery.data.error !== undefined || $userPlaylistsQuery.error}
  <p>Something when wrong , please retry or reconnect</p>
{:else}
  <div class="profile__container">
    <UserInfo
      name={$userInfoQuery.data.display_name}
      followers={$userInfoQuery.data.followers.total}
      following={$followedArtistsQuery.data.artists.total}
      image={$userInfoQuery.data.images[0].url}
      nbPlaylist={$userPlaylistsQuery.data.total}
    />
  </div>
{/if}

<style>
  .profile__container {
    display: flex;
    flex-flow: column;
  }
</style>
