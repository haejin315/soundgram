<?php
include_once "./db_connection.php";

$nfckey = 'test8988';
$serial = '0000-0001-8888';

$addr = '0x3ad938c97ed134fc0d978e2148ee082cf98ed26a';

$query_get_user_id = "SELECT id FROM APIServer_user WHERE user_wallet_addr = '$addr';";
$result_get_user_id = sql_query($query_get_user_id);
echo($query_get_user_id);

$user_id = $result_get_user_id->fetch_assoc();
echo($user_id);
$user_id = $user_id['id'];
echo($user_id);

// $query_update_status = "UPDATE APIServer_nfckey SET nft_token_id = $token_id, nft_status=1, user_id=$user_id, minting_time=NOW(), active=1, active_date=NOW()  WHERE nfckey='$nfckey';";
// sql_query($query_update_status);

// $result['query']=$query_update_status;
// echo(json_encode($result));

?>