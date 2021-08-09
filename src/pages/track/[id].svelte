<!-- track page track image track feature
 -->
<script>
  import { getContext } from 'svelte';
  import {
    useQuery,
    useQueryClient,
  } from '@sveltestack/svelte-query';
  import { Wave } from 'svelte-loading-spinners';
  import { params } from '@roxi/routify';
  import { apiEndpointsNames } from '../../components/Spotify-api.svelte';
  import Feature from '../../components/feature.svelte';
  import QueryErrorMessage from '../../components/QueryErrorMessage.svelte';
  import { isEmptyObject } from '../../utils';
  import CardInfo from '../../components/CardInfo.svelte';

  let id = $params.id;
  const { fetchTrackFeature } = getContext(
    apiEndpointsNames.trackFeature,
  );
  const { fetchTrack } = getContext(apiEndpointsNames.track);
  const queryClient = useQueryClient();
  const trackFeatureQuery = useQuery(
    [apiEndpointsNames.trackFeature, id],
    () => fetchTrackFeature(id),
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.trackFeature),
      retry: 1,
      enabled: !!id,
    },
  );
  const trackQuery = useQuery(
    [apiEndpointsNames.track, id],
    () => fetchTrack(id),
    {
      initialData: () =>
        queryClient.getQueryData(apiEndpointsNames.track),
      retry: 1,
      enabled: !!id,
    },
  );
</script>

{#if $trackFeatureQuery.isLoading || $trackQuery.isLoading}
  <Wave size="60" color="#1db954" unit="px" duration="1s" />
{:else if $trackFeatureQuery.error || (typeof $trackFeatureQuery.data != 'undefined' && 'error' in $trackFeatureQuery.data) || $trackQuery.error || (typeof $trackQuery.data != 'undefined' && 'error' in $trackQuery.data)}
  <QueryErrorMessage
    data={new Set().add(
      $trackFeatureQuery.error || $trackFeatureQuery.data.error,
    )}
  />
{:else if isEmptyObject($trackFeatureQuery.data) || isEmptyObject($trackQuery.data)}
  <p>track data not found ,reload the page or reconnect</p>
{:else}
  <CardInfo
    image={$trackQuery.data.album.images[1]}
    name={$trackQuery.data.name}
    creators={$trackQuery.data.artists}
    release_date={$trackQuery.data.album.release_date}
  />
  <div class="track-feature-container">
    <h3 style="align-self: center;">Track Feature</h3>
    <Feature data={$trackFeatureQuery.data} />
    <details class="features-description">
      <summary>Features Description</summary>
      <h3>Danceability</h3>
      <p>
        Danceability describes how suitable a track is for dancing.
      </p>
      <h3>Acousticness</h3>
      <p>
        High value represents high confidence that the track is
        acoustic.
      </p>
      <h3>Energy</h3>
      <p>
        Represents a perceptual measure of intensity and activity.
        Typically, energetic tracks feel fast, loud, and noisy. For
        example, death metal has high energy, while a Bach prelude
        scores low on the scale.
      </p>
      <h3>Instrumentalness</h3>
      <p>
        Represents the likelihood a track contains no vocal content.
      </p>
      <h3>Liveness</h3>
      <p>
        High value represents high confidence that the track was
        performed live.
      </p>
      <h3>Speechiness</h3>
      <p>
        Speechiness detects the presence of spoken words in a track.
        The more exclusively speech-like the recording (e.g. talk
        show, audio book, poetry)
      </p>
      <h3>Valence</h3>
      <p>
        A measure of the musical positiveness conveyed by a track.
        Tracks with high valence sound more positive (e.g. happy,
        cheerful, euphoric), while tracks with low valence sound more
        negative (e.g. sad, depressed, angry).
      </p>
    </details>
  </div>
{/if}

<style>
  .track-feature-container {
    align-self: center;
    display: flex;
    flex-direction: column;
    position: relative;
    max-width: 70rem;
    width: 100%;
    margin-top: 10rem;
  }
  .features-description {
    background-color: #111417;
    padding: 1.6rem;
    border-radius: 0.5rem;
    margin-top: 1.6rem;
  }
  .features-description > summary {
    border-radius: 0.5rem;
    padding: 2px 6px;
    width: 15em;
    background-color: #ddd;
    cursor: pointer;
    color: #303030;
  }
  .features-description > h3 {
    font-size: 2.4rem;
  }
</style>
