const { SlashCommandBuilder, EmbedBuilder, Colors } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hava-durumu')
        .setDescription('Belirtilen şehir için hava durumunu gösterir')
        .addStringOption(option =>
            option.setName('şehir')
                .setDescription('Hava durumu bilgisini almak istediğiniz şehir')
                .setRequired(true)),
    async execute(interaction) {
        const city = interaction.options.getString('şehir');
        const apiKey = "1ede473b3f68f1c91ccca3ac4b10f902";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;

        try {
            const response = await axios.get(url);
            const weather = response.data;
            const embed = new EmbedBuilder()
                .setTitle(`Nexis・Hava Durumu - ${weather.name}`)
                .setDescription(`**${weather.weather[0].description}**`.toUpperCase())
                .addFields(
                    { name: 'Sıcaklık', value: `${weather.main.temp}°C`, inline: true },
                    { name: 'Hissedilen Sıcaklık', value: `${weather.main.feels_like}°C`, inline: true },
                    { name: 'Nem', value: `${weather.main.humidity}%`, inline: true },
                    { name: 'Rüzgar Hızı', value: `${weather.wind.speed} m/s`, inline: true }
                )
                .setColor("#000000")
                .setFooter({ text: `${city} Şehrinin Hava Durumu`});

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error);
            await interaction.reply('Hava durumu bilgisi alınırken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    },
};