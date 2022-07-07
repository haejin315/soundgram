<!DOCTYPE html>
<html lang="ko">
  <head>
  <?php
	require_once("db_connection.php");
	?>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' rel='stylesheet'>
    <link href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet">
  </head>

  <body class="left-side-menu-dark">
    <!-- Begin page -->
    <div id="wrapper">
      <?php
	  include_once("header_menu.php");

	  $album_id = $_POST['album_id'];
	  ?>
      <!-- ============================================================== -->
      <!-- Start Page Content here -->
      <!-- ============================================================== -->

      <div class="content-page">
        <div class="content">
          <!-- Start Content-->
          <div class="container-fluid">
            <!-- start page title -->
            <div class="row">
              <div class="col-12">
                <div class="page-title-box row">
                  <div class="col-sm-12 col-md-9">
                    <h4 class="page-title">
                    <a href='' onclick='javascript:location.reload(true);'> 
                      앨범 별 NFC 현황 &nbsp;
                      <span class="page_exp exp_p"
                        >앨범 별 NFC와 시크릿 넘버 현황을 확인하세요.</span></a>
                    </h4>
                    <span class="page_exp exp_m"
                      >앨범 별 NFC와 시크릿 넘버 현황을 확인하세요.
                      </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- end page title  상단까지 수정완료-->

            <!-- 기본모양 테이블 가져옴 -->
            <div class="row margin_t20 mabile_mt">
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <!-- 갯수선택메뉴와 surch라인 숨긴 후에 상단 디자인 -->
                    <div class="row">
                      <div class="col-sm-12 col-md-9 table_top_left">
                        <div
                          class="dataTables_length"
                          id="basic-datatable_length"
                        >
                          <div class="btn-group mt-1 dropdown_btn_wrap">
                            <button
                              type="button"
							                id="nfc_selected"
                              class="btn btn-secondary dropdown-toggle waves-effect waves-light"
                              data-toggle="dropdown"
                              aria-expanded="true"
                            >
                              NFC 사용 <i class="mdi mdi-chevron-down"></i>
                            </button>
                            <div
                              class="dropdown-menu"
                              x-placement="bottom-start"
                            >
                              <a class="dropdown-item option_nfc" data-value="1" href="#">NFC 사용</a>
                              <a class="dropdown-item option_nfc" data-value="0" href="#">NFC 사용 안함</a>
                              <a class="dropdown-item option_nfc" data-value="all" href="#">NFC 전체</a>
                            </div>
                          </div>

                          <div
                            class="btn-group mt-1 dropdown_btn_wrap btn_wrap_lg"
                          >
                            <button
                              type="button"
							                id="artist_selected"
                              class="btn btn-secondary dropdown-toggle waves-effect waves-light"
                              data-toggle="dropdown"
                              aria-expanded="true"
                            >
                              아티스트 전체 <i class="mdi mdi-chevron-down"></i>
                            </button>
                            <div
                              class="dropdown-menu overflow-auto"
                              x-placement="bottom-start"
                            >
                              <a class="dropdown-item option_artist" data-value="all" href="#">아티스트 전체</a>
                                <?php
                                //로그인유저
                                if($USER_LEVEL == 1){
                                    $query_cond_customer_id = " AND home_user_id = $home_customer_id ";
                                }else{
                                    $query_cond_customer_id = " ";
                                }

                                $artist_query = "SELECT id, artist_name FROM APIServer_artist WHERE 1 $query_cond_customer_id
                                  ORDER BY (CASE WHEN ASCII(SUBSTRING(artist_name,1)) BETWEEN 48 AND 57 THEN 1
                                                            WHEN ASCII(SUBSTRING(artist_name,1)) <128 THEN 3 ELSE 2 END), artist_name;";
                                $artist_result = sql_query($artist_query);
                                while($ar = $artist_result->fetch_assoc()){
                                  echo("<a class='dropdown-item option_artist' data-value='{$ar['id']}' href='#'>{$ar['artist_name']}</a>");
                                }
                                ?>
                            </div>
                          </div>
						  <!--
                          <div class="btn-group mt-1 dropdown_btn_wrap">
                            <button
                              type="button"
                              class="btn btn-secondary dropdown-toggle waves-effect waves-light"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              사용 전체 <i class="mdi mdi-chevron-down"></i>
                            </button>
                            <div
                              class="dropdown-menu"
                              x-placement="bottom-start"
                            >
                              <a class="dropdown-item" href="#">사용 전체</a>
                              <a class="dropdown-item" href="#">사용</a>
                              <a class="dropdown-item" href="#">사용 안함</a>
                            </div>
                          </div>
						  -->
                        </div>
                      </div>
                      <div class="col-sm-12 col-md-3">
                        <div
                          id="basic-datatable_filter"
                          class="dataTables_filter"
                        >
                          <span class="table_top_right"
                            >Search:
                            <label
                              ><input
                                type="search"
								id="search_str"
                                class="form-control form-control-sm"
                                placeholder=""
                                aria-controls="basic-datatable" /></label
                          ></span>
                        </div>
                      </div>
                    </div>

                    <!-- end 테이블 상단 바꾼 디자인  -->

                    <table
                      id="basic-datatable"
                      class="table dt-responsive nowrap"
                      style="width:100%;"
                    >
                      <thead>
                        <tr>
                          <th class="text_center w50">
                            <span class="color333">No</span>
                          </th>
                          <!-- 201118 수정시작 추가1 -->
                          <th>
                            <span class="color333">앨범 정보</span>
                          </th>
                          <!-- 201118 수정끝 추가1 -->
                          <th class="text_center">
                            <span class="color333">판매 등록 갯수</span>
                          </th>
                          <th class="text_center">
                            <span class="color333">시크릿 넘버</span>
                          </th>
                          <th class="text_center"><span class="color333">NFC 사용</span></th>
                          <!-- ADIMIN 메뉴는 사운드그램에서만 관리할 수 있는 부분입니다. 
                            회원사가 보는사이트에서 이 부분 열이 빠져야 합니다. -->
							<?php
							if($USER_LEVEL == 0){
							?>
                          <th class="text_center">
                            <span class="color_red">ADMIN</span>
                          </th>
						  <?php
							}
							?>
                        </tr>
                      </thead>

                      <tbody id="ajax_table">
                        
                      </tbody>
                    </table>
                  </div>
                  <!-- end card body-->
                </div> 
                <!-- end card -->
              </div>
              <!-- end col-->
            </div>
            <!-- end row-->
            <!-- end row 기본 테이블 가져옴-->
            <!-- 팝업창 시작 -->
            <div class="overlay0" id="nfc_create">
              <div class="popup">
                <div class="popup_tit_wrap">
                  <div class="modal-header">
                    <h4
                      class="modal-title text_center"
                      id="mySmallModalLabel"
                    >
                      NFC KEY 생성하기
                    </h4>
                  </div>
                </div>
                 <!-- 201118 수정시작 추가5 -->
                <div class="result_area">
                  <div class="form-group row mb-3">
                    <label class="col-4 col-form-label">앨범 ID</label>
					<input class="hidden" id="nfc_album_id">
                    <div class="col-8 album_id_disp">
                        544
                    </div>
                  </div>
                  <div class="form-group row mb-3">
                    <label class="col-4 col-form-label" for="num_gen">생성개수</label>
                    <div class="col-8">
                        <input type="number" class="form-control" id="nfc_number" name="nfc_number">
                    </div>
                  </div>
                  <div class="form-group row mb-3">
                    <label class="col-4 col-form-label" for="tag_opt">태그(opt)</label>
                    <div class="col-8">
                        <input type="text" class="form-control" id="nfc_tag" name="nfc_tag">
                        <p class="txt_at">*미입력시 생성일자로 저장됨</p>
                    </div>
                  </div>
              </div><!-- end result_area-->
              <div class="submit_btn cl">
                <button type="submit" class="btn btn-bordered-primary waves-effect width-md waves-light" onclick="nfc_create_submit();">
                	생성						
				</button>
                <button type="button" class="btn btn-bordered-secondary waves-effect width-md waves-light btn_close" onclick="nfc_create_cancel();">
                	취소
                </button>
              </div>
              <div class="pop_bttxt">
                <p ><b>·</b>&nbsp; NFC Key와 Security Num 가 동일수량 함께 생성됩니다.</p>
                <p><b>·</b>&nbsp; 생성된 NFC  Key 는 바로 사용 가능합니다.</p>
              </div>
            </div>
          </div>
           <!-- 201118 수정끝 추가5 -->
            <!-- end 팝업창 -->
          </div>
          <!-- container -->
        </div>
        <!-- content -->

        <!-- Footer Start -->
        <footer class="footer">
          <div class="container-fluid">
            <div class="row col-12">
              <div class="footer_line"></div>
            </div>
          </div>
        </footer>
        <!-- end Footer -->
      </div>

      <!-- ============================================================== -->
      <!-- End Page content -->
      <!-- ============================================================== -->
    </div>
    <!-- END wrapper -->

    <!-- Vendor js -->
    <!-- <script src="assets/js/vendor.min.js"></script> -->

    <!-- third party js -->
    <!-- <script src="assets/libs/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/libs/datatables/dataTables.bootstrap4.js"></script>
    <script src="assets/libs/datatables/dataTables.responsive.min.js"></script>
    <script src="assets/libs/datatables/responsive.bootstrap4.min.js"></script>
    <script src="assets/libs/datatables/dataTables.buttons.min.js"></script>
    <script src="assets/libs/datatables/buttons.bootstrap4.min.js"></script>
    <script src="assets/libs/datatables/buttons.html5.min.js"></script>
    <script src="assets/libs/datatables/buttons.flash.min.js"></script>
    <script src="assets/libs/datatables/buttons.print.min.js"></script>
    <script src="assets/libs/datatables/dataTables.keyTable.min.js"></script>
    <script src="assets/libs/datatables/dataTables.select.min.js"></script> -->
    <!--<script src="assets/libs/pdfmake/pdfmake.min.js"></script>-->
    <!-- <script src="assets/libs/pdfmake/vfs_fonts.js"></script> -->
    <!-- third party js ends -->

    <!-- Datatables init -->
    <!-- <script src="assets/js/pages/datatables.init.js"></script> -->

    <!-- App js -->
    <!-- <script src="assets/js/app.min.js"></script> -->

	<script lang="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.2/xlsx.full.min.js"></script>
	<script lang="javascript" src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>
    <!--base.js 공통으로 들어가는 js 코드들 by lee 20200923-->
	<!-- <script src="./base.js"></script> -->
	<script>

    var search = "";
    var isFirstLoad = true;
    
    $(document).on("focusout","#search_str", function(){
            search = $(this).val();
            console.log(search);
            tableReload();
    });
    
    $(document).ready(function(){
        tableReload();
        isFirstLoad=false;
        $("#search_str").keypress(function (e) {
            if (e.which == 13){
                search = $(this).val();
                console.log(search);
                tableReload();
            }
        });
    });
    
    function tableReload(){
        $("#search").val("");
        //console.log(type);
        if(!isFirstLoad)
            dataTableClear();
        $.ajax({
            url: "./phptest_ajax.php",               // 클라이언트가 요청을 보낼 서버의 URL 주소
            data: { "action_type" : 2  },            // HTTP 요청과 함께 서버로 보낼 데이터
            type: "GET",                             // HTTP 요청 방식(GET, POST)
            dataType: "JSON",                        // 서버에서 보내줄 데이터의 타입
            success: function(data){
                //console.log(data);
                //console.log(data['query']);
                var total = data['total'];
                var html = data['html'];
                console.log(total);
                console.log(html);
                $("#ajax_table").html(html);           
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