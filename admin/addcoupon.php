<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LzdHunter Backend</title>
    <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport'/>
    <link rel="stylesheet" href="../public/bootstrap.min.css">
    <!-- bootstrap widget theme - **** RENAMED TO theme.bootstrap_3.css **** -->
    <link rel="stylesheet" href="../public/theme.bootstrap_3.css">
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"
            integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
    <script src="../public/jquery.tablesorter.min.js"></script>
    <script src="../public/jquery.tablesorter.widgets.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
            integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
            crossorigin="anonymous"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="../public/custom.css" rel="stylesheet">
</head>
<body>
<div class="container-fluid">
    <div class="col-lg-12">
        <div class="form-group col-sm-4">
            <label for="category">Chọn Store:</label>
            <select class="form-control" id="store">
                <option value="lzd">Lazada</option>
                <option value="lotte">Lotte</option>
                <option value="shopee">Shopee</option>
                <option value="tiki">Tiki</option>
                <option value="adayroi">Adayroi</option>
                <option value="yes24">Yes24</option>
                <option value="bigmua">BigMua</option>
            </select>
        </div>
        <div class="form-group col-sm-4">
            <label for="couponcode">Mã Giảm Giá:</label>
            <input type="text" class="form-control" id="couponcode" value="">
        </div>
        <div class="form-group col-sm-4">
            <label for="coupondetail">Mô Tả Mã:</label>
            <input type="text" class="form-control" id="coupondetail" value="">
        </div>
        <div class="form-group col-sm-12">
            <label for="coupondetail">Key Auth:</label>
            <input type="text" class="form-control" id="keyauth" value="">
        </div>
        <div class="form-group col-sm-12">
            <label for="coupondetail">Key Auth:</label>
            <input type="text" class="form-control" id="keyauth" value="">
        </div>
        <div class="form-group col-sm-12">
            <label for="coupondetail">Input File .xlsx .csv . xls:</label>
            <input type="file" id="fileinput"/>
        </div>
        <div class="form-group col-sm-12">
            <button type="button" class="btn btn-primary btn-block" id="submit">Lưu Thông Tin <i
                    class="fa fa-search" aria-hidden="true"></i></button>
        </div>
        <div class="form-group col-sm-12">
            <ul class="list-group" id="result"></ul>
        </div>
    </div>
</div>
<script>
    var file = document.getElementById('fileinput');
    file.addEventListener('change', function() {
        var reader = new FileReader();
        var f = file.files[0];
        reader.onload = function(e) {
            var CSVARRAY = parseResult(e.target.result); //this is where the csv array will be
            //console.log(CSVARRAY);
            saveCoupon(CSVARRAY);
        };
        reader.readAsText(f);
    });
    function saveCoupon(CSVARRAY) {
        var keyauth = 'bogocoupon';
        console.log(keyauth);
        console.log(CSVARRAY);
        $.ajax({
            method: "POST",
            url: "http://139.59.117.234:8081/lzd/multicoupon",
            //url: "http://localhost:8081/lzd/multicoupon",
            data: {
                arraycoupon: CSVARRAY,
                clientid: keyauth
            }
        }).done(function (data) {
            console.log(data);
        });
    }
    function parseResult(result) {
        var resultArray = [];
        result.split("\n").forEach(function(row) {
            var oncerow = row.split("\t");
            resultArray.push(oncerow);
        });
        console.log(resultArray);
        return resultArray;
    }
    $("#submit").click(function () {
        var couponcode = $("#couponcode").val();
        var store = $("#store").val();
        var coupondetail = $("#coupondetail").val();
        var keyauth = $("#keyauth").val();
        $.ajax({
            method: "POST",
            url: "http://localhost:8081/api/addcoupon",
            data: {
                couponcode: couponcode,
                store: store,
                keyauth: keyauth,
                coupondetail: coupondetail
            }
        }).done(function (data) {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            $("#result").append(msg);
        });
    });
</script>
</body>
</html>