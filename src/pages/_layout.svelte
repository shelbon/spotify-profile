<script>
  import { onMount } from 'svelte';
  import { getHashParams } from '../utils';
  import SpotifyApi from '../components/Spotify-api.svelte';
  import Navigation from '../components/Navigation.svelte';
  import NavigationItem from '../components/NavigationItem.svelte';
  import bxsPlaylist from '@iconify-icons/bx/bxs-playlist';
  import bxMusic from '@iconify-icons/bx/bx-music';
  import bxsMicrophoneAlt from '@iconify-icons/bx/bxs-microphone-alt';
  import bxUser from '@iconify-icons/bx/bx-user';
  import bxLogOut from '@iconify-icons/bx/bx-log-out';
  import { goto } from '@roxi/routify';

  let isLogin = () => {
    let urlparams = getHashParams();
    const isLogin = urlparams.isLogin === 'true';
    if (isLogin) {
      return true;
    }
    return false;
  };
  let localStorage = window.localStorage;
  $: isAuthenticated = undefined;
  $: console.table({
    isAuthenticated: isAuthenticated,
    localStorage: localStorage,
  });
  $: if (isAuthenticated) {
    localStorage.setItem('isLogin', 'true');
  }
  onMount(() => {
    isAuthenticated =
      localStorage.getItem('isLogin') === 'true' || isLogin();
  });
  function handleLogOutClick(e) {
    isAuthenticated = false;
    localStorage.clear();
  }
</script>

{#if isAuthenticated !== undefined}
  {#if isAuthenticated === true}
    <div class="main-container">
      <SpotifyApi>
        <svelte:fragment slot="navigation">
          <Navigation>
            <NavigationItem
              name="Profile"
              destination="./index"
              icon={bxUser}
            />
            <NavigationItem
              name="Tracks"
              destination="./tracks"
              icon={bxMusic}
            />
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
              destination={`${
                import.meta.env.VITE_API_BASE_URL
              }logout`}
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
  {:else}
    {$goto('/login')}
  {/if}
{/if}

<style>
  .main-container {
    display: flex;
  }
  main {
    display: flex;
    background-color: #404b5a;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin-bottom: var(--nav-height);
    flex: 2;
  }

  @media (min-width: 640px) {
    main {
      margin: 0 0 0 var(--nav-width);
    }
    :global(h1) {
      font-size: 2.4rem;
    }
  }

  :global(#routify-app) {
    height: 100%;
  }
</style>
