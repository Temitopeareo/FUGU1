"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
const puppeteer = require('puppeteer');

async function getTempEmail() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://mymail.guru/');

    await page.waitForSelector('#mail');
    const email = await page.$eval('#mail', el => el.value);

    await browser.close();
    return email;
}

async function getInboxMessages(email) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://mymail.guru/');

    await page.$eval('#mail', (el, value) => el.value = value, email);
    await page.click('#post-check-mail');
    await page.waitForTimeout(3000);

    const messages = await page.evaluate(() => {
        const rows = Array.from(document.querySelectorAll('.mail-item'));
        return rows.map(row => {
            const from = row.querySelector('.from').innerText;
            const subject = row.querySelector('.subject').innerText;
            return { from, subject };
        });
    });

    await browser.close();
    return messages;
}

zokou({ nomCom: "tempmail", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!");

    let email;
    let response = '*ABROTECH-BOT* Temporary emails, Powered by *Abro* \n\n' +
        "Click the link below to create unlimited TEMPORARY Emails FOR *HEROKU*. Powered by *ABROTECH.*";
    let link = '`https://mymail.guru`';
    let varmess = response + link;
    let img = 'https://imgur.com/7doiWDc.jpg';
    
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });

    try {
        email = await getTempEmail();
        varmess = `Your temporary email is: ${email}`;
        await zk.sendMessage(dest, { text: varmess });
    } catch (error) {
        console.error('Error fetching tempmail:', error);
        varmess = 'Failed to retrieve temporary email. Please try again later.';
        await zk.sendMessage(dest, { text: varmess });
    }

    // Add a command to check inbox
    if (commandeOptions.command === 'inbox') {
        if (email) {
            try {
                const messages = await getInboxMessages(email);
                if (messages.length > 0) {
                    let inboxMsg = 'Your inbox messages:\n';
                    messages.forEach((msg, index) => {
                        inboxMsg += `${index + 1}. From: ${msg.from}\nSubject: ${msg.subject}\n\n`;
                    });
                    await zk.sendMessage(dest, { text: inboxMsg });
                } else {
                    await zk.sendMessage(dest, { text: 'Your inbox is empty.' });
                }
            } catch (error) {
                console.error('Error fetching inbox:', error);
                await zk.sendMessage(dest, { text: 'Failed to retrieve inbox messages. Please try again later.' });
            }
        } else {
            await zk.sendMessage(dest, { text: 'No temporary email found. Please request a tempmail first by sending "tempmail".' });
        }
    }
});

console.log("mon test");
