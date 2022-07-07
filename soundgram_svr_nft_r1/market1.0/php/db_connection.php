<?php
//201111 sh - db url edit 
// $host = '211.253.11.149:3306';
$host = 'localhost';
#$host = '211.251.236.130';
#$host='localhost';
$user = 'root';
$pw = '1tkddydwkdql';
//$dbname = 'soundcs';
//$dbname = 'soundgram';
$dbname = 'soundgramN1';
$mysqli_ = new mysqli($host, $user, $pw, $dbname);
$mysqli_->set_charset("utf8");

function sql_query($sql){
	global $mysqli_;
	return $mysqli_->query($sql);
}
function sql_err(){
	global $mysqli_;
	echo("SQL error : " . $mysqli_->error ."\n");
}
function sql_get_id(){
	global $mysqli_;
	return $mysqli_->insert_id;
}
?>
