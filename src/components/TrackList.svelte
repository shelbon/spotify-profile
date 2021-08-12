<script>
  import {
    MINUTEINMILISECONDS,
    SECONDINMILISESONDS,
  } from '../constants';

  export let data = [];
  import PlaySvg from '../assets/play.svg';

  const getDuration = (durationMs) => {
    let minute = Math.trunc(durationMs / MINUTEINMILISECONDS);
    let second = Math.trunc(
      (durationMs - minute * MINUTEINMILISECONDS) /
        SECONDINMILISESONDS,
    );
    return `${minute}:${second < 10 ? 0 : ''}${second}`;
  };
</script>

<ul class="track-list">
  {#each data as track}
    <li class="track-container">
      <div>
        <p class="track-title">
          {typeof track.name !== 'undefined'
            ? track.name
            : track.track.name}
        </p>
        <span class="track-duration"
          >{getDuration(
            typeof track.duration_ms !== 'undefined'
              ? track.duration_ms
              : track.track.duration_ms,
          )}</span
        >
      </div>

      <a
        class="btn-play"
        alt="play track button"
        href={track.external_urls?.spotify ||
          track.track.external_urls?.spotify}><PlaySvg /></a
      >
    </li>
  {/each}
</ul>

<style>
  .track-list {
    display: flex;
    flex-direction: column;
    margin-top: 1.6rem;
    flex: 1;
    padding: 0;
  }
  .track-container {
    display: flex;
    margin: 1.6rem;
    justify-content: space-between;
  }
  .track-container:hover {
    background-color: rgba(17, 20, 23, 0.5);
    border-radius: 0.5rem;
    padding: 0.8rem;
  }
  .track-title {
    margin: 0;
    cursor: pointer;
  }
  .track-duration {
    color: #b3b3b3;
    font-weight: 600;
    font-size: 1.4rem;
  }
  .track-container :global(svg) {
    min-width: 2.4rem;
    max-width: 3.4rem;
  }
  .btn-play {
    align-self: center;
  }
  @media (min-width: 900px) {
    .track-list {
      margin-top: 0;
    }
  }
</style>
