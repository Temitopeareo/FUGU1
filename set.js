const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0ZZYzJyTEh4Y09VSXp5YmdBak5yVjhQZmJuRkJSSEExOHdaTTN5aWNXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUFJZ0ZCWUVHNCsxdm1KMnBXbG12RlphRVAvemlzNWZWSnRKUE83bmlTVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0SjJMdWhwN2hucTBnWHZReUQySmQ0VlBUSS9SVjcxQ2czdVhkMG00cEZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyVllQdFZsclVJTURWVi9RdFFFZTQ0RjgxN2kwQkF2RCttMGRkcVRSNkVnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVDbmtSRmwrS2VOV2JYbXZXZm1OQnVsOEFlTmdTejFYcVR3S2hERjF5V2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ino2UlNNT2k3bElCOXlvcDRGc24yQldkQVF1WmdDN0VBSWZxYkVmcWRxdzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid05QOE1pUTQyd3cxM0JmeWN2OUdBNTJkU3NjalpsUTloekkyTXZ0WnNGUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWHpGK2FtdzVyRzBMVHBpazZ2MDBXeVRLRi82MzkydWIrRDZKWk5KUThIWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNZZmdmcUErZmNrd1FUR2V4QU0xbnhMVzZTSHh2MXBqUTcxaGQ4bS8yTHZzN3p2bUlicXgwWk9TOGtoMUl1YklBQnhYUzZVM203d2M1bzN4bVl1dWh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzIsImFkdlNlY3JldEtleSI6IkVDeXBLcDROOFloMTk1Q2JOaWYzS2l6SnFZODBWeEJqYlRacXl0K1JRa0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTY2NTgzMTMwNTQxQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjNBRkMxRDc2MTU3QTRFODkzMEVFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjE2NzMwNzd9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk2NjU4MzEzMDU0MUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTBGQzE2NzZFNkI4N0E4RTRFMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxNjczMDc4fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwWmg4dVI4NFFHdWVKYlpGZS13QjlBIiwicGhvbmVJZCI6IjgwNTY0NWY4LTk2Y2MtNGI2MC04NDc4LTE2MWZmOGM0N2ZkZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJuY2Z3RjhxMWVkUEEvcnBPRW1LSWNCd3pEZ0k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjBDeFlzaWFONHlIRUZGQUlycmVRQkduZElvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBBU0RaSDU2IiwibWUiOnsiaWQiOiI5NjY1ODMxMzA1NDE6M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUdVbHBNTEVPZksrclFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiUitBMytJOXBuL3lEU20xNU5zaWt1YjM2T1lveUdjYnMrcGQ3MGtCYVZFND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNzRFTGVMUkJVdSs2ZFRYQVBrMWxOL0pYTW1PNmxKTVJHNlhWcW12UUQxeFFybkdFeFc3Y0pnemVwMjUvNndMZGRlZjFZSkZEbE1ydHJUNGRHejRUQkE9PSIsImRldmljZVNpZ25hdHVyZSI6Ik9TTkRkVzZLSkR5anRaYzZ0YU9KMWNKQnhWUksvK3JZNm9rTTh4UlZJRkxxa2JDNlQxMGJjMUI2RnZHMDJmdE5ZNUJYbEw0RDd5czhBTVVLcEU1YWlRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTY2NTgzMTMwNTQxOjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVWZnTi9pUGFaLzhnMHB0ZVRiSXBMbTkram1LTWhuRzdQcVhlOUpBV2xSTyJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxNjczMDc1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZKbSJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Abro",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "oui",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'ABROTECH-BOT',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
