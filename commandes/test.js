"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
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
zokou({ nomCom: "repo", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Hello This is  *ABROTECH-BOT* \n\n ' + "The Following is *ABROTECH-BOT REPO.*";
    let d = ' https://github.com/Temitopeareo/FUGU1';
    let varmess = z + d;
    var img = 'https://imgur.com/7doiWDc.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *ABROTECH-BOT* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *Abro*'
      let varmess=z+d
      var img='https://imgur.com/7doiWDc.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
