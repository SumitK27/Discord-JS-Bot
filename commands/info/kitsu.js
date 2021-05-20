const discord = require("discord.js");
const fetch = require("node-fetch");


module.exports = {
    name: "kitsu",
    description: "Get the information about animes and mangas",
    category: "info",
    aliases: ["anime"],
    usage: "kitsu <name>",
    run: async (client, message, args, color) => {

        if (!args.length) {
            return message.channel.send("Please give the name of anime or series")
        }


        let msg = await message.channel.send({
            embed: {
                "description": "Getting the information...",
                "color": "YELLOW"
            }
        })


        try {
            var url = `https://kitsu.io/api/edge/anime?filter[text]=${args.join("+")}`;
            let anime = await fetch(url);
            anime = await anime.json();
            
            if (anime.meta.count === 0) return msg.edit({
                embed: {
                    "description": "Unable to find Something about `" + args.join(" ") + "`",
                    "color": "RED"
                }
            })
            
            anime_info = anime.data[0];
            console.log(anime_info.attributes.titles.en, url);

            let embed = new discord.MessageEmbed()
                .setTitle(anime_info.attributes.titles.en)
                .setColor("GREEN")
                .setThumbnail(anime_info.attributes.posterImage.tiny)
                .setImage(anime_info.attributes.posterImage.medium)
                .setDescription(anime_info.attributes.synopsis)
                .setFooter(`Ratings: ${anime_info.attributes.averageRating} | Episodes: ${anime_info.attributes.episodeCount || "0" } | Episode Runtime: ${anime_info.attributes.episodeLength}`)
                .addField("Original Title", anime_info.attributes.titles.en_jp + anime_info.attributes.titles.ja_jp, true)
                .addField("Release Date", anime_info.attributes.startDate + " - " + anime_info.attributes.endDate || "Present", true)
                .addField("Age Rating", anime_info.attributes.ageRating || "Present")
                .addField("Languages", anime_info.original_language || "N/A", true)
                .addField("ID", `${anime_info.id}`, true);
            msg.edit(embed)
        } catch (err) {
            msg.edit({
                embed: {
                    "description": "Something went Wrong :/",
                    "color": "RED"
                }
            })
        }
    }
}