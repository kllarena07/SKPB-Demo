import { redirect, fail } from '@sveltejs/kit';

export const load = ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/' + locals.user.username + '/feed');
	}
};

export const actions = {
	login: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			const { email, password } = body;

			console.log('attempting to authorize user login');
			const userLogin = await locals.pb.collection('users').authWithPassword(email, password);
			console.log(userLogin);

			if (!locals?.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					notVerified: true
				};
			}
		} catch (err) {
			console.log('Error', err);
			return fail(err.status, err.message);
		}

		console.log('user login attempt successful');

		throw redirect(303, '/[username]/feed');
	}
};
