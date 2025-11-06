<script>
  import { onMount } from 'svelte';
  import { initializeAuth } from '../../services/auth.svelte';
  import Wave from '../../components/Wave.svelte';

  let status = $state('processing');
  let errorMessage = $state('');

  onMount(() => {
    // Get query params from URL
    const urlParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(urlParams.entries());

    // Handle the OAuth callback
    const authResult = initializeAuth(queryParams);

    if (authResult.shouldRedirect && authResult.redirectTo) {
      // Auth failed, redirect to login
      status = 'error';
      errorMessage = 'Authentication failed. Redirecting to login...';
      setTimeout(() => {
        window.location.href = authResult.redirectTo;
      }, 2000);
    } else {
      // Auth successful, redirect to home
      status = 'success';
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  });
</script>

<!-- routify:meta reset -->
<svelte:head>
  <title>Authenticating...</title>
</svelte:head>

<div class="callback-container">
  {#if status === 'processing'}
    <Wave size="60" color="#1db954" unit="px" duration="1s" />
    <p>Authenticating with Spotify...</p>
  {:else if status === 'success'}
    <div class="success-icon">✓</div>
    <p>Authentication successful! Redirecting...</p>
  {:else if status === 'error'}
    <div class="error-icon">✗</div>
    <p>{errorMessage}</p>
  {/if}
</div>

<style>
  .callback-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: hsla(215, 23%, 16%, 1);
    color: white;
    text-align: center;
    padding: 2rem;
  }

  p {
    margin-top: 2rem;
    font-size: 1.6rem;
  }

  .success-icon,
  .error-icon {
    font-size: 6rem;
    margin-top: 2rem;
  }

  .success-icon {
    color: #1db954;
  }

  .error-icon {
    color: #e22134;
  }
</style>
