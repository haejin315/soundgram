export interface NftTransaction{
    getWallet():Promise<String>;
    getAccountTokenBalance():Promise<Number>;
    getTokeninfoURL(tokenId: Number):Promise<String>;

    getAllTokenOfOwner(balance:Number): Promise<Number[]>; //using getTokenOfOwnerByIndex and Balance

    getTokenOfOwnerByIndex(index:Number):Promise<Number>;

    approve(): Promise<Boolean>;

    setSaleOnCont(tokenId:Number,price:Number):Promise<Boolean>;
    getTokenPrice(tokenId:Number):Promise<Number>;
    buyToken(tokenId:Number,price:Number):Promise<Boolean>;

}