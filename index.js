require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf(process.env.BOT_TOKEN);

const channelId = "-1002936402906";

// 🖼️ Gambar maintenance MULAI
const maintenanceStartImage =
  "https://raw.githubusercontent.com/prayogakbar-bot/ifyone.site/817ea0c87c9531fc82fa781dd6b0107e9364da13/images/Maintenance.png";

// 🖼️ Gambar maintenance SELESAI
const maintenanceEndImage =
  "https://raw.githubusercontent.com/prayogakbar-bot/ifyone.site/817ea0c87c9531fc82fa781dd6b0107e9364da13/images/Selesai.png";

// Pesan MAINTENANCE MULAI
const maintenanceStartMessage = `
Dear Mitra IFYOne,
Sistem akan melakukan maintenance harian pada 23:30 – 00:15 WIB.
Selama periode tersebut, layanan tidak dapat diproses.

Terima kasih atas pengertiannya.
`;

// Pesan MAINTENANCE SELESAI
const maintenanceEndMessage = `
Dear Mitra IFYOne,
Maintenance telah selesai.
Seluruh layanan telah kembali normal dan dapat digunakan seperti biasa.

Terima kasih atas kesabarannya.
`;

// ⏰ 23:00 WIB — Maintenance MULAI (gambar + caption)
cron.schedule('0 23 * * *', async () => {
  try {
    await bot.telegram.sendPhoto(channelId, maintenanceStartImage, {
      caption: maintenanceStartMessage
    });
    console.log('Maintenance mulai terkirim');
  } catch (e) {
    console.error('Error maintenance mulai:', e.message);
  }
}, { timezone: 'Asia/Jakarta' });

// ⏰ 00:15 WIB — Maintenance SELESAI (gambar + caption)
cron.schedule('15 0 * * *', async () => {
  try {
    await bot.telegram.sendPhoto(channelId, maintenanceEndImage, {
      caption: maintenanceEndMessage
    });
    console.log('Maintenance selesai terkirim');
  } catch (e) {
    console.error('Error maintenance selesai:', e.message);
  }
}, { timezone: 'Asia/Jakarta' });

console.log('Bot broadcast maintenance siap (tanpa polling).');
