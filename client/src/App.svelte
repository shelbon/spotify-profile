<script>
  import { onMount } from 'svelte';
  import { cookieStringToJson, eraseCookie } from './utils';
  import { EasyrouteProvider, RouterOutlet } from 'svelte-easyroute';
  import { router } from './router.js';
  import SpotifyApi from './components/Spotify-api.svelte';
  import Navigation from './components/Navigation.svelte';
  import NavigationItem from './components/NavigationItem.svelte';
  import bxsPlaylist from '@iconify/icons-bx/bxs-playlist';
  import bxMusic from '@iconify/icons-bx/bx-music';
  import bxsMicrophoneAlt from '@iconify/icons-bx/bxs-microphone-alt';
  import bxUser from '@iconify/icons-bx/bx-user';
  import bxLogOut from '@iconify/icons-bx/bx-log-out';
  import RouterNavigationItem from './components/RouterNavigationItem.svelte';
  let cookieJson = { isLogin: false };
  $: isLogin = cookieJson.isLogin;
  $: console.table({
    isLogin: isLogin,
    cookie: cookieJson,
  });
  function handleLogOutClick(e) {
    isLogin = false;
    cookieJson = { isLogin: false };
    eraseCookie('isLogin');
  }
  onMount(() => {
    cookieJson = cookieStringToJson(document.cookie);
  });
</script>

<EasyrouteProvider {router}>
  <div class="main-container">
    <SpotifyApi>
      <svelte:fragment slot="navigation">
        <Navigation bind:visibility={isLogin}>
          <RouterNavigationItem
            name="Profile"
            destination="/Profile"
            icon={bxUser}
          />
          <RouterNavigationItem
            name="Tracks"
            destination="/Tracks"
            icon={bxMusic}
          />
          <RouterNavigationItem
            name="Playlist"
            destination="/Playlist"
            icon={bxsPlaylist}
          />
          <RouterNavigationItem
            name="Artists"
            destination="/Artists"
            icon={bxsMicrophoneAlt}
          />
          <NavigationItem
            name="LogOut"
            destination="login"
            icon={bxLogOut}
            on:click={handleLogOutClick}
          />
        </Navigation>
      </svelte:fragment>

      <main slot="content">
        <RouterOutlet />
        <button
          on:click={console.table({
            isLogin: isLogin,
            cookie: cookieJson,
          })}>show is Login value</button
        >
      </main>
    </SpotifyApi>
  </div>
</EasyrouteProvider>

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
