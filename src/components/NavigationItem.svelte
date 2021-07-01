<script>
  import Icon from '@iconify/svelte';
  import { url, isActive } from '@roxi/routify';
  export let name;
  export let icon;
  export let destination;
  $: console.log(destination);
</script>

<a
  class="nav__item"
  on:click
  class:selected={$isActive(destination)}
  href={$url(destination)}
  ><Icon {icon} hFlip={false} />
  <p class="nav__item__text">{name}</p></a
>

<style>
  .nav__item :global(svg) {
    color: #ffffff;
    font-size: clamp(2.4rem, 0.8rem + 4.4444vw, 4.8rem);
    margin: 0.8rem 0 0 0;
    height: 5.6rem;
  }
  .nav__item {
    display: flex;
    flex-flow: column;
    flex-shrink: 1;
    text-decoration: none;
    line-height: 1;
    z-index: 100;
    align-items: center;
    color: #fafafa;
    height: 100%;
    width: 100%;
    max-width: 16.8rem;
  }

  .nav__item__text {
    font-size: 1.2rem;
    transition: font-size 0.8s;
    align-self: center;
    margin: 0.3rem 0 1rem 0;
  }

  .selected :global(svg),
  .selected .nav__item__text {
    color: #1db954;
  }

  @media (min-width: 900px) {
    .nav__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0px;
      color: #ffffff;
      width: 7.2rem;
      height: 7.2rem;
      margin-bottom: 0.5rem;
    }
    .nav__item:hover,
    .nav__item:focus,
    .nav__item:active {
      border-left: solid #1db954;
    }
    .nav__item {
      display: flex;
    }
    .nav__item__text {
      font-size: 1.8rem;
      align-self: center;
      margin: 0.5rem 0 0 0;
    }
    .nav__item :global(svg) {
      font-size: 3.5rem;
    }
  }
</style>
