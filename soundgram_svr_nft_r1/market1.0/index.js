//import "/node_modules/caver-js-ext-kas/index.js";
import  Caver  from "caver-js-ext-kas";
//import { prepare, request, getResult, getCardList, web2app } from './node_modules/klip-sdk/dist/klipSDK-2.0.1.min.js'
import { prepare, request, getResult, getCardList, web2app } from 'klip-sdk'

//imgs
import "./images/nav_logo.png"
import "./images/ellipsis-icon.6098394b.svg"

import "./js/bootstrap.min.js"
import "./css/bootstrap.min.css";
import "./css/common.css";
import "./css/default.css";

const KlipNftTransaction =require("./KlipNftTransaction");
const security = require("./security");
const axios = require('axios');

const isMobile = Mobile();

const config = {
  accessKeyId: "KASKE371R6CEN79Y0P1BVHIW",
  secretAccessKey: "-olZWq3qoviWnTNjf7X4TmdSKkdaZnrXAEuEnFFZ"
}
let cav = new Caver('8217', config.accessKeyId, config.secretAccessKey); //?
const tokenContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const salesContract = new cav.klay.Contract(DEPLOYED_ABI_ALBUMSALES,DEPLOYED_ADDRESS_ALBUMSALES);

var request_key='';


const App = {
  auth: {
    accessType: 'keystore',
    keystore: '',
    password: ''
    
  },
  userInfo: {
    name: '',
    id: ''
  },
  start: async function () {  


    await this.getAlbumsOnSale();
    const walletFromSession = sessionStorage.getItem('walletInstance');
    if (walletFromSession) {
      try {
        cav.klay.accounts.wallet.add(JSON.parse(walletFromSession));
        this.getUserInfo(JSON.parse(walletFromSession));
        this.changeUI(JSON.parse(walletFromSession));
      } catch (e) {
        sessionStorage.removeItem('walletInstance');
      }
    }
  },

  //////login with keystore
  handleImport: async function() {

    if(isMobile){
      const bappName = 'my app'
      const successLink = 'myApp://...'
      const failLink = 'myApp://...'
      const res = await prepare.auth({ bappName, successLink, failLink })
      if (res.err) {
        console.log('handleImport','fail');
        console.log('handleImport',res.err);
        // 에러 처리
      } else if (res.request_key) {
        console.log('handleImport','sucess');
        console.log('handleImport',res.request_key);
        console.log(res.status, res.tim)
        // request_key 보관
      }


    }else{

      const fileReader = new FileReader();
      fileReader.readAsText(event.target.files[0]);
      fileReader.onload = (event) => {
        try{
          if(!this.checkValidKeystore(event.target.result)) {
            $('#message').text('유효하지 않은 keystore 파일입니다.');
            return;
          }
          this.auth.keystore=event.target.result;
          $('#message').text('keystore 통과. 비밀번호를 입력하세요.');
          document.querySelector('#input-password').focus();
        }catch (event) {
          $('#message').text('유효하지 않은 keystore 파일입니다.');
          return;
        }
      }

    }

    
  },

  handlePassword: async function(){
    this.auth.password = event.target.value;
  },

  handleLogin: async function() {
    if(this.auth.accessType === 'keystore') {
      try{
        const privateKey = cav.klay.accounts.decrypt(this.auth.keystore, this.auth.password).privateKey;
        this.integrateWallet(privateKey);
      }catch (e) {
        $('#message').text('비밀번호가 일치하지 않습니다.');
      }
    }
  },
  
  handleLogout: async function() {
    this.removeWallet();
    location.reload();
  },

  checkValidKeystore: function (keystore) {
    const parsedKeystore = JSON.parse(keystore);
    const isValidKeystore = parsedKeystore.version && 
                            parsedKeystore.id && 
                            parsedKeystore.address && 
                            parsedKeystore.keyring;

    return isValidKeystore;
  },

  getUserInfo: async function(){
    var addr = this.getWallet().address;
    $.ajax({
      url:"./php/get_user_info.php",
      data: {"wallet_addr": addr},
      type: "POST",
      dataType: "JSON",
      success: function(data) {
        this.userInfo = {
          name: data['name'],
          id : data['id']
        };
      }.bind(this),
      error:function(request,status,error){
        alert(error);
      }
    })
  },

  //////
  integrateWallet: function (privateKey) {
    const walletInstance=cav.klay.accounts.privateKeyToAccount(privateKey);
    cav.klay.accounts.wallet.add(walletInstance);
    sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance));
    this.changeUI(walletInstance);
  },

  removeWallet: function() {
    cav.klay.accounts.wallet.clear();
    sessionStorage.removeItem('walletInstance');
    this.reset();
  },

  reset: function() {
    this.auth = { keystore: '',
                  passwd: ''};
  },

  getAlbumsOnSale: async function() {
    console.log("in getAlbumsOnSale");
    $.ajax({
        url: "./php/index_ajax.php",      // 클라이언트가 요청을 보낼 서버의 URL 주소
        data: { "action_type" : 2  },            // HTTP 요청과 함께 서버로 보낼 데이터
        type: "GET",                             // HTTP 요청 방식(GET, POST)
        dataType: "JSON",                        // 서버에서 보내줄 데이터의 타입
        success: function(data){
            console.log("in success");
            //console.log(data);
            
            $('#card_container').html(data['html']);
        },
        error:function(request, status, error){
            console.log("notfound");
            alert(error);
        }                    
    });
  },

  changeUI: function(walletInstance) {
    $('#loginModal').modal('hide');
    $('#login').hide();
    $('#logout').show();
    $('#myNfts').show();
    $('.afterLogin').show();
  },

  getWallet: function () {
    if (cav.klay.accounts.wallet.length) {
      return cav.klay.accounts.wallet[0];
    }
  },

  buy: async function(button) {
    var body = $(button).closest('.cb');
    var nfckey_id = body.find('.nfckey_id').val();
    var album_id = body.find('.album_id').val();
    var token_id = body.find('.token_id').val();
    console.log(token_id);

    var price = await this.getPrice(token_id);
    await this.buyAlbum(token_id, price);
    await this.setBuyOnDb(nfckey_id, album_id, token_id);
  },

  getPrice: async function(tokenId) {
    return await salesContract.methods.tokenPrice(tokenId).call();
  },

  setBuyOnDb: async function(nfckey_id, album_id, token_id) {
    var address = this.getWallet().address;

    console.log(this.userInfo.id, address, album_id, nfckey_id, token_id);

    $.ajax({
      url: "./php/market_action.php",
      data: { 
        "user_id": this.userInfo.id,
        "user_wallet": address,
        "album_id": album_id,
        "nfckey_id": nfckey_id,
        "token_id": token_id,
        "action_type": 4
      },
      type: "POST",
      dataType: "JSON",
      success: function(data) {
        alert(data["query"]);
        location.reload();
      },
      error:function(request,status,error){
        alert(error);
      }
    });
  },

  buyAlbum: async function(tokenId, price) {
    alert(tokenId, price);

    try {
      const sender = this.getWallet();
      const feePayer = cav.klay.accounts.wallet.add('0x64c5e0ee49b9699610d045cdf15c93ce623db55d89b87dfcd166c0740d621c5c')
  
      // using the promise
      const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: sender.address,
        to:   DEPLOYED_ADDRESS_ALBUMSALES,
        data: salesContract.methods.purchaseToken(tokenId).encodeABI(),
        gas:  '500000',
        value: price,
      }, sender.privateKey)
  
      cav.klay.sendTransaction({
        senderRawTransaction: senderRawTransaction,
        feePayer: feePayer.address,
      })
      .then(function(receipt){
        if (receipt.transactionHash) {         
          alert(receipt.transactionHash);
          location.reload();
        }
      });
    } catch (err) {
      console.error(err);
    }
  },

  //신규등록
  registAlbum: async function(button) {
    var parent= $(button).closest(".mc");
    var nfckey = parent.find("#i_nfckey").val();
    var serial = parent.find("#i_serial").val();

    console.log(parent, nfckey, serial);

    var check = await this.keyCheck(nfckey, serial);
    var album_id = check['album_id'];
    if(check['active']==='-1') {
      parent.find('#message').text("잘못된 nfc/serial 입니다.");
      alert("잘못된 nfc/serial 입니다.")
      return;
    } else if(check['active']==='1') {
      parent.find('#message').text("이미 발행된 앨범입니다. my nfts 페이지에서 nft 발행 가능합니다.");
      return;
    } else if(check['active']==='0') {
      await this.mint(nfckey,album_id);
    }
  },

  keyCheck: async function(nfckey, serial) {
    return $.ajax({
      url:'./php/regist_check_ajax.php',
      data: {
        'nfckey':nfckey,
        'serial': serial
      },
      type:'GET',
      dataType:'JSON',
      success: function(data){
        console.log(data['query']);
        console.log(data['active'])
      },
      error:function(request, status, error){
          console.log("notfound");
          alert(error);
      }  
    })
  },

  mint: async function(nfckey,album_id){
    try{
      var status = await this.mintCheck(nfckey);
      console.log(status);
      if(status.nfc_status==='0') {   //발행 안됨
        var tokenId = parseInt(await this.getTotalSupply())+1;
        await this.mintAlbum(nfckey, album_id);
        console.log(tokenId);
        await this.dbUpdateRegist(nfckey,tokenId);
      } else if(status.nfc_status==='-1') {
        alert("잘못된 nfc key 입니다.");
      } else {
        alert("이미 등록된 nfc key 입니다.")
      }
    }
    catch(err){
      alert(err);
    }
  },

  mintCheck: async function(nfckey) {
    return $.ajax({
      url: "./php/mint_check_ajax.php",
      data: { "nfckey": nfckey },
      type: "GET",
      dataType: "JSON",
      success: function(data) {
        return data['nfc_status'];
      },
      error:function(request,status,error){
        alert(error);
      }
    });
  },

  mintAlbum: async function(nfckey, album_id) {
    const sender = cav.klay.accounts.wallet[0];
    const key = nfckey;
    const code = album_id;
    //var receipt = await tokenContract.methods.mintAlbum(key, code).send({from: sender, gas: 5000000});
    const feePayer = cav.klay.accounts.wallet.add('0x64c5e0ee49b9699610d045cdf15c93ce623db55d89b87dfcd166c0740d621c5c');
    const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
      type: "FEE_DELEGATED_SMART_CONTRACT_EXECUTION",
      from: sender.address,
      to:   DEPLOYED_ADDRESS,
      data: tokenContract.methods.mintAlbum(key,code).encodeABI(),
      //contract의 mintYTT함수로 URI+hash 주소로 metadata를 업로드. 이 부분을 encodeABI()를 통해 klaytn이 알아들을 수 있게 인코딩
      gas: '500000',
      value: cav.utils.toPeb('0', 'KLAY'),  //payable type이 아니므로 비용 0
    }, sender.privateKey) //서명
    cav.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: feePayer.address,
    }).then(function(receipt){
      if(receipt.transactionHash){
        console.log(receipt);
        alert("mint success");
        location.reload();
      }
    })
  },

  getTotalSupply: async function(){
    return await tokenContract.methods.totalSupply().call();
  },

  dbUpdateRegist: async function(nfckey, tokenId) {
    var addr=this.getWallet().address;
    console.log(nfckey, tokenId);
    $.ajax({
      url: "./php/set_regist_db_ajax.php",
      data: { "nfckey": nfckey,
              "tokenId": tokenId,
              "wallet_addr":addr },
      type: "POST",
      dataType: "JSON",
      success: function(data) {
      },
      error:function(request,status,error){
        alert(error);
      }
    });
  },



  klipTest: async function() {

    const nftTransaction=new KlipNftTransaction();
    //await nftTransaction.getWallet();
    console.log(await nftTransaction.getAccountTokenBalance());
  },
    
};




