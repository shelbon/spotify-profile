<script context="module">
  import { Router, createRouter } from '@roxi/routify';
  import routes from '../.routify/routes.default.js';
  import { AddressReflector } from '@roxi/routify';
  export const router = createRouter({ routes });
</script>

<Router urlReflector={AddressReflector} {routes} />
