<script>
  import CardList from './CardList.svelte';
  export let data = [];
  export let limit = -1;
</script>

<section class="top-artists">
  <h2 class="title">Top Artists</h2>
  <CardList {data} {limit} />
</section>

<style>
  .top-artists {
    display: flex;
    flex-flow: column;
    margin-left: 8.8rem;
  }
  .title {
    margin-left: 2.4rem;
  }
</style>
