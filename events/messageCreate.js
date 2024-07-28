const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot) return;

        const saResponses = [
            'as',
            'aleyküm selam',
            'as knk',
            'as dostum',
            'aleyküm selam kardeşim'
        ];

        if (message.content.toLowerCase() === 'sa') {
            const response = saResponses[Math.floor(Math.random() * saResponses.length)];
            await message.channel.send(response);
        }

        const settingsPath = path.resolve(__dirname, '../data/settings.json');
        const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf-8'));

        if (settings.linkEngel) {
            const linkleriEngelle = (content) => {
                const linkDesenleri = [/\.com\b/, /\.net\b/, /\.xyz\b/, /\.vercel.app\b/, /\.com.tr\b/, /\.gg\b/]; // Bu listeyi istediğiniz uzantı desenleriyle doldurun.
                for (const desen of linkDesenleri) {
                    if (desen.test(content.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            };

            if (linkleriEngelle(message.content)) {
                await message.delete();
                message.channel.send(`${message.author}, reklam yapmak/link paylaşmak yasaktır!`).then(msg => {
                    setTimeout(() => msg.delete(), 3000); 
                });
            }
        }

        if (!settings.kufurEngel) return;

        const kufurListesi = [
            "amk",
            "orospu çocuğu",
            "siktir",
            "ananı sikeyim",
            "piç",
            "mal",
            "geri zekalı",
            "ibne",
            "pezevenk",
            "kahpe",
            "yarrak",
            "dalyarak",
            "oç",
            "şerefsiz",
            "göt",
            "ananı avradını",
            "amına koyayım",
            "yavşak",
            "puşt",
            "dingil",
            "kaltak",
            "hayvan",
            "kro",
            "salak",
            "hıyarto",
            "top",
            "gerizekalı",
            "sikik",
            "dangalak",
            "kaşar",
            "hayvan herif",
            "serefsiz"
          ];

        if (kufurListesi.some(kufur => message.content.toLowerCase().includes(kufur.toLowerCase()))) {
            await message.delete();
            await message.channel.send(`${message.author}, bu sunucuda küfür yasaktır!`).then(msg => {
                setTimeout(() => msg.delete(), 3000);
            }).catch(console.error);
        }
    },
};