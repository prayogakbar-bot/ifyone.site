require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Ganti dengan username channel atau chat ID channel
const channelId = "-1002936402906"; // 
// Pesan broadcast maintenance
const maintenanceMessage = `
Dear Mitra IFYOne,
Kami informasikan bahwa sistem akan memasuki waktu maintenance dan cutoff pada:

23:30 – 00:15 WIB
Selama periode tersebut, beberapa layanan mungkin tidak dapat diakses atau mengalami keterlambatan proses.

Layanan akan kembali normal setelah maintenance selesai.
Terima kasih atas pengertiannya.
`;

// Broadcast ke channel setiap hari jam 23:00 WIB
cron.schedule('0 23 * * *', async () => {
  try {
    await bot.telegram.sendMessage(channelId, maintenanceMessage);
    console.log('Pesan maintenance berhasil dikirim ke channel.');
  } catch (err) {
    console.error('Gagal mengirim pesan ke channel:', err.message);
  }
}, {
  scheduled: true,
  timezone: "Asia/Jakarta"
});

// Jalankan bot
bot.launch();
console.log('Bot broadcast ke channel siap.');
