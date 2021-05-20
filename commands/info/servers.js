module.exports = {
    name: "servers",
    category: "info",
    description: "Returns Server details of all",
    run: async (client, message, args) => {
        client.guilds.cache.forEach(guild => {
            message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
        })
    }
}

//THIS COMMAND CAN SPAM lol