module.exports = {
    name: "clearchannels",
    category: "mods",
    aliases: ["cc"],
    description: "Clear the channel",
    run: async (client, message, args) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then(results => {
                message.channel.bulkDelete(results)
            })
        } else {
            return message.channel.send("You can not use this command")
        }
    }
}