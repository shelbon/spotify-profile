<nav>
  <slot />
</nav>

<style>
  nav {
    display: flex;
    width: 12vw;
  }
  @media (min-width: 640px) {
    nav {
      height: 1514px;
      flex-flow: column nowrap;
      background: #333333;
      justify-content: flex-start;
      align-items: center;
    }
  }
</style>
