const { Telegraf } = require("telegraf");
const express = require("express");

const app = express();
const bot = new Telegraf("YOUR_TELEGRAM_BOT_TOKEN"); // আপনার বট টোকেন এখানে বসান

// বট দিয়ে ব্যবহারকারীর তথ্য আনা
app.get("/get_user_info", async (req, res) => {
  try {
    // User ID সংগ্রহ করুন (কাস্টমাইজ করুন)
    const userId = req.query.user_id || "123456789"; // এখানে একটি সঠিক user_id বসান
    const user = await bot.telegram.getChat(userId);

    // প্রোফাইল ছবি ফেচ করুন
    const photos = await bot.telegram.getUserProfilePhotos(userId);
    let photoUrl = "";

    if (photos.total_count > 0) {
      const fileId = photos.photos[0][0].file_id;
      const file = await bot.telegram.getFile(fileId);
      photoUrl = `https://api.telegram.org/file/bot${bot.token}/${file.file_path}`;
    }

    res.json({
      name: user.first_name + (user.last_name ? ` ${user.last_name}` : ""),
      photo_url: photoUrl || "No photo available",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// সার্ভার চালু করুন
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});ঋ