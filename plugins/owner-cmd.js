const _0x5dcb0e=_0x5ca5;function _0x5b3a(){const _0x5a78c7=['broadcast','🖼️\x20Profile\x20picture\x20updated\x20successfully!','❌\x20Please\x20reply\x20to\x20the\x20user\x20you\x20want\x20to\x20block.','message','📝\x20*Group\x20JIDs:*\x0a\x0a','🚫\x20User\x20','\x20unblocked\x20successfully.','setpp','103225icymnQ','join','11426yzURWo','../lib/functions','27SJyiDI','Broadcast\x20a\x20message\x20to\x20all\x20groups.','10695860vbDeSl','Clear\x20all\x20chats\x20from\x20the\x20bot.','user','unblock','Get\x20the\x20list\x20of\x20JIDs\x20for\x20all\x20groups\x20the\x20bot\x20is\x20part\x20of.','Unblock\x20a\x20user.','❌\x20Please\x20reply\x20to\x20an\x20image.','Block\x20a\x20user.','tools','Get\x20the\x20bot\x27s\x20JID.','length','clearchats','shutdown','❌\x20Error\x20updating\x20profile\x20picture:\x20','1736088lCRbZK','modifyChat','🤖\x20*Bot\x20JID:*\x20','downloadMediaMessage','234451vVCKWo','186291ZZTnPb','updateBlockStatus','log','block','owner','78JntQDD','sender','\x20blocked\x20successfully.','3021732XMWSRC','❌\x20Error\x20unblocking\x20user:\x20','updateProfilePicture','❌\x20You\x20are\x20not\x20the\x20owner!','116IgsiFC','Shutdown\x20the\x20bot','✅\x20User\x20','chats','🧹\x20All\x20chats\x20cleared\x20successfully!','child_process','❌\x20Error\x20blocking\x20user:\x20','groupFetchAllParticipating'];_0x5b3a=function(){return _0x5a78c7;};return _0x5b3a();}function _0x5ca5(_0x288721,_0x4616a1){const _0x5b3a57=_0x5b3a();return _0x5ca5=function(_0x5ca5ec,_0x17b4a7){_0x5ca5ec=_0x5ca5ec-0xdc;let _0x47a1f0=_0x5b3a57[_0x5ca5ec];return _0x47a1f0;},_0x5ca5(_0x288721,_0x4616a1);}(function(_0x48e7f0,_0x3f21e2){const _0x5cd65e=_0x5ca5,_0x519987=_0x48e7f0();while(!![]){try{const _0x37b3da=parseInt(_0x5cd65e(0xfa))/0x1*(parseInt(_0x5cd65e(0xf8))/0x2)+parseInt(_0x5cd65e(0x10f))/0x3+parseInt(_0x5cd65e(0xe6))/0x4*(parseInt(_0x5cd65e(0xf6))/0x5)+-parseInt(_0x5cd65e(0xdf))/0x6*(-parseInt(_0x5cd65e(0x10e))/0x7)+-parseInt(_0x5cd65e(0x10a))/0x8+parseInt(_0x5cd65e(0xe2))/0x9+-parseInt(_0x5cd65e(0xfc))/0xa;if(_0x37b3da===_0x3f21e2)break;else _0x519987['push'](_0x519987['shift']());}catch(_0x51ad23){_0x519987['push'](_0x519987['shift']());}}}(_0x5b3a,0x4925d));const {cmd,commands}=require('../lib/command'),{exec}=require(_0x5dcb0e(0xeb)),{sleep}=require(_0x5dcb0e(0xf9));cmd({'pattern':_0x5dcb0e(0x108),'desc':_0x5dcb0e(0xe7),'category':_0x5dcb0e(0x104),'filename':__filename},async(_0x48bcec,_0x1c331b,_0x119995,{from:_0x42c0cd,quoted:_0x5a8ad3,body:_0x21821f,isCmd:_0xec422,command:_0x589485,args:_0x24b0ee,q:_0x1463a7,isGroup:_0x3af112,sender:_0x5f46b5,senderNumber:_0x38bc30,botNumber2:_0x392a76,botNumber:_0x126049,pushname:_0x47c764,isMe:_0x36e312,isOwner:_0x59e8a3,groupMetadata:_0x11a6a1,groupName:_0x1d6d87,participants:_0x4f8079,groupAdmins:_0x1ddf34,isBotAdmins:_0x32cf5d,isAdmins:_0x580ac,reply:_0x2cdf93})=>{const _0x2a7c5b=_0x5dcb0e;try{if(!_0x59e8a3)return _0x2cdf93('❌\x20You\x20are\x20not\x20the\x20owner!');const {exec:_0x518a75}=require('child_process');_0x2cdf93('Shutting\x20down...'),await sleep(0x5dc),_0x518a75('pm2\x20stop\x20all');}catch(_0x5a5958){console[_0x2a7c5b(0xdc)](_0x5a5958),_0x2cdf93(''+_0x5a5958);}}),cmd({'pattern':_0x5dcb0e(0xee),'desc':_0x5dcb0e(0xfb),'category':_0x5dcb0e(0xde),'react':'📢','filename':__filename},async(_0x3ca314,_0x400527,_0x4e021f,{from:_0x333e7c,isOwner:_0xc87eb0,args:_0xd3b0ac,reply:_0x5b52c4})=>{const _0x5ba3f6=_0x5dcb0e;if(!_0xc87eb0)return _0x5b52c4(_0x5ba3f6(0xe5));if(_0xd3b0ac[_0x5ba3f6(0x106)]===0x0)return _0x5b52c4('📢\x20Please\x20provide\x20a\x20message\x20to\x20broadcast.');const _0x33031b=_0xd3b0ac[_0x5ba3f6(0xf7)]('\x20'),_0x26f2ce=Object['keys'](await _0x3ca314[_0x5ba3f6(0xed)]());for(const _0x1381ee of _0x26f2ce){await _0x3ca314['sendMessage'](_0x1381ee,{'text':_0x33031b},{'quoted':_0x400527});}_0x5b52c4('📢\x20Message\x20broadcasted\x20to\x20all\x20groups.');}),cmd({'pattern':_0x5dcb0e(0xf5),'desc':'Set\x20bot\x20profile\x20picture.','category':_0x5dcb0e(0xde),'react':'🖼️','filename':__filename},async(_0x2fa570,_0x104cee,_0x1e28f0,{from:_0x532227,isOwner:_0x1af600,quoted:_0x2b4b9d,reply:_0x142554})=>{const _0x462b1b=_0x5dcb0e;if(!_0x1af600)return _0x142554(_0x462b1b(0xe5));if(!_0x2b4b9d||!_0x2b4b9d[_0x462b1b(0xf1)])return _0x142554(_0x462b1b(0x102));try{const _0x18d1a8=await _0x2fa570[_0x462b1b(0x10d)](_0x2b4b9d);await _0x2fa570[_0x462b1b(0xe4)](_0x2fa570[_0x462b1b(0xfe)]['jid'],{'url':_0x18d1a8}),_0x142554(_0x462b1b(0xef));}catch(_0xf0df9e){_0x142554(_0x462b1b(0x109)+_0xf0df9e['message']);}}),cmd({'pattern':_0x5dcb0e(0xdd),'desc':_0x5dcb0e(0x103),'category':_0x5dcb0e(0xde),'react':'🚫','filename':__filename},async(_0xd4522a,_0x30d7bc,_0x3a625d,{from:_0x51415f,isOwner:_0x132405,quoted:_0x4cf565,reply:_0xd8cf01})=>{const _0x18caec=_0x5dcb0e;if(!_0x132405)return _0xd8cf01(_0x18caec(0xe5));if(!_0x4cf565)return _0xd8cf01(_0x18caec(0xf0));const _0x4df4e2=_0x4cf565[_0x18caec(0xe0)];try{await _0xd4522a[_0x18caec(0x110)](_0x4df4e2,_0x18caec(0xdd)),_0xd8cf01(_0x18caec(0xf3)+_0x4df4e2+_0x18caec(0xe1));}catch(_0xaf7108){_0xd8cf01(_0x18caec(0xec)+_0xaf7108[_0x18caec(0xf1)]);}}),cmd({'pattern':_0x5dcb0e(0xff),'desc':_0x5dcb0e(0x101),'category':_0x5dcb0e(0xde),'react':'✅','filename':__filename},async(_0x5d9649,_0x3cec16,_0x2ec1c2,{from:_0x1483ad,isOwner:_0x46001e,quoted:_0x32c6a9,reply:_0x8bbbc9})=>{const _0x2ce901=_0x5dcb0e;if(!_0x46001e)return _0x8bbbc9(_0x2ce901(0xe5));if(!_0x32c6a9)return _0x8bbbc9('❌\x20Please\x20reply\x20to\x20the\x20user\x20you\x20want\x20to\x20unblock.');const _0x1de22b=_0x32c6a9[_0x2ce901(0xe0)];try{await _0x5d9649[_0x2ce901(0x110)](_0x1de22b,'unblock'),_0x8bbbc9(_0x2ce901(0xe8)+_0x1de22b+_0x2ce901(0xf4));}catch(_0x31d83b){_0x8bbbc9(_0x2ce901(0xe3)+_0x31d83b[_0x2ce901(0xf1)]);}}),cmd({'pattern':_0x5dcb0e(0x107),'desc':_0x5dcb0e(0xfd),'category':'owner','react':'🧹','filename':__filename},async(_0x212395,_0x231c37,_0x549563,{from:_0x22b288,isOwner:_0x4f82e0,reply:_0xb31258})=>{const _0x375754=_0x5dcb0e;if(!_0x4f82e0)return _0xb31258(_0x375754(0xe5));try{const _0x2c11d1=_0x212395[_0x375754(0xe9)]['all']();for(const _0x257738 of _0x2c11d1){await _0x212395[_0x375754(0x10b)](_0x257738['jid'],'delete');}_0xb31258(_0x375754(0xea));}catch(_0x49331d){_0xb31258('❌\x20Error\x20clearing\x20chats:\x20'+_0x49331d['message']);}}),cmd({'pattern':'jid','desc':_0x5dcb0e(0x105),'category':'owner','react':'🤖','filename':__filename},async(_0x2835a8,_0x1a7913,_0xd542da,{from:_0x41f3e1,isOwner:_0x2a97c1,reply:_0x1852f1})=>{const _0x4fd19b=_0x5dcb0e;if(!_0x2a97c1)return _0x1852f1(_0x4fd19b(0xe5));_0x1852f1(_0x4fd19b(0x10c)+_0x2835a8[_0x4fd19b(0xfe)]['jid']);}),cmd({'pattern':'gjid','desc':_0x5dcb0e(0x100),'category':_0x5dcb0e(0xde),'react':'📝','filename':__filename},async(_0x3f6d16,_0x443dab,_0x5e2cbf,{from:_0x1761d4,isOwner:_0x18fa6a,reply:_0x2aa280})=>{const _0x4d6282=_0x5dcb0e;if(!_0x18fa6a)return _0x2aa280(_0x4d6282(0xe5));const _0x4f88c1=await _0x3f6d16[_0x4d6282(0xed)](),_0x91cbc0=Object['keys'](_0x4f88c1)['join']('\x0a');_0x2aa280(_0x4d6282(0xf2)+_0x91cbc0);});