<script>
	import { enhance } from '$app/forms';
	import { darkModeEnabled } from '$lib/state.js';
	import { getUserAvatar } from '$lib/utils';
	import toast from 'svelte-french-toast';

	/** @type {boolean} */
	let dmEnabled;

	darkModeEnabled.subscribe((val) => {
		dmEnabled = val;
	});

	export let data;

	let { user } = data;
	let { id, avatar, name } = user;
	const initialName = name;

	const showPreview = (event) => {
		const target = event.target;
		const files = target.files;

		if (files.length > 0) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview');
			preview.src = src;
		}
	};

	const updateProfile = () => {
		return async ({ result, update }) => {
			console.log(result);
			switch (result.type) {
				case 'success':
					toast.success(result.data.message);
					await update({ reset: false });
					break;

				case 'error':
				case 'failure':
					console.log(result);
					toast.error(result.data);
					await update({ reset: false });
					break;

				default:
					await update({ reset: false });
			}
		};
	};
</script>

<main class={dmEnabled ? 'dark-mode' : ''}>
	<header>
		<h1 class={dmEnabled ? 'color-white' : ''}>Settings</h1>
		<form action="?/deleteAccount" method="POST">
			<button id="del-acc" type="submit">DELETE ACCOUNT</button>
		</form>
	</header>
	<section class={dmEnabled ? 'color-white' : ''}>
		<h2>Edit your profile</h2>
		<form
			id="profile-container"
			method="POST"
			enctype="multipart/form-data"
			action="?/saveProfileChanges"
			use:enhance={updateProfile}
		>
			<label for="avatar">Profile Picture</label>
			<div id="preview-container">
				<img
					id="avatar-preview"
					alt="Your avatar"
					src={avatar
						? getUserAvatar(id, avatar)
						: `https://ui-avatars.com/api/?name=${initialName}&background=random`}
					width="128"
					height="128"
				/>
				<div id="edit-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="white"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
						/>
					</svg>
				</div>
				<input type="file" name="avatar" accept="image/*" on:change={showPreview} />
			</div>
			<div id="name-container">
				<label for="name">Name</label>
				<input id="name" type="text" name="name" bind:value={name} />
			</div>
			<button id="update-profile" type="submit">UPDATE PROFILE</button>
		</form>
	</section>
</main>

<style>
	main {
		height: 100dvh;
		padding: 2rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2.5px solid hsl(0, 0%, 94%);
		padding-bottom: 1rem;
	}

	section {
		padding: 2rem 0.5rem;
	}

	#profile-container {
		display: flex;
		margin-top: 1rem;
		flex-direction: column;
		align-items: start;
		gap: 1rem;
	}

	label {
		font-weight: bold;
	}

	#preview-container {
		position: relative;
	}

	#avatar-preview {
		border-radius: 100rem;
	}

	#preview-container input {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		z-index: 1;
		cursor: pointer;
	}

	#name-container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	#edit-icon {
		position: absolute;
		right: 0;
		bottom: 0;
		padding: 0.5rem;
		background-color: hsl(312, 85%, 54%);
		border-radius: 100rem;
	}

	#edit-icon svg {
		width: 1rem;
		height: 1rem;
	}

	.dark-mode {
		background-color: black;
	}

	.color-white {
		color: white;
	}

	input[name='name'] {
		width: 17.75rem;
		padding: 0.5rem;
		border-radius: 0.25rem;
		border: 2.5px solid hsl(0, 0%, 94%);
	}

	button[type='submit'] {
		cursor: pointer;
		border: none;
		font-weight: bold;
	}

	#del-acc {
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		box-shadow: inset 0 -2px 6px hsla(345, 95%, 82.7%, 0.5);
		background-color: hsl(351, 100%, 94%);
		border-color: hsla(349, 91%, 70%, 0.4);
		color: hsl(348, 73%, 50%);
	}

	#del-acc:active {
		color: hsla(342, 85%, 41%, 1);
		background-color: hsla(6, 93%, 88%, 1);
		border-color: hsla(348, 91%, 72%, 0.6);
		box-shadow:
			0 0 0 3px hsla(351, 98%, 90%, 0.75),
			inset 0 0 6px 3px hsla(350, 95%, 83%, 0.5);
	}

	#update-profile {
		width: 17.75rem;
		padding: 0.75rem 5rem;
		border-radius: 0.75rem;
		color: white;
		background-color: hsl(251, 75%, 50%);
	}

	@media screen and (max-width: 764px) {
		main {
			height: calc(100dvh - 4rem);
		}
	}

	input {
		display: none;
	}
</style>
