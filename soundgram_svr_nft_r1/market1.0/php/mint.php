<?php
    $ch = curl_init();
	
	curl_setopt($ch, CURLOPT_URL, 'https://api.klipwallet.com/v2/wallet/mint');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_POST, 1);
	$post = array(
		'file' => '@' .realpath('./mint_info.json')
	);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $post);

	$headers = array();
	$headers[] = 'Authorization: ACCESS_TOKEN';
	$headers[] = 'Content-Type: application/json';
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

	$result = curl_exec($ch);
	if (curl_errno($ch)) {
		echo 'Error:' . curl_error($ch);
	}
	curl_close($ch);
?>