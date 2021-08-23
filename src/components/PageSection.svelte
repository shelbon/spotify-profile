<script>
  export let title;
</script>

<section class="container">
  <h2 class="title">{title}</h2>
  <slot />
</section>

<style>
  .container {
    display: flex;
    flex-flow: column;
    margin-bottom: auto;
    margin-left: 2.5rem;
  }
  .title {
    align-self: center;
    margin-left: 0;
  }
  @media (min-width: 900px) {
    .container {
      margin-left: 8.8rem;
    }
    .title {
      align-self: revert;
    }
  }
</style>
