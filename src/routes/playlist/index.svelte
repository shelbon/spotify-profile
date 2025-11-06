<script>
  import { getContext } from 'svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import Wave from '../../components/Wave.svelte';
  import { apiEndpointsNames } from '../../services/spotify-api';
  import QueryErrorMessage from '../../components/QueryErrorMessage.svelte';
  import PageSection from '../../components/PageSection.svelte';
  import CardGrid from '../../components/CardGrid.svelte';
  const { fetchUserPlaylists } = getContext(
    apiEndpointsNames.userPlaylists,
  );

  const playlistsQuery = createQuery(() => ({
    queryKey: [apiEndpointsNames.userPlaylists],
    queryFn: fetchUserPlaylists,
  }));

  let isLoading = $derived(playlistsQuery.isLoading);
  let hasError = $derived(playlistsQuery.error || (typeof playlistsQuery.data !== 'undefined' && 'error' in playlistsQuery.data));
  let data = $derived(playlistsQuery.data);
</script>

<svelte:head>
  <title>Playlist</title>
</svelte:head>
{#if isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if hasError}
  <QueryErrorMessage
    data={new Set().add({
      error: playlistsQuery.error || data.error,
    })}
  />
{:else}
  <PageSection title="Your playlists">
    <CardGrid
      data={data.items}
      baseUrlLink="playlist"
    />
  </PageSection>
{/if}
