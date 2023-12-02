import { redirect, fail } from '@sveltejs/kit';

export const actions = {
	saveProfileChanges: async ({ request, locals }) => {
		const formData = await request.formData();
		const avatar = formData.get('avatar');

		if (avatar.size === 0) {
			formData.delete('avatar');
		}

		try {
			const { name, avatar } = await locals.pb.collection('users').update(locals.user.id, formData);
			locals.user.name = name;
			locals.user.avatar = avatar;
		} catch (err) {
			console.log('Error: ', err);
			return fail(err.status, err.message);
		}

		return {
			success: true,
			message: 'Successfully updated profile settings'
		};
	},
	deleteAccount: async ({ locals }) => {
		try {
			const savedPosts = structuredClone(
				await locals.pb.collection('saved').getFullList({
					filter: `saved_by='${locals.user.id}'`
				})
			);

			for (let post of savedPosts) {
				try {
					await locals.pb.collection('saved').delete(post.id);
				} catch (err) {
					console.log('Error: ', err);
					return fail(err.status, err.message);
				}
			}

			await locals.pb.collection('users').delete(locals.user.id);
		} catch (err) {
			console.log('Error: ', err);
			return fail(err.status, err.message);
		}

		locals.pb.authStore.clear();
		locals.user = undefined;

		throw redirect(303, '/');
	}
};
