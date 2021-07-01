<script>
  import InlineSVG from 'svelte-inline-svg';
  function login() {
    fetch(`${import.meta.env.VITE_API_BASE_URL}spotify/login/`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
        }
      })
      .catch((error) => {
        console.table(error);
      });
  }
</script>

<!-- routify:options name="login" -->
<!-- routify:options reset=true -->
<svelte:head>
  <title>Log in</title>
</svelte:head>
<div class="container">
  <div class="inner-container">
    <h1>
      Want to know what’s your most liked artist,track or playlist?
      Want to know how is your playlist,tracks<br />(is it danceable,
      happy/sad, instrumental and more)? then log in to your spotify
      account.
    </h1>
    <a
      class="btn-log-in"
      href="{import.meta.env.VITE_API_BASE_URL}spotify/login/"
      referrerpolicy="origin"><p>Log in to your spotify account</p></a
    >
  </div>
  <div class="svg-container">
    <InlineSVG src="images/enjoyable_track.svg" />
  </div>
</div>

<style>
  :global(#routify-app) {
    min-height: 100vh;
  }
  .container {
    display: flex;
    flex-flow: column;
    background: hsla(215, 23%, 16%, 1);
    min-height: 100vh;
  }
  .inner-container {
    display: flex;
    flex-flow: column;
    flex: 1;
    order: 2;
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
    color: #ffffff;
  }
  h1 {
    color: white;
    font-size: 0.875rem;
    font-weight: bold;
    line-height: 3.3rem;
    margin-left: 1rem;
    margin-left: 1rem;
    padding-bottom: 30px;
    min-width: 185px;
    min-height: 64px;
  }

  @media (min-width: 767px) {
    .container {
      flex-flow: row;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .inner-container {
      align-self: flex-start;
      display: flex;
      flex: 50%;
      order: 0;
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
    h1 {
      flex: 1;
      font-size: 2.25rem;
      color: white;
    }
    .svg-container:global(svg) {
      display: block;
      min-height: 15vh;
      min-width: 50vw;
    }
  }
</style>
