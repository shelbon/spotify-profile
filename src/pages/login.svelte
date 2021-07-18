<script>
  import { onMount } from 'svelte';

  import EnjoyableTrack from '../assets/enjoyable_track.svg';

  onMount(() => {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // We listen to the resize event
    window.addEventListener('resize', () => {
      // We execute the same script as before
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
  });
</script>

<!-- routify:options name="login" -->
<!-- routify:options reset=true -->
<svelte:head>
  <title>Log in</title>
</svelte:head>
<main class="container">
  <div class="inner-container">
    <h1>
      Want to know what’s your most liked artist,track or playlist?
      then log in to your spotify account.
    </h1>
    <a
      class="btn-log-in"
      href="{import.meta.env.VITE_API_BASE_URL}spotify/login/"
      referrerpolicy="origin"><p>Log in to your spotify account</p></a
    >
  </div>

  <EnjoyableTrack />
</main>

<style>
  .container {
    display: flex;
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    flex-flow: column;
    background: hsla(215, 23%, 16%, 1);
  }
  .inner-container {
    display: flex;
    flex-flow: column;
    flex: 1;
    order: 2;
    margin: 0;
  }
  h1 {
    color: white;
    font-size: 1.2rem;
    font-weight: bold;
    line-height: 3.3rem;
    margin-left: 1rem;
    margin-left: 1rem;
    padding-bottom: 30px;
    min-width: 185px;
    min-height: 64px;
  }
  .btn-log-in {
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 185px;
    height: 64px;
    padding: 1.25rem;
    background: #1db954;
    border-radius: 8px;
    text-decoration: none;
    text-align: center;
    color: #303030;
  }
  .btn-log-in > p {
    font-size: 1.6rem;
  }
  .container :global(svg) {
    flex: 1;
    width: 100%;
  }

  @media (min-width: 1024px) {
    .container {
      flex-flow: row;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .inner-container {
      align-self: center;
      display: flex;
      order: 0;
      margin: 7rem 0;
    }
    .btn-log-in {
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
    }
    .btn-log-in:hover {
      transform: scale(1.1);
      transition: transform 250ms;
    }
    .btn-log-in > p {
      font-size: 2rem;
    }
    h1 {
      flex: 1;
      font-size: 2.4rem;
      margin-left: 2.4rem;
      line-height: 115%;
      color: white;
    }
    .container :global(svg) {
      margin: 0;
      height: 100vh;
      height: calc(var(--vh, 1vh) * 100);
    }
  }
</style>
