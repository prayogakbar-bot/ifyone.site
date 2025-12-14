require('dotenv').config();
const { Telegraf } = require('telegraf');
const cron = require('node-cron');
const fs = require('fs');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Load daftar chat ID dari file JSON (opsional)
let chatIds = [];
try {
  chatIds = JSON.parse(fs.readFileSync('chat_ids.json'));
} catch (err) {
  console.log('File chat_ids.json tidak ditemukan. Tambahkan chat ID secara manual.');
}

// Pesan broadcast maintenance
const maintenanceMessage = `
Dear Mitra IFYOne,
Kami informasikan bahwa sistem akan memasuki waktu maintenance dan cutoff pada:

23:30 – 00:15 WIB
Selama periode tersebut, beberapa layanan mungkin tidak dapat diakses atau mengalami keterlambatan proses.

Layanan akan kembali normal setelah maintenance selesai.
Terima kasih atas pengertiannya.
`;

// Fungsi broadcast
async function broadcast(message) {
  for (const id of chatIds) {
    try {
      await bot.telegram.sendMessage(id, message);
      console.log(`Pesan terkirim ke ${id}`);
    } catch (err) {
      console.error(`Gagal kirim ke ${id}:`, err.message);
    }
  }
}

// Jadwal broadcast setiap hari jam 23:00 WIB
cron.schedule('0 23 * * *', () => {
  console.log('Broadcast maintenance otomatis berjalan...');
  broadcast(maintenanceMessage);
}, {
  scheduled: true,
  timezone: "Asia/Jakarta"
});

// Start bot
bot.launch();
console.log('Bot broadcast otomatis berjalan di Railway');

// Graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
