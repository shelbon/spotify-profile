<script>
  import { getContext } from 'svelte';
  import {
    useQuery,
    useQueryClient,
  } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { params } from '@roxi/routify';
  import { apiEndpointsNames } from '../../components/Spotify-api.svelte';
  import TrackList from '../../components/trackList.svelte';
  import QueryErrorMessage from '../../components/QueryErrorMessage.svelte';
  import { isEmptyObject } from '../../utils';
  import CardInfo from '../../components/CardInfo.svelte';
  let id = $params.id;
  const { fetchAlbum } = getContext(apiEndpointsNames.album);
  const queryClient = useQueryClient();
  const albumQuery = useQuery(
    [apiEndpointsNames.album, id],
    () => fetchAlbum(id),
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.album),
      retry: 1,
      enabled: !!id,
    },
  );
</script>

{#if $albumQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if $albumQuery.error || (typeof $albumQuery.data !== 'undefined' && 'error' in $albumQuery.data)}
  <QueryErrorMessage
    data={new Set().add({
      error: $albumQuery.error || $albumQuery.data.error,
    })}
  />
{:else if isEmptyObject($albumQuery.data)}
  <p>album is empty</p>
{:else}
  <div class="album">
    <CardInfo
      image={$albumQuery.data.images[1]}
      name={$albumQuery.data.name}
      total={$albumQuery.data.total_tracks}
      creators={$albumQuery.data.artists}
      release_date={$albumQuery.data.release_date.substring(0, 4)}
    />
    <TrackList data={$albumQuery.data.tracks.items} />
  </div>
{/if}

<style>
  .album {
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
  }
  @media (min-width: 500px) {
    .album {
      flex-direction: row;
      margin: 0 4rem;
    }
  }
</style>
