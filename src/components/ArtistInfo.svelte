<script>
  import { isEmptyObject } from '../utils';

  export let data;
  const { images, name, popularity, followers } = data;
  import DefaultUserAvatar from '../assets/user.svg';
</script>

<div class="artist-info">
  {#if !isEmptyObject(images)}
    <img src={images[0].url} alt="profile" class="picture" />
  {:else}
    <DefaultUserAvatar />
  {/if}

  <h1 class="name">{name}</h1>

  <ul class="details">
    <li>
      <p>followers:{followers.total}</p>
    </li>
    <li>
      <p>popularity:{popularity}</p>
    </li>
  </ul>
</div>

<style>
  .picture {
    border-radius: 50%;
    min-height: 10rem;
    min-width: 16.4rem;
    max-width: 30%;
  }
  .artist-info {
    align-self: center;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2.9rem;
    width: 50%;
  }
  .details {
    display: flex;
    flex-flow: column;
  }
  .details > * {
    margin: 0 3.3rem 0 0;
  }
  .name {
    text-align: center;
  }
  .artist-info :global(svg) {
    border: 2px solid currentcolor;
    padding: 1rem;
    border-radius: 50%;
    min-height: 10rem;
    min-width: 16.4rem;
    width: 30%;
    height: 100%;
  }
</style>
