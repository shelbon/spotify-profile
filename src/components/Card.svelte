<script>
  export let name = '';
  export let id;
  export let image;
  export let baseUrlLink = '';
  export let artists = [];
  import { url } from '@roxi/routify';
  import Card from '@smui/card';
  function getArtistsName(artists) {
    return artists.map((artist) => artist.name);
  }
</script>

<Card>
  <a href={$url(`/${baseUrlLink}/${id}`)}>
    <img class="image" src={image.url} alt={`${baseUrlLink} card`} />
    <p class="name">{name}</p>
    {#if artists.length > 0}
      <span class="artist-name"> {getArtistsName(artists)} </span>
    {/if}
  </a>
</Card>

<style>
  .image {
    align-self: center;
    max-width: 100%;
    min-width: 14.3rem;
    max-height: 14.3rem;
  }
  .artist-name {
    font-size: 1.4rem;
    font-weight: 600;
    color: #b3b3b3;
    font-weight: 600;
  }
  .name {
    font-size: 1.6rem;
    margin: 0;
    width: 14.3rem;
  }

  a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: currentColor;
    padding: 2.5rem;
  }
  a:hover,
  a:focus {
    background-color: rgba(17, 20, 23, 0.5);
    border-radius: 5px;
  }

  /*<Card/> style */
  :global(.mdc-card) {
    width: min-content;
  }
  @media (min-width: 1440px) {
    .image {
      max-width: 100%;
      min-width: 18rem;
      max-height: 18rem;
    }
    .name {
      font-size: 1.92rem;
    }
  }
  @media (min-width: 2560px) {
    .image {
      min-width: 36rem;
      max-height: 36rem;
    }
    .name {
      font-size: xx-large;
      width: 36rem;
    }
  }
</style>
