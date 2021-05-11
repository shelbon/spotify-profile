<script>
  let componentName;
  let getTopArtists = () => {
    fetch('top/artists')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
  };
</script>
<!--got rid of  error message "... received an unexpected slot "default"-->
{#if false}<slot />{/if}
<slot name="navigation">no navigation was provided</slot>
<slot name="content">no content was provided</slot>
