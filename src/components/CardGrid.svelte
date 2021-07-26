<script>
  export let data = [];
  export let limit = -1;
  import Card from '@smui/card';
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
        ><img
          class="image"
          src={typeof data.images !== 'undefined'
            ? data.images[0].url
            : data.album.images[0].url}
          alt="card"
        />
        <p class="name">{data.name}</p></Card
      >
    </li>
  {/each}
</ul>

<style>
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));

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

  .image {
    max-width: 100%;
  }
  .name {
    margin: 0;
  }
  @media (min-width: 900px) {
    .card-grid {
      grid-template-columns: repeat(auto-fit, minmax(14.2rem, 1fr));
    }
  }
  @media (min-width: 2560px) {
    .card-grid {
      grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    }
  }
</style>
