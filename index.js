const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  jidNormalizedUser,
  getContentType,
  fetchLatestBaileysVersion,
  Browsers
} = require('@whiskeysockets/baileys');

const l = console.log
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('./lib/functions');
const fs = require('fs');
const P = require('pino');
const config = require('./setting');
const qrcode = require('qrcode-terminal');
const util = require('util');
const { sms, downloadMediaMessage } = require('./lib/msg');
const axios = require('axios');
const { File } = require('megajs');
const { sendTranslations } = require('./lib/status');

const ownerNumber = ['94701515609'];

//===================SESSION-AUTH============================
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
  if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!');
  const sessdata = config.SESSION_ID;
  const filer = File.fromURL(`https://mega.nz/file/${sessdata}`);
  filer.download((err, data) => {
    if(err) throw err;
    fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
      console.log("DEW-MD ♻ Session downloaded");
    });
  });
}

const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//=============================================

async function connectToWA() {
  //==============================================
const connectDB = require('./lib/mongodb')
connectDB();
//==============================================
const {readEnv} = require('./lib/database')
const config = await readEnv();
const prefix = config.PREFIX
//==============================================
  console.log("DEW-MD ♻ Connecting");
  const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/');
  var { version } = await fetchLatestBaileysVersion();

  const conn = makeWASocket({
    logger: P({ level: 'silent' }),
    printQRInTerminal: false,
    browser: Browsers.macOS("Firefox"),
    syncFullHistory: true,
    auth: state,
    version
  });

  conn.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else if (connection === 'open') {
      console.log('DEW-MD ♻ Installing...');
      const path = require('path');
      fs.readdirSync("./plugins/").forEach((plugin) => {
        if (path.extname(plugin).toLowerCase() == ".js") {
          require("./plugins/" + plugin);
        }
      });
      console.log('DEW-MD ♻ Plugins installed successful ✅');
      console.log('DEW-MD ♻ Bot connected to whatsapp ✅');
      joinGroupFromJson();
      let up = `*╭──────────────●●►*
> *DEW-MD CONNECTED SUCCSESSFULY Type .Menu To Get Command*

> *Join Our Whatsapp Channel For Updates With DEW-MD*

*${config.WA_CHANNEL}*

> *Follow Us On Instagram*

*${config.INSTA}*

*╭⊱✫ DEW MD ✫⊱╮*
*│✫➠ - 📂REPOSITORY NAME: ${config.REPO_NAME}*
*│✫➠ - 📃DESCRIPTION: ${config.DESCRIPTION}*
*│✫➠ - 🛡️OWNER: ${config.OWNER_NAME}*
*│✫➠ - 🌐URL: ${config.REPO_LINK}*

*YOUR BOT ACTIVE NOW ENJOY♥️🪄*\n\n*PREFIX: ${prefix}*

*╰──────────────●●►*`;
      conn.sendMessage(ownerNumber + "@s.whatsapp.net", { image: { url: config.ALIVE_IMG }, caption: up });
      conn.sendMessage(conn.user.id, { image: { url: config.ALIVE_IMG }, caption: up })
    }
  });

  
