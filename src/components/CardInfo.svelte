<script>
  import DefaultUserAvatar from '../assets/user.svg';
  export let image = null;
  export let name = null;
  export let total = 0;
  export let creatorName = '';
  export let year = '';
</script>

<div class="card-info">
  {#if image}
    <img src={image.url} alt="profile" class="picture" />
  {:else}
    <DefaultUserAvatar />
  {/if}

  <h2 class="name">{name}</h2>

  <div class="details">
    <span
      >{creatorName}
      {year ? `- ${year}` : ''}</span
    >
    <span>tracks: {total}</span>
  </div>
</div>

<style>
  .picture {
    height: auto;
    max-width: 100%;
    border-radius: 50%;
  }
  .card-info {
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
  }
  .details {
    display: flex;
    flex-direction: column;
  }

  .name {
    text-align: center;
  }
  .card-info :global(svg) {
    border: 2px solid currentcolor;
    padding: 1rem;
    max-width: 100%;
    border-radius: 50%;
  }
</style>
