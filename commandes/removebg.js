const { zokou } = require('../framework/zokou');
const axios = require('axios');

zokou(
  { nomCom: "removebg", reaction: "🖼️", categorie: "utility" },
  async (dest, zk, commandeOptions) => {
    const { repondre, fichier } = commandeOptions;

    if (!fichier) {
      return repondre("Please send a photo with the command.");
    }

    try {
      // Send the photo to the remove.bg API for background removal
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', fichier.data, {
        params: {
          size: 'regular', // You can adjust the size if needed
        },
        headers: {
          'X-Api-Key': 'HVQYFxnfjm78xsuLuMQN6GQE', // Replace with your actual API key
          'Content-Type': 'image/jpeg',
        },
        responseType: 'arraybuffer',
      });

      // Respond with a message confirming the background removal
      repondre("Background successfully removed!");

      // Send the background removed photo back to the user
      repondre({
        files: [{
          name: 'background_removed.png', caption: "\t *Logo byABROTECH-BOT*",
          data: response.data,
        }]
      });
    } catch (error) {
      console.error('An error occurred while removing the background:', error);
      repondre('Oops, an error occurred while removing the background.');
    }
  }
);
