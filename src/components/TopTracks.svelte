<script>
  import CardList from './CardList.svelte';
  export let data = [];
  export let limit = -1;
</script>

<section class="top-tracks">
  <h2 class="title">Top Tracks</h2>
  <CardList {data} {limit} />
</section>

<style>
  .top-tracks {
    display: flex;
    flex-flow: column;
    margin-left: 8.8rem;
  }
  .title {
    margin-left: 2.4rem;
  }
</style>
