<script>
  import { getContext } from 'svelte';
  import { useQuery } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { apiEndpointsNames } from '../components/Spotify-api.svelte';
  import QueryErrorMessage from '../components/QueryErrorMessage.svelte';
  import PageSection from '../components/PageSection.svelte';
  import CardGrid from '../components/CardGrid.svelte';
  const { fetchUserTopTracks } = getContext(
    apiEndpointsNames.userTopTracks,
  );
  const topTracksQuery = useQuery(
    apiEndpointsNames.userTopTracks,
    fetchUserTopTracks,
  );
</script>

<svelte:head><title>Tracks</title></svelte:head>
{#if $topTracksQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if $topTracksQuery.error || (typeof $topTracksQuery.data !== 'undefined' && 'error' in $topTracksQuery.data)}
  <QueryErrorMessage
    data={new Set().add({
      error: $topTracksQuery.error || $topTracksQuery.data.error,
    })}
  />
{:else}
  <PageSection title="Top Tracks">
    <CardGrid data={$topTracksQuery.data.items} baseUrlLink="track" />
  </PageSection>
{/if}
