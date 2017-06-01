
<form id="couponall_lazadainput">
    <div class="form-group col-sm-4">
        <label for="couponall_pagestart">Từ Trang: (VD: Nhập vào 1 sẽ tìm tất cả danh mục trang 1)</label>
        <input type="number" class="form-control" id="couponall_pagestart" value="1">
    </div>
    <div class="form-group col-sm-4">
        <label for="couponall_pricemin">Lọc giá từ:(Có thể bỏ qua)</label>
        <input type="number" class="form-control" id="couponall_pricemin"
               placeholder="Giá nhỏ nhất muốn lọc (Có thể bỏ qua)">
    </div>
    <div class="form-group col-sm-4">
        <label for="couponall_pricemax">Lọc giá đến:(Có thể bỏ qua)</label>
        <input type="number" class="form-control" id="couponall_pricemax"
               placeholder="Giá lớn nhất muốn lọc (Có thể bỏ qua)">
    </div>
    <div class="form-group col-sm-12">
        <label for="couponall_searchstring">Từ Khóa Tìm Kiếm (Có thể bỏ trống)</label>
        <input type="text" class="form-control" id="couponall_searchstring"
               placeholder="Nhập từ khóa sản phẩm cần tìm - Có thể bỏ qua">
    </div>
    <!--
            <div class="form-group col-sm-12" id="keyactive">
                <label for="captratoken">Mã Kích Hoạt: <span style="color:green">*Yêu cầu nhập mã để sử dụng công cụ</span></label>
                <input type="text" class="form-control" id="captratoken" placeholder="Nhập khóa kích hoạt">
            </div>
    -->
    <div class="col-sm-12">
        <button type="button" class="btn btn-success btn-block" id="couponall_submit">Tìm Kiếm Trên Tất Cả Danh Mục Sản Phẩm
            Đang Có Mã Giảm Giá <i class="fa fa-search" aria-hidden="true"></i>
        </button>
    </div>
</form>
<div class="col-sm-12">
    <ul class="list-group" id="couponall_result"></ul>
    <div class="progress progress-striped active page-progress-bar" id="couponall_loading"
         style="display: none">
        <div class="progress-bar progress-bar-success" style="width: 100%;"></div>
    </div>
</div>

<div class="col-sm-12">
    <li class="list-group-item list-group-item-info">*Ghi chú: Bấm chuột vào thanh đề mục bên dưới
        để
        sắp xếp
    </li>
    <table class="table table-striped sortable" id="couponall_tablesort">
        <thead>
        <tr>
            <th id="couponall_productname" class="bg-primary"><span
                    class="label label-info">Sản Phẩm <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
            <th id="couponall_oldprice" class="bg-primary"><span class="label label-info">Giá Cũ <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
            <th id="couponall_productprice" class="bg-primary"><span class="label label-info">Giá Sau Giảm <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
            <th id="couponall_productdiscount" class="bg-primary"><span
                    class="label label-info">Giảm Giá <i class="fa fa-sort"
                                                         aria-hidden="true"></i></span></th>
            <th id="couponall_product" class="bg-primary"><span class="label label-info">Mã Giảm Giá <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
            <th id="couponall_expire" class="bg-primary"><span class="label label-info">Ngày Hết Hạn <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
        </tr>
        </thead>
        <tbody id="couponall_showdata"></tbody>
    </table>
</div>