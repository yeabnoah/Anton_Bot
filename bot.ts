const TelegramBot = require("node-telegram-bot-api");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const Anton = new GoogleGenerativeAI("AIzaSyBmVO-mLD_OD6hrH7VgsTiD-2Q8G3T5Jvk");
const AntonModel = Anton.getGenerativeModel({ model: "gemini-pro" });

const token = "7022133198:AAGu-tzhSnSWCmS98GZVJ--U6riG_0iqYwQ";
const bot = new TelegramBot(token, { polling: true });

async function GetNewsHeadline(msg) {
  const prompt = `Provide today's one headline in a structured format, including:

  * Date: (e.g., April 1, 2024)
  * Headline: (The main news of the day)
  * Source: (Where the headline originated from, e.g., BBC News, New York Times)

  Example:

  Date: April 1, 2024
  Headline: Senior Leader of Iran's Guard Corps Killed in Syria Strike
  Source: Fox News`;

  const result = await AntonModel.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  bot.sendMessage(msg.chat.id, text);
}

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "welcome user", {
    reply_markup: {
      keyboard: [["Get an Update"]],
    },
  });
});

bot.on("message", (msg) => {
  if (msg.text === "Get an Update") {
    GetNewsHeadline(msg);
  }
});
