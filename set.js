const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUxCVnB2L0xRWGtFVHpPVjJKTkFqek9IdHhKa2JkYW9XTTM4Q2ZnWlFXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUxHMUp1Rys1K1B6QzhJMnNFb04xdlFjMnJMNDVmNlgybDZrMU5uMitEOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5RzFCM3BXL045UVpwdHRaQlR2Yzk1M1k5b0h4QUlCMCtQUXlFZ2NZWDNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwN2svWjMrRkFuc3ljWjN4NURJS1hRektXc2ErQzN1K2tvdW1XZFg1VEFRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFPN3ptN0VoU2crL2NpNjVKS0RrUzVFc3hsbTNxUkdleEpadkcwTjdVV2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpIOGRaNlBzUEI1Wm1CVzYweEdmTzBtQzNrWmNjckJMQ2cydFVzaW4ySDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUVXSE1jOHBwYnQ0RUlWdFEyYjhRVHFQbFRaVS9lVStqZmcyQ1pidG1rUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM2FXM0R3b1NtK3pneUw2aHNXVFhpNXVoVG9sQlIwZWEwaGNBeURuVGIzdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRRcTlFcVkyV2hYcVVtQy8zcm1PckpxU1BOcjd0bGJVOU0xOHRVbTJhUzRJYXZjMUVSU29OT2dZNUwwcGRpVlVlSC85UkpnWGUraFIzM1hTRkdzeURnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTEsImFkdlNlY3JldEtleSI6IlU3OWdxNm1YYklsT2R3NzRxQ3YvbjhITWpseS9DQ09MUWxaUXFoYmIyWU09IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzY5OTAyNTQzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkM4MDI5ODg5MUQzNjQzNTBFRTAwM0Y0NzIyQkMyRTQwIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI2MDc5NjB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Iko3cjlrd2c3VFQ2WWktdmxuWFFSQVEiLCJwaG9uZUlkIjoiNWU2ZTBjZDUtYzQ1Zi00ZGVlLTk0ZmUtYTMyZDZkOTQ0NGUyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllWSVErSjBZR0NLb0NTMHBUR0FoYnlUdDhlYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKRnQybm16ME1TYUE1NzFjYmE2OFVmaVJja0U9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRlJFREVaUkEiLCJtZSI6eyJpZCI6IjI1NDc2OTkwMjU0Mzo1NUBzLndoYXRzYXBwLm5ldCIsImxpZCI6Ijc3ODM4MjEyNDE5NzgwOjU1QGxpZCIsIm5hbWUiOiLioIDig50g4qCA4oOdIOKggOKDnSDioIDig51STuKggOKDnSDioIDig50g4qCA4oOdIOKggOKDneOFpCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3J5Njc0RUVNWFoyc01HR0JvZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibnFGWlhjcGRSMVVGaHJJNXFTb2gxbnhFNU4xN0NCa2Zrb3hrUGY4aWYxTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiRk5OMVFHSk8wWk5NZkdoZUZQa0srM2FLL2M3WEZxN0pNampQU25WTXNRSlhhWTBVRGRxTWZsdHAvN2xYa3ZXUmVOai9mU2JjbmM0b1VYeTZLaGN6Q0E9PSIsImRldmljZVNpZ25hdHVyZSI6Ilc1Q0M5L2xxa2pMMjloOGU3bysyb2hhdlpSYThFVTVFSWpOS0dWWkROYUx2bitFRXBIajU4ZXp4VTRQdTBrMXlnT2JFdDM1cDhVb3NwMzdyYUNoMURnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzY5OTAyNTQzOjU1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlo2aFdWM0tYVWRWQllheU9ha3FJZFo4Uk9UZGV3Z1pINUtNWkQzL0luOVQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBMElDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc1MjYwNzk1NCwibGFzdFByb3BIYXNoIjoiMUs0aEg0IiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFISU0ifQ==',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Shitaalwaysahappen/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "RNO",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254769902543",
    DEV : process.env.DEV || "FrediEzra Tz",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT_HOME: process.env.AUTO_REACT_HOME_MESSAGE || "non",
    AUTO_REACT_AWAY : process.env.AUTO_REACT_AWAY_MESSAGE || "no", 
    AUTO_REACT_GROUP : process.env.AUTO_REACT_GROUP_MESSAGE || "no", 
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET_MESSAGE : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || 'yes',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
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
