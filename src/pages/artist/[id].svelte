<script>
  import { getContext, onMount } from 'svelte';
  import {
    useQuery,
    useQueryClient,
    useIsFetching,
  } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { apiEndpointsNames } from '../../components/Spotify-api.svelte';
  import QueryErrorMessage from '../../components/QueryErrorMessage.svelte';
  import { isEmptyObject } from '../../utils';

  import ArtistInfo from '../../components/ArtistInfo.svelte';
  import PageSection from '../../components/PageSection.svelte';
  import { params } from '@roxi/routify';

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

  const queryClient = useQueryClient();
  const isFetching = useIsFetching();
  $: id = $params.id;
  const artistInfoQuery = useQuery(
    [apiEndpointsNames.artist, id],
    () => fetchArtist(id),
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.artist),
      retry: 1,
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
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.artistTopTracks),
      retry: 1,
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
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.artistAlbum),
      retry: 1,
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
      initialData: () =>
        queryClient.getQueryData(
          apiEndpointsNames.artistRelatedArtists,
        ),
      retry: 1,
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

{#if $isFetching}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if errorData.size > 0}
  <QueryErrorMessage data={errorData} />
{:else if isEmptyObject($artistInfoQuery.data) || isEmptyObject($artistTopTracksQuery.data) || isEmptyObject($artistAlbumQuery.data) || isEmptyObject($artistRelatedArtistsQuery.data)}
  <p style="align-self: center;">Artist not found</p>
{:else}
  <ArtistInfo data={$artistInfoQuery.data} />
  <PageSection
    title="Top Tracks"
    data={$artistTopTracksQuery.data.tracks}
    baseUrlLink="track"
    limit={10}
  />
  <PageSection
    title="Album"
    data={$artistAlbumQuery.data.items}
    limit={5}
    baseUrlLink="album"
  />
  <PageSection
    title="Related Artists"
    data={$artistRelatedArtistsQuery.data.artists}
    baseUrlLink="artist"
    limit={5}
  />
{/if}
