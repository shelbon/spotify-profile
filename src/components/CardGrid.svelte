<script>
  import Card from './Card.svelte';

  export let data = [];
  export let limit = -1;
  export let baseUrlLink = '';
  import { onMount } from 'svelte';

  let filteredData = [];

  onMount(() => {
    if (limit > 0) {
      filteredData = data.filter(
        (_element, index) => index <= limit - 1,
      );
    } else {
      filteredData = [...data];
    }
  });
</script>

<ul class="card-grid">
  {#each filteredData as data}
    <li class="card-container">
      <Card
        name={data.name}
        {baseUrlLink}
        image={typeof data.images !== 'undefined'
          ? data.images[0]
          : data.album.images[0]}
        id={data.id}
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
    width: 100%;
    margin: 0 0 auto 0;
  }

  .card-grid::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 900px) {
    .card-grid {
      grid-template-columns: repeat(auto-fit, minmax(14.2rem, 1fr));
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
