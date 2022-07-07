<?php
   include_once "./db_connection.php";

   $addr = $_POST['wallet_addr'];
   
   $query_get_user_info = "SELECT id, user_nick, user_img FROM APIServer_user WHERE user_wallet_addr='$addr';";
   $result_get_user_info = sql_query($query_get_user_info);
   $result_get_user_info = $result_get_user_info->fetch_assoc();
   $result['name'] = $result_get_user_info['user_nick'];
   $result['id'] = $result_get_user_info['id'];
   $result['img'] = $result_get_user_info['user_img'];
   $result['query']=$query_get_user_info;

   echo(json_encode($result));
?>