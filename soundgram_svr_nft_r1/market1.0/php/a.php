<?php
   include_once "./db_connection.php";

   $user_id = $_GET['user_id'];

   $query_get_user_info = "SELECT user_wallet_addr FROM APIServer_user WHERE id='$user_id';";
   $result_get_user_info = sql_query($query_get_user_info);
   $result_get_user_info = $result_get_user_info->fetch_assoc();
   $result['addr'] = $result_get_user_info['user_wallet_addr'];
   echo(json_encode($result));
?>