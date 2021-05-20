module.exports = {
    name: "status",
    category: "mods",
    description: "Idk lol",
    run: async (client, message, args) => {
        client.user.setPresence({
            activity: {
                name: args.join(" "),
                type: 0
            }
        })
        message.channel.send(`Status Changed Successfully`)
    }
}
