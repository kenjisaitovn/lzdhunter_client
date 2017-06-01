var pricemin = 1;
var pricemax = 9999999999;
var discount = 0;
var captratoken;
if (localStorage.getItem("tokenKey") === null) {
    var tokenKey = newToken(16);
    localStorage.setItem("tokenKey", tokenKey);
}
var tokenKey = localStorage.getItem("tokenKey");
var refeshsort;
/*
 if (typeof $.cookie('keyactive') === 'undefined'){
 //no cookie
 } else {
 var captratoken = $.cookie('keyactive');
 var msg = '<div class="alert alert-success"><strong>Key Active:</strong>'+captratoken+'</div>';
 $("#keyactive").html(msg);
 }
 */
$("#submit").click(function () {
    $("#showdata").empty();
    var category = $("#category").val();
    var pagestart = parseInt($("#pagestart").val());
    var pageend = parseInt($("#pageend").val());
    if ($('#pricemin').val() != '') {
        pricemin = $('#pricemin').val();
    }
    if ($('#pricemax').val() != '') {
        pricemax = $('#pricemax').val();
    }
    if (pagestart > pageend) {
        var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Yêu cầu trang bắt đầu phải nhỏ hoặc bằng trang cuối</li>';
        showmsgclear(msg);
        return;
    }
    /*
     if (typeof $.cookie('keyactive') === 'undefined') {
     if ($('#captratoken').val() == '') {
     var msg = '<li class="list-group-item list-group-item-danger">Vui lòng nhập Mã Kích Hoạt...</li>';
     showmsg(msg);
     return;
     }
     var captratoken = $("#captratoken").val();
     }else{
     var captratoken = $.cookie('keyactive');
     }
     */
    var linkquery,searchstring;
    searchstring = $("#searchstring").val();
    if ($('#searchstring').val() != '') {
        linkquery = "https://shopee.vn/search/?keyword=" + encodeURI(searchstring);
    }else{
        linkquery = category;
    }
	console.log("Clicked");
    loadcontent(linkquery, pageend, pagestart, pricemin, pricemax,searchstring);
});
function showmsg(msg) {
    $("#result_ext").append(msg);
}
function showmsgclear(msg) {
    $("#result_ext").html(msg);
}
function loadcontent(linkquery, pageend, pagestart, pricemin, pricemax,searchstring) {
    var category_name = $("#category option:selected").text();
    $("#processloading").css("display", "block");
    var msg = '<li class="list-group-item list-group-item-success">Đang tìm kiếm sản phẩm giảm giá * Danh Mục:' + category_name + ' - Trang:'+pagestart+'</li>';
    var linksquerybuild = encodeURIComponent(linkquery+"?page="+pagestart);
    showmsg(msg);
    $.ajax({
        method: "POST",
        url: "http://localhost:8081/api/shopee",
        //url: "http://104.199.207.199/api/shopee",
        data: {
            urlcrawl: linksquerybuild,
            pricemin: pricemin,
            pricemax: pricemax,
            clientid: tokenKey
        }
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            showmsg(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'discount');
            $("#processloading").css("display", "none");
            pagestart++;
            if (pagestart <= pageend) {
                loadcontent(linkquery,pageend, pagestart, pricemin, pricemax);
            } else {
                var msg = '<li class="list-group-item list-group-item-info">Đã xong thưa sếp...</li>';
                showmsgclear(msg);
            }
        }
    });
}

function showdata(data, typetab) {
    if (typetab == 'discount') {
        $.each(data, function (index, value) {
            var productlink = value['product_link'];
            var productname = value['product_name'];
            var productprice = value['product_price'];
            var productdiscount = value['product_discount'];
            var oldprice = value['product_oldprice'];
            var lovesproduct = value['product_likes'];
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            var contentshow = "<tr><td><a href='https://shopee.vn" + productlink + "' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='"+oldint+"'>" + oldprice + " VNĐ</td>";
            contentshow += "<td class='price' data-price='"+priceint+"'>" + productprice + " VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "</td>";
            contentshow += "<td class='lovethis'><i class='fa fa-heart' aria-hidden='true'></i> " + lovesproduct + "</td></tr>";
            $("#showdata").append(contentshow);
        });
        var resort = true;
        $("#tablesort").trigger("update", [resort]);
    } else if (typetab == 'gift') {
        $.each(data, function (index, value) {
            var productname = value['product_name'];
            var giftproduct = value['product_gift'];
            var productprice = value['product_price'];
            var productdiscount = value['product_discount'];
            var oldprice = value['product_oldprice'];
            var productlink = value['product_link'];
            var imgproduct = value['product_img'];
            if (oldprice < 1) {
                oldprice = productprice;
            }
            if (productdiscount < 1) {
                productdiscount = 0;
            }
            var contentshow = "<tr><td><a href='http://www.lazada.vn" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank>" + productname + "</a></td>";
            contentshow += "<td>" + giftproduct + "</td>";
            contentshow += "<td class='oldprice'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price'>" + productprice + "VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td></tr>";
            $("#gift_showdata").append(contentshow);
        });
        var resort = true;
        $("#gift_tablesort").trigger("update", [resort]);
    } else {
        //Coupon
        $.each(data, function (index, value) {
            var productlink = value['product_link'];
            var productname = value['product_name'];
            var productprice = value['product_price'];
            var productdiscount = value['product_discount'];
            var oldprice = value['product_oldprice'];
            var coupon = value['product_coupon'];
            var expiredate = value['product_expire'];
            var imgproduct = value['product_img'];
            var contentshow = "<tr><td><a href='http://www.lazada.vn" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank >" + productname + "</a></td>";
            contentshow += "<td class='oldprice'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price'>" + productprice + "VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td>";
            contentshow += "<td class='price'>" + coupon + "</td>";
            contentshow += "<td>" + expiredate + "</td></tr>";
            $("#coupon_showdata").append(contentshow);
        });
        var resort = true;
        $("#coupon_tablesort").trigger("update", [resort]);
    }
    $('a[rel=popover]').popover({
        html: true,
        trigger: 'hover',
        placement: 'top',
        content: function () {
            return '<img src="' + $(this).data('img') + '" />';
        }
    });

}

function newToken(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
