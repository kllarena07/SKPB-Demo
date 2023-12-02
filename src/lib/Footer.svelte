<script>
	import { getUserAvatar } from "./utils";
  import { page } from "$app/stores";
  import { darkModeEnabled } from '$lib/state.js';
  
  /** @type {boolean} */
  let dmEnabled

  darkModeEnabled.subscribe((val) => {
    dmEnabled = val
  })

  export let user

  const toggleDarkMode = () => {
    darkModeEnabled.update((currVal) => currVal = !currVal)
  }
</script>

<footer class={dmEnabled ? "dark-mode" : ''}>
  <a href='/{user.username}/settings'>
    <img src={user.avatar ? getUserAvatar(user.id, user.avatar) : `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="Your profile" />
  </a>
  <a href='/{user.username}/saved'>
    {#if $page.route.id == '/[username]/saved'}
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={dmEnabled ? "white" : "black"}>
      <path fill-rule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clip-rule="evenodd" />
    </svg>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={dmEnabled ? "white" : "black"}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
    {/if}
  </a>
  <a href='/{user.username}/feed'>
    {#if $page.route.id == '/[username]/feed'}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={dmEnabled ? "white" : "black"}>
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={dmEnabled ? "white" : "black"}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    {/if}
  </a>
  <button on:click={toggleDarkMode}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={dmEnabled ? "white" : "black"}>
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  </button>
  <form action="/logout" method="POST">
    <button type="submit">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke={dmEnabled ? "white" : "black"}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
      </svg>
    </button>
  </form>
</footer>

<style>
  footer {
    display: flex;
    border-top: 1px solid hsl(0, 0%, 84%);
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }

  a {
    text-decoration: none;
  }

  svg, img {
    width: 2rem;
    height: 2rem;
  }

  form {
    height: 2rem;
  }

  img {
    border-radius: 100rem;
  }

  button {
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
  }

  .dark-mode {
    border-top: 1px solid hsl(0,0%,13%);
    background-color: black;
  }

  @media screen and (min-width: 764px) {
    footer {
      display: none;
    }
  }
</style>