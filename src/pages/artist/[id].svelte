<script>
  import { getContext } from 'svelte';
  import {
    useQueries,
    useQueryClient,
  } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { apiEndpointsNames } from '../../components/Spotify-api.svelte';
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
  $: title = 'Artist page';

  $: id = $params.id;

  $: artistQueryResult = useQueries([
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
  ]);

  $: queryIsLoading = $artistQueryResult.some(
    (query) => query.isLoading || query.isFetching,
  );
  $: queryAsError = $artistQueryResult.some(
    (query) =>
      query.isError ||
      (typeof query.data !== 'undefined' &&
        query.data.hasOwnProperty('error')),
  );

  $: collectError = queryAsError
    ? $artistQueryResult
        .filter(
          (query) =>
            query.isError ||
            (typeof query.data !== 'undefined' &&
              query.data.hasOwnProperty('error')),
        )
        .map((query) => query.data)
    : [];
  $: queryIsEmpty = $artistQueryResult.some((query) =>
    isEmptyObject(query.data),
  );
  $: artistInfo = $artistQueryResult[0].data;
  $: artistTopTracks = $artistQueryResult[1].data;
  $: artistAlbum = $artistQueryResult[2].data;
  $: artistRelatedArtists = $artistQueryResult[3].data;
  $: if (!isEmptyObject(artistInfo)) {
    title = `artist:${artistInfo.name}`;
  }
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
