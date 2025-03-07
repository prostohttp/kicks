export default defineEventHandler(async (event) => {
    const { email, id } = getQuery(event);
    let user;
    if (email) {
        user = await User.findOne({ email }).select("name email image role");
    }
    if (id) {
        user = await User.findById(id).select("name email image role");
    }
    return user;
});
