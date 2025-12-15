require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf(process.env.BOT_TOKEN);

const channelId = "-1002936402906";

const imageUrl = "https://raw.githubusercontent.com/prayogakbar-bot/ifyone.site/cd94990429c9bc215f38dff4ebf9b07b07c1d938/images/Maintenence.jpg";

const maintenanceStartMessage = `
Dear Mitra IFYOne,
Sistem akan melakukan maintenance harian pada 23:30 – 00:15 WIB.
Selama periode tersebut, layanan tidak dapat diproses.

Terima kasih atas pengertiannya.
`;

const maintenanceEndMessage = `
Dear Mitra IFYOne,
Maintenance telah selesai.
Seluruh layanan telah kembali normal dan dapat digunakan seperti biasa.

Terima kasih atas kesabarannya.
`;

// ⏰ Maintenance mulai
cron.schedule('0 23 * * *', async () => {
  await bot.telegram.sendPhoto(channelId, imageUrl, {
    caption: maintenanceStartMessage
  });
}, { timezone: 'Asia/Jakarta' });

// ⏰ Maintenance selesai
cron.schedule('15 0 * * *', async () => {
  await bot.telegram.sendMessage(channelId, maintenanceEndMessage);
}, { timezone: 'Asia/Jakarta' });

// 🔥 WAJIB: matikan webhook & polling
bot.telegram.deleteWebhook();

// 🔥 Launch TANPA polling
bot.launch({ polling: false });

console.log('Bot broadcast maintenance siap.');