function Mobile(){
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

function sleep(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
};

window.App = App;

window.addEventListener("load", function() {
  App.start(); 
  $("#tabs").tabs().css({'overflow': 'auto'});
});

const https = require('https')

async function post(url, data) {
  const dataString = JSON.stringify(data)

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 1000, // in ms
  }

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      // if (res.statusCode < 200 || res.statusCode > 299) {
      //   return reject(new Error(`HTTP status code ${res.statusCode}`))
      // }

      const body = []
      res.on('data', (chunk) => body.push(chunk))
      res.on('end', () => {
        const resString = Buffer.concat(body).toString()
        console.error(resString);
        resolve(resString)
      })
    })

    req.on('error', (err) => {
      console.error(err);
      reject(err)
    })

    req.on('timeout', () => {
      req.destroy()
      reject(new Error('Request time out'))
    })

    console.error(dataString);
    req.write(dataString)
    req.end()
  })
}

const start = async function() {
    
    const partners_email = "soundgram.g@gmail.com";
    const partners_email_password ="1howtobiz!";
    const data ={
    method:'POST',
    header:{
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({
    "email":partners_email,
    "password":SHA256(partners_email_password)
    })};
    try{
        const res = await post("https://api.klipwallet.com/v2/partner/auth", data);
    console.log(res);
        }catch (error) {
          console.error(error);
        }
    
  }
  try{
  start();
  }catch (error) {
    console.error(error);
  }
