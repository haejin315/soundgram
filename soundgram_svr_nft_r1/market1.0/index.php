<!DOCTYPE html>
<!-- saved from url=(0032)explore.html -->
<html lang="en">
    <head>


    <!--for develop no cache-->
    <meta http-equiv="Pragma" content="no-cache"> <!-- ← HTTP 1.0에서 사용하던 방법 -->
 <meta http-equiv="Cache-Control" content="no-cache">
 <meta http-equiv="Expires" content="0"/>
<!--for develop no cache-->
    
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><link rel="icon" href="https://krafter.space/favicon.svg" sizes="16x16"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="./KrafterSpace_files/nanumbarungothicsubset.css"><script async="" src="./KrafterSpace_files/js"></script>
        <script>
            function gtag() {
                dataLayer.push(arguments)
            }
            window.dataLayer = window.dataLayer || [],
            gtag("js", new Date),
            gtag("config", "G-63RPZ7W1G4", {
                page_title: window.location.pathname,
                page_location: window.location.href,
                page_path: window.location.pathname
            })
        </script>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        
        <script src="./index.js"></script>

        <title>SoundgramNFT</title>
    </head>
    <body style="min-width: 1440px; background-color: rgb(249, 251, 253);">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
            <div class="Toastify"></div>
            <nav class="navbar navbar-expand navbar-light bg-light sticky-top">
                <div class="container">
                    <a href="index.html" class="navbar-brand">
                            <img src="nav_logo.png" alt="soundgram"/>
                    </a>
                <button
                    aria-controls="responsive-navbar-nav"
                    type="button"
                    aria-label="Toggle navigation"
                    class="navbar-toggler collapsed"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <button type="button" 
                                    class="btn btn-default btn-xs-block" 
                                    onclick="App.klipTest()">
                                    Klip Test
                        </button>
                    <div class="navbar-collapse collapse" id="responsive-navbar-nav">
                        <div class="ml-auto navbar-nav">
                            <a href="index.html" class="nav-link active">ON Sale</a>
                            <div style="display: none;">
                                <div></div>
                            </div>
                            <a href="myNfts.html" class="nav-link" id="myNfts" style="display: none;">My NFTs</a>
                            <button type="button" 
                                    class="btn-sm btn btn-primary" 
                                    id="login" 
                                    data-toggle="modal"
                                    style="display: none;"
                                    data-target="#loginModal">
                                    로그인
                            </button>
                            <button type="button"
                                    class="btn-sm btn btn-primary"
                                    id="logout" 
                                    style="display: none;"
                                    onclick="App.handleLogout()">
                                    로그아웃
                            </button>
                        </div>
                        

                        <div class="navbar-nav" style="margin-left: 1.5rem;">
                            <!-- <a
                                class="btn-sm btn btn-primary"
                                href="/ko/login?org=%2Fko%2Fexplore"
                                style="font-weight: bold; color: #fff"
                            >로그인</a> -->
                        </div>
                    </div>
                </div>
            </nav>
            <div class="explore-banner">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="explore-banner-title">
                                당신의 음악을<br />
                                NFT로 소장하세용.
                            </div>
                            <div class="explore-banner-body">
                                <span>Start creating your own NFT <br /></span>
                                <span>with soundgram chipdisc NFT. <br /></span>
                            </div>
                            <div style="display: none">
                                <div></div>
                            </div>
                            <button type="button" 
                                    class="explore-banner-btn btn btn-primary"                                     
                                    data-toggle="modal"
                                    data-target="#mintModal">
                                NFT 발행
                            </button>
                        </div>
                        <div class="col"></div>
                    </div>
                </div>
            </div>
            <div class="notice-popup" style="display: none;">
                <div class="notice-popup-header">
                    <span></span>
                </div>
                <div class="notice-popup-body"></div>
                <div class="notice-popup-footer">
                    <input 
                        id="popupCheckBox" 
                        class="notice-popup-check" 
                        type="checkbox"
                    ><label for="popupCheckBox">Don't open this window for a day</label>
                    <button>Close</button>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="all-nft-list-title">판매중인 앨범</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="container" id="card_container">
                            <!--정보를 불러와 앨범 card가 추가될 container-->
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="text-center col">
                        <button
                        type="button"
                        class="btn-sm btn btn-kns-outline"
                        style="margin-top: 64px"
                        >
                        More
                        </button>
                    </div>
                </div>
                <div class="row" style="padding-bottom: 160px;"></div>
            </div>
            <div>
                <div style="vertical-align: bottom">
                <div class="footer-wrapper">
                    <div class="container">
                    <div class="row">
                        <img
                        src="nav_logo.png"
                        alt="soundgram"
                        class="nav_logo"
                        />
                    </div>
                    <div class="row" style="margin-bottom: 8px">
                        <span class="footer"
                        >© SoundGram. 2020. All Rights Reserved.
                        </span>
                    </div>
                    <div class="row">
                        <span class="footer"
                        >(주)사운드그램
                        <div class="footer-divider">|</div>
                        대표 : 박미연
                        <div class="footer-divider">|</div>
                        사업자등록번호 : 477-88-01191
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>

    <!--Login Modal-->
    <div class="modal fade" tabindex="-1" role="dialog" id="loginModal">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">         
                <div class="modal-body">
                    <div class="form-group">
                        <label for="keystore">Keystore</label>
                        <input type="file" id="keystore" onchange="App.handleImport()">
                    </div>
                    <div class="form-group">
                        <label for="input-password">비밀번호</label>
                        <input type="password" class="form-control" id="input-password" onchange="App.handlePassword()">
                        <p class="help-block" id="message"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
                    <button type="button" class="btn btn-primary" onclick="App.handleLogin()">제출</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="mintModal">
        <div class="modal-dialog modal-sm">
        <div class="modal-content mc">         
                <div class="modal-body">
                    <div class="form-group">
                        <label for="keystore">NFC Key</label>
                        <input type="text" class="form-control" id="i_nfckey" onchange="">
                    </div>
                    <div class="form-group">
                        <label for="input-password">Serial Key</label>
                        <input type="text" class="form-control" id="i_serial" onchange="">
                        <p class="help-block" id="message"></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
                    <button type="button" class="btn btn-primary" onclick="App.registAlbum(this)">제출</button>
                </div>
            </div><!-- /.modal-content -->
        </div>
    </div>
    </body>
</html>