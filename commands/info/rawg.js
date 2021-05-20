const discord = require("discord.js");
const fetch = require("node-fetch");

const { rawg_api } = require("../../config.json");

function getNames(array) {
    item = "";
    count = array.length;
    array.forEach(element => {
        item += "`" + element.name + "`, ";
    });
    return item;
}

function getPlatforms(array) {
    item = "";
    array.forEach(element => {
        item += "`" + element.platform.name + "`, ";
    });
    return item;
}

function getStores(array) {
    item = "";
    array.forEach(element => {
        item += "`" +element.store.name + "`, ";
    });
    return item;
}

module.exports = {
    name: "rawg",
    description: "Get the information about Vide Games",
    category: "info",
    aliases: ["game"],
    usage: "rawg <name>",
    run: async (client, message, args, color) => {

        if (!args.length) {
            return message.channel.send("Please give the name of game")
        }


        let msg = await message.channel.send({
            embed: {
                "description": "Getting the information...",
                "color": "YELLOW"
            }
        })


        try {
            var url = `https://api.rawg.io/api/games?search=${args.join("+")}&api_key=${rawg_api}`;
            let game = await fetch(url);
            game = await game.json();

            if (game.count === 0) return msg.edit({
                embed: {
                    "description": "Unable to find Something about `" + args.join(" ") + "`",
                    "color": "RED"
                }
            })

            game_info = game.results[0];

            console.log(game_info.title || game_info.name, url);
            let embed = new discord.MessageEmbed()
                .setTitle(game_info.name)
                .setImage(game_info.background_image)
                .setColor("GREEN")
                .addField("Ratings", game_info.rating + " :star: ")
                // .setDescription(game_info.overview)
                .addField("Genres", getNames(game_info.genres), true)
                .addField("Release Date", game_info.released || "-", true)
                .addField("Platforms", getPlatforms(game_info.platforms))
                .addField("Available on Stores", getStores(game_info.stores))
                .addField("Link", `https://rawg.io/games/${game_info.slug}`, true);
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