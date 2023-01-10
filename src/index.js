require('dotenv').config();
const {token} = process.env;
const { Client, GatewayIntentBits, messageLink, Routes,  AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, InteractionResponse, CommandInteraction, MessageReaction, Embed, Message } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { get } = require('mongoose');
const rest = new REST({version:'10'}).setToken(token);

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages],
});
//起動確認
client.once('ready', () => {
    console.log(`${client.user.tag} Ready`);
});

//返答
client.on('messageCreate', message => {
    if (message.author.bot) {
        return;
    }
    let msg = message.content;
    console.log(msg);
    let file = message.attachments.first()
    let url = message.attachments.map(attachment => attachment.url);
    let menberrole = message.member.roles.cache.map(role => role.color);
    let str ='{"embeds": [';
    if (file) {    
        if (file.height && file.width){
            str = str + '{"color" :'  + '"' + String(menberrole[0]) + '",';
            str = str + '"url" : ' + '"'  +'https://www.youtube.com' +'",' + '"description": ' + '"' + msg + '",' + '"author": {"name": ' + '"' + message.author.username + '",'+'"color" : "16757683",' + '"icon_url": ' + '"' +message.author.avatarURL({ dynamic:true }) +'"},' + '"image": {"url": ' + '"' + "https://www.youtube.com/watch?v=UOh6nvmFc2o" + '"'+ '}},';
            if(url.length != 1){
                for(i = 0; i < url.length -1;i++)
                {
                    str = str + '{"url": "https://discord.com/channels/1022696341530492999/'+ message.channelId+'/'+ message.id+'"'+','+'"image": {"url": ' + '"' + url[i + 1] + '"'+ '}},'
                };
            
                str = str.slice(0,-1);
                str = str + ']}'
                json = JSON.parse(str);
                message.delete();
                message.channel.send(json);
                console.log(str);
            }
        }
    }
    const embed = new EmbedBuilder().setThumbnail("attachment://image.mp4");
    const attachment = new AttachmentBuilder()
        .setName("image.mp4")
        .setFile("https://www.youtube.com/watch?v=UOh6nvmFc2o")
    message.channel.send({
        files: [attachment],
        embeds: [embed]
    });
});

client.on("interactionCreate",(interaction) => {
    if(interaction.isChatInputCommand()) {
        if(interaction.commandName === 'ping'){
            let ping =Date.now() - interaction.createdTimestamp;
            console.log(ping);
            interaction.reply(String(ping)+'msです');
        }
    }
});
async function main() {const commands = [{name :'ping',description:'pong!'},]; 
try {
    console.log('application command start ');
    Routes.applicationGuildCommands;
    await rest.put(Routes.applicationGuildCommands("1061478626773704764","1047073269414633473"),
    {body : commands,});
} catch (err) {console.log(err)}};
main(); 
client.on("messageReactionAdd",(reaction,user) => {
    if(reaction.message.author =='true')
    reaction.remove(2000);
});

//Discordへの接続
client.login(token);