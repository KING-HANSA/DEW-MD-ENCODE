const _0x5e6fd5=_0x14da;(function(_0x1e991f,_0x17ff60){const _0x5d3bb5=_0x14da,_0x40800f=_0x1e991f();while(!![]){try{const _0x6f434=-parseInt(_0x5d3bb5(0x1e1))/0x1+-parseInt(_0x5d3bb5(0x1f3))/0x2+parseInt(_0x5d3bb5(0x1b2))/0x3*(-parseInt(_0x5d3bb5(0x1bd))/0x4)+-parseInt(_0x5d3bb5(0x1b7))/0x5+parseInt(_0x5d3bb5(0x1ef))/0x6*(-parseInt(_0x5d3bb5(0x1b5))/0x7)+parseInt(_0x5d3bb5(0x1e8))/0x8*(parseInt(_0x5d3bb5(0x1e9))/0x9)+parseInt(_0x5d3bb5(0x1c2))/0xa;if(_0x6f434===_0x17ff60)break;else _0x40800f['push'](_0x40800f['shift']());}catch(_0xe02acb){_0x40800f['push'](_0x40800f['shift']());}}}(_0xfc36,0xd876e));const axios=require(_0x5e6fd5(0x1c9)),FormData=require(_0x5e6fd5(0x1b6)),fs=require('fs'),os=require('os'),path=require(_0x5e6fd5(0x1f5)),{cmd,commands}=require(_0x5e6fd5(0x1bc)),{readEnv}=require('../lib/database'),{Sticker,StickerTypes}=require(_0x5e6fd5(0x1bb)),{getRandom}=require(_0x5e6fd5(0x1be)),config=require(_0x5e6fd5(0x1f2));cmd({'pattern':_0x5e6fd5(0x1e4),'alias':['imgurl',_0x5e6fd5(0x1d7)],'react':'♻','desc':'Download\x20anime\x20maid\x20images.','category':_0x5e6fd5(0x1c5),'use':'.maid','filename':__filename},async(_0x31bc9f,_0x5db9b7,_0x324b9f,{from:_0x1fd97d,mnu:_0x150695,quoted:_0xe6ae9e,body:_0x18a0b9,isCmd:_0x57b03a,command:_0x2aa9c7,args:_0x866d1,q:_0x2ff222,isGroup:_0x4ad9b4,sender:_0x474c32,senderNumber:_0x23157c,botNumber2:_0x59bab7,botNumber:_0x237547,pushname:_0x1c897e,isMe:_0x3ec6a9,isOwner:_0x4694d2,groupMetadata:_0x38bf70,groupName:_0x56d4fb,participants:_0x466cfe,groupAdmins:_0x5e280d,isBotAdmins:_0x16dabe,isAdmins:_0x3f646e,reply:_0x4bf550})=>{const _0x1e50f1=_0x5e6fd5;try{const _0x318f21=await readEnv();let _0x1ee71c=_0x324b9f[_0x1e50f1(0x1c1)]?_0x324b9f[_0x1e50f1(0x1c1)]:_0x324b9f,_0x11fd95=(_0x1ee71c['msg']||_0x1ee71c)[_0x1e50f1(0x1df)]||'';if(!_0x11fd95)throw'_`Reply\x20A\x20Image\x20To\x20Url`_';let _0x722fa9=await _0x1ee71c[_0x1e50f1(0x1eb)](),_0x1922c0=path[_0x1e50f1(0x1f4)](os[_0x1e50f1(0x1cb)](),_0x1e50f1(0x1e0));fs[_0x1e50f1(0x1b3)](_0x1922c0,_0x722fa9);let _0xddbf8d=new FormData();_0xddbf8d[_0x1e50f1(0x1ed)](_0x1e50f1(0x1cf),fs[_0x1e50f1(0x1d9)](_0x1922c0));let _0x2ba369=await axios[_0x1e50f1(0x1d0)](_0x1e50f1(0x1f1),_0xddbf8d,{'headers':{..._0xddbf8d[_0x1e50f1(0x1e7)]()}});if(!_0x2ba369['data']||!_0x2ba369['data'][_0x1e50f1(0x1da)]||!_0x2ba369[_0x1e50f1(0x1da)][_0x1e50f1(0x1da)][_0x1e50f1(0x1db)])throw _0x1e50f1(0x1f0);let _0xf66914=_0x2ba369[_0x1e50f1(0x1da)][_0x1e50f1(0x1da)]['url'];fs['unlinkSync'](_0x1922c0),_0x324b9f[_0x1e50f1(0x1d2)](_0x1e50f1(0x1d6)+_0x722fa9[_0x1e50f1(0x1dc)]+'\x20Byte(s)\x0a🪀\x20*`File\x20Url`*\x20'+_0xf66914+_0x1e50f1(0x1b9)+_0x318f21[_0x1e50f1(0x1ba)]+'*');}catch(_0x146baa){_0x4bf550(''+_0x146baa),console[_0x1e50f1(0x1c8)](_0x146baa);}});var imgmsg='';if(config[_0x5e6fd5(0x1d8)]==='SI')imgmsg=_0x5e6fd5(0x1ec);else imgmsg=_0x5e6fd5(0x1b4);var descg='';if(config['LANG']==='SI')descg=_0x5e6fd5(0x1d5);else descg=_0x5e6fd5(0x1c7);function _0xfc36(){const _0xd4a99=['download','ඡායාරූපයකට\x20mention\x20දෙන්න!','append','stic','1956yRQGOl','❌\x20Error\x20al\x20subir\x20el\x20archivo','https://api.imgbb.com/1/upload?key=02b01525bdac411947ab8d1e2cd90a68','../setting','1957742OJlrQF','join','path','9JTnGyy','writeFileSync','ʀᴇᴘʟʏ\x20ᴛᴏ\x20ᴀ\x20ᴘʜᴏᴛᴏ\x20ғᴏʀ\x20sᴛɪᴄᴋᴇʀ!','29365yevQQp','form-data','5156980fpulut','stickerMessage','\x0a\x0a*','COPYRIGHT','wa-sticker-formatter','../lib/command','738256wqWMie','../lib/functions','.jpg','.sticker\x20<Reply\x20to\x20image>','quoted','63613690lxflUP','promises','type','anime','.webp','ɪᴛ\x20ᴄᴏɴᴠᴇʀᴛs\x20ʏᴏᴜʀ\x20ʀᴇᴘʟɪᴇᴅ\x20ᴘʜᴏᴛᴏ\x20ᴛᴏ\x20sᴛɪᴄᴋᴇʀ.','log','axios','FULL','tmpdir','convert','🤹‍♀️','writeFile','image','post','imageMessage','reply','sendMessage','includes','එය\x20ඔබගේ\x20mention\x20දුන්\x20ඡායාරූපය\x20ස්ටිකර්\x20බවට\x20පරිවර්තනය\x20කරයි.','🪀\x20*`File\x20Size`*\x20','img2url','LANG','createReadStream','data','url','length','transparent','--crop','mimetype','my_data','1724855YOkCjo','12345','toBuffer','tourl','CROPPED','error','getHeaders','24SGcmlA','544959wfmaHt','msg'];_0xfc36=function(){return _0xd4a99;};return _0xfc36();}function _0x14da(_0xf55096,_0xdcb116){const _0xfc36a1=_0xfc36();return _0x14da=function(_0x14da44,_0x5720a6){_0x14da44=_0x14da44-0x1b2;let _0x462f03=_0xfc36a1[_0x14da44];return _0x462f03;},_0x14da(_0xf55096,_0xdcb116);}cmd({'pattern':'sticker','react':_0x5e6fd5(0x1cd),'alias':['s',_0x5e6fd5(0x1ee)],'desc':descg,'category':_0x5e6fd5(0x1cc),'use':_0x5e6fd5(0x1c0),'filename':__filename},async(_0x498858,_0x43884a,_0x54c6a2,{from:_0xb018c7,reply:_0x1898b8,isCmd:_0x3dc5e8,command:_0x1e194b,args:_0x5b38b9,q:_0x26b836,isGroup:_0x182163,pushname:_0x13862b})=>{const _0xe9644b=_0x5e6fd5;try{const _0x5a61db=_0x54c6a2[_0xe9644b(0x1c1)]&&(_0x54c6a2[_0xe9644b(0x1c1)]['type']===_0xe9644b(0x1d1)||_0x54c6a2[_0xe9644b(0x1c1)][_0xe9644b(0x1c4)]==='viewOnceMessage'&&_0x54c6a2[_0xe9644b(0x1c1)][_0xe9644b(0x1ea)]['type']===_0xe9644b(0x1d1)),_0x2ad262=_0x54c6a2[_0xe9644b(0x1c1)]&&_0x54c6a2['quoted'][_0xe9644b(0x1c4)]===_0xe9644b(0x1b8);if(_0x54c6a2[_0xe9644b(0x1c4)]===_0xe9644b(0x1d1)||_0x5a61db){const _0x564510=getRandom(_0xe9644b(0x1bf)),_0x33d58b=_0x5a61db?await _0x54c6a2['quoted'][_0xe9644b(0x1eb)]():await _0x54c6a2['download']();await require('fs')[_0xe9644b(0x1c3)][_0xe9644b(0x1ce)](_0x564510,_0x33d58b);let _0x63e600=new Sticker(_0x564510,{'pack':_0x13862b,'author':'','type':_0x26b836[_0xe9644b(0x1d4)](_0xe9644b(0x1de))||_0x26b836[_0xe9644b(0x1d4)]('-c')?StickerTypes['CROPPED']:StickerTypes[_0xe9644b(0x1ca)],'categories':['🤩','🎉'],'id':_0xe9644b(0x1e2),'quality':0x4b,'background':_0xe9644b(0x1dd)});const _0x133b3d=await _0x63e600[_0xe9644b(0x1e3)]();return _0x498858[_0xe9644b(0x1d3)](_0xb018c7,{'sticker':_0x133b3d},{'quoted':_0x43884a});}else{if(_0x2ad262){const _0x58d38c=getRandom(_0xe9644b(0x1c6)),_0x2e9bb6=await _0x54c6a2[_0xe9644b(0x1c1)][_0xe9644b(0x1eb)]();await require('fs')[_0xe9644b(0x1c3)][_0xe9644b(0x1ce)](_0x58d38c,_0x2e9bb6);let _0x3b58e0=new Sticker(_0x58d38c,{'pack':_0x13862b,'author':'','type':_0x26b836[_0xe9644b(0x1d4)]('--crop')||_0x26b836[_0xe9644b(0x1d4)]('-c')?StickerTypes[_0xe9644b(0x1e5)]:StickerTypes[_0xe9644b(0x1ca)],'categories':['🤩','🎉'],'id':_0xe9644b(0x1e2),'quality':0x4b,'background':_0xe9644b(0x1dd)});const _0x2a9fcb=await _0x3b58e0[_0xe9644b(0x1e3)]();return _0x498858[_0xe9644b(0x1d3)](_0xb018c7,{'sticker':_0x2a9fcb},{'quoted':_0x43884a});}else return await _0x1898b8(imgmsg);}}catch(_0x428eb0){_0x1898b8('Error\x20!!'),console[_0xe9644b(0x1e6)](_0x428eb0);}});
