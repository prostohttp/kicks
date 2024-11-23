export const removeQuery = (queryName: string) => {
    const router = useRouter();
    const route = useRoute();
    const currentQuery = { ...route.query };
    delete currentQuery[queryName];
    router.push({
        path: route.path,
        query: currentQuery,
    });
};
