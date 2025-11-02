<script>
  import { getContext } from 'svelte';
  import { useQuery } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { apiEndpointsNames } from '../components/Spotify-api.svelte';
  import QueryErrorMessage from '../components/QueryErrorMessage.svelte';
  import PageSection from '../components/PageSection.svelte';
  import CardGrid from '../components/CardGrid.svelte';
  const { fetchUserPlaylists } = getContext(
    apiEndpointsNames.userPlaylists,
  );
  const playlistsQuery = useQuery(
    apiEndpointsNames.userPlaylists,
    fetchUserPlaylists,
  );
</script>

<svelte:head>
  <title>Playlist</title>
</svelte:head>
{#if $playlistsQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if $playlistsQuery.error || (typeof $playlistsQuery.data !== 'undefined' && 'error' in $playlistsQuery.data)}
  <QueryErrorMessage
    data={new Set().add({
      error: $playlistsQuery.error || $playlistsQuery.data.error,
    })}
  />
{:else}
  <PageSection title="Your playlists">
    <CardGrid
      data={$playlistsQuery.data.items}
      baseUrlLink="playlist"
    />
  </PageSection>
{/if}
