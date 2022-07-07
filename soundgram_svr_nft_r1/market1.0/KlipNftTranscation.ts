import * as Transaction from './NftTransaction';

import { prepare, request, getResult, getCardList, web2app } from 'klip-sdk';
import * as Caver from "caver-js-ext-kas";

const fs = require('fs');

class KlipNftTransaction implements Transaction.NftTransaction {

    bappName = '(주)사운드그램';
    userAccountAddress: string;

    //TODO 하드코딩 하지말고 파일이나 기타 설정파일에서 관리하며 읽어오기-자주 변화가 있을수 있으니
    klipTokenAddress = '0x8817B4883fB534E005613b5f36ad3960906C604f';
    salesContractAddress = '0xd6646EA5152b9d8e244a4d24027D1D4f5Abc0Ee5';
    config = {
        accessKeyId: "KASKE371R6CEN79Y0P1BVHIW",
        secretAccessKey: "-olZWq3qoviWnTNjf7X4TmdSKkdaZnrXAEuEnFFZ"
    };

      DEPLOYED_ABI=[{"constant":true,"inputs":[{"name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x01ffc9a7"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x06fdde03"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x081812fc"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x095ea7b3"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x18160ddd"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x23b872dd"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"index","type":"uint256"}],"name":"tokenOfOwnerByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x2f745c59"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x42842e0e"},{"constant":true,"inputs":[{"name":"index","type":"uint256"}],"name":"tokenByIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x4f6ccce7"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x6352211e"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x70a08231"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x95d89b41"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xa22cb465"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokenId","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xb88d4fde"},{"constant":true,"inputs":[{"name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xc87b56dd"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xe985e9c5"},{"inputs":[{"name":"name","type":"string"},{"name":"symbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event","signature":"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"approved","type":"address"},{"indexed":true,"name":"tokenId","type":"uint256"}],"name":"Approval","type":"event","signature":"0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"operator","type":"address"},{"indexed":false,"name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event","signature":"0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31"},{"constant":false,"inputs":[{"name":"_key","type":"string"},{"name":"_albumCode","type":"uint256"}],"name":"mintAlbum","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0497c9c4"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_key","type":"string"},{"name":"_albumCode","type":"uint256"}],"name":"mintAlbumWithAddress","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x8e51f0d7"},{"constant":true,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"getTokenInfo","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8c7a63ae"},{"constant":true,"inputs":[{"name":"_code","type":"uint256"}],"name":"getTokensByAlbumCode","outputs":[{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x752d6151"},{"constant":true,"inputs":[{"name":"_albumKey","type":"string"}],"name":"isUsedKey","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x4c7eabf3"}];
      DEPLOYED_ABI_ALBUMSALES= [{"constant":true,"inputs":[],"name":"nftAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x5bf8633a"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xd4ddce8a"},{"inputs":[{"name":"_tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_price","type":"uint256"}],"name":"setForSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x17fcfe22"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"purchaseToken","outputs":[],"payable":true,"stateMutability":"payable","type":"function","signature":"0xc2db2c42"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"removeTokenOnSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xae068e92"}];
    cav = new Caver(8217, this.config.accessKeyId, this.config.secretAccessKey);
    tokenContract = new this.cav.klay.Contract(this.DEPLOYED_ABI, this.klipTokenAddress);
    salesContract = new this.cav.klay.Contract(this.DEPLOYED_ABI_ALBUMSALES, this.salesContractAddress);

    constructor(){
        
    }


    async getWallet(): Promise<String> {
        if (this.userAccountAddress !== undefined) {
            return this.userAccountAddress;
        } else {
            return await this.loginKlip();
        }
    }

    private async loginKlip() {

        const bappName = this.bappName;
        const successLink = '';
        const failLink = '';

        const res = await prepare.auth({ bappName, successLink, failLink })
        if (res.err) {
            console.log('login klip', 'fail');
            throw new Error(res.err);
        } else if (res.request_key) {
            console.log('login klip', 'sucess');
            console.log('login klip', res.request_key);
        }
        this.request(res.request_key);
        const result=await this.result(res.request_key);
        this.userAccountAddress = result.klaytn_address;
        return this.userAccountAddress;
    }


    async getAccountTokenBalance(): Promise<Number> {
        return this.tokenContract.methods.balanceOf(await this.getWallet()).call();
    }
    async getTokeninfoURL(tokenId: Number): Promise<String> {
        return this.tokenContract.methods.tokenURI(tokenId).call();
    }
    async getAllTokenOfOwner(balance:Number): Promise<Number[]> {
        let list=[];
        for (var i = 0; i < balance; i++) {
           
                var tokenId = await this.getTokenOfOwnerByIndex(
                    i
                );
                list.push(tokenId);
                console.log("TestKaikas testGetAllTokenOfOwner", tokenId);
            
        }
        return list;
    }
    async getTokenOfOwnerByIndex(index: Number): Promise<Number> {
        return this.tokenContract.methods.tokenOfOwnerByIndex(await this.getWallet(), index).call();
    }

    private KlayToPeb(price) {
        return this.cav.utils.toPeb(price, 'KLAY');
    };
    async approve(): Promise<Boolean> {
        const bappName = this.bappName;
        const from = this.getWallet();//반드시 필요하지는 않은 옵션. 원하는 계정과 실제 인증계정이 같은지를 테스트하기 위함임. 인자로 받을지 말지?
        const abisetApproved = "{\"constant\": false,\"inputs\": [{\"name\": \"to\",\"type\": \"address\"},{\"name\": \"approved\",\"type\": \"bool\"}],\"name\": \"setApprovalForAll\",\"outputs\": [],\"payable\": false,\"stateMutability\": \"nonpayable\",\"type\": \"function\"}";
        const to = this.salesContractAddress;
        const value = "0";
        const params = "[\"" + this.salesContractAddress + "\",true]";
        const successLink = '';
        const failLink = '';

        const request_key = await this.prepareExcuteContract(bappName, from, to, value, abisetApproved, params, successLink, failLink);
        this.request(request_key);
        const result = this.result(request_key);


        return result;
    }
    async setSaleOnCont(tokenId: Number, price: Number): Promise<Boolean> {

        const bappName = this.bappName;
        const from = this.getWallet();//반드시 필요하지는 않은 옵션. 원하는 계정과 실제 인증계정이 같은지를 테스트하기 위함임. 인자로 받을지 말지?
        const abisetForSale = "{\"constant\":false,\"inputs\":[{\"name\":\"_tokenId\",\"type\":\"uint256\"},{\"name\":\"_price\",\"type\":\"uint256\"}],\"name\":\"setForSale\",\"outputs\":[],\"payable\":false,\"stateMutability\":\"nonpayable\",\"type\":\"function\",\"signature\":\"0x17fcfe22\"}"
        const to = this.salesContractAddress;
        const value = "0";
        const params = "[\"" + tokenId + "\",\"" + price + "\"]";
        const successLink = '';
        const failLink = '';

        const request_key = await this.prepareExcuteContract(bappName, from, to, value, abisetForSale, params, successLink, failLink);
        this.request(request_key);
        const result = this.result(request_key);


        return result;
    }
    async getTokenPrice(tokenId: Number): Promise<Number> {
        return await this.salesContract.methods.tokenPrice(tokenId).call();
    }
    async buyToken(tokenId: Number, price: Number): Promise<boolean> {
        const bappName = this.bappName;
        const from = this.getWallet();//반드시 필요하지는 않은 옵션. 원하는 계정과 실제 인증계정이 같은지를 테스트하기 위함임. 인자로 받을지 말지?
        const abipurchaseToken = "{ \"constant\": false, \"inputs\": [ { \"name\": \"_tokenId\", \"type\": \"uint256\" } ], \"name\": \"purchaseToken\", \"outputs\": [], \"payable\": true, \"stateMutability\": \"payable\", \"type\": \"function\", \"signature\": \"0xc2db2c42\" }"
        const to = this.salesContractAddress;
        const value = price;
        const params = "[\"" + tokenId + "\"]";
        const successLink = '';
        const failLink = '';

        const request_key = await this.prepareExcuteContract(bappName, from, to, value, abipurchaseToken, params, successLink, failLink);
        this.request(request_key);
        const result = this.result(request_key);


        return result;
    }



    async prepareExcuteContract(bappName, from, to, value, abi, params, successLink, failLink) {
        const request_key = '';
        const res = await prepare.executeContract({ bappName, from, to, value, abi, params, successLink, failLink })
        if (res.err) {
            console.log(res.err);
        } else if (res.request_key) {
            return await res.request_key;
        }

    }

    request(request_key: string) {
        request(request_key, () => alert('모바일 환경에서 실행해주세요'));
        this.sleep(13000);
        //TODO 클립앱에서 다시 웹으로 돌아오는것 확인하는 방법찾기
    }
    private sleep(ms) {
        const wakeUpTime = Date.now() + ms;
        while (Date.now() < wakeUpTime) { }
    };

    async result(request_key: string) {
        try {
            const res = await getResult(request_key);

            if (res.status == 'completed') {
                console.log(res.result);
                return res.result;
            }

            console.log(res);
            throw new Error("get result fail");

        } catch (e) {
            console.log('excute getResult error');
            console.log(e);
            throw new Error(e);
        }
    }




}

export=KlipNftTransaction;