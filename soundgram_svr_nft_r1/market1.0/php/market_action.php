<?php
 include_once "./db_connection.php";

 $act_user_id = $_POST['user_id'];
 $act_user_wallet = $_POST['user_wallet'];
 $album_id = $_POST['album_id'];
 $nfckey_id = $_POST['nfckey_id'];
 $token_id = $_POST['token_id'];
 $action_type = $_POST['action_type'];


 $partial_query_update = "";
 $partial_query_history = "";

    //act - nonact user로 나눌지, src dst 유저로 나눌지 고민.
 $val_user = "$act_user_id, '$act_user_wallet', ";

 if($action_type == 4 || $action_type == 5) {
    $get_user_info_query = "SELECT user.id AS user_id, user.user_wallet_addr 
                            FROM APIServer_user AS user JOIN APIServer_nfckey AS nfckey ON user.id=nfckey.user_id 
                            WHERE nfckey.id=$nfckey_id;";

    $get_user_info_result = sql_query($get_user_info_query);
    $user_info = $get_user_info_result->fetch_assoc();
 } else if ($action_type == 6 || $action_type == 7) {
    $get_user_info_query = "SELECT user.id AS user_id, user.user_wallet_addr
                            FROM APIServer_user AS user JOIN APIServer_nfckey AS nfckey ON user.id=nfckey.buyer_id 
                            WHERE nfckey.id=$nfckey_id;";

    $get_user_info_result = sql_query($get_user_info_query);
    $user_info = $get_user_info_result->fetch_assoc();
 }
    //구매 요청과 취소의 경우 (4,5)
    //action user는 dst. nft 소유자는 src
    //구매 거절의 경우 6
    //action user는 src. 구매희망자는 dst. 여기서 구매희망자의 정보는 nfckey table의 buyer에 있다.
    //거래 성사의 경우 7
    //action user는 최종 승인한 원소유자. src. 구매자가 dst. 역시 buyer에서 가져와야함.
 

 
 switch($action_type) { //act     status   update_data   act_user_is
    case 1:             //발행.    0->1        dst          dst
        $status=1;
        $partial_query_update .= "nft_token_id=$token_id, "."nft_active_date=NOW(), ";
        $partial_query_history.= "NULL, NULL, ".$val_user;
        break;
    case 2:             //판매등록  1->2       src          src
        $status=2;
        $partial_query_history.= $val_user."NULL, NULL, ";
        break;
    case 3:             //판매취소  2->1       src          src
        $status=1;
        $partial_query_history.= $val_user."NULL, NULL, ";
        break;
    case 4:             //구매요청  2->3     src/dst        dst
        $status=3;
        $partial_query_update .= "buyer_id=$act_user_id,";
        $partial_query_history.= "$user_info[user_id], '$user_info[user_wallet_addr]', ".$val_user;
        break;
    case 5:             //구매취소  3->2     src/dst        dst
        $status=2;
        $partial_query_update .= "buyer_id=NULL,";
        $partial_query_history.= "$user_info[user_id], '$user_info[user_wallet_addr]', ".$val_user;
        break;
    case 6:             //구매(거절)3->2     src/dst        src
        $status=2;
        $partial_query_update .= "buyer_id=NULL,";
        $partial_query_history.= $val_user."$user_info[user_id], '$user_info[user_wallet_addr]', ";
        break;
    case 7:             //구매성공  3->1     src/dst        src
        $status=1;
        $partial_query_update .= "user_id = $user_info[user_id], buyer_id=NULL,";
        $partial_query_history.= $val_user."$user_info[user_id], '$user_info[user_wallet_addr]', ";
        break;
    default:
        break;
 }

 $query_update_nfckey = "UPDATE APIServer_nfckey
                        SET nft_status=$status, ".$partial_query_update."nft_update_date=NOW()
                        WHERE id=$nfckey_id;";
 $query_insert_history = "INSERT INTO APIServer_nft_history(album_id, nfckey_id, nft_token_id, 
                                                        action_user_id, src_user_id, src_user_wallet_addr,
                                                        dst_user_id, dst_user_wallet_addr, 
                                                        action_type, action_date)
                          VALUES($album_id, $nfckey_id, $token_id, $act_user_id, ".$partial_query_history."$action_type, NOW());";
 sql_query($query_update_nfckey);
 sql_query($query_insert_history);

 $result['query1'] = $query_update_nfckey;
 $result['query2'] = $query_insert_history;
 echo(json_encode($result));
?>