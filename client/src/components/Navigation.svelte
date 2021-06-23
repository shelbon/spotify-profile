<nav>
  <slot />
</nav>

<style>
  nav {
    position: fixed;
    bottom: 0;
    top: auto;
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    z-index: 100;
    background-color: var(--nav-color);
    height: 5.6rem;
    width: 100vw;
  }
  /*do something for the height of the  navigation bar */
  @media (min-width: 900px) {
    nav {
      min-height: 100vh;
      width: 7.2rem;
      flex-flow: column nowrap;

      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
