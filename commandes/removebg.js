const { zokou } = require('../framework/zokou');
const axios = require('axios');

zokou(
  { nomCom: "removebg", reaction: "🖼️", categorie: "utility" },
  async (dest, zk, commandeOptions) => {
    const { repondre, fichier } = commandeOptions;

    if (!fichier) {
      return repondre("Please wait as ABROTECH BOT would remove the background.");
    }

    try {
      // Send the photo to the remove.bg API for background removal
      const response = await axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: {
          image_file_b64: fichier.data.toString('base64'), // Convert file data to base64
        },
        params: {
          size: 'auto', // Use 'auto' to let remove.bg decide the best size
        },
        headers: {
          'X-Api-Key': 'HVQYFxnfjm78xsuLuMQN6GQE', // Replace with your actual API key
          'Content-Type': 'application/json',
        },
        responseType: 'arraybuffer',
      });

      // Respond with a message confirming the background removal
      repondre("Background successfully removed!");

      // Send the background removed photo back to the user
      repondre({
        files: [{
          name: 'background_removed.png',
          caption: "Background removed by ABROTECH-BOT",
          data: response.data,
        }]
      });
    } catch (error) {
      console.error('An error occurred while removing the background:', error);
      repondre('Oops, an error occurred while removing the background.');
    }
  }
);
