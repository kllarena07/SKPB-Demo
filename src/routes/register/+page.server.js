import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').create({ ...body });
			await locals.pb.collection('users').requestVerification(body.email);
		} catch (err) {
			console.log('Error: ', err);
			return fail(err.status, err.message);
		}

		throw redirect(303, '/');
	}
};
