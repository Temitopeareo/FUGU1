const { zokou } = require("../framework/zokou");
const axios = require("axios");
const fs = require("fs");

zokou({
  nomCom: "fbmp4",
  categorie: "Download",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("insert a Facebook video link");
    return;
  }

  const fbLink = arg.join(" ");
  try {
    // Call to the hypothetical Facebook video download API
    const response = await axios.post('https://api.fbdown.net/api/facebook', { url: fbLink }); // Replace with actual API endpoint
    const videoUrl = response.data.videoUrl; // Adjust based on actual API response
    const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });

    // Local file name to save the video
    const filename = 'facebook_video.mp4';

    // Write the video stream to a local file
    const fileStream = fs.createWriteStream(filename);
    videoResponse.data.pipe(fileStream);

    fileStream.on('finish', () => {
      // Send the video file using the local file URL
      zk.sendMessage(origineMessage, { video: { url: `./${filename}` }, caption: "GENERATED 𝐁𝐘 *ABROTECH*", gifPlayback: false }, { quoted: ms });
    });

    fileStream.on('error', (error) => {
      console.error('Error writing video file:', error);
      repondre('An error occurred while writing the video file.');
    });

  } catch (error) {
    console.error('Error downloading Facebook video:', error);
    repondre('An error occurred while downloading the Facebook video: ' + error.message);
  }
});
