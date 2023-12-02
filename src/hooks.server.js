import { PB_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';
import Pocketbase from 'pocketbase';

/** @return {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
	event.locals.pb = new Pocketbase(PB_URL);
	event.locals.pb.autoCancellation(false);

	if (event.locals.pb) {
		console.log('created PB instance');
	} else {
		console.log('error creating PB instance');
	}

	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	event.locals.user = event.locals.pb.authStore.isValid
		? structuredClone(event.locals.pb.authStore.model)
		: undefined;

	const specialURL = '/[username]';

	if (event.route.id?.startsWith(specialURL)) {
		if (!event.locals.user) throw redirect(303, '/');

		if (event.params?.username != event.locals.user?.username) {
			const splitCurrPageURL = event.url.pathname.split('/');
			splitCurrPageURL[1] = event.locals.user.username;
			throw redirect(303, splitCurrPageURL.join('/'));
		}
	}

	const response = await resolve(event);

	response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: true }));

	return response;
};
