const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('8689791162:AAFZcQPVtGlWu-8a_-_AXtpF00PyfZzYyI');

bot.start((ctx) => {
    ctx.reply('أهلاً بك في بوت Ice ❄️!\nأرسل لي أي رابط مقطع تيك توك وسأقوم بتحميله لك بدون علامة مائية 🚀.');
});

bot.on('text', async (ctx) => {
    const messageText = ctx.message.text;

    if (messageText.includes('tiktok.com')) {
        await ctx.reply('جاري جلب المقطع، انتظر لحظة... ⏳');

        try {
            const apiUrl = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(messageText)}`;
            const response = await axios.get(apiUrl);

            if (response.data && response.data.video && response.data.video.noWatermark) {
                const videoUrl = response.data.video.noWatermark;
                await ctx.replyWithVideo(videoUrl, {
                    caption: 'تم التحميل بنجاح بواسطة Ice ❄️✨'
                });
            } else {
                ctx.reply('عذراً، لم أتمكن من استخراج المقطع. تأكد من صحة الرابط.');
            }
        } catch (error) {
            console.error(error);
            ctx.reply('حدث خطأ أثناء جلب الفيديو.');
        }
    } else {
        ctx.reply('من فضلك أرسل رابط تيك توك صحيح 🔗.');
    }
});

bot.launch();
console.log('Ice TikTok Bot يعمل الآن 🚀...');
