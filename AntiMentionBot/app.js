const Discord = require('discord.js');
require('dotenv').config();
var dam_usrs = [];

const client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES ]
});


client.on('ready', () => {
    console.log(client.user.tag);
    client.user.setActivity("with peoples messages");
});


client.on('messageCreate', message => {

    if (message.content === "!dam enable") {
        message.channel.send(`Dont@Me Enabled for ${message.author.username}`);
        dam_usrs.push(message.author.username);
        message.delete(message);
    }
    else if (message.content === "!dam disable") {
        message.channel.send(`Dont@Me Disabled for ${message.author.username}`);
        dam_usrs = dam_usrs.filter(rm_usr);
        function rm_usr() {
            return dam_usrs != message.author.username;
        }

        message.delete(message);
    };
});



client.on('messageCreate', message => {
    let mention = message.mentions.users.first();
    if (mention) {
        memb = client.users.cache.find(user => user.id == mention.id)
        if (dam_usrs.includes(memb.username)) {

            message.channel.send(`${memb.username} has Mentions Disabled`);
            message.delete(message);
        }
    }
})

client.login(process.env.TOKEN);