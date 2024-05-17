"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "tempmail", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*ABROTECH-BOT* Temporary emails,Powered by *Abro* \n\n ' + "Click the link below to create unlimited TEMPORARY Emails. \n\n ' + WORKING *HEROKU MAIL* by *ABROTECH.*";
    let d = ' https://mymail.guru';
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
   let z ='Salut je m\'appelle *MEGATRON-BOT* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *Kimmy*'
      let varmess=z+d
      var img='https://telegra.ph/file/bcf5cec3445652ab197bc.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
