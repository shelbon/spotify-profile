<script>
  export let image;
  export let followers;
  export let following;
  export let nbPlaylist;
  export let name;
</script>

<div class="user-info">
  <img src={image} alt="profile" class="picture" />

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
</style>
