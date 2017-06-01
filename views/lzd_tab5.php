
<form id="lazadainput">
    <div class="form-group col-sm-4">
        <label for="pagestartall">Trang (VD: Nhập 1 sẽ tìm tất cả danh mục trang 1)</label>
        <input type="number" class="form-control" id="pagestartall" value="1">
    </div>
    <div class="form-group col-sm-2">
        <label for="priceminall">Lọc giá từ:(Có thể bỏ qua)</label>
        <input type="number" class="form-control" id="priceminall"
               placeholder="Giá nhỏ nhất muốn lọc (Có thể bỏ qua)">
    </div>
    <div class="form-group col-sm-2">
        <label for="pricemaxall">Lọc giá đến:(Có thể bỏ qua)</label>
        <input type="number" class="form-control" id="pricemaxall"
               placeholder="Giá lớn nhất muốn lọc (Có thể bỏ qua)">
    </div>
    <div class="form-group col-sm-4">
        <label for="discountall">Mức Giảm giá (Có thể bỏ trống)</label>
        <input type="number" class="form-control" id="discountall"
               placeholder="VD:Nhập 80 sẽ lọc sp có mức giảm lớn hơn 80%">
    </div>
    <!--
            <div class="form-group col-sm-12" id="keyactive">
                <label for="captratoken">Mã Kích Hoạt: <span style="color:green">*Yêu cầu nhập mã để sử dụng công cụ</span></label>
                <input type="text" class="form-control" id="captratoken" placeholder="Nhập khóa kích hoạt">
            </div>
    -->
    <div class="col-sm-12">
        <button type="button" class="btn btn-primary btn-block" id="submitall">Tìm Kiếm Cả Lazada <i
                class="fa fa-search" aria-hidden="true"></i></button>
    </div>
</form>
<div class="col-sm-12">
    <div class="alert alert-danger" id="alert-warning" style="display: none">
        <strong>Lỗi!</strong> Vui lòng kiểm tra lại thông tin đã nhập (lưu ý pageend phải lớn hơn
        pagestart)
    </div>
    <ul class="list-group" id="result_all">

    </ul>
    <div class="progress progress-striped active page-progress-bar" id="processloadingall"
         style="display: none">
        <div class="progress-bar" style="width: 100%;"></div>
    </div>
</div>

<div class="col-sm-12">
    <li class="list-group-item list-group-item-info">*Ghi chú: Bấm chuột vào thanh đề mục bên dưới
        để
        sắp xếp
    </li>
    <table class="table table-striped sortable" id="tablesortall">
        <thead>
        <tr>
            <th id="productname" class="bg-primary"><span class="label label-info">Tên Sản Phẩm <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
            <th id="oldprice" class="bg-primary"><span class="label label-info">Giá Cũ <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
            <th id="productprice" class="bg-primary"><span class="label label-info">Giá Sau Giảm <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
            <th id="productdiscount" class="bg-primary"><span class="label label-info">Giảm Giá <i
                        class="fa fa-sort" aria-hidden="true"></i></span></th>
            <th id="favorite" class="bg-primary"><i
                    class="fa fa-heart-o" aria-hidden="true"></i></th>
        </tr>
        </thead>
        <tbody id="showdataall">

        </tbody>
    </table>
</div>