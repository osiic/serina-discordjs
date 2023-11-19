// the goal of this function is to delete a blacklisted word using the messageCreate event listener
// once the message is deleted, running the next function in line doesn't make sense since you can't interact with a deleted message
// to avoid that from happening you can return a truthy value from this function

module.exports = async (message, client, handler) => {
    if (message.content.includes('jukut)) {
        await message.delete();
        return true // this will ensure the next event function isn't executed
    }
};
