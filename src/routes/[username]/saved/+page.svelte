<script>
  import SavedPost from '$lib/SavedPost.svelte';
  import { darkModeEnabled } from '$lib/state.js';

  /** @type {boolean} */
  let dmEnabled

  darkModeEnabled.subscribe((val) => {
    dmEnabled = val
  })

  export let data

</script>

<main class={dmEnabled ? "dark-mode" : ''}>
  {#await data.streamed.saved}
    <p class="self-centered">Loading...</p>
  {:then saved}
    {#if saved.length > 0}
      <ul class={saved.length == 1 ? "self-centered" : ''}>
        {#each saved as postInfo}
          <li class={dmEnabled ? "dark-mode" : ''}>
            <SavedPost {postInfo} />
          </li>
        {/each}
      </ul>
    {:else}
      <section class="self-centered">
        <p>Hmmm...it doesn't look like you've saved any posts.</p>
        <p>Go ahead and <a href='/{data.user.username}/feed'>save</a> some!</p>
      </section>
    {/if}
  {/await}
</main>

<style>
  main {
    height: 100dvh;
    display: flex;
    justify-content: center;
    overflow-y: auto;
  }

  p {
    text-align: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .self-centered {
    align-self: center;
  }

  .dark-mode {
    background-color: black;
    color: white;
  }

  main > ul > li:not(:last-child) {
    border-bottom: 1px solid hsl(0, 0%, 86%);
    padding-bottom: 1rem;
  }

  li.dark-mode:not(:last-child) {
    border-bottom: 1px solid hsl(0,0%,13%);
  }

  @media screen and (max-width: 764px) {
    main {
      height: calc(100vh - 4rem);
    }
  }
</style>