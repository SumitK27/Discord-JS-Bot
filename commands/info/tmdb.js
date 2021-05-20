const discord = require("discord.js");
const fetch = require("node-fetch");

const { tmdb_api } = require("../../config.json");


module.exports = {
    name: "tmdb",
    description: "Get the information about series and movie",
    category: "info",
    aliases: ["movie2", "show2"],
    usage: "tmdb <name>",
    run: async (client, message, args, color) => {

        if (!args.length) {
            return message.channel.send("Please give the name of movie or series")
        }


        let msg = await message.channel.send({
            embed: {
                "description": "Getting the information...",
                "color": "YELLOW"
            }
        })


        try {
            var url = `https://api.themoviedb.org/3/search/multi?api_key=${tmdb_api}&language=en-US&query=${args.join("+")}`;
            let movie = await fetch(url);
            movie = await movie.json();

            if (movie.total_results === 0) return msg.edit({
                embed: {
                    "description": "Unable to find Something about `" + args.join(" ") + "`",
                    "color": "RED"
                }
            })

            console.log(movie.results[0].title || movie.results[0].name, url);
            let embed = new discord.MessageEmbed()
                .setTitle(movie.results[0].title || movie.results[0].name)
                .setColor("GREEN")
                .setThumbnail("https://image.tmdb.org/t/p/w500" + movie.results[0].poster_path)
                .setImage("https://image.tmdb.org/t/p/w500" + movie.results[0].poster_path)
                .setDescription(movie.results[0].overview)
                .setFooter(`Ratings: "${movie.results[0].vote_average}" | Seasons: ${movie.results[0].totalSeasons || "0"}`)
                .addField("Original Title", movie.results[0].original_title || movie.results[0].name, true)
                .addField("Release Date", movie.results[0].release_date || movie.results[0].first_air_date, true)
                .addField("Languages", movie.results[0].original_language, true)
                .addField("ID", `${movie.results[0].id}`, true);
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