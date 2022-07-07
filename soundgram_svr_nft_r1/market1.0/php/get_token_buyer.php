<?php
   include_once "./db_connection.php";

   $token = $_GET['token_id'];
   
   $query_get_user_info = "SELECT buyer_id FROM APIServer_nfckey WHERE nft_token_id='$token';";
   $result_get_user_info = sql_query($query_get_user_info);
   $result_get_user_info = $result_get_user_info->fetch_assoc();
   $result['TokenBuyer'] = $result_get_user_info['buyer_id'];

   echo(json_encode($result));
?>