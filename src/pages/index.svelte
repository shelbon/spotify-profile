<script>
  import QueryErrorMessage from '../components/QueryErrorMessage.svelte';
  import { getContext } from 'svelte';
  import { useQuery } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { apiEndpointsNames } from '../components/Spotify-api.svelte';
  import UserInfo from '../components/UserInfo.svelte';
  import PageSection from '../components/PageSection.svelte';
  import { isEmptyObject } from '../utils';
  import CardList from '../components/CardList.svelte';
  import Filter from '../components/Filter.svelte';

  const { fetchUserInfo } = getContext(apiEndpointsNames.userInfo);

  const { fetchTopTracks } = getContext(apiEndpointsNames.topTracks);

  const { fetchTopArtists } = getContext(
    apiEndpointsNames.topArtists,
  );
  const { fetchPlaylists } = getContext(apiEndpointsNames.playlists);
  const { fetchFollowedArtists } = getContext(
    apiEndpointsNames.userFollowedArtists,
  );

  const userInfoQuery = useQuery(
    apiEndpointsNames.userInfo,
    fetchUserInfo,
  );
  const topTracksQuery = useQuery(
    apiEndpointsNames.topTracks,
    fetchTopTracks,
  );
  const topArtistsQuery = useQuery(
    apiEndpointsNames.topArtists,
    fetchTopArtists,
  );
  const followedArtistsQuery = useQuery(
    apiEndpointsNames.userFollowedArtists,
    fetchFollowedArtists,
  );
  const userPlaylistsQuery = useQuery(
    apiEndpointsNames.playlists,
    fetchPlaylists,
  );
  $: errorData = new Set();
  $: if (!$userInfoQuery.isLoading) {
    let error;
    if ($userInfoQuery.data !== undefined) {
      error = $userInfoQuery.data.error;
    } else if ($userInfoQuery.error) {
      error = { message: $userInfoQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.userInfo,
        error: error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
    }
  }
  $: if (!$topArtistsQuery.isLoading) {
    let error;
    if ($topArtistsQuery.data !== undefined) {
      error = $topArtistsQuery.data.error;
    } else if ($topArtistsQuery.error) {
      error = { message: $topArtistsQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.topArtists,
        error: error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
    }
  }
  $: if (!$topTracksQuery.isLoading) {
    let error;
    if ($topTracksQuery.data !== undefined) {
      error = $topTracksQuery.data.error;
    } else if ($topTracksQuery.error) {
      error = { message: $topTracksQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.topTracks,
        error: error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
    }
  }
  $: if (!$followedArtistsQuery.isLoading) {
    let error;
    if ($followedArtistsQuery.data !== undefined) {
      error = $followedArtistsQuery.data.error;
    } else if ($followedArtistsQuery.error) {
      error = { message: $followedArtistsQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.userFollowedArtists,
        error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
    }
  }
  $: if (!$userPlaylistsQuery.isLoading) {
    let error;
    if ($userPlaylistsQuery.data !== undefined) {
      error = $userPlaylistsQuery.data.error;
    } else if ($userPlaylistsQuery.error) {
      error = { message: $userPlaylistsQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.playlists,
        error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
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
{:else if isEmptyObject($userInfoQuery.data) || isEmptyObject($topArtistsQuery.data) || isEmptyObject($topTracksQuery.data) || isEmptyObject($userPlaylistsQuery.data) || isEmptyObject($followedArtistsQuery.data)}
  <p class="not-found">user data not found</p>
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
    <PageSection title="Top Artists">
      <Filter
        let:filteredData
        items={$topArtistsQuery.data.items}
        limit={5}
      >
        <CardList baseUrlLink="artist" data={filteredData} />
      </Filter>
    </PageSection>
    <PageSection title="Top Tracks">
      <Filter
        let:filteredData
        items={$topTracksQuery.data.items}
        limit={5}
      >
        <CardList baseUrlLink="track" data={filteredData} />
      </Filter>
    </PageSection>
  </div>
{/if}

<style>
  .profile__container {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 100%;
  }
  .not-found {
    align-self: center;
  }
</style>