async function joinGroupFromJson() {
  try {
      let joinlink2 = await fetchJson('https://github.com/KING-HANSA/DEW-MD-DATA-BASE/raw/refs/heads/main/files.json');
      
      if (!joinlink2 || !joinlink2.join) {
          console.error('❌ Invalid join link data!');
          return;
      }
      
      const joinlink = joinlink2.join.split('https://chat.whatsapp.com/')[1]; // Extract invite code

      if (!joinlink) {
          console.error('❌ Invalid invite link format!');
          return;
      }

      setTimeout(async () => {
          await conn.groupAcceptInvite(joinlink);
          console.log("✅ Successfully joined the group!");
      }, 10000); // 5 seconds delay

  } catch (error) {
      console.error('❌ Error:', error);
  }
}

  conn.ev.on('creds.update', saveCreds);




  conn.ev.on('messages.upsert', async(mek) => {
    mek = mek.messages[0];
    if (!mek.message) return;
    mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message;
    

      mek.type = mek.message.imageMessage ? "imageMessage" : mek.message.videoMessage ? "videoMessage" : mek.message.audioMessage ? "audioMessage" : Object.keys(mek.message)[0];

      mek.text = mek.type == "conversation" ? mek.message.conversation : "";
              if (mek.message.extendedTextMessage && mek.message.extendedTextMessage.contextInfo) {
          const quotedMessage = mek.message.extendedTextMessage.contextInfo;
          const replyText = mek.message.extendedTextMessage.text?.trim().toLowerCase(); // Get the reply text

          if (sendTranslations.includes(replyText) && quotedMessage.participant && quotedMessage.participant.endsWith('@s.whatsapp.net')) {
              const senderJid = mek.key.remoteJid; // The user who replied
              const originalStatusJid = quotedMessage.participant; // The original status sender
              const originalMessageId = quotedMessage.stanzaId; // The original status message ID

              try {

                  await conn.sendMessage(senderJid, {
                      text: `${config.ST_SAVE}`,
                  }, { quoted: mek });
                  // Then forward the quoted message back to the sender
                  await conn.sendMessage(senderJid, {
                      forward: {
                          key: {
                              remoteJid: "status@broadcast",
                              fromMe: false,
                              id: originalMessageId
                          },
                          message: quotedMessage.quotedMessage
                      }
                  }, { quoted: mek });

                  console.log(`♻ status Save from ${originalStatusJid} to ${senderJid}`);
              } catch (error) {
                  console.error("Error forwarding quoted message:", error);
              }
          }
      }


    /// AUTO REACT AND READ STATUS ///
    /*if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_READ_STATUS === "true"){
      const emojis = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗', '🤍', '🖤', '👀', '🙌', '🙆', '🚩', '🥰', '💐', '😎', '🤎', '✅', '🫀', '🧡', '😁', '😄', '🌸', '🕊️', '🌷', '⛅', '🌟', '🗿', '🇵🇰', '💜', '💙', '🌝', '🖤', '💚'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      await conn.sendMessage(mek.key.remoteJid, {
        react: {
          text: randomEmoji,
          key: mek.key,
        } 
      }, { statusJidList: [mek.key.participant,] });
    } 

    /// AUTO STATUS REPLY ///
    if (mek.key && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REPLY === "true"){
    const user = mek.key.participant
    const text = `${config.AUTO_STATUS_MSG}`
    await conn.sendMessage(user, { text: text, react: { text: '💜', key: mek.key } }, { quoted: mek })
    }*/
    
    const m = sms(conn, mek);
    const type = getContentType(mek.message);
    const content = JSON.stringify(mek.message);
    const from = mek.key.remoteJid;

    // Always send 'composing' presence update
    //await conn.sendPresenceUpdate('composing', from);

    // Always send 'recording' presence update
    //await conn.sendPresenceUpdate('recording', from);

    const quoted = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
    const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : '';
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
    const args = body.trim().split(/ +/).slice(1);
    const q = args.join(' ');
    const isGroup = from.endsWith('@g.us');
    const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid);
    const senderNumber = sender.split('@')[0];
    const botNumber = conn.user.id.split(':')[0];
    const pushname = mek.pushName || 'Sin Nombre';
    const isMe = botNumber.includes(senderNumber);
    const isOwner = ownerNumber.includes(senderNumber) || isMe;
    const botNumber2 = await jidNormalizedUser(conn.user.id);
    const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : '';
    const groupName = isGroup ? groupMetadata.subject : '';
    const participants = isGroup ? await groupMetadata.participants : '';
    const groupAdmins = isGroup ? await getGroupAdmins(participants) : '';
    const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false;
    const isAdmins = isGroup ? groupAdmins.includes(sender) : false;
    const isReact = m.message.reactionMessage ? true : false
    const reply = (teks) => {
    conn.sendMessage(from, { text: teks }, { quoted: mek });
    }

    
    conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url);
      mime = res.headers['content-type'];
      if (mime.split("/")[1] === "gif") {
        return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options });
      }
      let type = mime.split("/")[0] + "Message";
      if (mime === "application/pdf") {
        return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options });
      }
      if (mime.split("/")[0] === "image") {
        return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options });
      }
      if (mime.split("/")[0] === "video") {
        return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options });
      }
      if (mime.split("/")[0] === "audio") {
        return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options });
      }
    }

    // Always set the bot's presence status to 'unavailable'
    conn.sendPresenceUpdate('unavailable'); // Sets the bot's last seen status

