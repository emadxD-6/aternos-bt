const mineflayer = require('mineflayer');

function createBot() {
    const bot = mineflayer.createBot({
        host: 'emadop.aternos.me', 
        port: 19132,                
        username: 'AFK_Bot_247',    
        version: false              
    });

    bot.on('spawn', () => {
        console.log('البوت دخل السيرفر بنجاح!');
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 500);
        }, 30000);
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message === 'ping') bot.chat('pong');
    });

    bot.on('end', () => {
        console.log('تم قطع الاتصال، جاري إعادة المحاولة بعد 10 ثوانٍ...');
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => console.log('حدث خطأ: ', err));
}

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('البوت يعمل بنجاح 24/7!'));
app.listen(PORT, () => console.log(`سيرفر الويب يعمل على المنفذ ${PORT}`));

createBot();
