require("dotenv").config();
const express = require("express");
const { Telegraf } = require("telegraf");
const cors = require("cors");

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

app.use(cors());
app.use(express.json());

// 🟢 Start Command - Sends Website Link
bot.command("start", (ctx) => {
  ctx.reply("Welcome! Click below to visit our website 👇", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Visit Website 🌐",
            url: "https://moodmix-n5wxnupwe-naol728s-projects.vercel.app/",
          },
        ],
      ],
    },
  });
});

// 🟢 Handle Messages
bot.on("text", (ctx) => {
  ctx.reply(`You said: ${ctx.message.text}`);
});

// 🟢 Webhook Endpoint (For Hosting)
app.post(`/${process.env.BOT_TOKEN}`, (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Bot server running on port ${PORT}`);
});

bot.launch();
