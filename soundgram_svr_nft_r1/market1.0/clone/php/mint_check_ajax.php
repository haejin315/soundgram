<?php
include_once "./db_connection.php";

$nfckey = $_GET['nfckey'];

//get nfc_status for nfckey
$query_is_minted = "SELECT nft_status FROM APIServer_nfckey WHERE nfckey='$nfckey';";
$result_nft_status = sql_query($query_is_minted);

if($nft_status=!$result_nft_status->fetch_assoc()){
   $nft_status = -1;
}

$result['nfc_status'] = $nft_status;
$result['query'] = $query_nfc_album;

echo(json_encode($result));
?>