<script>
  import { onMount } from 'svelte';
  import { cookieStringToJson, eraseCookie } from '../utils';
  import SpotifyApi from '../components/Spotify-api.svelte';
  import Navigation from '../components/Navigation.svelte';
  import NavigationItem from '../components/NavigationItem.svelte';
  import bxsPlaylist from '@iconify/icons-bx/bxs-playlist';
  import bxMusic from '@iconify/icons-bx/bx-music';
  import bxsMicrophoneAlt from '@iconify/icons-bx/bxs-microphone-alt';
  import bxUser from '@iconify/icons-bx/bx-user';
  import bxLogOut from '@iconify/icons-bx/bx-log-out';
  let cookieJson = { isLogin: false };
  $: isLogin = cookieJson.isLogin;
  $: console.table({
    isLogin: isLogin,
    cookie: cookieJson,
  });
  onMount(() => {
    cookieJson = cookieStringToJson(document.cookie);
  });
  function handleLogOutClick(e) {
    isLogin = false;
    cookieJson = { isLogin: false };
    eraseCookie('isLogin');
  }
</script>

<div class="main-container">
  <SpotifyApi>
    <svelte:fragment slot="navigation">
      <Navigation>
        <NavigationItem name="Profile" destination="./index" icon={bxUser} />
        <NavigationItem name="Tracks" destination="./tracks" icon={bxMusic} />
        <NavigationItem
          name="Playlist"
          destination="./playlist"
          icon={bxsPlaylist}
        />
        <NavigationItem
          name="Artists"
          destination="./top-artists"
          icon={bxsMicrophoneAlt}
        />
        <NavigationItem
          name="Log out"
          destination="login"
          icon={bxLogOut}
          on:click={handleLogOutClick}
        />
      </Navigation>
    </svelte:fragment>
    <main slot="content">
      <slot />
    </main>
  </SpotifyApi>
</div>

<style>
  .main-container {
    display: flex;
  }
  main {
    display: flex;
    text-align: center;
    height: 100%;
    flex: 10;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
