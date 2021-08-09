<script>
  import DefaultUserAvatar from '../assets/user.svg';
  export let image = null;
  export let name = null;
  export let total = 0;
  export let creators = [];
  export let release_date = '';

  function getCreatorsName() {
    let creatorsName = '';
    if (creators.length > 0) {
      if ('name' in creators[0]) {
        creatorsName = creators.map((creator) => creator.name).join();
      }
    }
    return creatorsName;
  }
  function getYear() {
    return release_date.substring(0, 4);
  }
</script>

<div class="card-info">
  {#if image}
    <img src={image.url} alt="profile" class="picture" />
  {:else}
    <DefaultUserAvatar />
  {/if}

  <h2 class="name">{name}</h2>

  <div class="details">
    <span>
      <span>
        {getCreatorsName()}
      </span>
      {release_date ? `- ${getYear()}` : ''}</span
    >
    {#if total}
      <span>tracks: {total}</span>
    {/if}
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
