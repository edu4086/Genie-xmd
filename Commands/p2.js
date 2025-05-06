const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou(
  {
    nomCom: "pair2",
    aliases: ["session", "pair", "paircode", "qrcode"],
    reaction: "🎀",
    categorie: "General",
  },
  async (dest, origine, msg) => {
    const { repondre, arg } = msg;

    if (!arg || arg.length === 0) {
      return repondre("*Please provide a number (e.g., 2547XXXXXXXX)*");
    }

    const number = arg[0];
    if (!/^[0-9]+$/.test(number)) {
      return repondre("*Invalid number! Use digits only.*");
    }

    await repondre("*Generating pair code...*");

    try {
      const apiUrl = `https://queenmsession-5f097131c2ec.herokuapp.com/pair?number=${encodeURIComponent(number)}`;
      const response = await axios.get(apiUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
      });

      const data = response.data;
      console.log("API Response:", data); // Debug log

      if (data?.code) {
        await repondre(`*Pairing Code:*\n${data.code}\n\n_Copy this code to link your WhatsApp via Linked Devices._`);
      } else {
        await repondre("*Error: No code received from the API.*");
      }
    } catch (error) {
      console.error("API Error:", error.message);
      await repondre("*Failed to connect to the pairing service. Try again later.*");
    }
  }
);
