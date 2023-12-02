<script>
	import Sidebar from '$lib/Sidebar.svelte';
  import Footer from '$lib/Footer.svelte';
	import { Toaster } from 'svelte-french-toast';

  export let data

  $: ({ user } = data)
</script>

<div>
  <Toaster />
  <Sidebar {user} />
  <slot />
  <Footer {user} />
</div>

<style>
  div {
    display: grid;
    grid-template-columns: 4rem calc(100% - 4rem);
  }

  @media screen and (max-width: 764px) {
    div {
      grid-template-rows: calc(100% - 4rem) 4rem;
      grid-template-columns: 1fr;
    }
  }
</style>