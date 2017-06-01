<div class="container">
    <h1 id="step1">Săn Hàng Giảm Giá Lazada</h1>
    <div class="col-sm-12">
        <a style="color: #FFFFFF;" href="https://www.facebook.com/groups/154245985100841/" target=_blank>
            <button class="btn btn-danger btn-block"><h4>THAM GIA GROUP NHẬN MÃ GIẢM GIÁ MỚI NHẤT</h4>
            </button>
        </a>
        <p>
        <div class="addthis_native_toolbox"></div>
        </p>
        <p style="text-align: center">
            <a class="btn btn-warning" id='getcoupon' href="http://sangiaonline.com/lay-ma-giam-gia"
               title="Mã giảm giá Lazada" style="color: #FFFFFF">Tự Động Lấy Mã Giảm
                Giá Lazada</a>
        </p>
        <div class="btn-group btn-group-justified">
            <div class="btn-group">
                <button class="btn btn-primary" onclick="startIntro();"
                        title="Introductions Tools" style="color: #FFFFFF">Hướng dẫn bằng Intros</button>
            </div>
            <div class="btn-group">
                <a class="btn btn-primary" href="/huongdan/" target="_blank"
                   title="Hướng dẫn sử dụng công cụ tìm kiếm mã giảm giá" style="color: #FFFFFF">Hướng dẫn sử dụng công cụ tìm kiếm</a>
            </div>
        </div>
        <p></p>
        <div class="tabbable">
            <nav class="navbar">
                <ul class="nav nav-pills nav-justified" id="navtabprimary" style="margin-bottom: 10px">
                    <li class="dropdown" id="step2">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Lazada.vn
                            <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#five" data-toggle="tab" title="Tìm toàn bộ Lazada"><h5>Tìm Toàn Bộ Lazada</h5>
                                </a></li>
                            <li><a href="#four" data-toggle="tab" title="Tìm sản phẩm giảm giá Lazada"><h5>Tìm Theo Giá
                                        / Mức Giảm Giá / SP - x10</h5></a></li>
                            <li><a href="#one" data-toggle="tab" title="Tìm sản phẩm giảm giá tốt nhất"><h5>Tìm Theo Giá
                                        / Mức Giảm Giá / SP</h5></a></li>
                            <li><a href="#six" data-toggle="tab" title="Tìm sản phẩm có quà tặng kèm Lazada"><h5>Tìm Tất
                                        Cả SP Có Quà Tặng Kèm - x10</h5></a></li>
                            <li><a href="#nine" data-toggle="tab" title="Tìm sản phẩm có quà tặng trên Lazada"><h5>Tìm
                                        Tất Cả SP Có Quà Tặng Kèm - Cả Lzd</h5></a></li>
                            <li><a href="#two" data-toggle="tab" title="Tìm sản phẩm có quà tặng trên Lazada"><h5>Tìm
                                        Tất Cả SP Có Quà Tặng Kèm</h5></a></li>
                            <li><a href="#seven" data-toggle="tab" title="Tìm sản phẩm đang có mã giảm giá Lazada"><h5>
                                        Tìm Tất Cả SP Đang Có Mã Giảm Giá - x10</h5></a></li>
                            <li><a href="#eight" data-toggle="tab" title="Tìm mã giảm giá Lazada"><h5>Tìm Tất Cả SP Đang
                                        Có Mã Giảm Giá - Cả Lzd</h5></a></li>
                            <li><a href="#three" data-toggle="tab" title="Tìm mã giảm giá Lazada"><h5>Tìm Tất Cả SP Đang
                                        Có Mã Giảm Giá</h5></a></li>
                        </ul>
                    </li>
                    <li><a href="/lotte-hunter" title="Tìm sản phẩm giảm giá Lotte">Lotte.vn</a></li>
                    <li><a href="/shopee-hunter" title="Tìm sản phẩm giảm giá Shopee">Shopee.vn</a></li>
                    <li><a href="/yes24-hunter" title="Tìm sản phẩm giảm giá Yes24">Yes24.vn</a></li>
                    <li><a href="/tiki-hunter" title="Tìm sản phẩm giảm giá Tiki">Tiki.vn</a></li>
                </ul>
            </nav>
            <div class="tab-content">
                <div class="tab-pane active" id="one">
                    <?php
                    include "lzd_tab1.php";
                    ?>
                </div>
                <!--Gift Lazada-->
                <div class="tab-pane" id="two">
                    <?php
                    include "lzd_tab2.php";
                    ?>
                </div>
                <!--Coupon Lazada-->
                <div class="tab-pane" id="three">
                    <?php
                    include "lzd_tab3.php";
                    ?>
                </div>
                <div class="tab-pane" id="four">
                    <?php
                    include "lzd_tab4.php";
                    ?>
                </div>
                <div class="tab-pane" id="five">
                    <?php
                    include "lzd_tab5.php";
                    ?>
                </div>
                <div class="tab-pane" id="six">
                    <?php
                    include "lzd_tab6.php";
                    ?>
                </div>
                <div class="tab-pane" id="seven">
                    <?php
                    include "lzd_tab7.php";
                    ?>
                </div>
                <div class="tab-pane" id="eight">
                    <?php
                    include "lzd_tab8.php";
                    ?>
                </div>
                <div class="tab-pane" id="nine">
                    <?php
                    //include "lzd_tab9.php";
                    ?>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="public/intro.js"></script>
<script>
    if (localStorage.getItem("clientKey") === null) {
        startIntro();
    }
    function startIntro(){
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    element: '#step1',
                    intro: "Xin chào bạn!<br/>Tôi sẽ hướng dẫn bạn sử dụng công cụ tìm kiếm Mã Giảm Giá"
                },
                {
                    element: '#step2',
                    intro: "Bấm vào chọn cửa hàng yêu thích bạn muốn tìm kiếm Mã Giảm Giá<br/>",
                    position: 'top'
                },
                {
                    element: '#step3',
                    intro: 'Bấm vào đây để chọn danh mục hàng hóa'
                },
                {
                    element: '#step4',
                    intro: "Nhập trang đầu tiên bạn muốn tìm kiếm",
                    position: 'bottom'
                },
                {
                    element: '#step5',
                    intro: 'Nhập trang cuối cùng bạn muốn tìm kiếm'
                },
                {
                    element: '#step6',
                    intro: 'Bạn muốn lọc giá nhỏ nhất từ bao nhiêu?<br/>(Có thể bỏ qua)'
                },
                {
                    element: '#step7',
                    intro: 'Bạn muốn lọc giá lớn nhất đến bao nhiêu?<br/>(Có thể bỏ qua)'
                },
                {
                    element: '#step8',
                    intro: 'Bạn có thể nhập mức giảm giá tối thiểu<br/>(Có thể bỏ qua)'
                },
                {
                    element: '#step9',
                    intro: 'Nếu bạn nhập từ khóa ở đây. Chúng tôi sẽ tìm kiếm theo từ khóa của bạn<br/>(Có thể bỏ qua)'
                },
                {
                    element: '#step10',
                    intro: 'Sau khi nhập đầy đủ thông tin bạn tiếp tục Bấm Tìm Kiếm để tiến hành tìm'
                },{
                    element: '#step11',
                    intro: 'Thông tin sản phẩm tìm được sẽ hiển thị ở đây. Nhớ bấm vào các nút bên dưới để sắp xếp nhé!'
                }

            ]
        });

        intro.start();
    }
</script>
<script src="public/pagescriptsort.js"></script>
<script src="public/pagescript.js"></script>
