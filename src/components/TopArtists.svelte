<script>
  import CardGrid from './CardGrid.svelte';
  import CardList from './CardList.svelte';
  export let data = [];
  export let limit = -1;
</script>

<section class="top-artists">
  <h2 class="title">Top Artists</h2>
  {#if limit <= 5}
    <CardList {data} {limit} />
  {:else}
    <CardGrid {data} {limit} />
  {/if}
</section>

<style>
  .top-artists {
    display: flex;
    flex-flow: column;
    margin-left: 2.5rem;
  }

  @media (min-width: 900px) {
    .top-artists {
      margin-left: 8.8rem;
    }
  }
</style>
