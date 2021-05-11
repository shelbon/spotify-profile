<script context="module">
  export let selected;
</script>

<script>
  import Icon from '@iconify/svelte';
  export let name;
  export let icon;
  export let destination;
</script>

<div class="nav__item">
  <a class="nav__item__link" on:click href={destination}
    ><Icon {icon} style="color: #ffffff; font-size: 48px;" hFlip={false} />
    <span  class="nav__item__text">{name}</span></a
  >
</div>

<style>
  .nav__item :global(.nav__item__link) {
    color: #ffffff;
    text-decoration: none;
  }
  .selected {
    background-color: #1db954;
  }
  @media (min-width: 640px) {
    .nav__item {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      padding: 0px;
      color: #ffffff;
      margin: 0px 0.9375rem 2.0625rem;
      min-width: 135px;
      min-height: 48px;
    }
    .nav__item:nth-child(1) {
      margin: 1.625rem 0.9375rem 2.0625rem;
    }
    .nav__item :global(.nav__item__link) {
      display: flex;
    }
    .nav__item :global(.nav__item__link) :global(.nav__item__text) {
      align-self: center;
      margin: 0px 1rem;
    }
  }
</style>
