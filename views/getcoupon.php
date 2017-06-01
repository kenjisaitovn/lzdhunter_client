<div class="container">
    <h1>Tự động lấy mã giảm giá</h1>
    <div class="col-sm-12">
        <a style="color: #FFFFFF;" href="https://www.facebook.com/groups/154245985100841/" target=_blank>
            <button class="btn btn-danger btn-block"><h4>THAM GIA GROUP NHẬN MÃ GIẢM GIÁ MỚI NHẤT</h4>
            </button>
        </a>
        <p>
        <div class="addthis_native_toolbox"></div>
        </p>
        <p style="text-align: center">
            <a class="btn btn-warning" href="/" style="color: #FFFFFF">Tìm Sản Phẩm Giảm Giá Lazada</a>
        </p>
    </div>
    <script>
        window.fbAsyncInit = function () {
            FB.init({
                appId: '1030651917066824',
                cookie: true,
                xfbml: true,
                version: 'v2.8'
            });
            FB.AppEvents.logPageView();
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        function checkLoginState() {
            FB.getLoginStatus(function (response) {
                statusChangeCallback(response);
            });
        }
        var date = new Date();
        var minutes = 30;
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                var authResponse = response.authResponse;

                $.ajax({
                    method: "POST",
                    url: "http://139.59.117.234:8081/member/login",
                    //url: "http://localhost:8081/member/login",
                    data: {
                        uid: authResponse.userID,
                        aToken: authResponse.accessToken,
                        clientid: tokenKey
                    }
                }).done(function (data) {
                    if (data.statuscode == 1) {
                        FB.api('/me', function (responseme) {
                            console.log(responseme.name);
                            $.cookie("loginname", responseme.name, { expires: date });
                        });
                        $.cookie("logged", authResponse.userID, { expires: date });
                        setTimeout(function () {
                            location.reload();
                        },2000);
                    } else {
                        $("#loginuser").html("<h3 class='text-danger'>Tài khoản không tồn tại</h3>");
                    }
                });
            } else {
                $("#loginuser").html("<h3 class='text-danger'>Đăng nhập không thành công vui lòng thử lại</h3>");
            }
        }
    </script>
    <div id="fb-root"></div>
    <script>(function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=281752712210255";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>
    <div class="col-sm-12">
        <div class="col-sm-4">
            <button type="button" class="btn btn-primary btn-block getcoupon" data-store="lzd50k">Tạo mã 50k cho đơn hàng 300k - Lazada
            </button>
            <button type="button" class="btn btn-info btn-block getcoupon" data-store="lzd10">Tạo mã 10% max 150k - Lazada
            </button>
            <button type="button" class="btn btn-primary btn-block getcoupon" data-store="lzdapple">Tạo mã mua các SP Apple - Lazada
                Lazada
            </button>
            <button type="button" class="btn btn-info btn-block getcoupon" data-store="lzdsamsung">Tạo mã mua các SP SamSung - Lazada</button>
            <button type="button" class="btn btn-primary btn-block getcoupon" data-store="lzdxiaomi">Tạo mã mua các SP XiaoMi - Lazada</button>
            <button type="button" class="btn btn-info btn-block getcoupon" data-store="lotte">Lấy Mã Giảm Giá Lotte</button>
            <button type="button" class="btn btn-primary btn-block getcoupon" data-store="shopee">Lấy Mã Giảm Giá Shopee</button>
        </div>
        <div class="col-sm-8">
            <p id="loginuser"></p>
            <div class="fb-login-button" id="buttonfb" data-width="200" data-max-rows="1" data-size="large"
                 data-button-type="login_with" data-show-faces="false" data-auto-logout-link="false"
                 data-use-continue-as="true" scope="public_profile,email"
                 onlogin="checkLoginState();">
            </div>
            <script>
                if (!!$.cookie('loginname')) {
                    var loginName = $.cookie("loginname");
                    $("#loginuser").html("<h4 class='text-success'>Xin chào: "+loginName+"</h4>");
                    console.log($.cookie('logged'));
                    $("#buttonfb").css("display","none");
                }else{
                    $("#loginuser").html("<h4 class='text-danger'>Yêu cầu đăng nhập để sử dụng chức năng</h4>");
                    $("#buttonfb").css("display","block");
                }
            </script>
            <div class="progress progress-striped active page-progress-bar" id="processloading"
                 style="display: none">
                <div class="progress-bar" style="width: 100%;"></div>
            </div>
            <div id="showcontent" style="text-align: center"></div>
            <h4>Hiện tại hệ thống lấy mã hoạt động tốt</h4>
            <p>Mã dự phòng trong hệ thống đang có khoảng:<strong>200 Mã giảm giá</strong></p>
            <h4>>>> Hướng dẫn sử dụng chức năng lấy mã giảm giá nhanh <<<</h4>
            <p>- Chọn nút bấm bên trái -> Click</p>
            <p>- Hệ thống sẽ tìm kiếm mã giảm giá phù hợp</p>
            <p>- Mã giảm giá sẽ hiển thị tại đây và tự động Copy</p>
            <p>- Hệ thống sẽ chuyển đến trang áp dụng mã</p>
            <p>- Đặt sản phẩm rồi bấm Ctrl + V để dán mã giảm giá</p>
            <p>- Like hoặc share trang để nhận được thêm lần lấy mã</p>
        </div>
    </div>
</div>
<script src="public/pagescriptsort.js"></script>
<script src="public/getcoupon.js"></script>