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
      Followers:{followers}
    </li>
    <li>
      Following:{following}
    </li>
    <li>
      Playlists:{nbPlaylist}
    </li>
  </ul>
</div>

<style>
  .picture {
    border-radius: 50%;
    height: 20.3rem;
    width: 26.4rem;
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
