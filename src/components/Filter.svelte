<script>
  import { onMount } from 'svelte';
  export let limit = -1;
  export let items = [];
  let filteredData = [];
  onMount(() => {
    if (limit > 0) {
      filteredData = items.filter(
        (_element, index) => index <= limit - 1,
      );
    } else {
      filteredData = [...items];
    }
  });
</script>

<slot {filteredData} />
