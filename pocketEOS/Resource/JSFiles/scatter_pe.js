function _sendPeRequest(serialNumber,params,methodName){if(navigator.userAgent=='PocketEosAndroid'){window.DappJsBridge.pushMessage(serialNumber,params,methodName)}else if(navigator.userAgent=='PocketEosIos'){window.webkit.messageHandlers.pushMessage.postMessage({'params':params,'serialNumber':serialNumber,'methodName':methodName})}}function serialNumberFn(){return'serialNumber'+(new Date().getTime()+parseInt(Math.random()*100000000000))}class pefun{constructor(){}requestMsgSignature(params){const serialNumber=serialNumberFn();_sendPeRequest(serialNumber,params,'requestMsgSignature');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}requestSignature(params){const serialNumber=serialNumberFn();_sendPeRequest(serialNumber,params,'requestSignature');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}getAppInfo(){const serialNumber=serialNumberFn();_sendPeRequest(serialNumber,'','getAppInfo');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}walletLanguage(){const serialNumber=serialNumberFn();_sendPeRequest(serialNumber,'','walletLanguage');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}getEosAccount(){const serialNumber=serialNumberFn();_sendPeRequest(serialNumber,'','getEosAccount');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}getWalletWithAccount(){const serialNumber=serialNumberFn();_sendPeRequest(serialNumber,'','getWalletWithAccount');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}getEosBalance(params){const serialNumber=serialNumberFn();const Jparams=JSON.stringify(params);_sendPeRequest(serialNumber,Jparams,'getEosBalance');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}getEosAccountInfo(params){const serialNumber=serialNumberFn();const Jparams=JSON.stringify(params);_sendPeRequest(serialNumber,Jparams,'getEosAccountInfo');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}getTransactionById(params){const serialNumber=serialNumberFn();const Jparams=JSON.stringify(params);_sendPeRequest(serialNumber,Jparams,'getTransactionById');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}pushActions(params){const serialNumber=params.serialNumber;const Jparams=JSON.stringify(params);_sendPeRequest(serialNumber,Jparams,'pushActions');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}pushTransfer(params){const serialNumber=params.serialNumber;const Jparams=JSON.stringify(params);_sendPeRequest(serialNumber,Jparams,'pushTransfer');return new Promise((resolve,reject)=>{window.callbackResult=function(returnSerialNumber,result){if(returnSerialNumber==serialNumber){resolve(JSON.parse(result))}}})}}const pe=new pefun();const Blockchains={EOS:'eos',ETH:'eth',TRX:'trx'};class Network{constructor(_name='',_protocol='https',_host='',_port=0,blockchain=Blockchains.EOS,chainId=''){this.name=_name;this.protocol=_protocol;this.host=_host;this.port=_port;this.blockchain=blockchain;this.chainId=chainId.toString()}static placeholder(){return new Network()}static fromJson(json){const p=Object.assign(Network.placeholder(),json);p.chainId=p.chainId?p.chainId.toString():'';return p}isValid(){return(this.protocol.length&&this.host.length&&this.port)||this.chainId.length};hostport(){return`${this.host}${this.port?':':''}${this.port}`}}const BLOCKCHAIN_SUPPORT='blockchain_support';class Plugin{constructor(_name='',_type=''){this.name=_name;this.type=_type}static placeholder(){return new Plugin()}static fromJson(json){return Object.assign(Plugin.placeholder(),json)}isSignatureProvider(){return this.type===BLOCKCHAIN_SUPPORT}}class PluginRepositorySingleton{constructor(){this.plugins=[]}loadPlugin(plugin){if(!this.plugin(plugin.name))this.plugins.push(plugin)}signatureProviders(){return this.plugins.filter(plugin=>plugin.type===BLOCKCHAIN_SUPPORT)}supportedBlockchains(){return this.signatureProviders().map(plugin=>name)}plugin(name){return this.plugins.find(plugin=>plugin.name===name)}async endorsedNetworks(){return await Promise.all(this.signatureProviders().map(async plugin=>await plugin.getEndorsedNetwork()))}}const PluginRepository=new PluginRepositorySingleton();const throwNoAuth=()=>{};const checkForExtension=(resolve,tries=0)=>{if(tries>20)return;if(window.scatter.isExtension)return resolve(true);setTimeout(()=>checkForExtension(resolve,tries+1),100)};class IdentityPE{constructor(account){this.hash='1df7bb65ad53a9eb89b4327a56b1200f3abaf085ffec00af222b9eb7622b0734';this.publicKey='EOS8NJX2UzUFvbAYH7y1KoZpAAP3zjincBaZnDsuvjQQ4VD1KRLeG';this.name='pocketEOS';this.accounts=[{name:account,authority:'active',blockchain:'eos'}];this.kyc=false}}class Index{constructor(){this.isExtension=true;this.identity=null}loadPlugin(plugin){const noIdFunc=()=>{if(!this.identity)throw new Error('No Identity')};PluginRepository.loadPlugin(plugin);if(plugin.isSignatureProvider()){this[plugin.name]=plugin.signatureProvider(noIdFunc);this[plugin.name+'Hook']=plugin.hookProvider}}async isInstalled(){return new Promise(resolve=>{setTimeout(()=>{resolve(false)},3000);Promise.race([checkForExtension(resolve)])})}async connect(pluginName,options){return new Promise(resolve=>{if(!pluginName||!pluginName.length)throw new Error('You must specify a name for this connection');options=Object.assign({initTimeout:10000,linkTimeout:30000},options);setTimeout(()=>{resolve(false)},options.initTimeout);checkForExtension(resolve)})}disconnect(){}getIdentity(requiredFields){throwNoAuth();return new Promise((resolve,reject)=>{pe.getEosAccount().then((res)=>{var account=res.data;const ids=new IdentityPE(account);this.identity=ids;resolve(ids)})})}getIdentityFromPermissions(){throwNoAuth();return new Promise((resolve,reject)=>{pe.getEosAccount().then((res)=>{var account=res.data;const ids=new IdentityPE(account);this.identity=ids;resolve(ids)})})}forgetIdentity(){throwNoAuth();return new Promise((resolve,reject)=>{this.identity=null;resolve(true)})}authenticate(nonce){throwNoAuth();return new Promise((resolve,reject)=>{pe.getEosAccount().then((res)=>{var account=res.data;const ids=new IdentityPE(account);this.identity=ids;resolve(ids)})})}getArbitrarySignature(publicKey,data,whatfor='',isHash=false){let params={publicKey:publicKey,data:data,whatfor:whatfor,isHash:isHash};return new Promise((resolve,reject)=>{let jsonParams=JSON.stringify(params);let signature;pe.requestMsgSignature(jsonParams).then((res)=>{signature=res.data;resolve(signature)})})}getPublicKey(blockchain){throwNoAuth();return 0}linkAccount(publicKey,network){throwNoAuth();return 0}hasAccountFor(network){throwNoAuth();return 0}suggestNetwork(network){throwNoAuth();return 0}requestTransfer(network,to,amount,options={}){const payload={network,to,amount,options};return 0}requestSignature(payload){throwNoAuth();return 0}createTransaction(blockchain,actions,account,network){throwNoAuth();return 0}}const proxy=(dummy,handler)=>new Proxy(dummy,handler);let cache={};class ScatterEOS extends Plugin{constructor(){super(Blockchains.EOS,BLOCKCHAIN_SUPPORT)}hookProvider(network){return signargs=>{return new Promise(resolve=>{console.log('signargs',JSON.stringify(signargs));throwIfNoIdentity();var result='';var lostresult=pe.requestSignature(JSON.stringify(signargs)).then((res)=>{result=res.data.signData;return''});if(!result)resolve(false);if(result.hasOwnProperty('signatures')){returnedFields=result.returnedFields;let multiSigKeyProvider=args.find(arg=>arg.hasOwnProperty('signProvider'));if(multiSigKeyProvider){result.signatures.push(multiSigKeyProvider.signProvider(signargs.buf,signargs.sign))}resolve(result.signatures)}})}}signatureProvider(...args){const throwIfNoIdentity=args[0];return(network,_eos,_options={})=>{network=Network.fromJson(network);if(!network.isValid()){throw Error.noNetwork();};const httpEndpoint=`${network.protocol}`+'://'+`${network.hostport()}`;const chainId=network.hasOwnProperty('chainId')&&network.chainId.length?network.chainId:_options.chainId;return proxy(_eos({httpEndpoint,chainId}),{get(eosInstance,method){let returnedFields=null;return(...args)=>{if(args.find(arg=>arg.hasOwnProperty('keyProvider')))throw Error.usedKeyProvider();const signProvider=async signargs=>{console.log('signargs',JSON.stringify(signargs));throwIfNoIdentity();const requiredFields=args.find(arg=>arg.hasOwnProperty('requiredFields'))||{requiredFields:{}};var result='';var lostresult=await pe.requestSignature(JSON.stringify(signargs)).then((res)=>{result=res.data.signData;return''});if(!result)return null;if(result.hasOwnProperty('signatures')){returnedFields=result.returnedFields;let multiSigKeyProvider=args.find(arg=>arg.hasOwnProperty('signProvider'));if(multiSigKeyProvider){result.signatures.push(multiSigKeyProvider.signProvider(signargs.buf,signargs.sign))}return result.signatures}return result};return new Promise((resolve,reject)=>{const getOrCache=()=>{const unique=JSON.stringify(Object.assign(_options,{httpEndpoint,chainId}));if(!cache.hasOwnProperty(unique))cache[unique]=_eos(Object.assign(_options,{httpEndpoint,signProvider,chainId}));return cache[unique]};let eos=getOrCache();getOrCache()[method](...args).then(result=>{if(!result.hasOwnProperty('fc')){result=Object.assign(result,{returnedFields});resolve(result);return}const contractProxy=proxy(result,{get(instance,method){if(method==='then')return instance[method];return(...args)=>{return new Promise(async(res,rej)=>{instance[method](...args).then(actionResult=>{res(Object.assign(actionResult,{returnedFields}))}).catch(rej)})}}});resolve(contractProxy)}).catch(error=>reject(error))})}}})}}}function inject(){window.scatter=new Index();window.scatter.loadPlugin(new ScatterEOS());document.dispatchEvent(new CustomEvent('scatterLoaded'))}inject();";document.getElementsByTagName('head')[0].appendChild(script);
