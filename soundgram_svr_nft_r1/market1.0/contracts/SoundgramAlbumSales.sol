pragma solidity 0.5.6;

import "../node_modules/@klaytn/contracts/token/KIP17/KIP17Full.sol";

contract SoundgramAlbumSales {
  KIP17Full public nftAddress;

  mapping(uint256 => uint256) public tokenPrice;

  constructor(address _tokenAddress) public {
      nftAddress = KIP17Full(_tokenAddress); //YTT 주소를 넘김. 컨트랙에 있는 함수 사용 가능.
  }

  function setForSale(uint256 _tokenId, uint256 _price) public {
      address tokenOwner = nftAddress.ownerOf(_tokenId);    //public, external 함수만 이렇게 호출 가능
      require(tokenOwner == msg.sender, "caller is not token owner");
      require(_price > 0, "price is zero or lower");
      require(nftAddress.isApprovedForAll(tokenOwner,address(this)), "token owner did not approve TokenSales contract");

      tokenPrice[_tokenId] = _price; //특정 토큰의 가격 저장.
  }

  function purchaseToken(uint256 _tokenId) public payable {
      uint256 price = tokenPrice[_tokenId];
      address tokenSeller = nftAddress.ownerOf(_tokenId);

      require(msg.value >= price, "caller sent klay lower than price"); //가격 이상의 비용을 지불해야 함.
      require(msg.sender != tokenSeller, "caller is token seller");    //본인은 구매 불가
      address payable payableTokenSeller = address(uint160(tokenSeller));

      payableTokenSeller.transfer(msg.value);

      nftAddress.safeTransferFrom(tokenSeller, msg.sender, _tokenId); //tokenSeller->구매자 토큰 전송
      tokenPrice[_tokenId] = 0;
  }

  function removeTokenOnSale(uint256 _tokenId) public {
      address tokenSeller = nftAddress.ownerOf(_tokenId);
      require(msg.sender == tokenSeller, "caller is not tokenSeller");
      tokenPrice[_tokenId] = 0;
  }
}