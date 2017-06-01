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
    /*var pagestart = parseInt($("#pagestart").val());
    var pageend = parseInt($("#pageend").val());*/
    var searchstring = $("#searchstring").val();
    var linkquery;
    if ($('#pricemin').val() != '') {
        pricemin = $('#pricemin').val();
    }
    if ($('#pricemax').val() != '') {
        pricemax = $('#pricemax').val();
    }
    if ($('#discount').val() != '') {
        discount = $('#discount').val();
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
    if (!searchstring) {
        linkquery = category;
    } else {
        linkquery = "http://www.yes24.vn/tim-kiem?q=" + encodeURI(searchstring);
    }
    loadcontent(linkquery, pricemin, pricemax, discount);
});
function showmsg(msg) {
    $("#result_ext").append(msg);
}
function showmsgclear(msg) {
    $("#result_ext").html(msg);
}
function loadcontent(linkquery, pricemin, pricemax, discount) {
    var linksquerybuild = encodeURIComponent(linkquery);
    $.ajax({
        method: "POST",
        //url: "http://104.199.207.199/api/yes24",
        url: "http://localhost:8081/api/yes24",
        data: {urlcrawl: linksquerybuild, pricemin: pricemin, pricemax: pricemax, discountmin: discount, clientid: tokenKey}
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            showmsg(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'discount');
            $("#coupon_loading").css("display", "none");
            var msg = '<li class="list-group-item list-group-item-info">Đã xong thưa sếp...</li>';
            showmsgclear(msg);
        }
    });
    var category_name = $("#category option:selected").text();
    $("#processloading").css("display", "block");
    var msg = '<li class="list-group-item list-group-item-success">Đang tìm kiếm mã giảm giá * Danh mục:' + category_name +'</li>';
    showmsg(msg);
}
function showdata(data, typetab) {
    if (typetab == 'discount') {
        $.each(data, function (index, value) {
            var productlink = value['product_link'];
            var productname = value['product_name'];
            var productprice = value['product_price'];
            var productdiscount = value['product_discount'];
            var oldprice = value['product_oldprice'];
            var imgproduct = value['product_img'];
            if (productdiscount == "") {
                productdiscount = 0;
            }
            var contentshow = "<tr><td><a href='http://www.lazada.vn" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice'>" + oldprice + "</td>";
            contentshow += "<td class='price'>" + productprice + "</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td></tr>";
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

//Coupon
function showMsgCoupon(msg) {
    $("#coupon_result").append(msg);
}
function showMsgCoupon_Clr(msg) {
    $("#coupon_result").html(msg);
}
$("#coupon_submit").click(function () {
    $("#coupon_showdata").empty();
    $("#coupon_result").empty();
    var category = $("#coupon_category").val();
    category = category + "?api=1";
    var pagestart = parseInt($("#coupon_pagestart").val());
    var pageend = parseInt($("#coupon_pageend").val());
    var searchstring = $("#coupon_searchstring").val();
    var linkquery;
    if ($('#coupon_pricemin').val() != '') {
        pricemin = $('#coupon_pricemin').val();
    }
    if ($('#coupon_pricemax').val() != '') {
        pricemax = $('#coupon_pricemax').val();
    }
    if (!searchstring) {
        linkquery = category;
    } else {
        linkquery = "http://www.lazada.vn/catalog/?q=" + encodeURI(searchstring);
    }
    if (pagestart > pageend) {
        var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Yêu cầu trang bắt đầu phải nhỏ hoặc bằng trang cuối</li>';
        showMsgCoupon_Clr(msg);
        return;
    }
    /*if (typeof $.cookie('keyactive') === 'undefined') {
     if ($('#captratoken').val() == '') {
     var msg = '<li class="list-group-item list-group-item-danger">Vui lòng nhập Mã Kích Hoạt...</li>';
     showmsg(msg);
     return;
     }
     var captratoken = $("#captratoken").val();
     } else {
     var captratoken = $.cookie('keyactive');
     }*/
    couponloading(linkquery, pagestart, pageend, pricemin, pricemax);
});
function couponloading(linkquery, pagestart, pageend, pricemin, pricemax) {
    var linksquerybuild = encodeURIComponent(linkquery + "&page=" + pagestart);
    $.ajax({
        method: "POST",
        url: "http://104.199.207.199/api/couponlazada",
        //url: "http://localhost:8081/api/couponlazada",
        data: {urlcrawl: linksquerybuild, pricemin: pricemin, pricemax: pricemax, clientid: tokenKey}
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            showMsgCoupon_Clr(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'coupon');
            $("#coupon_loading").css("display", "none");
            pagestart++;
            if (pagestart <= pageend) {
                couponloading(linkquery, pagestart, pageend, pricemin, pricemax);
            } else {
                var msg = '<li class="list-group-item list-group-item-info">Đã xong thưa sếp...</li>';
                showMsgCoupon(msg);
            }
        }
    });
    var category_name = $("#coupon_category option:selected").text();
    $("#coupon_loading").css("display", "block");
    var msg = '<li class="list-group-item list-group-item-success">Đang tìm kiếm mã giảm giá * Danh mục:' + category_name + ' * Trang:' + pagestart + '</li>';
    showMsgCoupon(msg);
};
//Gift Lazada
function showMsgGift(msg) {
    $("#gift_result").append(msg);
}
function showMsgGiftClr(msg) {
    $("#gift_result").html(msg);
}
$("#gift_submit").click(function () {
    $("#gift_showdata").empty();
    $("#gift_result").empty();
    var category = $("#gift_category").val();
    category = category + "?api=1";
    var pagestart = parseInt($("#gift_pagestart").val());
    var pageend = parseInt($("#gift_pageend").val());
    var searchstring = $("#gift_searchstring").val();
    var linkquery;
    if ($('#gift_pricemin').val() != '') {
        pricemin = $('#gift_pricemin').val();
    }
    if ($('#gift_pricemax').val() != '') {
        pricemax = $('#gift_pricemax').val();
    }
    if (!searchstring) {
        linkquery = category;
    } else {
        linkquery = "http://www.lazada.vn/catalog/?q=" + encodeURI(searchstring);
    }
    if (pagestart > pageend) {
        var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Yêu cầu trang bắt đầu phải nhỏ hoặc bằng trang cuối</li>';
        showMsgGiftClr(msg);
        return;
    }
    /*if (typeof $.cookie('keyactive') === 'undefined') {
     if ($('#captratoken').val() == '') {
     var msg = '<li class="list-group-item list-group-item-danger">Vui lòng nhập Mã Kích Hoạt...</li>';
     showmsg(msg);
     return;
     }
     var captratoken = $("#captratoken").val();
     } else {
     var captratoken = $.cookie('keyactive');
     }*/
    giftload(linkquery, pagestart, pageend, pricemin, pricemax);
});
function giftload(linkquery, pagestart, pageend, pricemin, pricemax) {
    var linksquerybuild = encodeURIComponent(linkquery + "&page=" + pagestart);
    $.ajax({
        method: "POST",
        url: "http://104.199.207.199/api/giftlazada",
        //url: "http://localhost:8081/api/giftlazada",
        data: {urlcrawl: linksquerybuild, pricemin: pricemin, pricemax: pricemax, clientid: tokenKey}
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            showMsgGiftClr(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'gift');
            $("#gift_loading").css("display", "none");
            pagestart++;
            if (pagestart <= pageend) {
                giftload(linkquery, pagestart, pageend, pricemin, pricemax);
            } else {
                var msg = '<li class="list-group-item list-group-item-info">Đã xong thưa sếp...</li>';
                showMsgGift(msg);
            }
        }
    });
    var category_name = $("#gift_category option:selected").text();
    $("#gift_loading").css("display", "block");
    var msg = '<li class="list-group-item list-group-item-success">Đang tìm kiếm sản phẩm có quà tặng * Danh mục:' + category_name + ' * Trang:' + pagestart + '</li>';
    showMsgGift(msg);
};

//End
// Retrieve

/*
$.ajax({
    url: 'https://cors-anywhere.herokuapp.com/www.yes24.vn/',
    type: 'GET',
    success: function (data) {
        //console.log(data);
        var data_secondmenu = [];
        //var $ = data;
        $(data).find(".depth1").each(function (i) {
            var h2tag = $(this).find("h2");
            var linkcategory = h2tag.find("a").attr('href');
            var namecategory = h2tag.find("a").text();
            namecategory = capitalizeEachWord(namecategory.toLowerCase());
            var option_category = "<option value='" + linkcategory + "'>" + namecategory + "</option>";
            $('#category').append(option_category);
        });
    }
});
function capitalizeEachWord(str) {
    var words = str.split(" ");
    var arr = [];
    for (i in words) {
        temp = words[i].toLowerCase();
        temp = temp.charAt(0).toUpperCase() + temp.substring(1);
        arr.push(temp);
    }
    return arr.join(" ");
}*/
