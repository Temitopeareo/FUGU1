const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { getBuffer } = require("../framework/dl/Function");
const { default: axios } = require('axios');

const runtime = function (seconds) { 
 seconds = Number(seconds); 
 var d = Math.floor(seconds / (3600 * 24)); 
 var h = Math.floor((seconds % (3600 * 24)) / 3600); 
 var m = Math.floor((seconds % 3600) / 60); 
 var s = Math.floor(seconds % 60); 
 var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
 var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
 var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
 var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
 return dDisplay + hDisplay + mDisplay + sDisplay; 
 } 


zokou({ nomCom: 'uptime',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '⚙️', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*_𝑼𝒑𝒕𝒊𝒎𝒆 𝒐𝒇  𝑴𝑬𝑮𝑨𝑻𝑹𝑶𝑵 𝑩𝑶𝑻: ${runtime(process.uptime())}_*`) 

   


  }
);


zokou({ nomCom: 'ss',
    desc: 'screenshots website',
    Categorie: 'General',
    reaction: '🎥', 
    fromMe: 'true', 

},
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

    if (!arg || arg.length === 0) return repondre("provide a link...");

         const linkk = arg.join(' ');



let linkkk = `https://api.screenshotmachine.com/?key=c04d3a&url=${encodeURIComponent(linkk)}&dimension=720x720`;

let res = await getBuffer(linkkk);

await zk.sendMessage(dest, { image: res, caption: '𝑾𝒆𝒃 𝑺𝒄𝒓𝒆𝒆𝒏𝒔𝒉𝒐𝒕 𝒃𝒚 * 𝑴𝑬𝑮𝑨𝑻𝑹𝑶𝑵 𝑩𝑶𝑻*'}, { quoted: ms });


}
);



zokou({
    nomCom: 'abrodev',
    desc: 'Get developer image and info',
    Categorie: 'General',
    reaction: '👨‍💻',
    fromMe: 'true',
},
async (dest, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;

    // Developer information
    const developerInfo = {
        name: 'Dev Temitope',
        role: 'Short time developer',
        about: 'Passionate about building web applications and exploring new technologies.',
        image: 'https://imgur.com/nxZcCPl.jpg' // Replace with actual image URL
    };

    // Send developer image and info
    await zk.sendMessage(dest, { image: developerInfo.image, caption: `*Developer Info:*\nName: ${developerInfo.name}\nRole: ${developerInfo.role}\nAbout: ${developerInfo.about}` }, { quoted: ms });
});
