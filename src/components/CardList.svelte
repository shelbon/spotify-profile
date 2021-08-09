<script>
  import Card from './Card.svelte';
  import { onMount } from 'svelte';

  export let data = [];
  export let baseUrlLink = '';
  export let limit = -1;
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
  .card-list {
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    padding: 0;
    width: 100%;
  }
  .card-list::-webkit-scrollbar {
    display: none;
  }
  .card-container {
    margin: 0 6.8rem 0 0;
    flex: 1;
  }
</style>
