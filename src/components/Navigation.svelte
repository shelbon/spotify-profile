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
  /*do something for the height of the  navigation bar */
  @media (min-width: 900px) {
    nav {
      height: 100%;
      width: 7.2rem !important;
      flex: 3;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: center;
      z-index: 0;
    }
  }
</style>
