<script>
  export let data = [];
  export let limit = -1;
  import Card from '@smui/card';
  import { onMount } from 'svelte';
  import { classMap } from '@smui/common/internal.js';
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

<ul
  class={classMap({
    'card-container': true,
    wrap: limit > 5 || limit <= 0,
  })}
>
  {#each filteredData as data}
    <li>
      <Card
        ><img class="image" src={data.images[0].url} alt="card" />
        <p class="name">{data.name}</p></Card
      >
    </li>
  {/each}
</ul>

<style>
  .wrap {
    flex-wrap: wrap;
  }
  .card-container {
    display: flex;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-snap-type: x proximity;
    padding: 0;
    width: 320px;
  }
  .card-container::-webkit-scrollbar {
    display: none;
  }
  :global(.mdc-card) {
    margin: 0 2.4rem auto;
  }
  .image {
    height: 16rem;
    width: 16rem;
  }
  .name {
    margin: 1rem 0;
  }
  @media screen and (min-width: 900px) {
    .card-container {
      width: auto;
    }
  }
</style>
