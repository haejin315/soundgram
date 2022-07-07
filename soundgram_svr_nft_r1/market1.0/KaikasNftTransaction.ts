import * as Transaction from './NftTransaction';

class KaikasNftTransaction implements Transaction.NftTransaction{
    mintNft(): boolean {
        throw new Error("Method not implemented.");
    }
    getNftList(): String {
        throw new Error("Method not implemented.");
    }
    sendNft(): boolean {
        throw new Error("Method not implemented.");
    }
    sendKlay(): boolean {
        throw new Error("Method not implemented.");
    }


    
}