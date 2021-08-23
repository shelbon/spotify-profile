<script>
  import Card from './Card.svelte';

  export let data = [];
  export let baseUrlLink = '';
</script>

<ul class="card-list">
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
    flex: 1;
  }
</style>
