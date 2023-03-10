const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const randomColor = require('randomcolor');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('🎵 | Resume the currently paused song')
        .setDefaultMemberPermissions(PermissionFlagsBits.Connect)
        .setDMPermission(false),
    async execute(interaction) {
        var color = randomColor();
        let NewEmbed = new EmbedBuilder();
        
        const getQueue = interaction.client.player.getQueue(interaction.guildId);

        if (!interaction.member.voice.channel) {
            NewEmbed
                .setColor(color)
                .setDescription(`**❌ | You must in a voice channel to use this command**`)
            return interaction.reply({ embeds : [NewEmbed], ephemeral : true });
        }

		if (!interaction.guild.members.me.voice.channel) {
            NewEmbed
                .setColor(color)
                .setDescription(`**❌ | Bot is not on the voice channel**`)
            return interaction.reply({ embeds : [NewEmbed], ephemeral : true });
        }   

        if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            NewEmbed
                .setColor(color)
                .setDescription(`**❌ | You must be on the same voice channel to use this command**`)
			return interaction.reply({ embeds : [NewEmbed], ephemeral : true });
		}

        if (!getQueue){
            NewEmbed
                .setColor(color)
                .setDescription(`**❌ | There are no music being played**`)
            return interaction.reply({ embeds : [NewEmbed], ephemeral : true });
        }

        if (!getQueue.connection.paused) {
            NewEmbed
                .setColor(color)
                .setDescription(`**❌ | The queue is not currently paused**`)
            return interaction.reply({ embeds : [NewEmbed], ephemeral : true });
        }

        getQueue.setPaused(false);

        NewEmbed
            .setColor(color)
            .setDescription(`**▶️ | Music successfully resume**`)
        interaction.reply({ embeds : [NewEmbed] });
    },
};