const discord = require("discord.js");
const fetch = require("node-fetch");
const { htmlToText } = require('html-to-text');

module.exports = {
    name: "post",
    description: "Search all the posts available on CTK Toons",
    category: "info",
    aliases: ["ctk"],
    usage: "post <SearchQuery>",
    run: async (client, message, args, color) => {

        if (!args.length) {
            return message.channel.send("Please provide a search query");
        }

        let msg = await message.channel.send({
            embed: {
                "description": "Searching...",
                "color": "YELLOW"
            }
        })

        try {
            var url = `https://cartoontechkid.co.in/wp-json/wp/v2/posts?search=${args.join("+")}`;
            let post = await fetch(url);
            post = await post.json();
            console.log(post.length)

            if (!post.length) return msg.edit ({
                embed: {
                    "description": "No post found",
                    "color": "RED"
                }
            })

            let post_info = post[0];

            var user_url = `https://cartoontechkid.co.in/wp-json/wp/v2/users/${post_info.author}`;
            let user = await fetch(user_url);
            user = await user.json();
            let user_info = user;

            let embed = new discord.MessageEmbed()
                .setTitle(post_info.title.rendered)
                .setColor("GREEN")
                .setImage(post_info.jetpack_featured_media_url)
                .setThumbnail(user_info.avatar_urls[96])
                .setDescription(htmlToText(post_info.excerpt.rendered))
                .addField("Modified", post_info.modified)
                .addField("Author", user_info.name, true)
                .addField("Link", post_info.link);
            msg.edit(embed)
        } catch (err) {
            msg.edit({
                embed: {
                    "description": "Something went Wrong",
                    "color": "RED"
                }
            })
        }
    }
}