pragma solidity 0.5.6;

import "../app/node_modules/@klaytn/contracts/token/KIP17/KIP17Full.sol";

contract soundgramAlbumToken is KIP17Full {

    address deployer;

    struct AlbumInfo {
        string albumKey;    //앨범 키
        uint256 albumCode;  //앨범 종류
        uint256 number;     //해당 앨범 code의 넘버링
                            //추가? 
    }

    mapping (uint256 => AlbumInfo) tokenInfo;    //토큰아이디 => 앨범 정보 매핑
    mapping (string => uint256) activateKey; //발행된 키 매핑. 키=>토큰아이디
    mapping (uint256 => uint256[]) tokensByAlbum; //앨범 종류별 발행된 Token Id 매핑

    constructor(string memory name, string memory symbol) KIP17Full(name,symbol) public { deployer=msg.sender; }

    /*
    앨범 발행.
    21.11.07 kyj
    11.09 albumCode와 number 코드 추가
     */
    function mintAlbum (string memory _key, uint256 _albumCode) public {
        require(activateKey[_key] == 0, "Used Key");   //발행되지 않은 키여야 함.

        uint256 tokenId = totalSupply().add(1);         //enumerable의 총 발행된 토큰 개수 + 1 반환
        
        tokensByAlbum[_albumCode].push(tokenId);
        tokenInfo[tokenId] = AlbumInfo(_key, _albumCode, tokensByAlbum[_albumCode].length);
        activateKey[_key] = tokenId;

        _mint(msg.sender, tokenId);
    }
    /*
    지갑주소로 앨범 발행.
    발행 요청을 서버에서 처리한다면, 함수 호출자가 아닌 요청 지갑 주소로 발행해야함
    21.11.09 kyj
     */
    function mintAlbumWithAddress (address _to, string memory _key, uint256 _albumCode) public {
        require(activateKey[_key] == 0, "Used Key");
        require(msg.sender==deployer, "only deployer can use this function");

        uint256 tokenId = totalSupply().add(1);         
        
        tokensByAlbum[_albumCode].push(tokenId);
        tokenInfo[tokenId] = AlbumInfo(_key, _albumCode, tokensByAlbum[_albumCode].length);
        activateKey[_key] = tokenId;
        
        _mint(_to, tokenId);
    }
    /*
    웹(앱)의 display에 필요한 앨범 정보를 받아올 함수.
    21.11.07 kyj : key값만 저장한다면 해당 함수는 필요 X
    21.11.09 kyj : albumCode, Number 반환.
    */
    function getTokenInfo(uint256 _tokenId) public view returns(uint256, uint256){
        return (tokenInfo[_tokenId].albumCode, tokenInfo[_tokenId].number);
    }
    /*
    albumCode 별 모든 토큰 정보를 받아올 함수.
    21.11.09 kyj : 필요할지 모르겠음. (모든 토큰을 받은 뒤 앱에서 정리하기?)
    */
    function getTokensByAlbumCode(uint256 _code) public view returns(uint256[] memory) {
        return tokensByAlbum[_code];
    }
    /*
    사용된 키인지 확인. 
    21.11.09 kyj
    */
    function isUsedKey(string memory _albumKey) public view returns(bool) {
        return !(activateKey[_albumKey] == 0);
    }
}