"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "tempmail", reaction: "🤖", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*ABRO BOT* Temporary emails,Powered by *Abrotech* \n\n ' + "Click the link below to create unlimited TEMPORARY Emails for HEROKU ACCOUNT. Powered by *ABRO-TECH.*";
    let d = ' https://myguru.mail';
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
   let z ='Salut je m\'appelle *ABRO BOT* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *Abrotech*'
      let varmess=z+d
      var img='https://imgur.com/7doiWDc.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
