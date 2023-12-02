<script>
	import { calculateDayDifference } from '$lib/utils.js';
	import toast from 'svelte-french-toast';
	import { enhance } from '$app/forms';
	import { darkModeEnabled } from '$lib/state.js';

	/** @type {boolean} */
	let dmEnabled;

	darkModeEnabled.subscribe((val) => {
		dmEnabled = val;
	});

	export let postInfo;

	const {
		id,
		user_pfp,
		user_bio,
		user_up_link,
		user_up_username,
		photo_create_date,
		photo_url,
		photo_alt,
		photo_up_link
	} = postInfo;

	/** @param {string} text */
	const copyToClipboard = (text) => {
		try {
			navigator.clipboard.writeText(text);
			toast.success('Copied link to clipboard');
		} catch (err) {
			console.log(err);
			toast.error('Error in copying link to clipboard');
		}
	};

	const deleteSavedPost = () => {
		return async ({ result, update }) => {
			console.log(result);
			switch (result.type) {
				case 'success':
					toast.success(result.data.message);
					await update();
					break;

				case 'error':
				case 'failure':
					console.log(result);
					toast.error(result.data);
					await update();
					break;

				default:
					await update();
			}
		};
	};

	let showDropdown = false;
</script>

<section class="saved-post">
	<header>
		<div>
			<img class="pfp" src={user_pfp} alt={user_bio} />
			<a
				class="primary-text {dmEnabled ? 'dark-mode' : ''}"
				target="_blank"
				rel="noreferrer"
				href={user_up_link}>{user_up_username}</a
			>
			<span class="secondary-text">•</span>
			<span class="secondary-text">{calculateDayDifference(photo_create_date)}d</span>
		</div>
		<button class="toggle-dropdown" on:click={() => (showDropdown = !showDropdown)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill={dmEnabled ? 'white' : 'black'}
			>
				<path
					fill-rule="evenodd"
					d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
		{#if showDropdown}
			<form
				method="POST"
				action="?/unsavePost"
				class="dropdown {dmEnabled ? 'dark-mode' : ''}"
				use:enhance={deleteSavedPost}
			>
				<input type="text" value={id} name="id" />
				<button type="submit">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
						/>
					</svg>
					<span>Unsave</span>
				</button>
				<button type="button" on:click={() => copyToClipboard(photo_up_link)}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
						/>
					</svg>
					<span>Share</span>
				</button>
			</form>
		{/if}
	</header>
	<img class="post-img" src={photo_url} alt={photo_alt} width="470" height="515" />
	<p class="desc">
		<a
			class="primary-text {dmEnabled ? 'dark-mode' : ''}"
			target="_blank"
			rel="noreferrer"
			href={user_up_link}>{user_up_username}</a
		>
		{photo_alt}
	</p>
</section>

<style>
	.saved-post {
		display: flex;
		flex-direction: column;
		width: 470px;
	}

	header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 0;
	}

	header div {
		display: flex;
		justify-content: left;
		align-items: center;
		gap: 0.5rem;
	}

	header button {
		padding: 0;
		border: none;
		background-color: transparent;
		cursor: pointer;
	}

	header button svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.toggle-dropdown:hover {
		opacity: 0.5;
	}

	.dropdown {
		position: absolute;
		display: grid;
		grid-template-columns: 1fr;
		bottom: 0;
		transform: translateY(85%);
		background-color: white;
		right: 0;
		z-index: 1;
		box-shadow: 0 1px 3px 1px hsla(206, 6%, 25%, 0.149);
		padding: 0.5rem;
		border-radius: 0.5rem;
	}

	.dropdown button {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		border-radius: 0.5rem;
		width: 150px;
	}

	.dropdown button:hover {
		background-color: hsl(0, 0%, 95%);
	}

	.pfp {
		border-radius: 100rem;
	}

	a {
		text-decoration: none;
	}

	.post-img {
		object-fit: cover;
		object-position: bottom;
		border-radius: 0.5rem;
	}

	.desc {
		margin: 0.5rem 0;
	}

	.desc a:hover {
		opacity: 0.5;
	}

	.primary-text {
		color: hsl(0, 0%, 0%);
		font-weight: bold;
	}

	.secondary-text {
		color: hsl(0, 0%, 66%);
	}

	.dark-mode {
		color: white;
	}

	form.dark-mode {
		background-color: hsl(0, 0%, 13%);
	}

	form.dark-mode > button {
		color: white;
	}

	form.dark-mode > button:hover {
		background-color: hsl(0, 0%, 22%);
	}

	input {
		display: none;
	}
</style>
