<script>
  import CardGrid from './CardGrid.svelte';
  import CardList from './CardList.svelte';
  export let data = [];
  export let limit = -1;
</script>

<section class="top-tracks">
  <h2 class="title">Top Tracks</h2>
  {#if limit <= 5}
    <CardList {data} {limit} />
  {:else}
    <CardGrid {data} {limit} />
  {/if}
</section>

<style>
  .top-tracks {
    margin-left: 2.5rem;
  }
  .title {
    margin-left: 2.4rem;
  }
  @media (min-width: 900px) {
    .top-tracks {
      margin-left: 8.8rem;
    }
  }
</style>
