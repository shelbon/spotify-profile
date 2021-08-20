<script>
  import { getContext } from 'svelte';
  import { useQuery } from '@sveltestack/svelte-query';
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
  const artistInfoQuery = useQuery(
    [apiEndpointsNames.artist, id],
    () => fetchArtist(id),
    {
      enabled: !!id,
    },
  );
  $: {
    artistInfoQuery.setOptions(
      [apiEndpointsNames.artist, id],
      () => fetchArtist(id),
      {
        enabled: !!id,
      },
    );
  }
  const artistTopTracksQuery = useQuery(
    [apiEndpointsNames.artistTopTracks, id],
    () => fetchArtistTopTracks(id),
    {
      enabled: !!id,
    },
  );
  $: {
    artistTopTracksQuery.setOptions(
      [apiEndpointsNames.artistTopTracks, id],
      () => fetchArtistTopTracks(id),
      {
        enabled: !!id,
      },
    );
  }
  const artistAlbumQuery = useQuery(
    [apiEndpointsNames.artistAlbum, id],
    () => fetchArtistAlbum(id),
    {
      enabled: !!id,
    },
  );
  $: {
    artistAlbumQuery.setOptions(
      [apiEndpointsNames.artistAlbum, id],
      () => fetchArtistAlbum(id),
      {
        enabled: !!id,
      },
    );
  }
  const artistRelatedArtistsQuery = useQuery(
    [apiEndpointsNames.artistRelatedArtists, id],
    () => fetchArtistRelatedArtists(id),
    {
      enabled: !!id,
    },
  );
  $: {
    artistRelatedArtistsQuery.setOptions(
      [apiEndpointsNames.artistRelatedArtists, id],
      () => fetchArtistRelatedArtists(id),
      {
        enabled: !!id,
      },
    );
  }
  $: if (
    !$artistInfoQuery.isLoading &&
    typeof $artistInfoQuery.data !== 'undefined' &&
    'error' in $artistInfoQuery.data === false
  ) {
    title = `artist:${$artistInfoQuery.data.name}`;
  }

  $: errorData = new Set();
  $: if (!$artistInfoQuery.isLoading) {
    let error;
    if ($artistInfoQuery.data !== undefined) {
      error = $artistInfoQuery.data.error;
    } else if ($artistInfoQuery.error) {
      error = { message: $artistInfoQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.artist,
        error: error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
    }
  }
  $: if (!$artistTopTracksQuery.isLoading) {
    let error;
    if ($artistTopTracksQuery.data !== undefined) {
      error = $artistTopTracksQuery.data.error;
    } else if ($artistTopTracksQuery.error) {
      error = { message: $artistTopTracksQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.topArtists,
        error: error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
    }
  }
  $: if (!$artistAlbumQuery.isLoading) {
    let error;
    if ($artistAlbumQuery.data !== undefined) {
      error = $artistAlbumQuery.data.error;
    } else if ($artistAlbumQuery.error) {
      error = { message: $artistAlbumQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.artistAlbum,
        error: error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
    }
  }
  $: if (!$artistRelatedArtistsQuery.isLoading) {
    let error;
    if ($artistRelatedArtistsQuery.data !== undefined) {
      error = $artistRelatedArtistsQuery.data.error;
    } else if ($artistRelatedArtistsQuery.error) {
      error = { message: $artistRelatedArtistsQuery.error.message };
    }
    if (typeof error !== 'undefined') {
      let data = {
        name: apiEndpointsNames.artistRelatedArtists,
        error,
      };
      if (!errorData.has(data)) {
        errorData.add(data);
      }
    }
  }
</script>

<svelte:head><title>{title}</title></svelte:head>

{#if $artistInfoQuery.isLoading || $artistTopTracksQuery.isLoading || $artistRelatedArtistsQuery.isLoading || artistAlbumQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if errorData.size > 0}
  <QueryErrorMessage data={errorData} />
{:else if isEmptyObject($artistInfoQuery.data) || isEmptyObject($artistTopTracksQuery.data) || isEmptyObject($artistAlbumQuery.data) || isEmptyObject($artistRelatedArtistsQuery.data)}
  <p style="align-self: center;">Artist not found</p>
{:else}
  <ArtistInfo data={$artistInfoQuery.data} />
  <PageSection title="Top Tracks">
    <Filter
      let:filteredData
      items={$artistTopTracksQuery.data.tracks}
      limit={10}
    >
      <CardGrid baseUrlLink="track" data={filteredData} />
    </Filter>
  </PageSection>
  <PageSection title="Album">
    <Filter
      let:filteredData
      items={$artistAlbumQuery.data.items}
      limit={5}
    >
      <CardList baseUrlLink="album" data={filteredData} />
    </Filter>
  </PageSection>
  <PageSection title="Related Artists">
    <Filter
      let:filteredData
      items={$artistRelatedArtistsQuery.data.artists}
      limit={5}
    >
      <CardList baseUrlLink="artist" data={filteredData} />
    </Filter>
  </PageSection>
{/if}
