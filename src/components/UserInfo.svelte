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
      <span class="title">Followers:</span>
      <span class="title-value">{followers}</span>
    </li>
    <li>
      <span class="title">Following:</span>
      <span class="title-value">{following}</span>
    </li>
    <li>
      <span class="title">Playlists:</span>
      <span class="title-value">{nbPlaylist}</span>
    </li>
  </ul>
</div>

<style>
  .picture {
    border-radius: 50%;
    max-height: 150px;
    min-width: 150px;
  }
  .user-info {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 2.9rem;
  }
  span {
    font-size: 1.92rem;
  }
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-bottom: 1.6rem;
  }
  li > * {
    align-self: center;
  }
  .title-value {
    margin-left: 0;
    font-weight: 600;
  }
  .details {
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    padding: 0;
  }

  .name {
    text-align: center;
    text-transform: capitalize;
  }

  .user-info :global(svg) {
    border: 2px solid currentcolor;
    padding: 1rem;
    border-radius: 50%;
    min-height: 10rem;
    min-width: 16.4rem;
    height: 100%;
  }
  @media (min-width: 768px) {
    .details {
      display: flex;
      flex-flow: row;
    }
    li {
      flex-direction: row;
      margin-bottom: 0;
      margin-right: 3.3rem;
    }
    li > * {
      align-self: auto;
    }
    .title-value {
      margin-left: 1rem;
    }
  }
</style>
