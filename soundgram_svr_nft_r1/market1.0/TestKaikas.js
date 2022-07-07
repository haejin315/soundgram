


const klipTokenContractAddress='';


function test(){
  //klipTokenContractAddress의 인터페이스 확인용
  caver.kct.kip17.detectInterface(klipTokenContractAddress).then(console.log)

  //카이카스 접속
  typeof window.klaytn !== 'undefined';
  const accounts = await klaytn.enable();
  const account = accounts[0];
  console.log("TestKaikas get account",account);

  //카이카스 계정 수정 추적
  klaytn.on('accountsChanged', function(accounts) {
    account=accounts[0];
    console.log("TestKaikas accountsChanged",accounts);
  });

  //caver 설정. 필요시에만 사용. 일반적인 경우 https://www.klaytnapi.com/에서 발급받은 acces key이용한 Caver 사용하게 될듯
  //카이카스가 자체적으로 제공하는 프로바이더의 경우 https://www.klaytnapi.com/와 달리 어떻게 적용되는지 추가 조사 필요
  if (typeof window.klaytn !== 'undefined') {
    caver = new Caver(klaytn);
    const provider = window['klaytn']
    caver.setProvider(provider);
    console.log("TestKaikas setProvider",provider);
  }

  //
  //아래에서 테스트하고자 하는 함수 제외하고 나머지 주석처리후 테스트 하는것 추천.
  //토큰을 setSaleOnCont로 판매등록 하기 위해선 approve가 선행되어야 함
  //

  const balance=await getAccountTokenBalance(account);
  console.log("TestKaikas GetAccountTokenBalance",balance);
  

  let tokenId=13;
  const TokenInfo=await getTokeninfoURL(tokenId);
  console.log("TestKaikas GetTokeninfoURL",TokenInfo);


  await getAllTokenOfOwner(account,balance);
  console.log("TestKaikas GetAllTokenOfOwner");
  

  const approveReceipt=await approve(account);
  console.log("TestKaikas approve",approveReceipt.transactionHash);
  

  let pebPrice=KlayToPeb("0.0001");
  const saleOnContReceipt=await setSaleOnCont(account,tokenId,pebPrice);
  console.log("TestKaikas setSaleOnCont",saleOnContReceipt.transactionHash);


  const tokenPrice=await getTokenPrice(tokenId);
  console.log("TestKaikas GetTokenPrice",tokenPrice);


  
  pebPrice=KlayToPeb("0.0001");
  tokenId=21;
  const buyTokenReceipt=await buyToken(account,tokenId,pebPrice);
  console.log("TestKaikas buyToken",buyTokenReceipt.transactionHash);
  
};


function KlayToPeb(price) {
  return cav.utils.toPeb(price, 'KLAY');
};




function getAccountTokenBalance(addressOwner){
  const myContract = new caver.klay.Contract(KIP17Fullabi,klipTokenContractAddress )
  return myContract.methods.balanceOf(addressOwner).call();
};

function getTokeninfoURL(tokenId){
  const myContract = new caver.klay.Contract(KIP17Fullabi, klipTokenContractAddress)
  return myContract.methods.tokenURI(tokenId).call();
};

function getAllTokenOfOwner(addressOwner,balance){
  for (var i = 0; i < balance; i++) {
    (async () => {
      var tokenId = await getTokenOfOwnerByIndex(
        addressOwner,
        i
      );
      console.log("TestKaikas testGetAllTokenOfOwner",tokenId);
    })();
  }
};

function getTokenOfOwnerByIndex(addressOwner,index){
  const myContract = new caver.klay.Contract(KIP17Fullabi, klipTokenContractAddress)
  return myContract.methods.tokenOfOwnerByIndex(addressOwner,index).call();
};



async function approve (addressOwner) {
  const myContract = new cav.klay.Contract(KIP17Fullabi, klipTokenContractAddress);
  return myContract.methods.setApprovalForAll(DEPLOYED_ADDRESS_ALBUMSALES, true).send({
    from: addressOwner,
    gas: "250000"
  })
};




async function setSaleOnCont(addressOwner,tokenId, price) {
  try {

    // using the promise
    const { rawTransaction: senderRawTransaction } = await cav.klay.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: addressOwner,
      to:   DEPLOYED_ADDRESS_ALBUMSALES,
      data: salesContract.methods.setForSale(tokenId, price).encodeABI(),
      gas:  '500000',
      value: cav.utils.toPeb('0', 'KLAY'),
    })

    
    const feePayer = cav.klay.accounts.wallet.add('0x95344c6b2fd3246158bc04d562bfaa44fe56a795c352bf420a66e51fd0795c85')
    return cav.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: feePayer.address,
    });
    
  } catch (err) {
    console.error("setSaleOnCont",err);
  }
};


async function getTokenPrice (tokenId) {
  const salesContract = new cav.klay.Contract(DEPLOYED_ABI_ALBUMSALES,DEPLOYED_ADDRESS_ALBUMSALES);
    return await salesContract.methods.tokenPrice(tokenId).call();
  };




async function buyToken(addressOwner,tokenId, price) {
  try {

    // using the promise
    const { rawTransaction: senderRawTransaction } = await cav.klay.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: addressOwner,
      to:   DEPLOYED_ADDRESS_ALBUMSALES,
      data: salesContract.methods.purchaseToken(tokenId).encodeABI(),
      gas:  '500000',
      value: '1000000000000000',//cav.utils.toPeb(price, 'KLAY'),
    })

    
    const feePayer = cav.klay.accounts.wallet.add('0x95344c6b2fd3246158bc04d562bfaa44fe56a795c352bf420a66e51fd0795c85')
    return cav.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: feePayer.address,
    });
    
  } catch (err) {
    console.error("buyToken",err);
  }
};


const KIP17Fullabi=[
  {
    "constant": true,
    "inputs": [
      {
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenOfOwnerByIndex",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "tokenByIndex",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "baseURI",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "setApprovalForAll",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokenId",
        "type": "uint256"
      },
      {
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "safeTransferFrom",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "operator",
        "type": "address"
      }
    ],
    "name": "isApprovedForAll",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "approved",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "operator",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "approved",
        "type": "bool"
      }
    ],
    "name": "ApprovalForAll",
    "type": "event"
  }
];