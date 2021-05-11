<div class="container">
  <a
    class="btn-log-in"
    href="{API_BASE_URL}spotify/login/"
    referrerpolicy="origin">Log in</a
  >
</div>

<style>
  .container {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
  }
  .btn-log-in {
    padding: 1.25rem;
    outline: solid #1db954;
  }
  .btn-log-in:hover {
    transform: scale(1.1);
    transition: transform 250ms;
  }
</style>
