export default defineEventHandler(async (event) => {
	const { search } = getQuery(event);
	return {
		search,
	};
});
