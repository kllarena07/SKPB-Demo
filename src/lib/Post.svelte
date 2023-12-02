<script>
	import { enhance } from '$app/forms';
	import { calculateDayDifference } from './utils';
	import toast, { Toaster } from 'svelte-french-toast';
	import { darkModeEnabled } from '$lib/state.js';

	/** @type {boolean} */
	let dmEnabled;

	darkModeEnabled.subscribe((val) => {
		dmEnabled = val;
	});

	export let photoData;

	$: ({
		user_pfp,
		user_bio,
		user_up_link,
		user_up_username,
		photo_create_date,
		photo_url,
		photo_alt,
		photo_up_link
	} = photoData);

	let liked = false;
	let skip = false;

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

	const submitPostSave = () => {
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					if (result.data.message != 'Image was purposely not saved.')
						toast.success(result.data.message);
					await update({ reset: false });
					break;

				case 'failure':
					console.log(result);
					toast.error(result.data.message);
					await update({ reset: false });
					break;

				default:
					await update({ reset: false });
			}
			liked = false;
			skip = false;
		};
	};
</script>

<section class={skip ? 'fly-out' : 'fly-in'}>
	<header>
		<img id="pfp" src={user_pfp} alt={user_bio} width="32" height="32" />
		<a
			class="primary-text {dmEnabled ? 'dark-mode' : ''}"
			target="_blank"
			rel="noreferrer"
			href={user_up_link}>{user_up_username}</a
		>
		<span class="secondary-text">•</span>
		<span class="secondary-text">{calculateDayDifference(photo_create_date)}d</span>
	</header>
	{#key photo_url}
		<img id="post-img" src={photo_url} alt={photo_alt} width="470" height="515" />
	{/key}
	<p id="desc" class={dmEnabled ? 'dark-mode' : ''}>
		<a
			class="primary-text {dmEnabled ? 'dark-mode' : ''}"
			target="_blank"
			rel="noreferrer"
			href={user_up_link}>{user_up_username}</a
		>
		{photo_alt}
	</p>
	<form
		method="POST"
		action="?/savePost"
		use:enhance={submitPostSave}
		class={dmEnabled ? 'dark-mode' : ''}
	>
		<button type="button" on:click={() => copyToClipboard(photo_up_link)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke={dmEnabled ? 'white' : 'black'}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
				/>
			</svg>
		</button>
		<button type="button" id={liked ? 'liked' : ''} on:click={() => (liked = !liked)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				fill="none"
				stroke={dmEnabled ? 'white' : 'black'}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
				/>
			</svg>
		</button>
		<button type="submit" on:click={() => (skip = true)}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill={dmEnabled ? 'white' : 'none'}
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke={dmEnabled ? 'none' : 'black'}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
				/>
			</svg>
		</button>
		{#key photoData}
			<input type="text" name="liked" readonly value={liked} />
			<input type="text" name="user_pfp" readonly value={user_pfp} />
			<input type="text" name="user_bio" readonly value={user_bio} />
			<input type="text" name="user_up_link" readonly value={user_up_link} />
			<input type="text" name="user_up_username" readonly value={user_up_username} />
			<input type="text" name="photo_create_date" readonly value={photo_create_date} />
			<input type="text" name="photo_url" readonly value={photo_url} />
			<input type="text" name="photo_alt" readonly value={photo_alt} />
			<input type="text" name="photo_up_link" readonly value={photo_up_link} />
		{/key}
	</form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		width: 470px;
	}

	.fly-in {
		animation: fly-in 800ms ease;
	}

	.fly-out {
		animation: fly-out 800ms ease;
	}

	@keyframes fly-in {
		0% {
			transform: translateY(150%);
		}
		100% {
			transform: translateY(0);
		}
	}

	@keyframes fly-out {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-150%);
		}
	}

	header {
		display: flex;
		justify-content: left;
		align-items: center;
		margin-bottom: 1rem;
		gap: 0.5rem;
	}

	#pfp {
		border-radius: 100rem;
	}

	a {
		text-decoration: none;
	}

	#post-img {
		object-fit: cover;
		border-radius: 0.5rem;
	}

	#desc {
		height: 1.5rem;
		white-space: nowrap;
		overflow-x: hidden;
		text-overflow: ellipsis;
		margin: 0.5rem 0;
	}

	#desc a:hover {
		opacity: 0.5;
	}

	form {
		display: flex;
		margin: 4px 0;
		justify-content: center;
		align-items: center;
		gap: 1rem;
	}

	button {
		border: 0;
		padding: 8px;
		background-color: transparent;
		cursor: pointer;
		border-radius: 100rem;
		box-shadow: 0 1px 3px 3px hsla(206, 6%, 25%, 0.149);
	}

	button:nth-child(2) svg {
		width: 2.25rem;
		height: 2.25rem;
	}

	#liked {
		background: hsl(351, 100%, 66%);
		background: linear-gradient(360deg, hsla(347, 100%, 64%, 1), hsla(345, 100%, 56%, 1));
		animation: grow-shrink 200ms ease;
	}

	#liked svg {
		stroke: none;
		fill: white;
	}

	@keyframes grow-shrink {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.25);
		}
		100% {
			transform: scale(1);
		}
	}

	button:not(#liked):hover {
		opacity: 0.5;
	}

	svg {
		width: 1.5rem;
		height: 1.5rem;
	}

	.primary-text {
		color: hsl(0, 0%, 0%);
		font-weight: bold;
	}

	.secondary-text {
		color: hsl(0, 0%, 66%);
	}

	input {
		display: none;
	}

	.dark-mode:not(form) {
		color: white;
	}

	.dark-mode:is(form) > button {
		background-color: hsl(0, 0%, 11%);
		box-shadow: none;
	}
</style>
