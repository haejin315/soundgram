const security = require("./security");
const axios = require('axios');
const FormData = require('form-data');
const FileReader = require('filereader');
//const PNG = require('pngjs');

//window.FileReader;

//const fs = require('fs');

function sleep(ms) {
    const wakeUpTime = Date.now() + ms;
    while (Date.now() < wakeUpTime) {}
  };

////////파트너 사이트 로그인
function loginPartner() {
    axios({
	    url: 'https://api.klipwallet.com/v2/partner/auth',
	    method: 'post',
	    data: {
		    email: security.email,
            password: security.password,
    	}
    })
    .then(function a(response) { 
	    console.log(response);
        //access_token은 24시간마다 초기화됨, 관리 필요
        console.log(response.data.access_token);
    })
    .catch(function (error) {
	    console.log(error);
    });
}


////////카드 조회
function getAllCard() {
    axios({
        url: 'https://api.klipwallet.com/v2/wallet/bapp',
        method: 'get',
        headers: {
            authorization: security.authorization ,
        }
    })
    .then(function a(response) { 
        console.log(response) 
        //회사에서 등록한 모든 bapp의 카드가 리턴됨
        //필요한 bapp만 선택
        console.log(response.data.bapps[0].cards[0]);
    })
    .catch(function (error) {
        console.log(error);
    });
}

////////카드 이미지 업로드
//리턴받은 카드 이미지 URL 관리 필요
function CardImageUpload(imagelocation) {
    const form = new FormData();
    //아래 넣고 싶은 이미지 png파일로
    //form.append('upload', fs.readFileSync('./album/0/cover.png'), './album/0/cover.png');
    //form.append('upload', fs.readFileSync(imagelocation), imagelocation);
    //const imageBlob = new Promise(resolve => canvasElem.toBlob(resolve, imagelocation))
    //const imageBlob = PNG.sync.read(imagelocation);
    const imageBlob = new FileReader();
    form.append('upload', imageBlob.readAsText(imagelocation), imagelocation);
    console.log(form);

    axios({
        url: 'https://api.klipwallet.com/v2/wallet/image',
        method: 'post',
        headers: {
            authorization: security.authorization ,
            'Content-Type': 'multpart/form-data'
        },
        data : form,
    })
    .then(function a(response) { 
        console.log(response) 
    })
    .catch(function (error) {
        console.log(error);
    });
}

