<script>
  import { getContext } from 'svelte';
  import {
    useQuery,
    useQueryClient,
  } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { params } from '@roxi/routify';
  import { apiEndpointsNames } from '../../components/Spotify-api.svelte';
  import TrackList from '../../components/TrackList.svelte';
  import QueryErrorMessage from '../../components/QueryErrorMessage.svelte';
  import { isEmptyObject } from '../../utils';
  import CardInfo from '../../components/CardInfo.svelte';
  let id = $params.id;
  const { fetchPlaylist } = getContext(apiEndpointsNames.playlist);
  const queryClient = useQueryClient();
  const playlistQuery = useQuery(
    [apiEndpointsNames.playlist, id],
    () => fetchPlaylist(id),
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.playlist),
      retry: 1,
      enabled: !!id,
    },
  );
</script>

{#if $playlistQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if $playlistQuery.error || (typeof $playlistQuery.data !== 'undefined' && 'error' in $playlistQuery.data)}
  <QueryErrorMessage
    data={new Set().add({
      error: $playlistQuery.error || $playlistQuery.data.error,
    })}
  />
{:else if isEmptyObject($playlistQuery.data)}
  <p>playlist data not found ,reload the page or reconnect</p>
{:else}
  <div class="album">
    <CardInfo
      image={$playlistQuery.data.images[0]}
      name={$playlistQuery.data.name}
      total={$playlistQuery.data.tracks.total}
      creators={[$playlistQuery.data.owner]}
    />
    <TrackList data={$playlistQuery.data.tracks.items} />
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
      margin: 1rem 4rem;
    }
  }
</style>
