const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJpRHNrR2lNZVRCQmV5TmNtb05NdnI3SHhYb2xYQk95OFo3VTZXajNVdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRzRHbEJucXc3L2p2V0pTWTQ3M3ZqbzJuaFVIeENjOXZ6d1VxdERFN1pTND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQVlQNFVlSUdaamk0NWhzNUFDclhqWjJvYmtMVHZXOG41eTZTckJvUGtjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSWFNTakJ3YkpJcXVKMEJnR25jbXd4bVdta1YwVk5zTlF4Lzc5WWhRQ21zPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtHTDM4NFVTZSt5aWQ1T1NmWWdyeHlPRms4cGNtUjNYcDB1L2oxV2JmMVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNCcnBKUVU1Z050Y0dKT2dXL2VsTkhIL0pteHNwMDBZRXhKR2EyRGJ1RTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1BjVjhjdW1XRlVoVE80VTljWXJxbnBzUzlTTHRCOU1ZdEtYTXdLSHBHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0xtTFordUxBTWo1T3cvZDNkbmV4aU1ROWo1NkR3SGZIcTJhdWViemVHQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZteHZNK3U1eDdHWGJLYzAwMGdnbjRRTkNFQkFLNzJzbTBHcmk5a2J4S1pwd2xWQm53cTNaSEZwR01IMElBSVFnZitvYUptb0E1RG1EQ2VuM1FvSGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM4LCJhZHZTZWNyZXRLZXkiOiJIWU9xVmFGUTN5c0FJYmlZSk9nK1VrQTVST3c5cGNpSjM1U1lqaXBoTko4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc2OTkwMjU0M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5MDIyQTJDRkE5RDM3QUU1MjBGODY5QkMyQTkwNTU4OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyNTEyNTIyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ0TTZvY1Y5Y1JHS3JhMGs0NDFKWXpnIiwicGhvbmVJZCI6IjQ1MzYxY2UzLWYwNzUtNDg0YS1iN2JiLWU0N2Q3NDg5NzRhMCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjZjlwRkFEaVJyM0dEdUd5NXZ3Uzh4Y2xTeUE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL0tpaW1pWXlaeUhFeWZJbTV1cktZanM2cHVNPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZSRURFWlJBIiwibWUiOnsiaWQiOiIyNTQ3Njk5MDI1NDM6NTJAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI3NzgzODIxMjQxOTc4MDo1MkBsaWQiLCJuYW1lIjoi4qCA4oOdIOKggOKDnSDioIDig50g4qCA4oOdUk7ioIDig50g4qCA4oOdIOKggOKDnSDioIDig53jhaQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09yeTY3NEVFUEh2MU1NR0dCY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Im5xRlpYY3BkUjFVRmhySTVxU29oMW54RTVOMTdDQmtma294a1BmOGlmMU09IiwiYWNjb3VudFNpZ25hdHVyZSI6IjZNektYSWFDaTR5dDRCdVpvM081dmRHT0RyQXRmWFdxMzloNGZiejg1Kyt0RGx1aTZScDh3dEpnTmE4RjFycFJvYTVuVzNobTgycWdGUFZCMFFPeEJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrdXh1bCt0dGM2c0FHNUFQRzg2dWI3OUwxMS9EYWNWUGZ6dmVxcWgwUkxhSFAxU0c4SS9IMTJaUEp4cVo4K0xZMXY4ejJibDVsV3FNZDFrTDVnYmRqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDc2OTkwMjU0Mzo1MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJaNmhXVjNLWFVkVkJZYXlPYWtxSWRaOFJPVGRld2daSDVLTVpEMy9JbjlUIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTBJQ0E9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTI1MTI1MTMsImxhc3RQcm9wSGFzaCI6IjFLNGhINCIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSElNIn0=',
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
