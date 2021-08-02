<script>
  import CardGrid from './CardGrid.svelte';
  import CardList from './CardList.svelte';
  export let data = [];
  export let limit = -1;
  export let title;
  export let baseUrlLink = '';
</script>

<section class="container">
  <h2 class="title">{title}</h2>
  {#if limit <= 5 && limit >= 1}
    <CardList {data} {limit} {baseUrlLink} />
  {:else}
    <CardGrid {data} {limit} {baseUrlLink} />
  {/if}
</section>

<style>
  .container {
    display: flex;
    flex-flow: column;
    margin-bottom: auto;
    margin-left: 2.5rem;
  }

  @media (min-width: 900px) {
    .container {
      margin-left: 8.8rem;
    }
  }
</style>
