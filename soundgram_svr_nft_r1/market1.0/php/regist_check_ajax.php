<?php
include_once "./db_connection.php";

$nfckey = $_GET['nfckey'];
$serial = $_GET['serial'];

//get nfc_status for nfckey
$query_key_state = "SELECT nfckey.active, nfckey.album_id
FROM APIServer_nfckey AS nfckey JOIN APIServer_nfcsecuritynum AS sec ON nfckey.securitynum_id = sec.id 
WHERE nfckey.nfckey='$nfckey' AND sec.securitynum='$serial';";

$result_key_state = sql_query($query_key_state);


if($data = $result_key_state->fetch_assoc()) {
    $result['active']= $data['active'];
}
else {
    $result['active']= '-1';
}
$result['album_id'] = $data['album_id'];
$result['query'] = $query_key_state;

echo(json_encode($result));
?>