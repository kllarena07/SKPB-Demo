<script>
	import Post from '$lib/Post.svelte';
  import { darkModeEnabled } from '$lib/state.js';
  
  /** @type {boolean} */
  let dmEnabled

  darkModeEnabled.subscribe((val) => {
    dmEnabled = val
  })

  /** @type {import('./$types').PageData} */
  export let data;

  $: ({ photoData } = data);
</script>

<main class={dmEnabled ? "dark-mode" : ''}>
  {#if photoData}
    <Post {photoData} />
  {:else}
    <p>Oops! Couldn't fetch posts. Come back later</p>
  {/if}
</main>

<style>
  main {
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .dark-mode {
    background-color: black;
  }

  @media screen and (max-width: 764px) {
    main {
      height: calc(100vh - 4rem);
    }
  }
</style>