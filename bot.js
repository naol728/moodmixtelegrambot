const express = require("express");
const axios = require("axios");

const BOT_TOKEN = "7828776074:AAGmqjEHiY18vavdTxMp3ukSG8_iLiN6BJA";
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const { message } = req.body;
  const chatId = message.chat.id;

  if (message.text === "/start") {
    const websiteURL =
      "https://moodmix-n5wxnupwe-naol728s-projects.vercel.app/";

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `Visit our website: ${websiteURL}`,
      reply_markup: {
        inline_keyboard: [
          [{ text: "Open MoodMix 🎵", web_app: { url: websiteURL } }],
        ],
      },
    });
  }
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Bot server running..."));
