<script>
  import { isObject } from '../utils';

  import { onMount } from 'svelte';

  export let data;
  let errorMessage =
    'Sorry ,an unknow error happend please retry or contact technical service at xxxx@xxx.fr';
  let statusCodeServer = [500, 502, 503];
  let statusCodeClient = [401, 400, 429, 403, 404];
  onMount(async () => {
    if (data.size >= 1) {
      if (data.size === 1) {
        let element = data[Symbol.iterator]().next().value;

        if (isObject(element.error)) {
          errorMessage =
            element.error.detail || element.error.message;
        } else if ('error_description' in element) {
          errorMessage = element.error_description;
        }
      } else {
        let serverSideError = new Map();
        let clientSideError = new Map();
        data.forEach((element) => {
          if (isObject(element.error)) {
            if (statusCodeServer.includes(element.error.status)) {
              switch (element.error.status) {
                case 500:
                  serverSideError.set(500, element.error.detail);
                  break;
                case 502:
                  serverSideError.set(502, element.error.detail);
                  break;
                case 503:
                  serverSideError.set(503, element.error.detail);
                  break;
              }
            } else if (
              statusCodeClient.includes(element.error.status)
            ) {
              switch (element.error.status) {
                case 401:
                  clientSideError.set(401, element.error.detail);
                  break;
                case 400:
                  clientSideError.set(400, element.error.detail);
                  break;
                case 429:
                  clientSideError.set(429, element.error.detail);
                  break;
                case 403:
                  clientSideError.set(403, element.error.detail);
                  break;
                case 404:
                  clientSideError.set(404, element.error.detail);
                  break;
              }
            }
          }
        });

        if (serverSideError.size > 0) {
          if (serverSideError.has(500)) {
            errorMessage = serverSideError.get(500);
          } else if (serverSideError.has(502)) {
            errorMessage = serverSideError.get(502);
          } else if (serverSideError.has(503)) {
            errorMessage = serverSideError.get(503);
          }
        } else if (clientSideError.size > 0) {
          if (clientSideError.has(429)) {
            errorMessage = clientSideError.get(429);
          } else if (clientSideError.has(401)) {
            errorMessage = clientSideError.get(401);
          } else if (clientSideError.has(404)) {
            errorMessage = clientSideError.get(404);
          } else if (clientSideError.has(400)) {
            errorMessage = clientSideError.get(400);
          } else if (clientSideError.has(403)) {
            errorMessage = clientSideError.get(403);
          }
        }
      }
    }
  });
</script>

<div class="error-query-container">
  <strong>{errorMessage}</strong>
</div>

<style>
  .error-query-container {
    align-self: center;
    justify-self: center;
    display: flex;
    flex-flow: column;
  }
</style>
