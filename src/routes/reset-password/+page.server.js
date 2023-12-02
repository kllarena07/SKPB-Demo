import { fail } from '@sveltejs/kit';

export const actions = {
	resetPassword: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').requestPasswordReset(body.email);
			return {
				success: true
			};
		} catch (err) {
			console.log('Error: ', err);
			return fail(err.status, err.message);
		}
	}
};
