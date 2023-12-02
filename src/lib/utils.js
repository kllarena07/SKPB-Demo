/** @param {string} isoDateTime @returns {number} */
export const calculateDayDifference = (isoDateTime) => {
	const currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);
	const providedDate = new Date(isoDateTime);

	const timeDifference = providedDate.getTime() - currentDate.getTime();

	const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));

	return Math.abs(dayDifference);
};

/** @param {string} id @param {string} avatar @returns {string} */
export const getUserAvatar = (id, avatar) => {
	return `https://skpb-demo-pbserver.fly.dev/api/files/users/${id}/${avatar}`;
};
