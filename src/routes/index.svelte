<script>
  import QueryErrorMessage from '../components/QueryErrorMessage.svelte';
  import { getContext } from 'svelte';
  import { useQueries } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { apiEndpointsNames } from '../components/Spotify-api.svelte';
  import UserInfo from '../components/UserInfo.svelte';
  import PageSection from '../components/PageSection.svelte';
  import { isEmptyObject } from '../utils';
  import CardList from '../components/CardList.svelte';
  import Filter from '../components/Filter.svelte';

  const { fetchUserInfo } = getContext(apiEndpointsNames.userInfo);

  const { fetchUserTopTracks } = getContext(
    apiEndpointsNames.userTopTracks,
  );

  const { fetchUserTopArtists } = getContext(
    apiEndpointsNames.userTopArtists,
  );
  const { fetchUserPlaylists } = getContext(
    apiEndpointsNames.userPlaylists,
  );
  const { fetchUserFollowedArtists } = getContext(
    apiEndpointsNames.userFollowedArtists,
  );
  const queryResult = useQueries([
    { queryKey: apiEndpointsNames.userInfo, queryFn: fetchUserInfo },
    {
      queryKey: apiEndpointsNames.userTopTracks,
      queryFn: fetchUserTopTracks,
    },
    {
      queryKey: apiEndpointsNames.userTopArtists,
      queryFn: fetchUserTopArtists,
    },
    {
      queryKey: apiEndpointsNames.userFollowedArtists,
      queryFn: fetchUserFollowedArtists,
    },
    {
      queryKey: apiEndpointsNames.userPlaylists,
      queryFn: fetchUserPlaylists,
    },
  ]);
  $: queryIsLoading = $queryResult.some((query) => query.isLoading);
  $: queryAsError = $queryResult.some(
    (query) =>
      query.isError ||
      (typeof query.data !== 'undefined' &&
        query.data.hasOwnProperty('error')),
  );
  $: collectError = queryAsError
    ? $queryResult
        .filter(
          (query) =>
            query.isError ||
            (typeof query.data !== 'undefined' &&
              query.data.hasOwnProperty('error')),
        )
        .map((query) => query.data)
    : [];
  $: queryIsEmpty = $queryResult.some((query) =>
    isEmptyObject(query.data),
  );
  $: userInfo = $queryResult[0].data;
  $: topTracks = $queryResult[1].data;
  $: topArtists = $queryResult[2].data;
  $: followedArtists = $queryResult[3].data;
  $: userPlaylists = $queryResult[4].data;
</script>

<svelte:head>
  <title>Profile</title>
</svelte:head>

{#if queryIsLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if queryAsError}
  <QueryErrorMessage data={new Set([...collectError])} />
{:else if queryIsEmpty}
  <p class="not-found">user data not found</p>
{:else}
  <div class="profile__container">
    <UserInfo
      name={userInfo.display_name}
      followers={userInfo.followers.total}
      following={followedArtists.artists.total}
      image={userInfo.images[0]?.url}
      nbPlaylist={userPlaylists.total || 0}
    />
    <PageSection title="Top Artists">
      <Filter let:filteredData items={topArtists.items} limit={5}>
        <CardList baseUrlLink="artist" data={filteredData} />
      </Filter>
    </PageSection>
    <PageSection title="Top Tracks">
      <Filter let:filteredData items={topTracks.items} limit={5}>
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
