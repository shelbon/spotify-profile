<script>
  import Card from './Card.svelte';
  export let data = [];
  export let baseUrlLink = '';
</script>

<ul class="card-grid">
  {#each data as item}
    <li class="card-container">
      <Card
        name={item.name}
        {baseUrlLink}
        image={typeof item.images !== 'undefined'
          ? item.images[0]
          : item.album.images[0]}
        id={item.id}
        artists={item.artists}
      />
    </li>
  {/each}
</ul>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(calc(13rem + 2rem), 1fr)
    );
    grid-gap: 2rem;
    align-items: center;
    justify-items: center;
    padding: 0;
  }
  .card-container {
    margin: 0 0 auto 0;
  }

  .card-grid::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    .card-grid {
      grid-template-columns: repeat(
        auto-fit,
        minmax(calc(14.2rem + 2rem), 1fr)
      );
    }
  }
  @media (min-width: 1440px) {
    .card-grid {
      grid-template-columns: repeat(
        auto-fit,
        minmax(calc(18rem + 2rem), 1fr)
      );
    }
  }
  @media (min-width: 2560px) {
    .card-grid {
      grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    }
  }
</style>
