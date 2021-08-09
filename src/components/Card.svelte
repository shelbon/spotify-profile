<script>
  export let name = '';
  export let id;
  export let image;
  export let baseUrlLink = '';
  import { url } from '@roxi/routify';
  import Card from '@smui/card';
</script>

<Card>
  <a href={$url(`/${baseUrlLink}/${id}`)}>
    <img class="image" src={image.url} alt={`${baseUrlLink} card`} />
    <p class="name">{name}</p></a
  ></Card
>

<style>
  .image {
    max-width: 100%;
    min-width: 14.3rem;
    max-height: 14.3rem;
  }
  .name {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: currentColor;
  }
  :global(.mdc-card):hover,
  :global(.mdc-card):focus {
    background-color: rgba(17, 20, 23, 0.5);
    border-radius: 5px;
  }
  :global(.mdc-card) {
    padding: 0.8rem;
  }
  @media (min-width: 1440px) {
    .image {
      max-width: 100%;
      min-width: 18rem;
      max-height: 18rem;
    }
  }
  @media (min-width: 2560px) {
    .image {
      min-width: 36rem;
      max-height: 36rem;
    }
  }
</style>
