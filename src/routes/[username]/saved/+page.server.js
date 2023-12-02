import { fail } from '@sveltejs/kit';

export const load = ({ locals }) => {
	const getSavedPosts = async () => {
		try {
			const savedPosts = structuredClone(
				await locals.pb.collection('saved').getFullList({
					filter: `saved_by='${locals.user.id}'`
				})
			);

			return savedPosts;
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		streamed: {
			saved: getSavedPosts()
		}
	};
};

export const actions = {
	unsavePost: async ({ locals, request }) => {
		const formData = await request.formData();

		try {
			await locals.pb.collection('saved').delete(formData.get('id'));
		} catch (err) {
			console.log('Error', err);

			return fail(err.status, err.message);
		}

		return {
			message: 'Successfully unsaved image'
		};
	}
};
