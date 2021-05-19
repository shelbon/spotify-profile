<script>
  export let image;
  export let followers;
  export let following;
  export let nbPlaylist;
  export let name;
</script>

<div>
  <img src={image} alt="profile" />

  <h1>{name}</h1>
  <div>
    <ul>
      <li>Followers:{followers}</li>
      <li>Following:{following}</li>
      <li>Playlists:{nbPlaylist}</li>
    </ul>
  </div>
</div>
