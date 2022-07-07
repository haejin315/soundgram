import Caver from "caver-js-ext-kas";

//images
import "./images/nav_logo.png"
import "./images/ellipsis-icon.6098394b.svg"

import "./js/bootstrap.min.js"
import "./css/bootstrap.min.css";
import "./css/common.css";
import "./css/default.css";

const config = {
  accessKeyId: "KASKE371R6CEN79Y0P1BVHIW",
  secretAccessKey: "-olZWq3qoviWnTNjf7X4TmdSKkdaZnrXAEuEnFFZ"
}
const cav = new Caver("1001", config.accessKeyId, config.secretAccessKey); //?
const tokenContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const salesContract = new cav.klay.Contract(DEPLOYED_ABI_ALBUMSALES,DEPLOYED_ADDRESS_ALBUMSALES);
const myNfts = {
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
    const walletFromSession = sessionStorage.getItem('walletInstance');
    if (walletFromSession) {
      try {
        cav.klay.accounts.wallet.add(JSON.parse(walletFromSession));
        this.getUserName(JSON.parse(walletFromSession));
        this.changeUI(JSON.parse(walletFromSession));
      } catch (e) {
        sessionStorage.removeItem('walletInstance');
      }
    }
  },
  
  change: function(nav, tab) {
    $('.nav-link').removeClass('active');
    $(nav).addClass('active');
    if(tab===0) {
      $('#waitingToken').hide();
      $('#ownedToken').show();
    } else {
      $('#ownedToken').hide();
      $('#waitingToken').show();
    }
  },

  handleLogout: async function() {
    this.removeWallet();
    location.reload();
  },

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
    console.log(walletInstance.address);
    $('#walletAddress').append('<br>'+'<p>'+walletInstance.address+'</p>');

    await this.checkApproval(walletInstance);
    await this.getOwnNfts(walletInstance);
  },

  getWallet: function () {
    if (cav.klay.accounts.wallet.length) {
      return cav.klay.accounts.wallet[0];
    }
  },
 

  getOwnNfts: async function(walletInstance) {
    $.ajax({
      url: "./php/mynfts_ajax.php",               // 클라이언트가 요청을 보낼 서버의 URL 주소
      data: { "wallet_addr" : walletInstance.address  },            // HTTP 요청과 함께 서버로 보낼 데이터
      type: "GET",                             // HTTP 요청 방식(GET, POST)
      dataType: "JSON",                        // 서버에서 보내줄 데이터의 타입
      success: function(data){
          console.log("in success");
          console.log(data);
          
          $('#ownedTokens').html(data['own_html']);
          $('#waitingTokens').html(data['wait_html']);
          //$("#ajax_table").html(html);           
          //dataTableInit();
      },
      error:function(request, status, error){
          console.log("notfound");
          alert(error);
      }                    
    });
  },

  ////발행 함수들
  mint: async function(button){
    var body = $(button).closest('.cb');
    var nfckey = body.find('.nfckey').val();
    var nfckey_id=body.find('.nfckey_id').val();
    var album_id=body.find('.album_id').val();
    console.log(nfckey);

    try{
      var status = await this.mintCheck(nfckey);
      console.log(status);
      if(status.nfc_status==='0') {   //발행 안됨
        var tokenId = parseInt(await this.getTotalSupply())+1;
        await this.mintAlbum(nfckey, album_id);
        console.log(tokenId);
        await this.action(nfckey_id, tokenId, album_id, 1);
        //await this.testajax(nfckey_id, album_id, tokenId);

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
    var receipt = await tokenContract.methods.mintAlbum(key, code).send({from: sender, gas: 5000000});
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

  // dbUpdateMint: async function(nfckey_id, token_id, album_id) {
  //   const wallet_addr = this.getWallet().address;
  //   $.ajax({
  //     url: "./php/market_action.php",
  //     data: { "user_id": this.userInfo.id,
  //             "user_wallet": wallet_addr,
  //             "album_id" : album_id,
  //             "nfckey_id": nfckey_id,
  //             "token_id": token_id,
  //             "action_type": 1
  //           },
  //     type: "POST",
  //     dataType: "JSON",
  //     success: function(data) {
  //       console.log("dbupdatesuccess");
  //       console.log(data['query1']);
  //       console.log(data['query2']);
  //       location.reload();
  //     },
  //     error:function(request,status,error){
  //       alert(error);
  //     }
  //   });
  // },
  ////
  ////판매 등록 함수들
  approve: function () {
    const walletInstance = this.getWallet();

    tokenContract.methods.setApprovalForAll(DEPLOYED_ADDRESS_ALBUMSALES, true).send({
      from: walletInstance.address,
      gas: "250000"
    }).then(function (receipt) {
      if(receipt.transactionHash) {
        location.reload();
      }
    })
  },

  cancelApproval: async function () {
    const walletInstance = this.getWallet();

    const receipt = await yttContract.methods.setApprovalForAll(DEPLOYED_ADDRESS_ALBUMSALES, false).send({
      from: walletInstance.address,
      gas: "250000"
    })
    if(receipt.transactionHash) {
      await this.onCancelApprovalSuccess(walletInstance);
      location.reload();
    }
  },

  checkApproval: async function(walletInstance) {
    var isApproved = await this.isApprovedForAll(walletInstance.address, DEPLOYED_ADDRESS_ALBUMSALES);
    if(isApproved) {
      $('#approve').hide();
    } else {
      $('#cancelApproval').hide();
    }
  },

  isApprovedForAll: async function (owner, operator) {
    return await tokenContract.methods.isApprovedForAll(owner, operator).call();
  },  

  setOnSale: async function(button) {
    var body = $(button).closest('.cb');
    var nfckeyId = body.find('.nfckey_id').val();
    var albumId = body.find('.album_id').val();
    var tokenId = body.find('.token_id').val();
    var price = body.find('.price').val();

    console.log(tokenId, price);

    if(price < 0 || price === ''){
      alert('0 이상의 금액을 입력해주세요.');
      return;
    }
      

    await this.setSaleOnCont(tokenId, price);
    await this.action(nfckeyId, albumId, tokenId, 2);
  },

  setUserName: function(){
    $('#user_name').text(this.userInfo.name);
  },

  getUserName: async function(){
    const addr = this.getWallet().address;
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
        this.setUserName();
      }.bind(this),
      error:function(request,status,error){
        alert(error);
      }
    })
  },

  setSaleOnCont: async function(tokenId, price) {
    try {
      const sender = this.getWallet();
      const feePayer = cav.klay.accounts.wallet.add('0x64c5e0ee49b9699610d045cdf15c93ce623db55d89b87dfcd166c0740d621c5c')
  
      // using the promise
      const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: sender.address,
        to:   DEPLOYED_ADDRESS_ALBUMSALES,
        data: salesContract.methods.setForSale(tokenId, cav.utils.toPeb(price, 'KLAY')).encodeABI(),
        gas:  '500000',
        value: cav.utils.toPeb('0', 'KLAY'),
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

  // setSaleOnDb: async function(nfckey_id, album_id, token_id) {
  //   const walletAddr = this.getWallet().address;
  //   $.ajax({
  //     url: "./php/market_action.php",
  //     data: { 
  //       "user_id": this.userInfo.id,
  //       "user_wallet": walletAddr,
  //       "album_id": album_id,
  //       "nfckey_id": nfckey_id,
  //       "token_id": token_id,
  //       "action_type": 2
  //     },
  //     type: "POST",
  //     dataType: "JSON",
  //     success: function(data) {
  //       console.log(data['query1']);
  //       console.log(data['query2']);
  //       location.reload();
  //     },
  //     error:function(request,status,error){
  //       alert(error);
  //     }
  //   });

  // },

  cancelSale: async function (button) {
    var body = $(button).closest('.cb');
    var nfckeyId = body.find('.nfckey_id').val();
    var albumId = body.find('.album_id').val();
    var tokenId = body.find('.token_id').val();
    
    await this.cancelSaleOnCont(tokenId);
    await this.action(nfckeyId, albumId, tokenId, 3);
  },

  cancelSaleOnCont: async function (tokenId) {
    const walletInstance = this.getWallet();
    console.log("after getwallet");
    const receipt = await salesContract.methods.removeTokenOnSale(tokenId).send({
      from: walletInstance.address,
      gas: '250000'
    });

    if (receipt.transactionHash) {
      alert(receipt.transactionHash);
    }
  },

  // cancelSaleOnDb: async function (nfckey_id, album_id, token_id) {
  //   const walletAddr = this.getWallet().address;
  //   $.ajax({
  //     url: "./php/market_action.php",
  //     data: { 
  //       "user_id": this.userInfo.id,
  //       "user_wallet": walletAddr,
  //       "album_id": album_id,
  //       "nfckey_id": nfckey_id,
  //       "token_id": token_id,
  //       "action_type": 3
  //     },
  //     type: "POST",
  //     dataType: "JSON",
  //     success: function(data) {
  //       console.log("second");
  //       console.log(data['query1']);
  //       console.log(data['query2']);

  //       //location.reload();
  //     },
  //     error:function(request,status,error){
  //       alert(error);
  //     }
  //   });

  // },

  allowSale: async function(button){
    var body = $(button).closest('.cb');
    var nfckeyId = body.find('.nfckey_id').val();
    var albumId = body.find('.album_id').val();
    var tokenId = body.find('.token_id').val();

    this.action(nfckeyId, albumId, tokenId, 7);
    //nft 전송해야함
  },

  rejectSale: async function(button){
    var body = $(button).closest('.cb');
    var nfckeyId = body.find('.nfckey_id').val();
    var albumId = body.find('.album_id').val();
    var tokenId = body.find('.token_id').val();

    this.action(nfckeyId, albumId, tokenId, 6);
    //db만 바꾸면 됨
  },

  cancelBuy: async function(button){
    var body = $(button).closest('.cb');
    var nfckeyId = body.find('.nfckey_id').val();
    var albumId = body.find('.album_id').val();
    var tokenId = body.find('.token_id').val();

    this.action(nfckeyId, albumId, tokenId, 5);
    //거래 트랜잭션에서 뭔갈 하긴 해야함.
  },

  action: async function (nfckey_id, album_id, token_id, action_type) {
    const walletAddr = this.getWallet().address;
    $.ajax({
      url: "./php/market_action.php",
      data: { 
        "user_id": this.userInfo.id,
        "user_wallet": walletAddr,
        "album_id": album_id,
        "nfckey_id": nfckey_id,
        "token_id": token_id,
        "action_type": action_type
      },
      type: "POST",
      dataType: "JSON",
      success: function(data) {
        console.log("second");
        console.log(data['query1']);
        console.log(data['query2']);

        location.reload();
      },
      error:function(request,status,error){
        alert(error);
      }
    });

  },

  kliptest: async function() {
    // var settings = {
    //   "url": "https://api.klipwallet.com/v2/wallet/bapp",//?
    //   "method": "GET",
    //   "timeout": 0,
    //   "headers": {
    //     "Content-Type": "application/json",
    //     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTY2NjcwMCwiZXhwIjoxNjQyMDQwNDc5fQ.B6jPugP04UyG8hUDKdNdLTKnxESeGmNzAPVPgLH7wO0"
    //   },
    // };

    var settings = {
      "url": "/php/klip_api.php",//?
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTY2NjcwMCwiZXhwIjoxNjQyMDQwNDc5fQ.B6jPugP04UyG8hUDKdNdLTKnxESeGmNzAPVPgLH7wO0"
      },
    };
    
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  },

  ////구매 컨펌 방식으로 가면 사용될 함수들
  // sell: async function(button) {
  //   var body = $(button).closest('.cb');
  //   var nfckey = body.find('.nfckey').val();
  //   var tokenId = body.find('.token_id').val();
    
  //   var buyerAddr = await getBuyerAddress(nfckey);
  //   await sellAlbumToBuyer(buyerAddr, tokenId);
  // },

  sellAlbumToBuyer: async function(buyerAddr, tokenId) {
    try {
      const feePayer = cav.klay.accounts.wallet.add('0x64c5e0ee49b9699610d045cdf15c93ce623db55d89b87dfcd166c0740d621c5c')
  
      // using the promise
      const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
        type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
        from: buyerAddr,
        to:   DEPLOYED_ADDRESS_ALBUMSALES,
        data: tsContract.methods.purchaseToken(tokenId).encodeABI(),
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
  }
};

window.myNfts = myNfts;

window.addEventListener("load", function() {
  myNfts.start(); 
  //$("#tabs").tabs().css({'overflow': 'auto'});
});