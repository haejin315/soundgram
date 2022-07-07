const password="dd33e151663db4eb8b372514172439df4c2b57cb6d7f60e515256b7df6f3ac6a";
const pin = "29a7a0a9ae2d4cdb091b05340f671f786adf5cac20121ba89388bb8e8a27c4b4";
const email="soundgram.g@gmail.com";
const authorization="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTY2NjcwMCwiZXhwIjoxNjU0Njk3OTMyfQ.1H-noDM0lGdcTNBzOlHvGxxrVBydUEXkxH_pzWaapYA";
const klaytn_address = '0x4F563dBd15A8f6c51E5d74aB92b34b8E9bcaa914';
const contract_address = '0x8817B4883fB534E005613b5f36ad3960906C604f';
const soundgram_contract_address = '0xd6646EA5152b9d8e244a4d24027D1D4f5Abc0Ee5';
const soundgram_contract_ABI = '[{"constant":true,"inputs":[],"name":"nftAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x5bf8633a"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tokenPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xd4ddce8a"},{"inputs":[{"name":"_tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor","signature":"constructor"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"},{"name":"_price","type":"uint256"}],"name":"setForSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x17fcfe22"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"purchaseToken","outputs":[],"payable":true,"stateMutability":"payable","type":"function","signature":"0xc2db2c42"},{"constant":false,"inputs":[{"name":"_tokenId","type":"uint256"}],"name":"removeTokenOnSale","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xae068e92"}]';
const name = '(주)사운드그램';
const service_name = '사운드그램 칩디스크';
const phone = '01024132346';
const status = 1;

const testHajineKlip = "0x4B74E875E4A5Dfb2780A11A4BbB08A4c66b93AC6";
const testPariKlip = "0x268AC54215cBEFaB5270742805D68015fc7933c7";
const testKlip = "0x0000000000000000000000000000000000000000";

exports.password=password;
exports.pin = pin;
exports.email = email;
exports.authorization=authorization;
exports.klaytn_address = klaytn_address;
exports.contract_address = contract_address;
exports.soundgram_contract_address = soundgram_contract_address;
exports.soundgram_contract_ABI = soundgram_contract_ABI;
exports.name = name;
exports.service_name = service_name;
exports.phone = phone;
exports.status = status;


exports.testHajineKlip = testHajineKlip;
exports.testPariKlip = testPariKlip;
exports.testKlip = testKlip;
