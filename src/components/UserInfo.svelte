<script>
  export let image;
  export let followers;
  export let following;
  export let nbPlaylist;
  export let name;
  import DefaultUserAvatar from '../assets/user.svg';
</script>

<div class="user-info">
  {#if image}
    <img src={image} alt="profile" class="picture" />
  {:else}
    <DefaultUserAvatar />
  {/if}

  <h1 class="name">{name}</h1>

  <ul class="details">
    <li>
      <p>Followers:{followers}</p>
    </li>
    <li>
      <p>Following:{following}</p>
    </li>
    <li>
      <p>Playlists:{nbPlaylist}</p>
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
  .user-info {
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
    flex-flow: row wrap;
  }
  .details > * {
    margin: 0 3.3rem 0 0;
  }
  .name {
    text-align: center;
  }
  .user-info :global(svg) {
    border: 2px solid currentcolor;
    padding: 1rem;
    border-radius: 50%;
    min-height: 10rem;
    min-width: 16.4rem;
    width: 30%;
    height: 100%;
  }
</style>
