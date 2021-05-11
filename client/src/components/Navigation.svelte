<script>
  import NavigationItem from './RouterNavigationItem.svelte';
  export let visibility;
</script>

<nav class:visible={visibility}>
  <slot />
</nav>

<style>
  nav {
    display: flex;
    flex-grow: 0.2;
  }
  @media (min-width: 640px) {
    nav {
      height: 1514px;
      flex-flow: column nowrap;
      background: #333333;
      justify-content: flex-start;
      align-items: center;
      visibility: hidden;
    }
  }
  .visible{
    visibility: visible;
  }
</style>
