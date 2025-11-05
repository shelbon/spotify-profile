<script>
  import { getContext } from 'svelte';
  import { createQueries } from '@tanstack/svelte-query';
  import Wave from '../../components/Wave.svelte';
  import { apiEndpointsNames } from '../../services/spotify-api';
  import QueryErrorMessage from '../../components/QueryErrorMessage.svelte';
  import { isEmptyObject } from '../../utils';

  import ArtistInfo from '../../components/ArtistInfo.svelte';
  import PageSection from '../../components/PageSection.svelte';
  import { params } from '@roxi/routify';
  import CardGrid from '../../components/CardGrid.svelte';
  import CardList from '../../components/CardList.svelte';
  import Filter from '../../components/Filter.svelte';

  const { fetchArtist } = getContext(apiEndpointsNames.artist);
  const { fetchArtistTopTracks } = getContext(
    apiEndpointsNames.artistTopTracks,
  );
  const { fetchArtistAlbum } = getContext(
    apiEndpointsNames.artistAlbum,
  );
  const { fetchArtistRelatedArtists } = getContext(
    apiEndpointsNames.artistRelatedArtists,
  );
  let title = $state('Artist page');

  let id = $state($params.id);

  let artistQueryResult = createQueries(() => ({
    queries: [
      {
        queryKey: [apiEndpointsNames.artist, id],
        queryFn: () => fetchArtist(id),
      },
      {
        queryKey: [apiEndpointsNames.artistTopTracks, id],
        queryFn: () => fetchArtistTopTracks(id),
      },
      {
        queryKey: [apiEndpointsNames.artistAlbum, id],
        queryFn: () => fetchArtistAlbum(id),
      },
      {
        queryKey: [apiEndpointsNames.artistRelatedArtists, id],
        queryFn: () => fetchArtistRelatedArtists(id),
      },
    ],
  }));

  let queryIsLoading = $derived(
    artistQueryResult.some(
      (query) => query.isLoading || query.isFetching,
    ),
  );
  let queryAsError = $derived(
    artistQueryResult.some(
      (query) =>
        query.isError ||
        (typeof query.data !== 'undefined' &&
          query.data.hasOwnProperty('error')),
    ),
  );

  let collectError = $derived(
    queryAsError
      ? artistQueryResult
          .filter(
            (query) =>
              query.isError ||
              (typeof query.data !== 'undefined' &&
                query.data.hasOwnProperty('error')),
          )
          .map((query) => query.data)
      : [],
  );
  let queryIsEmpty = $derived(
    artistQueryResult.some((query) => isEmptyObject(query.data)),
  );
  let artistInfo = $derived(artistQueryResult[0].data);
  let artistTopTracks = $derived(artistQueryResult[1].data);
  let artistAlbum = $derived(artistQueryResult[2].data);
  let artistRelatedArtists = $derived(artistQueryResult[3].data);
  $effect(() => {
    if (!isEmptyObject(artistInfo)) {
      title = `artist:${artistInfo.name}`;
    }
  });
</script>

<svelte:head><title>{title}</title></svelte:head>

{#if queryIsLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if queryAsError}
  <QueryErrorMessage data={new Set([...collectError])} />
{:else if queryIsEmpty}
  <p style="align-self: center;">Artist not found</p>
{:else}
  <ArtistInfo data={artistInfo} />
  <PageSection title="Top Tracks">
    <Filter
      let:filteredData
      items={artistTopTracks.tracks}
      limit={10}
    >
      <CardGrid baseUrlLink="track" data={filteredData} />
    </Filter>
  </PageSection>
  <PageSection title="Album">
    <Filter let:filteredData items={artistAlbum.items} limit={5}>
      <CardList baseUrlLink="album" data={filteredData} />
    </Filter>
  </PageSection>
  <PageSection title="Related Artists">
    <Filter
      let:filteredData
      items={artistRelatedArtists.artists}
      limit={5}
    >
      <CardList baseUrlLink="artist" data={filteredData} />
    </Filter>
  </PageSection>
{/if}
