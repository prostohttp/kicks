export const addQuery = (queryName: string, queryValue: string) => {
    const route = useRoute();
    const currentQuery = { ...route.query, [queryName]: queryValue };
    return {
        path: route.path,
        query: currentQuery,
    };
};
