<?php
include_once "./db_connection.php";

function order_4_items($data, $count){
    for($i = 0; $i < $count; $i=$i+1)
	{
    if(substr($data[$i]['album_cover'],0,6)==="album/"){
        console.log($data, $i);
        //$album_img[$i] = "./php/{$data[$i]['album_cover']}";
        $album_img[$i] = "https://nftconsole.soundgram.co.kr/media/{$data[$i]['album_cover']}";
        
    }else{
      //$album_img[$i] = "./php/album/{$data[$i]['id']}/{$data[$i]['album_cover']}";
      $album_img[$i] = "https://nftconsole.soundgram.co.kr/media/album/{$data[$i]['id']}/{$data[$i]['album_cover']}";

    }
    $token_id_input[$i]="
    <input type='number' class='token_id' value={$data[$i]['nft_token_id']} style='display: none;'>"; //

  }
	
  $template = "
  <div class='row flex-row flex-nowrap card-deck'>";

  for($i = 0; $i < $count; $i=$i+1)
  {
      $template .= "
      <div class='nft-preview-card card' style='z-index: 1; min-width: 290px; background-color: rgb(220, 230, 240);'>
        <table class='clickable img' style='width: 290px; height: 290px;'>
            <tbody>
                <tr>
                    <td class='text-center' style='padding: 29px;'><img loading='lazy' src='{$album_img[$i]}' alt='' style='margin-left: auto; background-color: rgb(220, 230, 240); width: 232px; height: 232px;'></td>
                </tr>
            </tbody>
        </table>
        <div class='card-body cb'>
            <table style='margin: 20px 24px 0px;'>
                <tbody>
                    <tr>
                        <td class='nft-desc-section' style='width: 186px;'>
                            <a href='https://krafter.space/en/nft/0x9faccd9f9661dddec3971c1ee146516127c34fc1/0x9fd260f6' style='text-decoration: none;'>
                                <div class='text-ellipsis card-title h5' style='width: 186px;'>{$data[$i]['album_name']}</div>
                            </a>
                            <a href='' style='text-decoration: none;'>
                                <p class='card-text'>
                                    <span style='width: 300px;'>Artist
                                        <span class='author text-ellipsis' style='width: 120px; display: inline-block; vertical-align: bottom;'>{$data[$i]['artist_name']}</span>
                                    </span>
                                    <br/>
                                    <span style='width: 195px;'>  Seller
                                        <span class='author text-ellipsis' style='width: 120px; display: inline-block; vertical-align: bottom;'>{$data[$i]['user_nick']}</span>
                                    </span>
                                </p>
                                
                            </a>
                            <input type='text' class='nfckey' value='{$data[$i]['nfckey']}' style='display: none;'>
                            <input type='text' class='nfckey_id' value='{$data[$i]['nfckey_id']}' style='display: none;'>
                            <input type='text' class='album_id' value='{$data[$i]['id']}' style='display: none;'>
                            $token_id_input[$i]
                        </td>
                        <td class='nft-desc-section' style='width: 16px;'></td>
                        <td class='nft-desc-section'>
                            <a href='https://krafter.space/en/userInfo/0xa56170a5369d5cbe3af15fae79cf47a96771ba92' style='text-decoration: none;'>
                                <div class='profile-thumb ' style='background-image: url(&quot;/images/profile.svg&quot;);'></div>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table style='margin: 0px 24px 12px; width: 242px;'>
                <tbody>
                    <tr>
                        <td class='like-section'>
                            <div class='like-btn' onclick='myNfts.mint()'>
                                <div style='display: none;'>
                                    <div></div>
                                </div>
                                <span style='cursor: pointer;'>
                                    <svg width='16' height='16' viewbox='0 0 24 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path fill-rule='evenodd' clip-rule='evenodd' d='M14.4619 1.49324C15.2507 1.1664 16.0961 0.998169 16.95 0.998169C17.8038 0.998169 18.6493 1.1664 19.4381 1.49324C20.2268 1.82003 20.9434 2.29897 21.5469 2.90272C22.1507 3.50627 22.63 4.22318 22.9567 5.01185C23.2836 5.80066 23.4518 6.64614 23.4518 7.49999C23.4518 8.35384 23.2836 9.19933 22.9567 9.98814C22.6299 10.7769 22.1509 11.4935 21.5471 12.0971C21.547 12.0972 21.5472 12.097 21.5471 12.0971L12.7071 20.9371C12.3166 21.3276 11.6834 21.3276 11.2929 20.9371L2.45289 12.0971C1.23366 10.8779 0.548706 9.22424 0.548706 7.49999C0.548706 5.77574 1.23366 4.12212 2.45289 2.90289C3.67212 1.68366 5.32575 0.998704 7.05 0.998704C8.77425 0.998704 10.4279 1.68366 11.6471 2.90289L12 3.25578L12.3527 2.90305C12.3528 2.903 12.3527 2.90311 12.3527 2.90305C12.9563 2.29923 13.6731 1.82006 14.4619 1.49324ZM16.95 2.99817C16.3589 2.99817 15.7735 3.11463 15.2274 3.34091C14.6813 3.56719 14.1852 3.89885 13.7673 4.31694L12.7071 5.3771C12.3166 5.76763 11.6834 5.76763 11.2929 5.3771L10.2329 4.3171C9.38873 3.47295 8.24381 2.9987 7.05 2.9987C5.85618 2.9987 4.71126 3.47295 3.8671 4.3171C3.02295 5.16126 2.54871 6.30618 2.54871 7.49999C2.54871 8.69381 3.02295 9.83873 3.8671 10.6829L12 18.8158L20.1329 10.6829C20.551 10.265 20.8828 9.76866 21.1091 9.22256C21.3354 8.67645 21.4518 8.09112 21.4518 7.49999C21.4518 6.90887 21.3354 6.32353 21.1091 5.77743C20.8828 5.23133 20.5511 4.73516 20.1331 4.31727C19.7152 3.89918 19.2187 3.56719 18.6726 3.34091C18.1265 3.11463 17.5411 2.99817 16.95 2.99817Z' fill='#2D3741' fill-opacity='0.7'></path>
                                    </svg>
                                </span>&nbsp;0</div>
                        </td>
                        <td class='like-section text-right'>
                            <div class='dropdown'>
                                <a href='explore.html' style='z-index: 1000;'><img src='ellipsis-icon.6098394b.svg'></a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div id=price></div>
            <button type='button' class='btn' onclick='App.buy(this)'>구매</button>
        </div>
        <div style='display: none;'>
            <div></div>
        </div>
    </div>";
}

  for($i = 0; $i < 4-$count; $i=$i+1) {
      $template.="
      <div class='card' style='z-index: -1; background-color: transparent; border: 0px;'></div>";
  }

  $template .="
  </div>";
  return $template;
}

$query_nfc_album = "SELECT album.id, album.album_name, album.album_cover, artist.artist_name, user.user_nick, nfc.nfckey, nfc.nft_token_id, nfc.id AS nfckey_id
					FROM (APIServer_album AS album JOIN (APIServer_user AS user JOIN APIServer_nfckey AS nfc ON nfc.user_id=user.id) ON album.id = nfc.album_id) JOIN APIServer_artist AS artist ON album.artist_id = artist.id
                    WHERE nft_status=2";
 
 $result_nfc_album = sql_query($query_nfc_album);
 $idx = $result_nfc_album->num_rows;
 $total = $idx;
 $result_table = '';
 $count=0;
 while($data = $result_nfc_album->fetch_assoc()){
    
    $data_arr[$count] = $data;
    $count = $count + 1;

    if($count == 4) {
        $result_table .= order_4_items($data_arr, $count);
        $count=0;
    }
    // if($data == null) {
    //     
    // }

 }

 if($count != 0){
    $result_table .= order_4_items($data_arr, $count);
 }

$result['query'] = $query_nfc_album;
$result['html'] = $result_table;

echo(json_encode($result));
?>
