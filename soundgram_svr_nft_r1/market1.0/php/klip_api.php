<?php

$curl = curl_init();

$header = array(
  "Content-Type: application/jason",
  "Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTY2NjcwMCwiZXhwIjoxNjQyNDc5ODIwfQ.zhqpd5cGarTcgHbmVch-0GQfSKlHGPiUZkQpOkiAYms"
);

curl_setopt($curl, CURLOPT_URL, 'https://api.klipwallet.com/v2/wallet/nft/137');
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_ENCODING, '');
curl_setopt($curl, CURLOPT_MAXREDIRS, 10);
curl_setopt($curl, CURLOPT_TIMEOUT, 0);
curl_setopt($curl, CURLOPT_FOLLOWLOCATION, false);
curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'GET');
curl_setopt($curl, CURLOPT_HTTPHEADER, $header);

// curl_setopt_array($curl, array(
//   CURLOPT_URL => 'https://api.klipwallet.com/v2/wallet/nft/137',
//   CURLOPT_RETURNTRANSFER => true,
//   CURLOPT_ENCODING => '',
//   CURLOPT_MAXREDIRS => 10,
//   CURLOPT_TIMEOUT => 0,
//   CURLOPT_FOLLOWLOCATION => false,
//   CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
//   CURLOPT_CUSTOMREQUEST => 'GET',
//   CURLOPT_HTTPHEADER => array(
//     'Content-Type: application/json',
//     'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6MTY2NjcwMCwiZXhwIjoxNjQyNDc5ODIwfQ.zhqpd5cGarTcgHbmVch-0GQfSKlHGPiUZkQpOkiAYms'
//   ),
// ));

$response = curl_exec($curl);

curl_close($curl);
echo $response;