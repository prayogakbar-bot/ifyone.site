require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf(process.env.BOT_TOKEN);

const channelId = "-1002936402906";

// Gambar maintenance (GitHub RAW)
const imageUrl = "https://raw.githubusercontent.com/prayogakbar-bot/ifyone.site/cd94990429c9bc215f38dff4ebf9b07b07c1d938/images/Maintenence.jpg";

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

// ⏰ Broadcast MAINTENANCE MULAI (23:00 WIB)
cron.schedule('0 23 * * *', async () => {
  try {
    await bot.telegram.sendPhoto(
      channelId,
      imageUrl,
      { caption: maintenanceStartMessage }
    );
    console.log('Broadcast maintenance mulai berhasil.');
  } catch (err) {
    console.error('Gagal kirim maintenance mulai:', err.message);
  }
}, {
  scheduled: true,
  timezone: "Asia/Jakarta"
});

// ⏰ Broadcast MAINTENANCE SELESAI (00:15 WIB)
cron.schedule('15 0 * * *', async () => {
  try {
    await bot.telegram.sendMessage(
      channelId,
      maintenanceEndMessage
    );
    console.log('Broadcast maintenance selesai berhasil.');
  } catch (err) {
    console.error('Gagal kirim maintenance selesai:', err.message);
  }
}, {
  scheduled: true,
  timezone: "Asia/Jakarta"
});

bot.launch();
console.log('Bot broadcast maintenance siap.');
