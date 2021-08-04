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
  <p>album is empty</p>
{:else}
  <div class="album">
    <CardInfo
      image={$playlistQuery.data.images[1]}
      name={$playlistQuery.data.name}
      total={$playlistQuery.data.tracks.total}
      creatorName={$playlistQuery.data.owner.display_name}
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
      margin: 0 4rem;
    }
  }
</style>
