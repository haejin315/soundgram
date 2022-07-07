<?php
include_once "./db_connection.php";

$nfckey = $_GET['nfckey'];

//get nfc_status for nfckey
$query_update_status = "UPDATE APIServer_nfckey SET nft_status=1 WHERE nfckey='$nfckey';";
sql_query($query_update_status);

$result['temp']='1234';
$result['query']=$query_update_status;
echo($result);
?>