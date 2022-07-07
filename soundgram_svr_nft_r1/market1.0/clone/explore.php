<!DOCTYPE html>
<!-- saved from url=(0032)explore.html -->
<html lang="en">
    <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><link rel="icon" href="https://krafter.space/favicon.svg" sizes="16x16"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="./KrafterSpace_files/nanumbarungothicsubset.css"><script async="" src="./KrafterSpace_files/js"></script>
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

        <title>SoundgramNFT</title><link href="./KrafterSpace_files/2.b740a206.chunk.css" rel="stylesheet"><link href="./KrafterSpace_files/main.3496e4c1.chunk.css" rel="stylesheet"></head>
    <body style="min-width: 1440px; background-color: rgb(249, 251, 253);">
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root">
            <div class="Toastify"></div>
            <nav class="navbar navbar-expand navbar-light bg-light sticky-top">
                <div class="container">
                    <a href="explore.html" class="navbar-brand"><h3 style="margin-top: 16px;">Soundgram NFT Mart</h3></a>
                    <button aria-controls="responsive-navbar-nav" type="button" aria-label="Toggle navigation" class="navbar-toggler collapsed">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse collapse" id="responsive-navbar-nav">
                        <div class="ml-auto navbar-nav">
                            <a href="explore.php" class="nav-link active">Explore</a>
                            <div style="display: none;">
                                <div></div>
                            </div>
                            <a href="explore.php" class="nav-link">Create</a>
                            <a href="mynft.php" class="nav-link">My NFTs</a>
                        </div>
                        <div class="navbar-nav" style="margin-left: 1.5rem;">
                            <div class="dropdown">
                                <a href="explore.html#" style="z-index: 1000;">
                                    <div class="profile-thumb " style="background-image: url(&quot;/images/profile.svg&quot;);"></div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div class="explore-banner">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="explore-banner-title">Create Your Own NFT</div>
                            <div class="explore-banner-body">
                                <span>Creating and managing your NFTs is
                                    <br></span>
                                <span>easy and convenient with KrafterSpace<br></span>
                            </div>
                            <div style="display: none;">
                                <div></div>
                            </div>
                            <button type="button" class="explore-banner-btn btn btn-primary">Create NFT</button>
                        </div>
                        <div class="col"><img src="./KrafterSpace_files/explore_banner.svg" class="explore-banner-image"></div>
                    </div>
                </div>
            </div>
            <div class="notice-popup" style="display: none;">
                <div class="notice-popup-header">
                    <span></span>
                </div>
                <div class="notice-popup-body"></div>
                <div class="notice-popup-footer"><input id="popupCheckBox" class="notice-popup-check" type="checkbox"><label for="popupCheckBox">Don't open this window for a day</label>
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
                        <button type="button" class="btn-sm btn btn-kns-outline" style="margin-top: 64px;">More</button>
                    </div>
                </div>
                <div class="row" style="padding-bottom: 160px;"></div>
            </div>
            <div style="display: table-row;">
                <div style="display: table-cell; vertical-align: bottom;">
                    <div class="footer-wrapper">
                        <div class="container">
                            <div class="row"><img src="./KrafterSpace_files/whitelogo.svg" class="" style="margin-bottom: 32px;"><div class="ml-auto footer">
                                    <button type="button" class="footer-btn btn-sm btn btn-kns-outline">Send Feedback</button>
                                    <button type="button" class="footer-btn btn-sm btn btn-kns-outline">Contact Us</button>
                                    <div role="group" class="dropup btn-group" style="margin-right: 16px;">
                                        <button aria-haspopup="true" aria-expanded="false" type="button" class="dropdown-toggle btn btn-kns-outline btn-sm footer-dropdown-toggle">
                                            <svg width="20" height="20" viewbox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.10477 2.74144C5.14068 3.51323 2.89002 6.05262 2.54578 9.16659H5.87509C6.06192 6.86393 6.8326 4.6536 8.10477 2.74144ZM11.8953 2.74144C13.1674 4.6536 13.9381 6.86393 14.1249 9.16659H17.4542C17.11 6.05262 14.8593 3.51323 11.8953 2.74144ZM12.452 9.16659C12.2427 6.90561 11.3914 4.75153 10 2.95892C8.60861 4.75153 7.75733 6.90561 7.548 9.16659H12.452ZM7.548 10.8333H12.452C12.2427 13.0942 11.3914 15.2483 10 17.0409C8.60861 15.2483 7.75733 13.0942 7.548 10.8333ZM5.87509 10.8333H2.54578C2.89002 13.9472 5.14068 16.4866 8.10477 17.2584C6.8326 15.3462 6.06192 13.1359 5.87509 10.8333ZM11.8953 17.2584C13.1674 15.3462 13.9381 13.1359 14.1249 10.8333H17.4542C17.11 13.9472 14.8593 16.4866 11.8953 17.2584ZM10.0028 19.1666C15.0641 19.1651 19.1667 15.0616 19.1667 9.99992C19.1667 4.93731 15.0626 0.833252 10 0.833252C4.9374 0.833252 0.833344 4.93731 0.833344 9.99992C0.833344 15.0616 4.93592 19.1651 9.99727 19.1666C9.99818 19.1666 9.99909 19.1666 10 19.1666C10.0009 19.1666 10.0018 19.1666 10.0028 19.1666Z" fill="white"></path>
                                            </svg>&nbsp;&nbsp;English</button>
                                    </div>
                                </div>
                            </div>
                            <div class="row" style="margin-bottom: 8px;">
                                <span class="footer">Copyright © 2021 GroundX.  All rights reserved.<div class="footer-divider">|</div>
                                    <a class="privacy-policy-link" rel="noreferrer" target="_blank" href="https://krafter.space/en/privacyPolicy.html" style="text-decoration: none;">Privacy Policy</a>
                                    <div class="footer-divider">|</div>
                                    <a rel="noreferrer" target="_blank" href="https://krafter.space/en/termsOfService.html" style="text-decoration: none;">Terms of Service</a>
                                    <div class="footer-divider">|</div>
                                    <a rel="noreferrer" target="_blank" href="https://krafter.space/en/OperationPolicy.html" style="text-decoration: none;">Operation Policy</a>
                                </span>
                            </div>
                            <div class="row">
                                <span class="footer">GroundX Company Registration Number : 356-88-00968<div class="footer-divider">|</div>CEO : Jaesun Han<div class="footer-divider">|</div>11 Teheran-ro 98-gil, Gangnam-gu, Seoul, Republic of Korea</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <!--

        <script>
            !function (e) {
                function t(t) {
                    for (var n, f, l = t[0], i = t[1], a = t[2], c = 0, s =[]; c < l.length; c++) 
                        f = l[c],
                        Object
                            .prototype
                            .hasOwnProperty
                            .call(o, f) && o[f] && s.push(o[f][0]),
                        o[f] = 0;
                    
                    for (n in i) 
                        Object
                            .prototype
                            .hasOwnProperty
                            .call(i, n) && (e[n] = i[n]);
                    
                    for (p && p(t); s.length;) 
                        s.shift()();
                    
                    return u.push.apply(u, a || []),
                    r()
                }
                function r() {
                    for (var e, t = 0; t < u.length; t++) {
                        for (var r = u[t], n =! 0, l = 1; l < r.length; l++) {
                            var i = r[l];
                            0 !== o[i] && (n =! 1)
                        }
                        n && (u.splice(t--, 1), e = f(f.s = r[0]))
                    }
                    return e
                }
                var n = {},
                    o = {
                        1: 0
                    },
                    u = [];
                function f(t) {
                    if (n[t]) 
                        return n[t].exports;
                    
                    var r = n[t] = {
                        i: t,
                        l: !1,
                        exports: {}
                    };
                    return e[t].call(r.exports, r, r.exports, f),
                    r.l = !0,
                    r.exports
                }
                f.m = e,
                f.c = n,
                f.d = function (e, t, r) {
                    f.o(e, t) || Object.defineProperty(e, t, {
                        enumerable: !0,
                        get: r
                    })
                },
                f.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}),
                    Object.defineProperty(e, "__esModule", {
                        value: !0
                    })
                },
                f.t = function (e, t) {
                    if (1 & t && (e = f(e)), 8 & t) 
                        return e;
                    
                    if (4 & t && "object" == typeof e && e && e.__esModule) 
                        return e;
                    
                    var r = Object.create(null);
                    if (f.r(r), Object.defineProperty(r, "default", {
                        enumerable: !0,
                        value: e
                    }), 2 & t && "string" != typeof e) 
                        for (var n in e) 
                            f.d(r, n, function (t) {
                                return e[t]
                            }.bind(null, n));
                        
                    
                    return r
                },
                f.n = function (e) {
                    var t = e && e.__esModule
                        ? function () {
                            return e.default
                        }
                        : function () {
                            return e
                        };
                    return f.d(t, "a", t),
                    t
                },
                f.o = function (e, t) {
                    return Object
                        .prototype
                        .hasOwnProperty
                        .call(e, t)
                },
                f.p = "/";
                var l = this["webpackJsonpklaytn-nft-studio-frontend"] = this["webpackJsonpklaytn-nft-studio-frontend"] || [],
                    i = l.push.bind(l);
                l.push = t,
                l = l.slice();
                for (var a = 0; a < l.length; a++) 
                    t(l[a]);
                
                var p = i;
                r()
            }([])
        </script>

    -->
    <!--card template-->
    <div id="card_template">
        <div class="nft-preview-card card" style="z-index: 1; min-width: 290px; background-color: rgb(220, 230, 240);">
            <table class="clickable img" style="width: 290px; height: 290px;">
                <tbody>
                    <tr>
                        <td class="text-center" style="padding: 29px;"><img class="card_image" loading="lazy" src="" alt="" style="margin-left: auto; background-color: rgb(220, 230, 240); width: 232px; height: 232px;"></td>
                    </tr>
                </tbody>
            </table>
            <div class="card-body">
                <table style="margin: 20px 24px 0px;">
                    <tbody>
                        <tr>
                            <td class="nft-desc-section" style="width: 186px;">
                                <a href="https://krafter.space/en/nft/0x9faccd9f9661dddec3971c1ee146516127c34fc1/0x9fd260f6" style="text-decoration: none;">
                                    <div class="text-ellipsis card-title h5 card_name" style="width: 186px;"></div>
                                </a>
                                <a href="https://krafter.space/en/userInfo/0x577e8970d210a3c1891eaebff09a9d9a16584619" style="text-decoration: none;">
                                    <p class="card-text">
                                        <span style="width: 186px;">Artist
                                            <span class="author text-ellipsis card_artist" style="width: 120px; display: inline-block; vertical-align: bottom;"></span>
                                        </span>
                                        <span style="width: 186px;">Number
                                            <span class="author text-ellipsis card_number" style="width: 120px; display: inline-block; vertical-align: bottom;"></span>
                                        </span>
                                    </p>
                                </a>
                            </td>
                            <td class="nft-desc-section" style="width: 16px;"></td>
                            <!-- <td class="nft-desc-section">
                                <a href="https://krafter.space/en/userInfo/0xa56170a5369d5cbe3af15fae79cf47a96771ba92" style="text-decoration: none;">
                                    <div class="profile-thumb " style="background-image: url(&quot;/images/profile.svg&quot;);"></div>
                                </a>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
                <table style="margin: 0px 24px 12px; width: 242px;">
                    <tbody>
                        <tr>
                            <td class="like-section">
                                <div class="like-btn">
                                    <div style="display: none;">
                                        <div></div>
                                    </div>
                                    <span style="cursor: pointer;">
                                        <svg width="16" height="16" viewbox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4619 1.49324C15.2507 1.1664 16.0961 0.998169 16.95 0.998169C17.8038 0.998169 18.6493 1.1664 19.4381 1.49324C20.2268 1.82003 20.9434 2.29897 21.5469 2.90272C22.1507 3.50627 22.63 4.22318 22.9567 5.01185C23.2836 5.80066 23.4518 6.64614 23.4518 7.49999C23.4518 8.35384 23.2836 9.19933 22.9567 9.98814C22.6299 10.7769 22.1509 11.4935 21.5471 12.0971C21.547 12.0972 21.5472 12.097 21.5471 12.0971L12.7071 20.9371C12.3166 21.3276 11.6834 21.3276 11.2929 20.9371L2.45289 12.0971C1.23366 10.8779 0.548706 9.22424 0.548706 7.49999C0.548706 5.77574 1.23366 4.12212 2.45289 2.90289C3.67212 1.68366 5.32575 0.998704 7.05 0.998704C8.77425 0.998704 10.4279 1.68366 11.6471 2.90289L12 3.25578L12.3527 2.90305C12.3528 2.903 12.3527 2.90311 12.3527 2.90305C12.9563 2.29923 13.6731 1.82006 14.4619 1.49324ZM16.95 2.99817C16.3589 2.99817 15.7735 3.11463 15.2274 3.34091C14.6813 3.56719 14.1852 3.89885 13.7673 4.31694L12.7071 5.3771C12.3166 5.76763 11.6834 5.76763 11.2929 5.3771L10.2329 4.3171C9.38873 3.47295 8.24381 2.9987 7.05 2.9987C5.85618 2.9987 4.71126 3.47295 3.8671 4.3171C3.02295 5.16126 2.54871 6.30618 2.54871 7.49999C2.54871 8.69381 3.02295 9.83873 3.8671 10.6829L12 18.8158L20.1329 10.6829C20.551 10.265 20.8828 9.76866 21.1091 9.22256C21.3354 8.67645 21.4518 8.09112 21.4518 7.49999C21.4518 6.90887 21.3354 6.32353 21.1091 5.77743C20.8828 5.23133 20.5511 4.73516 20.1331 4.31727C19.7152 3.89918 19.2187 3.56719 18.6726 3.34091C18.1265 3.11463 17.5411 2.99817 16.95 2.99817Z" fill="#2D3741" fill-opacity="0.7"></path>
                                        </svg>
                                </span>&nbsp;0</div>
                            </td>
                            <td class="like-section text-right">
                                <div class="dropdown">
                                    <a href="explore.html" style="z-index: 1000;"><img src="./KrafterSpace_files/ellipsis-icon.6098394b.svg"></a>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="display: none;">
                <div></div>
            </div>
        </div>
    </div>
    <script src="./KrafterSpace_files/2.4a206ea1.chunk.js.다운로드"></script>
    <script src="./KrafterSpace_files/main.334fb28f.chunk.js.다운로드"></script>
    <script>
        $(document).ready(function(){
            console.log("in ready");
            getAlbumsOnSale();
        });

        function getAlbumsOnSale() {
            console.log("in getAlbumsOnSale");
            $.ajax({
                url: "./php/phptest_ajax.php",               // 클라이언트가 요청을 보낼 서버의 URL 주소
                data: { "action_type" : 2  },            // HTTP 요청과 함께 서버로 보낼 데이터
                type: "GET",                             // HTTP 요청 방식(GET, POST)
                dataType: "JSON",                        // 서버에서 보내줄 데이터의 타입
                success: function(data){
                    console.log("in success");
                    console.log(data);
                    
                    $('#card_container').html(data['html']);
                    //$("#ajax_table").html(html);           
                    //dataTableInit();           
                },
                error:function(request, status, error){
                    alert(error);
                }                    
            });
        }

    </script>
    </body>
</html>