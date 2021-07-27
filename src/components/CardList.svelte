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

<ul class="card-list">
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
  .card-list {
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    padding: 0;
    width: 100%;
    margin-left: 2.4rem;
  }
  .card-list::-webkit-scrollbar {
    display: none;
  }
  .card-container {
    margin: 0 6.8rem 0 0;
  }
  .image {
    max-width: 100%;
    min-width: 14.2rem;
    max-height: 14.2rem;
  }
  .name {
    margin: 1rem 0;
  }
  @media (min-width: 1440px) {
    .image {
      max-width: 100%;
      min-width: 14.2rem;
      max-height: inherit;
    }
  }
</style>