////////EOA민팅
function KlipCardMinting(imageurl, userAddress) {
    //카드이미지업로드 후 리턴 받은 URL들 중에서 사용
    //const testImageUrl = 'https://media.klipwallet.com/card_asset/1666700/e3fb64e0-0995-46b5-b62e-1e6dfffbf444.png'
    const testImageUrl = imageurl;
    axios({
        url: 'https://api.klipwallet.com/v2/wallet/mint',
        method: 'post',
        headers: {
                authorization: security.authorization ,
                'Content-Type': 'application/json'
                },
        data: {
            "pin": security.pin,
            "to_address": userAddress,
            "contract_address": security.contract_address,
            "name": "앨범이름",
            "description" : "정품인증서 설명",
            "image": testImageUrl,
            "sendable" : false,
            "send_friendly_only" : false,
            "attributes": [
                {
                    "trait_type": "Chipdisc Model",
                    "value": "칩디스크 모델 넘버"
                },
                {
                    "trait_type": "Product Code",
                    "value": "앨범별 제품 코드"
                },
                {
                    "trait_type": "Artist",
                    "value": "아티스트"
                },
                {
                    "trait_type": "Edition no",
                    "value": "#333"
                },
                {
                    "trait_type": "Chip code",
                    "value": "nfckey_id"
                }
            ]
            }
        })
        .then(function a(response) { 
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}
////////excute contract 실행

const abipurchaseToken = "{ \"constant\": false, \"inputs\": [ { \"name\": \"_tokenId\", \"type\": \"uint256\" } ], \"name\": \"purchaseToken\", \"outputs\": [], \"payable\": true, \"stateMutability\": \"payable\", \"type\": \"function\", \"signature\": \"0xc2db2c42\" }"
const abisetForSale = "{\"constant\":false,\"inputs\":[{\"name\":\"_tokenId\",\"type\":\"uint256\"},{\"name\":\"_price\",\"type\":\"uint256\"}],\"name\":\"setForSale\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0x17fcfe22\"}"
const abiKIP17 = "{\"constant\": false,\"inputs\": [{\"name\": \"to\",\"type\": \"address\"},{\"name\": \"approved\",\"type\": \"bool\"}],\"name\": \"setApprovalForAll\",\"outputs\": [],\"payable\": false,\"stateMutability\": \"nonpayable\",\"type\": \"function\"}"
const abisetApproved = "{\"constant\": false,\"inputs\": [{\"name\": \"to\",\"type\": \"address\"},{\"name\": \"approved\",\"type\": \"bool\"}],\"name\": \"setApprovalForAll\",\"outputs\": [],\"payable\": false,\"stateMutability\": \"nonpayable\",\"type\": \"function\"}"
function ExcuteContract(from, value, abi, params) {
    axios({
            url: 'https://a2a-api.klipwallet.com/v2/a2a/prepare',
            method: 'post',
            headers: {
                    'Content-Type': 'application/json'
                    },
            data: {
                "bapp": { "name" : security.service_name }, 
                "type": "execute_contract", 
                "transaction": {
                    //"from" : security.testHajineKlip, 
                    "from" : from,
                    "to": security.soundgram_contract_address, 
                    //"value": "0", 
                    "value" : value,
                    //"abi": abiKIP17,
                    "abi" : abi,
                    //"params" : "[\"0xd6646EA5152b9d8e244a4d24027D1D4f5Abc0Ee5\",true]"
                    "params" : params
                } 
            }   
            })
            .then(function a(response) { 
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
}
/*
function KlipLogin() {
    const klaytn_address = ""
    if(isMobile){
        const bappName = security.service_name
        const successLink = 'myApp://...'
        const failLink = 'myApp://...'
        const res = await prepare.auth({ bappName, successLink, failLink })
        if (res.err) {
          console.log('handleImport','fail');
          console.log('handleImport',res.err);
        } else if (res.request_key) {
          console.log('handleImport','sucess');
          console.log('handleImport',res.request_key);
          console.log(res.status, res.tim)
          // request_key 보관
        }
        request(res.request_key, () => alert('모바일 환경에서 실행해주세요'));
        //TODO 클립앱에서 다시 웹으로 돌아오는것 확인하는 방법찾기
        sleep(13000);
        try {
            const res = await getResult(request_key);
            console.log(res.status);
            if (res.status == 'completed') {
                klaytn_address = res.result.klaytn_address;
                console.log(klaytn_address);
                console.log(res);
            }
        } 
        catch (e) {
            console.log('auth getResult error');
            console.log(e);
        }
    }
    else{
        //qr코드로 로그인 구현
    }
    return klaytn_address;
}
*/
// function getKlipBalance(klaytn_address) {
//     const balance = -1;
//     try {
//         balance = await cav.klay.getBalance(klaytn_address);
//     } 
//     catch (e) {
//         console.log('getBalance error');
//     }
//     return balance;
// }

function getKlipUserCardList(eoa) {
    const contract = security.contract_address;
    const cursor = '';
    const res = getCardList({ contract, eoa});
    console.log(res);
    console.log(cursor);
}

const imageurl1 = 'https://media.klipwallet.com/card_asset/1666700/e3fb64e0-0995-46b5-b62e-1e6dfffbf444.png'
const imageurl2 = 'https://media.klipwallet.com/card_asset/1666700/6084a9bc-2b60-49aa-addc-ac0bc1d6c63d.png'
const imageurl3 = 'https://nftdisk.soundgram.co.kr/images/intro_chipdisc01.png'
const userAddress = [security.testHajineKlip]
loginPartner();
//KlipCardMinting(imageurl3, userAddress);
//CardImageUpload("./images/intro_chipdisc01.png");