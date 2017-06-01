<div class="container">
    <h1>Săn Hàng Giảm Giá Shopee</h1>
    <div class="col-sm-12">
        <a style="color: #FFFFFF;" href="https://www.facebook.com/groups/154245985100841/" target=_blank>
            <button class="btn btn-danger btn-block"><h4>THAM GIA GROUP NHẬN MÃ GIẢM GIÁ MỚI NHẤT</h4>
            </button>
        </a>
        <p>
        <div class="addthis_native_toolbox"></div>
        </p>
        <div class="tabbable">
            <nav class="navbar">
                <ul class="nav nav-pills nav-justified" id="navtabprimary" style="margin-bottom: 10px">
                    <li><a href="/">Lazada.vn</a></li>
                    <li><a href="/lotte-hunter">Lotte.vn</a></li>
                    <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Shopee.vn
                            <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#one" data-toggle="tab"><h5>Tìm
                                        Theo Giá / Mức Giảm Giá / SP</h5></a></li>
                            <li><a href="#four" data-toggle="tab"><h5>Tìm Tất Cả SP Có
                                        Quà Tặng Kèm</h5></a></li>
                            <li><a href="#four" data-toggle="tab"><h5>Tìm Tất Cả SP Đang Có Mã Giảm Giá</h5></a></li>
                        </ul>
                    </li>
                    <li><a href="/yes24-hunter">Yes24.vn</a></li>
                    <li><a href="/tiki-hunter">Tiki.vn</a></li>
                </ul>
            </nav>
            <div class="tab-content">
                <div class="tab-pane active" id="one">
                    <form id="lazadainput">
                        <div class="form-group col-sm-12">
                            <label for="category">Chọn Danh Mục:</label>
                            <select class="form-control" id="category">
                                <option value="https://shopee.vn/Thời-Trang-Nam-cat.78">Thời Trang Nam</option>
                                <option value="https://shopee.vn/Thời-Trang-Nữ-cat.77">Thời Trang Nữ</option>
                                <option value="https://shopee.vn/%C4%90i%E1%BB%87n-Tho%E1%BA%A1i-Ph%E1%BB%A5-Ki%E1%BB%87n-cat.84">Điện Thoại Phụ Kiện</option>
                                <option value="https://shopee.vn/M%E1%BA%B9-B%C3%A9-cat.163">Mẹ Bé</option>
                                <option value="https://shopee.vn/Thi%E1%BA%BFt-B%E1%BB%8B-%C4%90i%E1%BB%87n-T%E1%BB%AD-cat.2365">Thiết Bị Điện Tử</option>
                                <option value="https://shopee.vn/Nh%C3%A0-C%E1%BB%ADa-%C4%90%E1%BB%9Di-S%E1%BB%91ng-cat.87">Nhà Cửa Đời Sống</option>
                                <option value="https://shopee.vn/Thi%E1%BA%BFt-B%E1%BB%8B-%C4%90i%E1%BB%87n-Gia-D%E1%BB%A5ng-cat.2353">Thiết Bị Gia Dụng</option>
                                <option value="https://shopee.vn/S%E1%BB%A9c-Kh%E1%BB%8Fe-S%E1%BA%AFc-%C4%90%E1%BA%B9p-cat.160">Sức Khỏe Sắc Đẹp</option>
                                <option value="https://shopee.vn/Gi%C3%A0y-D%C3%A9p-Nam-cat.2429">Giày Dép Nam</option>
                                <option value="https://shopee.vn/Gi%C3%A0y-D%C3%A9p-N%E1%BB%AF-cat.161">Giày Dép Nữ</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="pagestart">Từ Trang:</label>
                            <input type="number" class="form-control" id="pagestart" value="1">
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="pageend">Đến Trang:</label>
                            <input type="number" class="form-control" id="pageend" value="1">
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="pricemin">Lọc giá từ:(Có thể bỏ qua)</label>
                            <input type="number" class="form-control" id="pricemin"
                                   placeholder="Giá nhỏ nhất muốn lọc (Có thể bỏ qua)">
                        </div>
                        <div class="form-group col-sm-3">
                            <label for="pricemax">Lọc giá đến:(Có thể bỏ qua)</label>
                            <input type="number" class="form-control" id="pricemax"
                                   placeholder="Giá lớn nhất muốn lọc (Có thể bỏ qua)">
                        </div>
                        <div class="form-group col-sm-12">
                            <label for="searchstring">Từ Khóa Tìm Kiếm (Có thể bỏ trống)</label>
                            <input type="text" class="form-control" id="searchstring"
                                   placeholder="Nhập từ khóa sản phẩm cần tìm - Có thể bỏ qua">
                        </div>
                        <!--<div class="form-group col-sm-12" id="keyactive">
                            <label for="captratoken">Mã Kích Hoạt: <span style="color:green">*Yêu cầu nhập mã để sử dụng công cụ</span></label>
                            <input type="text" class="form-control" id="captratoken" placeholder="Nhập khóa kích hoạt">
                        </div>-->
                        <div class="col-sm-12">
                            <button type="button" class="btn btn-primary btn-block" id="submit">Tìm Kiếm <i
                                    class="fa fa-search" aria-hidden="true"></i></button>
                        </div>
                    </form>
                    <div class="col-sm-12">
                        <div class="alert alert-danger" id="alert-warning" style="display: none">
                            <strong>Lỗi!</strong> Vui lòng kiểm tra lại thông tin đã nhập (lưu ý pageend phải lớn hơn
                            pagestart)
                        </div>
                        <ul class="list-group" id="result_ext">

                        </ul>
                        <div class="progress progress-striped active page-progress-bar" id="processloading"
                             style="display: none">
                            <div class="progress-bar" style="width: 100%;"></div>
                        </div>
                    </div>

                    <div class="col-sm-12">
                        <li class="list-group-item list-group-item-info">*Ghi chú: Bấm chuột vào thanh đề mục bên dưới
                            để
                            sắp xếp
                        </li>
                        <table class="table table-striped sortable" id="tablesort">
                            <thead>
                            <tr>
                                <th id="productname" class="bg-primary"><span class="label label-info">Tên Sản Phẩm <i
                                            class="fa fa-sort" aria-hidden="true"></i></span></th>
                                <th id="oldprice" class="bg-primary"><span class="label label-info">Giá Cũ<i
                                            class="fa fa-sort" aria-hidden="true"></i></span></th>
                                <th id="productprice" class="bg-primary"><span class="label label-info">Giá Sau Giảm <i
                                            class="fa fa-sort" aria-hidden="true"></i></span></th>
                                <th id="productdiscount" class="bg-primary"><span class="label label-info">Giảm Giá <i
                                            class="fa fa-sort" aria-hidden="true"></i></span></th>
                                <th id="loveproduct" class="bg-primary"><span class="label label-info">Yêu Thích <i
                                            class="fa fa-sort" aria-hidden="true"></i></span></th>
                            </tr>
                            </thead>
                            <tbody id="showdata">

                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-pane" id="four">
                    <div class="alert alert-info"><strong>Chức năng đang được xây dựng - Coming Soon</strong></div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="public/pagescriptsort.js"></script>
<script src="public/shopee.js"></script>