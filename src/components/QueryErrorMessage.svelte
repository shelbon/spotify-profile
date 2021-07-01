<script>
  import { onMount } from 'svelte';

  export let data;
  let errorMessage;
  $: console.table({
    errorData: [...data],
  });
  onMount(async () => {
    data.forEach((element) => {
      if ('error' in element && 'message' in element.error) {
        switch (element.error.message) {
          case 'Only valid bearer authentication supported':
            errorMessage =
              'We have forgotten who you are please reconnect';
            break;
        }
      }
    });
  });
</script>

<div class="error-query-container">
  <strong>{errorMessage}</strong>
</div>

<style>
  .error-query-container {
    display: flex;
    flex-flow: column;
  }
</style>
