const discord = require("discord.js");
const fetch = require("node-fetch");

const { genius_api } = require("../../config.json");


module.exports = {
    name: "lyrics",
    description: "Get the lyrics of the song",
    category: "info",
    usage: "lyrics <name>",
    run: async (client, message, args, color) => {

        if (!args.length) {
            return message.channel.send("Please give the name of the song")
        }


        let msg = await message.channel.send({
            embed: {
                "description": "Getting the information...",
                "color": "YELLOW"
            }
        })


        try {
            var url = `https://api.genius.com/search?q=${args.join("+")}&access_token=${genius_api}`;
            let song = await fetch(url);
            song = await song.json();
            song_data = song.response.hits[0].result

            console.log(song_data.title, url);
            let embed = new discord.MessageEmbed()
                .setTitle(song_data.title)
                .setColor("GREEN")
                .setThumbnail(song_data.song_art_image_thumbnail_url)
                .setImage(song_data.song_art_image_url)
                // .setDescription(song.results[0].overview)
                // .setFooter(`Ratings: "${song.results[0].vote_average}" | Seasons: ${song.results[0].totalSeasons || "0"}`)
                .addField("Original Title", song_data.full_title)
                .addField("By", song_data.primary_artist.name)
                // .addField("Languages", song.results[0].original_language, true)
                .addField("ID", song_data.id)
                .addField("Link", song_data.url);
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