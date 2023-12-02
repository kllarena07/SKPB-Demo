import { UNSPLASHED_ACCESS_KEY } from '$env/static/private';
import { fail } from '@sveltejs/kit';

/** @return {import("./$types").PageServerLoad} */
export const load = () => {
	const getRandomPhoto = async () => {
		try {
			const apiURL = 'https://api.unsplash.com/photos/random?client_id=' + UNSPLASHED_ACCESS_KEY;
			const response = await fetch(apiURL);
			const data = await response.json();

			return {
				user_pfp: data.user.profile_image.small,
				user_bio: data.user.bio,
				user_up_link: data.user.links.html,
				user_up_username: data.user.username,
				photo_create_date: data.created_at,
				photo_url: data.urls.raw + '&fm=avif&fit=crop&w=470&h=515',
				photo_alt: data.alt_description,
				photo_up_link: data.links.html
			};
			//return undefined;
		} catch (err) {
			//console.log('Error', err);
		}
	};

	return {
		photoData: getRandomPhoto()
	};
};

/** @type {import('./$types').Action} */
export const actions = {
	savePost: async ({ locals, request }) => {
		const formData = await request.formData();

		if (formData.get('liked') === 'false') {
			return { message: 'Image was purposely not saved.' };
		}

		formData.delete('liked');
		formData.append('saved_by', locals.user.id);

		try {
			await locals.pb.collection('saved').create(formData);
		} catch (err) {
			console.log('Error', err);

			if (err.response.message == 'Failed to create record.')
				return fail(err.status, { message: 'Failed to save image.' });

			return fail(err.status, err.message);
		}

		return {
			message: 'Image saved successfully.'
		};
	}
};
