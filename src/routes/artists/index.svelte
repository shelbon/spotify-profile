<script>
  import { getContext } from 'svelte';
  import { createQuery } from '@tanstack/svelte-query';
  import Wave from '../../components/Wave.svelte';
  import { apiEndpointsNames } from '../../services/spotify-api';
  import QueryErrorMessage from '../../components/QueryErrorMessage.svelte';
  import PageSection from '../../components/PageSection.svelte';
  import CardGrid from '../../components/CardGrid.svelte';

  const { fetchUserTopArtists } = getContext(
    apiEndpointsNames.userTopArtists,
  );
  const topArtistsQuery = createQuery(() => ({
    queryKey: [apiEndpointsNames.userTopArtists],
    queryFn: fetchUserTopArtists,
  }));
</script>

<svelte:head>
  <title>Top artists</title>
</svelte:head>
{#if topArtistsQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if topArtistsQuery.error || (typeof topArtistsQuery.data !== 'undefined' && 'error' in topArtistsQuery.data)}
  <QueryErrorMessage
    data={new Set().add({
      error: topArtistsQuery.error || topArtistsQuery.data.error,
    })}
  />
{:else}
  <PageSection title="Top artists">
    <CardGrid
      data={topArtistsQuery.data.items}
      baseUrlLink="artists"
    />
  </PageSection>
{/if}
