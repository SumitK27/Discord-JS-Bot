const Discord = require("discord.js")

module.exports = {
    name: "serverinfo",
    category: "info",
    aliases: ["si"],
    description: "No idea",
    run: async (client, message, args) => {
        const { guild } = message
        
        const { name, region, memberCount, owner, afkTimeout } = guild
        const icon = guild.iconURL()

        const embed = new Discord.MessageEmbed()
            .setTitle(`Server Info for ${name}`)
            .setThumbnail(icon)
            .addFields({
                name: 'Region',
                value: region,
            }, 
            {
                name: 'Members',
                value: memberCount,
            },
            {
                name: 'Owner',
                value: owner.user.tag,
            },{
                name: 'AFK Timeout',
                value: afkTimeout/60,
            })

        message.channel.send(embed)
    }
}