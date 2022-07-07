import Caver from "caver-js-ext-kas";
//import mysql from "./node_modules/mysql";

// var connection = mysql.createConnection({
//   hostname:"127.0.0.1:3306",
//   user : "root",
//   password: "1tkddydwkdql",
//   database: "soundgramN1"
// })

const config = {
  accessKeyId: "KASKE371R6CEN79Y0P1BVHIW",
  secretAccessKey: "-olZWq3qoviWnTNjf7X4TmdSKkdaZnrXAEuEnFFZ"
}
const cav = new Caver("1001", config.accessKeyId, config.secretAccessKey); //?
const tokenContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
//const salesContract = new cav.klay.Contract();
const App = {
  auth: {
    accessType: 'keystore',
    keystore: '',
    password: ''
  },

  start: async function () {
    const walletFromSession = sessionStorage.getItem('walletInstance');
    if (walletFromSession) {
      try {
        cav.klay.accounts.wallet.add(JSON.parse(walletFromSession));
        this.changeUI(JSON.parse(walletFromSession));
      } catch (e) {
        sessionStorage.removeItem('walletInstance');
      }
    }
    if(navigator.platform === 'Win32') {
      $('.login-pc').show();
      $('.login-mobile').hide();
    } else if (navigator.platform === 'Android') {
      $('.login-pc').hide();
      $('.login-mobile').show();
    }
  },

  //////login with keystore
  handleImport: async function() {
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

  handleLoginMobile: async function() {
    //klip auth api
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

  changeUI: async function(walletInstance) {
    $('#loginModal').modal('hide');
    $('#login-pc').hide();
    $('#login-mobile').hide();
    $('#logout').show();
    $('.afterLogin').show();

    await this.displayMyTokens(walletInstance);
  },

  displayMyTokens: async function(walletInstance) {
    var balance = parseInt(await this.getBalanceOf(walletInstance.address));
    console.log(balance);
    if(balance===0) {
      console.log("no token");
      $('#myTokens').text("현재 보유한 토큰이 없습니다.");
    } else {
      //var isApproved = await this.isApprovedForAll(walletInstance.address, DEPLOYED_ADDRESS_TOKENSALES);
      for(var i = 0; i < balance; i++){
        (async () => {
          var tokenId = await this.getTokenOfOwnerByIndex(walletInstance.address, i);
          var tokenInfo = await this.getTokenInfo(tokenId); //[0] code [1] numbering
          console.log(tokenId);
          this.renderMyTokens(tokenId, tokenInfo[0], tokenInfo[1]);
        })();
      }
    }
  },

  getTokenOfOwnerByIndex: async function(address, index) {
    return await tokenContract.methods.tokenOfOwnerByIndex(address, index).call();
  },

  getBalanceOf: async function(address) {
    return await tokenContract.methods.balanceOf(address).call();
  },

  getTokenInfo: async function(tokenId) {
    return await tokenContract.methods.getTokenInfo(tokenId).call();
  },

  renderMyTokens: function (tokenId, code, numbering) {
    console.log("in render");
    var tokens = $('#myTokens');
    var template = $('#MyTokensTemplate');

    this.getBasicTemplate(template, tokenId, code, numbering);

    tokens.append(template.html());
  },

  getBasicTemplate: function(template, tokenId, code, numbering) {
    template.find('.panel-heading').text(tokenId);
    //template.find('img').attr('src', );
    template.find('.albumName').text("temp code."+code);
    template.find('.numbering').text(numbering)

  },
  ////test functions
  //transaction 생성을 kas로 바꿀 필요 있음
  testMint: async function() {
    var sender = cav.klay.accounts.wallet[0];
    var key = "test-001";
    var code = 111;
    //var receipt = await tokenContract.methods.mintAlbum(key, code).send({from: sender, gas: 5000000});
    const feePayer = cav.klay.accounts.wallet.add('0xdcde553fd13a3ebb3b3ad738ec62c20b50d2d647f4c3bc6f022f363ccf8eeafd');
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
        alert(receipt.transactionHash);
        location.reload();
      }
    })
    
  },

  testDB: function() {
    console.log("im in dbtest");
    connection.query('SELECT * FROM APIServer_album',function(error,result,fields) {
      if(err) {
        console.log(err);
      }
      console.log('the solution is : ', results[0])
    })
  }

};

window.App = App;

window.addEventListener("load", function() {
  App.start(); 
  $("#tabs").tabs().css({'overflow': 'auto'});
});
