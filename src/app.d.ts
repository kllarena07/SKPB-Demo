import Pocketbase from 'pocketbase';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

interface PhotoData {
	user_pfp: string;
	user_bio: string;
	user_up_link: string;
	user_up_username: string;
	photo_create_date: string;
	photo_url: string;
	photo_alt: string;
	photo_up_link: string;
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: Pocketbase;
			user: Pocketbase.authStore.model | undefined | null;
		}
		interface PageData {
			photoData: Promise<PhotoData> | undefined;
		}
		// interface Platform {}
	}
}

export {};
