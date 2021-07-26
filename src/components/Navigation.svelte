<!---TODO fix navbar not fixed on mobile-->
<nav>
  <slot />
</nav>

<style>
  nav {
    position: fixed;
    bottom: 0;
    top: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    z-index: 100;
    background-color: var(--nav-color);
    height: var(--nav-height);
    width: 100vw;
  }

  @media (min-width: 900px) {
    nav {
      position: absolute;
      height: 100%;
      width: var(--nav-width) !important;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      z-index: 0;
    }
  }
  @media (min-width: 2560px) {
    nav {
      --nav-width: 15rem;
    }
  }
</style>
