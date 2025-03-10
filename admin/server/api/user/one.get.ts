export default defineEventHandler(async (event) => {
    const { email, id } = getQuery(event);
    if (email) {
        return await User.findOne({ email }).select("name email image role");
    }
    if (id) {
        return await User.findById(id).select("name email image role");
    }
});
