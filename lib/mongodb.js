const mongoose = require('mongoose');
const config = require('../setting');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    /// INPORTAINS TOOLS ///
    { key: 'BOT_URL', value: 'https://raw.githubusercontent.com/KING-HANSA/DEW-MD-DATA-BASE/refs/heads/main/files.json'},
    { key: 'VOICE_URL', value: 'https://github.com/KING-HANSA/DEW-MD-DATA-BASE/raw/refs/heads/main/Voice-Raw/KING-HANSA-VOICE' },
    { key: 'REPLY_URL', value: 'https://raw.githubusercontent.com/KING-HANSA/DEW-MD-DATA-BASE/refs/heads/main/Auto-Reply/auto_reply.json' },
    { key: 'ALIVE_IMG', value: 'https://i.ibb.co/HLZvhfdq/DEW-MD.jpg' },
    { key: 'PREFIX', value: '.' },
    { key: 'MODE', value: 'public' },
    { key: 'LANG', value: 'SI' },
    { key: 'REPO_NAME', value: 'DEW-MD' },
    { key: 'DESCRIPTION', value: 'SRI LANKAN AI BOT' },
    { key: 'OWNER_NUMBER', value: '94701515609' },
    { key: 'OWNER_NAME', value: 'Hansa Dewmina' },
    { key: 'ALWAYS_ONLINE', value: 'true' },
    { key: 'IMAGE_LIMIT', value: '3' },
    { key: 'PUBLIC_MODE', value: 'true' },
    { key: 'READ_CMD', value: 'true' },
    { key: 'ST_SAVE', value: 'DEW-MD-STATUS-SERVER' },
    { key: 'BIO_TEXT', value: 'DEW-MD-BY-HANSA-DEWMINA' },
    /// AUTO WORKING ENV ///
    { key: 'AUTO_BIO', value: 'true' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'AUTO_VOICE', value: 'true' },
    { key: 'AUTO_STICKER', value: 'true' },
    { key: 'AUTO_REPLY', value: 'true' },
    { key: 'AUTO_REACT_STATUS', value: 'true' },
    { key: 'AUTO_STATUS_REPLY', value: 'true' },
    { key: 'AUTO_REACT', value: 'false' },
    { key: 'AUTO_TYPING', value: 'true' },
    { key: 'AUTO_RECORDING', value: 'true' },
    /// OTHER ENV ///
    { key: 'AUTO_STATUS_MSG', value: '*`ඔයාගේ ස්ටේටස් එක මම තමයි මුලින්ම බැලුවෙ`* _*POWERD BY*_ *DEW-MD Whtsapp Bot*' },
    { key: 'FOOTER', value: 'DEW-MD 💚' },
    { key: 'COPYRIGHT', value: '㋛ DEW-MD BY HANSA DEWMINA' },
    { key: 'VERSION', value: '1.0.1'},
    { key: 'REPO_LINK', value: 'https://github.com/KING-HANSA/DEW-MD-BETA-TEST'},
    { key: 'WA_CHANNEL', value: 'https://whatsapp.com/channel/0029Vb2bFCq0LKZGEl4xEe2G'},
    { key: 'INSTA', value: 'https://Instagram.com/hansa_dewmina_lk'},
    { key: 'ANTI_BAD', value: 'true' },
    { key: 'ANTI_LINK', value: 'true' },
    /// IMAGE ENV ///
    { key: 'OWNER_IMG', value: 'https://qu.ax/MMlLY.jpg' },
    { key: 'CONVERT_IMG', value: 'https://qu.ax/SyqfJ.jpg' },
    { key: 'AI_IMG', value: 'https://i.ibb.co/hgf2p9M/repository-open-graph-templatefdf.png' },
    { key: 'SEARCH_IMG', value: 'https://i.ibb.co/hgf2p9M/repository-open-graph-templatefdf.png' },
    { key: 'DOWNLOAD_IMG', value: 'https://qu.ax/UpjDa.jpg' },
    { key: 'MAIN_IMG', value: 'https://qu.ax/hUnPh.jpg' },
    { key: 'GROUP_IMG', value: 'https://qu.ax/LsyNC.jpg' },
    { key: 'FUN_IMG', value: 'https://i.ibb.co/hgf2p9M/repository-open-graph-templatefdf.png' },
    { key: 'TOOLS_IMG', value: 'https://qu.ax/uiNZo.jpg' },
    { key: 'OTHER_IMG', value: 'https://i.ibb.co/hgf2p9M/repository-open-graph-templatefdf.png' },
];

// MongoDB connection function
const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('🛜 MongoDB Connected ✅');

        // Check and create default environment variables
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                // Create new environment variable with default value
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