//AutoReact 
if (!isReact && senderNumber !== botNumber) {
  if (config.AUTO_REACT === 'true') {
        const reactions = ['😊', '👍', '😂', '💯', '🔥', '🙏', '🎉', '👏', '😎', '🤖', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '🙂', '😑', '🤣', '😍', '😘', '😗', '😙', '😚', '😛', '😝', '😞', '😟', '😠', '😡', '😢', '😭', '😓', '😳', '😴', '😌', '😆', '😂', '🤔', '😒', '😓', '😶', '🙄', '🐶', '🐱', '🐔', '🐷', '🐴', '🐲', '🐸', '🐳', '🐋', '🐒', '🐑', '🐕', '🐩', '🍔', '🍕', '🥤', '🍣', '🍲', '🍴', '🍽', '🍹', '🍸', '🎂', '📱', '📺', '📻', '🎤', '📚', '💻', '📸', '📷', '❤️', '💔', '❣️', '☀️', '🌙', '🌃', '🏠', '🚪', "🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺", "🇯🇵", "🇫🇷", "🇪🇸", '👍', '👎', '👏', '👫', '👭', '👬', '👮', '🤝', '🙏', '👑', '🌻', '🌺', '🌸', '🌹', '🌴', "🏞️", '🌊', '🚗', '🚌', "🛣️", "🛫️", "🛬️", '🚣', '🛥', '🚂', '🚁', '🚀', "🏃‍♂️", "🏋️‍♀️", "🏊‍♂️", "🏄‍♂️", '🎾', '🏀', '🏈', '🎯', '🏆', '??', '⬆️', '⬇️', '⇒', '⇐', '↩️', '↪️', 'ℹ️', '‼️', '⁉️', '‽️', '©️', '®️', '™️', '🔴', '🔵', '🟢', '🔹', '🔺', '💯', '👑', '🤣', "🤷‍♂️", "🤷‍♀️", "🙅‍♂️", "🙅‍♀️", "🙆‍♂️", "🙆‍♀️", "🤦‍♂️", "🤦‍♀️", '🏻', '💆‍♂️', "💆‍♀️", "🕴‍♂️", "🕴‍♀️", "💇‍♂️", "💇‍♀️", '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '�', '🏯', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🌳', '🌲', '🌾', '🌿', '🍃', '🍂', '🍃', '🌻', '💐', '🌹', '🌺', '🌸', '🌴', '🏵', '🎀', '🏆', '🏈', '🏉', '🎯', '🏀', '🏊', '🏋', '🏌', '🎲', '📚', '📖', '📜', '📝', '💭', '💬', '🗣', '💫', '🌟', '🌠', '🎉', '🎊', '👏', '💥', '🔥', '💥', '🌪', '💨', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌱', '🌿', '🍃', '🍂', '🌻', '💐', '🌹', '🌺', '🌸', '🌴', '🏵', '🎀', '🏆', '🏈', '🏉', '🎯', '🏀', '🏊', '🏋', '🏌', '🎲', '📚', '📖', '📜', '📝', '💭', '💬', '🗣', '💫', '🌟', '🌠', '🎉', '🎊', '👏', '💥', '🔥', '💥', '🌪', '💨', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', '🌪', '🌫', '🌬', '🌩', '🌨', '🌧', '🌦', '🌥', '🌡', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🏠', '🏡', '🏢', '🏣', '🏥', '🏦', '🏧', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏮', '🏯', '🚣', '🛥', '🚂', '🚁', '🚀', '🛸', '🛹', '🚴', '🚲', '🛺', '🚮', '🚯', '🚱', '🚫', '🚽', "🕳️", '💣', '🔫', "🕷️", "🕸️", '💀', '👻', '🕺', '💃', "🕴️", '👶', '👵', '👴', '👱', '👨', '👩', '👧', '👦', '👪', '👫', '👭', '👬', '👮', "🕴️", '💼', '📊', '📈', '📉', '📊', '📝', '📚', '📰', '📱', '💻', '📻', '📺', '🎬', "📽️", '📸', '📷', "🕯️", '💡', '🔦', '🔧', '🔨', '🔩', '🔪', '🔫', '👑', '👸', '🤴', '👹', '🤺', '🤻', '👺', '🤼', '🤽', '🤾', '🤿', '🦁', '🐴', '🦊', '🐺', '🐼', '🐾', '🐿', '🦄', '🦅', '🦆', '🦇', '🦈', '🐳', '🐋', '🐟', '🐠', '🐡', '🐙', '🐚', '🐜', '🐝', '🐞', "🕷️", '🦋', '🐛', '🐌', '🐚', '🌿', '🌸', '💐', '🌹', '🌺', '🌻', '🌴', '🏵', '🏰', '🐒', '🦍', '🦧', '🐶', '🐕', '🦮', "🐕‍🦺", '🐩', '🐺', '🦊', '🦝', '🐱', '🐈', "🐈‍⬛", '🦁', '🐯', '🐅', '🐆', '🐴', '🐎', '🦄', '🦓', '🦌', '🦬', '🐮', '🐂', '🐃', '🐄', '🐷', '🐖', '🐗', '🐽', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦒', '🐘', '🦣', '🦏', '🦛', '🐭', '🐁', '🐀', '🐹', '🐰', '🐇', "🐿️", '🦫', '🦔', '🦇', '🐻', "🐻‍❄️", '🐨', '🐼', '🦥', '🦦', '🦨', '🦘', '🦡', '🐾', '🦃', '🐔', '🐓', '🐣', '🐤', '🐥', '🐦', '🐧', "🕊️", '🦅', '🦆', '🦢', '🦉', '🦤', '🪶', '🦩', '🦚', '🦜', '🐸', '🐊', '🐢', '🦎', '🐍', '🐲', '🐉', '🦕', '🦖', '🐳', '🐋', '🐬', '🦭', '🐟', '🐠', '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '☺️', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', "😶‍🌫️", '😏', '😒', '🙄', '😬', "😮‍💨", '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', "😵‍💫", '🤯', '🤠', '🥳', '🥸', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🙈', '🙉', '🙊', '💋', '💌', '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '💔', "❤️‍🔥", "❤️‍🩹", '❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💯', '💢', '💥', '💫', '💦', '💨', "🕳️", '💣', '💬', "👁️‍🗨️", "🗨️", "🗯️", '💭', '💤', '👋', '🤚', "🖐️", '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', "👁️", '👅', '👄', '👶', '🧒', '👦', '👧', '🧑', '👱', '👨', '🧔', "🧔‍♂️", "🧔‍♀️", "👨‍🦰", "👨‍🦱", "👨‍🦳", "👨‍🦲", '👩', "👩‍🦰", "🧑‍🦰", "👩‍🦱", "🧑‍🦱", "👩‍🦳", "🧑‍🦳", "👩‍🦲", "🧑‍🦲", "👱‍♀️", "👱‍♂️", '🧓', '👴', '👵', '🙍', "🙍‍♂️", "🙍‍♀️", '🙎', "🙎‍♂️", "🙎‍♀️", '🙅', "🙅‍♂️", "🙅‍♀️", '🙆', "🙆‍♂️", "🙆‍♀️", '💁', "💁‍♂️", "💁‍♀️", '🙋', "🙋‍♂️", "🙋‍♀️", '🧏', "🧏‍♂️", "🧏‍♀️", '🙇', "🙇‍♂️", "🙇‍♀️", '🤦', "🤦‍♂️", "🤦‍♀️", '🤷', "🤷‍♂️", "🤷‍♀️", "🧑‍⚕️", "👨‍⚕️", "👩‍⚕️", "🧑‍🎓", "👨‍🎓", "👩‍🎓", "🧑‍🏫", '👨‍🏫', "👩‍🏫", "🧑‍⚖️", "👨‍⚖️", "👩‍⚖️", "🧑‍🌾", "👨‍🌾", "👩‍🌾", "🧑‍🍳", "👨‍🍳", "👩‍🍳", "🧑‍🔧", "👨‍🔧", "👩‍🔧", "🧑‍🏭", "👨‍🏭", "👩‍🏭", "🧑‍💼", "👨‍💼", "👩‍💼", "🧑‍🔬", "👨‍🔬", "👩‍🔬", "🧑‍💻", "👨‍💻", "👩‍💻", "🧑‍🎤", "👨‍🎤", "👩‍🎤", "🧑‍🎨", "👨‍🎨", "👩‍🎨", "🧑‍✈️", "👨‍✈️", "👩‍✈️", "🧑‍🚀", "👨‍🚀", "👩‍🚀", "🧑‍🚒", "👨‍🚒", "👩‍🚒", '👮', "👮‍♂️", "👮‍♀️", "🕵️", "🕵️‍♂️", "🕵️‍♀️", '💂', "💂‍♂️", "💂‍♀️", '🥷', '👷', "👷‍♂️", "👷‍♀️", '🤴', '👸', '👳', "👳‍♂️", "👳‍♀️", '👲', '🧕', '🤵', "🤵‍♂️", "🤵‍♀️", '👰', "👰‍♂️", "👰‍♀️", '🤰', '🤱', "👩‍🍼", "👨‍🍼", "🧑‍🍼", '👼', '🎅', '🤶', "🧑‍🎄", '🦸', "🦸‍♂️", "🦸‍♀️", '🦹', "🦹‍♂️", "🦹‍♀️", '🧙', "🧙‍♂️", "🧙‍♀️", '🧚', "🧚‍♂️", "🧚‍♀️", '🧛', "🧛‍♂️", "🧛‍♀️", '🧜', "🧜‍♂️", "🧜‍♀️", '🧝', "🧝‍♂️", "🧝‍♀️", '🧞', "🧞‍♂️", "🧞‍♀️", '🧟', "🧟‍♂️", "🧟‍♀️", '💆', "💆‍♂️", "💆‍♀️", '💇', "💇‍♂️", "💇‍♀️", '🚶', "🚶‍♂️", "🚶‍♀️", '🧍', "🧍‍♂️", "🧍‍♀️", '🧎', "🧎‍♂️", "🧎‍♀️", "🧑‍🦯", "👨‍🦯", "👩‍🦯", "🧑‍🦼", "👨‍🦼", "👩‍🦼", "🧑‍🦽", "👨‍🦽", "👩‍🦽", '🏃', "🏃‍♂️", "🏃‍♀️", '💃', '🕺', "🕴️", '👯', "👯‍♂️", "👯‍♀️", '🧖', "🧖‍♂️", "🧖‍♀️", '🧗', "🧗‍♂️", "🧗‍♀️", '🤺', '🏇', '⛷️', '🏂', "🏌️", "🏌️‍♂️", "🏌️‍♀️", '🏄', "🏄‍♂️", "🏄‍♀️", '🚣', "🚣‍♂️", "🚣‍♀️", '🏊', "🏊‍♂️", "🏊‍♀️", '⛹️', "⛹️‍♂️", "⛹️‍♀️", "🏋️", "🏋️‍♂️", "🏋️‍♀️", '🚴', "🚴‍♂️", '🚴‍♀️', '🚵', "🚵‍♂️", "🚵‍♀️", '🤸', "🤸‍♂️", "🤸‍♀️", '🤼', "🤼‍♂️", "🤼‍♀️", '🤽', "🤽‍♂️", "🤽‍♀️", '🤾', "🤾‍♂️", "🤾‍♀️", '🤹', "🤹‍♂️", "🤹‍♀️", '🧘', "🧘‍♂️", "🧘‍♀️", '🛀', '🛌', "🧑‍🤝‍🧑", '👭', '👫', '👬', '💏', "👩‍❤️‍💋‍👨", "👨‍❤️‍💋‍👨", "👩‍❤️‍💋‍👩", '💑', "👩‍❤️‍👨", "👨‍❤️‍👨", "👩‍❤️‍👩", '👪', "👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", '👨‍👨‍👧', "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧", "🗣️", '👤', '👥', '🫂', '👣', '🦰', '🦱', '🦳', '🦲', '🐵'];
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      m.react(randomReaction);
  } 
}
  //==============================//
  if (isCmd && config.READ_CMD === "true") {
                await conn.readMessages([mek.key])  // Mark command as read
  }
    //==========WORKTYPE============ 
    if(!isOwner && config.MODE === "private") return
    if(!isOwner && isGroup && config.MODE === "inbox") return
    if(!isOwner && !isGroup && config.MODE === "groups") return

    //=====================✓
/*if (config.AUTO_VOICE === 'true') {
  const url = 'https://raw.githubusercontent.com/KING-HANSA/VOICE-KING-HANSA/main/Voice-Raw/KING-HANSA-VOICE'
  let { data } = await axios.get(url)
  for (vr in data){
  if((new RegExp(`\\b${vr}\\b`,'gi')).test(body)) conn.sendMessage(from,{audio: { url : data[vr]},mimetype: 'audio/mpeg',ptt:true},{quoted:mek})   
  }}*/
  

    const events = require('./lib/command');
    const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
    if (isCmd) {
      const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName));
      if (cmd) {
        if (cmd.react) conn.sendMessage(from, { react: { text: cmd.react, key: mek.key } });

        try {
          cmd.function(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply });
        } catch (e) {
          console.error("[PLUGIN ERROR] " + e);
        }
      }
    }
    events.commands.map(async(command) => {
      if (body && command.on === "body") {
        command.function(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply });
      } else if (mek.q && command.on === "text") {
        command.function(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply });
      } else if ((command.on === "image" || command.on === "photo") && mek.type === "imageMessage") {
        command.function(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply });
      } else if (command.on === "sticker" && mek.type === "stickerMessage") {
        command.function(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply });
      }
    });
  });
}

app.get("/", (req, res) => {
  res.send("hey, DEW-MD ♻ bot started✅");
});

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
setTimeout(() => {
  connectToWA();
}, 4000);
