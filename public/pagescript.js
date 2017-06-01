var pricemin = 1;
var pricemax = 9999999999;
var discount = 0;
var captratoken;
if (localStorage.getItem("clientKey") === null) {
    var clientKey = newToken(16);
    localStorage.setItem("clientKey", clientKey);
}
var clientKey = localStorage.getItem("clientKey");
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
    category = category + "?api=1";
    var pagestart = parseInt($("#pagestart").val());
    var pageend = parseInt($("#pageend").val());
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
    if (!$("#searchstring").val()) {
        linkquery = category;
    } else {
        linkquery = "http://www.lazada.vn/catalog/?q=" + encodeURI(searchstring);
    }
    if (pagestart > pageend) {
        var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Yêu cầu trang bắt đầu phải nhỏ hoặc bằng trang cuối</li>';
        showmsgclear(msg);
        return;
    }
    loadcontent(linkquery, pagestart, pageend, pricemin, pricemax, discount);
});

function loadcontent(linkquery, pagestart, pageend, pricemin, pricemax, discount) {
    var linksquerybuild = encodeURIComponent(linkquery + "&page=" + pagestart);
    $.ajax({
        method: "POST",
        url: "http://139.59.117.234/api/lazada",
        //url: "http://localhost:8081/api/lazada",
        data: {
            urlcrawl: linksquerybuild,
            pricemin: pricemin,
            pricemax: pricemax,
            discountmin: discount,
            clientid: clientKey
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
                loadcontent(linkquery, pagestart, pageend, pricemin, pricemax, discount, captratoken);
            } else {
                var msg = '<li class="list-group-item list-group-item-info">Đã xong thưa sếp...</li>';
                showmsgclear(msg);
            }
        }
    });
    var category_name = $("#category option:selected").text();
    $("#processloading").css("display", "block");
    var msg = '<li class="list-group-item list-group-item-success">Đang tải dữ liệu - Danh mục:' + category_name + ' - Trang:' + pagestart + '</li>';
    showmsg(msg);
}

function showmsg(msg) {
    $("#result_ext").append(msg);
}
function showmsgclear(msg) {
    $("#result_ext").html(msg);
}
/*
 $("thead").click(function () {
 var newTableObject = document.getElementById("tablesort");
 sorttable.makeSortable(newTableObject);
 var newTableObject = document.getElementById("gift_tablesort");
 sorttable.makeSortable(newTableObject);
 var newTableObject = document.getElementById("coupon_tablesort");
 sorttable.makeSortable(newTableObject);
 });*/
function showdata(data, typetab) {
    if (typetab == 'discount') {
        $.each(data, function (index, value) {
            var productlink = value['product_link'];
            var productname = value['product_name'];
            var productprice = value['product_price'];
            var productdiscount = value['product_discount'];
            var oldprice = value['product_oldprice'];
            var imgproduct = value['product_img'];
            if (oldprice == "") {
                oldprice = productprice;
            }
            if (productdiscount == "") {
                productdiscount = 0;
            }
            productlink = encodeURIComponent("http://www.lazada.vn" + productlink + "/?offer_name={offer_name}&affiliate_id={affiliate_id}&offer_id={offer_id}&transaction_id={transaction_id}&affiliate_name={affiliate_name}");
            productlink = "http://ho.lazada.vn/SHQfGy?aff_sub=SHQfGy&source=sangiaonline-CP2mo3-VN&url=" + productlink;
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            var contentshow = "<tr class='datashow'><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='" + oldint + "'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price' data-price='" + priceint + "'>" + productprice + "VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td>";
            contentshow += "<td class='favorite'><i class='fa fa-heart-o' aria-hidden='true'></i></td></tr>";
            $("#showdata").append(contentshow);
        });
        var resort = true;
        $("#tablesort").trigger("update", [resort]);
    } else if (typetab == 'discountx10') {
        $.each(data, function (index, value) {
            var productlink = value['product_link'];
            var productname = value['product_name'];
            var productprice = value['product_price'];
            var productdiscount = value['product_discount'];
            var oldprice = value['product_oldprice'];
            var imgproduct = value['product_img'];
            if (oldprice == "") {
                oldprice = productprice;
            }
            if (productdiscount == "") {
                productdiscount = 0;
            }
            productlink = encodeURIComponent("http://www.lazada.vn" + productlink + "/?offer_name={offer_name}&affiliate_id={affiliate_id}&offer_id={offer_id}&transaction_id={transaction_id}&affiliate_name={affiliate_name}");
            productlink = "http://ho.lazada.vn/SHQfGy?aff_sub=SHQfGy&source=sangiaonline-CP2mo3-VN&url=" + productlink;
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            var contentshow = "<tr class='datashow'><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='" + oldint + "'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price' data-price='" + priceint + "'>" + productprice + "VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td>";
            contentshow += "<td class='favorite'><i class='fa fa-heart-o' aria-hidden='true'></i></td></tr>";
            $("#showdatax10").append(contentshow);
        });
        var resort = true;
        $("#tablesortx10").trigger("update", [resort]);
    } else if (typetab == 'discountall') {
        $.each(data, function (index, value) {
            var productlink = value['product_link'];
            var productname = value['product_name'];
            var productprice = value['product_price'];
            var productdiscount = value['product_discount'];
            var oldprice = value['product_oldprice'];
            var imgproduct = value['product_img'];
            if (oldprice == "") {
                oldprice = productprice;
            }
            if (productdiscount == "") {
                productdiscount = 0;
            }
            productlink = encodeURIComponent("http://www.lazada.vn" + productlink + "/?offer_name={offer_name}&affiliate_id={affiliate_id}&offer_id={offer_id}&transaction_id={transaction_id}&affiliate_name={affiliate_name}");
            productlink = "http://ho.lazada.vn/SHQfGy?aff_sub=SHQfGy&source=sangiaonline-CP2mo3-VN&url=" + productlink;
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            var contentshow = "<tr class='datashow'><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='" + oldint + "'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price' data-price='" + priceint + "'>" + productprice + "VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td>";
            contentshow += "<td class='favorite'><i class='fa fa-heart-o' aria-hidden='true'></i></td></tr>";
            $("#showdataall").append(contentshow);
        });
        var resort = true;
        $("#tablesortall").trigger("update", [resort]);
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
            productlink = encodeURIComponent("http://www.lazada.vn" + productlink + "/?offer_name={offer_name}&affiliate_id={affiliate_id}&offer_id={offer_id}&transaction_id={transaction_id}&affiliate_name={affiliate_name}");
            productlink = "http://ho.lazada.vn/SHQfGy?aff_sub=SHQfGy&source=sangiaonline-CP2mo3-VN&url=" + productlink;
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            var contentshow = "<tr><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='" + oldint + "'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price' data-price='" + priceint + "'>" + productprice + "VNĐ</td>";
            contentshow += "<td>" + giftproduct + "</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td></tr>";
            $("#gift_showdata").append(contentshow);
        });
        var resort = true;
        $("#gift_tablesort").trigger("update", [resort]);
    } else if (typetab == 'giftx10') {
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
            productlink = encodeURIComponent("http://www.lazada.vn" + productlink + "/?offer_name={offer_name}&affiliate_id={affiliate_id}&offer_id={offer_id}&transaction_id={transaction_id}&affiliate_name={affiliate_name}");
            productlink = "http://ho.lazada.vn/SHQfGy?aff_sub=SHQfGy&source=sangiaonline-CP2mo3-VN&url=" + productlink;
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            var contentshow = "<tr><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='" + oldint + "'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price' data-price='" + priceint + "'>" + productprice + "VNĐ</td>";
            contentshow += "<td>" + giftproduct + "</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td></tr>";
            $("#giftx10_showdata").append(contentshow);
        });
        var resort = true;
        $("#giftx10_tablesort").trigger("update", [resort]);
    } else if (typetab == 'couponx10') {
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
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            productlink = encodeURIComponent("http://www.lazada.vn" + productlink + "/?offer_name={offer_name}&affiliate_id={affiliate_id}&offer_id={offer_id}&transaction_id={transaction_id}&affiliate_name={affiliate_name}");
            productlink = "http://ho.lazada.vn/SHQfGy?aff_sub=SHQfGy&source=sangiaonline-CP2mo3-VN&url=" + productlink;
            var contentshow = "<tr><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank >" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='" + oldint + "'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price' data-price='" + priceint + "'>" + productprice + "VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "%</td>";
            contentshow += "<td class='price'>" + coupon + "</td>";
            contentshow += "<td>" + expiredate + "</td></tr>";
            $("#couponx10_showdata").append(contentshow);
        });
        var resort = true;
        $("#couponx10_tablesort").trigger("update", [resort]);
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
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            productlink = encodeURIComponent("http://www.lazada.vn" + productlink + "/?offer_name={offer_name}&affiliate_id={affiliate_id}&offer_id={offer_id}&transaction_id={transaction_id}&affiliate_name={affiliate_name}");
            productlink = "http://ho.lazada.vn/SHQfGy?aff_sub=SHQfGy&source=sangiaonline-CP2mo3-VN&url=" + productlink;
            var contentshow = "<tr><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' target=_blank >" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='" + oldint + "'>" + oldprice + "VNĐ</td>";
            contentshow += "<td class='price' data-price='" + priceint + "'>" + productprice + "VNĐ</td>";
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
$('a[id=getcoupon]').popover({
    html: true,
    trigger: 'hover',
    placement: 'top',
    content: function () {
        return $(this).data('content');
    }
});
$("#submitx10").click(function () {
    $("#showdatax10").empty();
    var category = $("#categoryx10").val();
    category = category + "?api=1";
    var pagestart = parseInt($("#pagestartx10").val());
    var searchstring = $("#searchstringx10").val();
    var linkquery;
    if ($('#priceminx10').val() != '') {
        pricemin = $('#priceminx10').val();
    }
    if ($('#pricemaxx10').val() != '') {
        pricemax = $('#pricemaxx10').val();
    }
    if ($('#discountx10').val() != '') {
        discount = $('#discountx10').val();
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
    if (!$("#searchstringx10").val()) {
        linkquery = category;
        searchstring = "";
    } else {
        linkquery = "http://www.lazada.vn/catalog/?q=" + encodeURI(searchstring);
    }
    var pageend = pagestart + 9;
    for (i = pagestart; i <= pageend; i++) {
        loadcontentx10(linkquery, i, pricemin, pricemax, discount, searchstring);
    }
});
function loadcontentx10(linkquery, pagestart, pricemin, pricemax, discount, searchstring) {
    $("#processloadingx10").css("display", "block");
    if (searchstring != "") {
        var msg = '<li class="list-group-item list-group-item-success">Đang tải dữ liệu - Từ Khóa:<strong>' + searchstring + '</strong> - Trang:' + pagestart + '</li>';
        showmsgx10(msg);
    } else {
        var category_name = $("#categoryx10 option:selected").text();
        var msg = '<li class="list-group-item list-group-item-success">Đang tải dữ liệu - Danh mục:' + category_name + ' - Trang:' + pagestart + '</li>';
        showmsgx10(msg);
    }
    var linksquerybuild = encodeURIComponent(linkquery + "&page=" + pagestart);
    $.ajax({
        method: "POST",
        url: "http://139.59.117.234/api/lazada",
        //url: "http://localhost:8081/api/couponlazada",
        data: {
            urlcrawl: linksquerybuild,
            pricemin: pricemin,
            pricemax: pricemax,
            discountmin: discount,
            clientid: clientKey
        }
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            showmsgx10(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'discountx10');
            $("#processloadingx10").css("display", "none");
        }
    });

}

function showmsgx10(msg) {
    $("#result_x10").append(msg);
}
function showmsgclearx10(msg) {
    $("#result_x10").html(msg);
}

$("#submitall").click(function () {
    $("#showdataall").empty();
    var category = $("#categoryall").val();
    category = category + "?api=1";
    var pagestart = parseInt($("#pagestartall").val());
    var linkquery;
    if ($('#priceminall').val() != '') {
        pricemin = $('#priceminall').val();
    }
    if ($('#pricemaxall').val() != '') {
        pricemax = $('#pricemaxall').val();
    }
    if ($('#discountall').val() != '') {
        discount = $('#discountall').val();
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
    var categoryall = [];
    $("#category option").each(function () {
        var onecategory = [$(this).val(), $(this).text()];
        categoryall.push(onecategory);
    });
    for (i = 0; i < categoryall.length; i++) {
        linkquery = categoryall[i][0] + "?api=1&page=" + pagestart;
        loadcontentall(linkquery, pagestart, pricemin, pricemax, discount, categoryall[i][1]);
    }

    /*var pageend = pagestart+9;
     for(i=pagestart;i<=pageend;i++){
     loadcontentall(linkquery, i, pricemin, pricemax, discount,searchstring);
     }*/
});
function loadcontentall(linkquery, pagestart, pricemin, pricemax, discount, categoryname) {
    $("#processloadingall").css("display", "block");
    var msg = '<li class="list-group-item list-group-item-success">Đang tải dữ liệu - Danh mục:' + categoryname + ' - Trang:' + pagestart + '</li>';
    showmsgall(msg);
    var linksquerybuild = encodeURIComponent(linkquery + "&page=" + pagestart);
    $.ajax({
        method: "POST",
        url: "http://139.59.117.234/api/lazada",
        //url: "http://localhost:8081/api/couponlazada",
        data: {
            urlcrawl: linksquerybuild,
            pricemin: pricemin,
            pricemax: pricemax,
            discountmin: discount,
            clientid: clientKey
        }
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            showmsgall(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'discountall');
            $("#processloadingall").css("display", "none");
        }
    });
}

function showmsgall(msg) {
    $("#result_all").append(msg);
}
function showmsgclearall(msg) {
    $("#result_all").html(msg);
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
        url: "http://139.59.117.234/api/couponlazada",
        //url: "http://localhost:8081/api/couponlazada",
        data: {urlcrawl: linksquerybuild, pricemin: pricemin, pricemax: pricemax, clientid: clientKey}
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
    console.log(linkquery);
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
        url: "http://139.59.117.234/api/giftlazada",
        //url: "http://localhost:8081/api/giftlazada",
        data: {urlcrawl: linksquerybuild, pricemin: pricemin, pricemax: pricemax, clientid: clientKey}
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

//Gift Lazada
function showMsgGiftx10(msg) {
    $("#giftx10_result").append(msg);
}
function showMsgGiftClrx10(msg) {
    $("#giftx10_result").html(msg);
}
$("#giftx10_submit").click(function () {
    $("#giftx10_showdata").empty();
    $("#giftx10_result").empty();
    var category = $("#giftx10_category").val();
    category = category + "?api=1";
    var pagestart = parseInt($("#giftx10_pagestart").val());
    var searchstring = $("#giftx10_searchstring").val();
    var linkquery;
    if ($('#giftx10_pricemin').val() != '') {
        pricemin = $('#giftx10_pricemin').val();
    }
    if ($('#giftx10_pricemax').val() != '') {
        pricemax = $('#giftx10_pricemax').val();
    }
    if (!searchstring) {
        linkquery = category;
    } else {
        linkquery = "http://www.lazada.vn/catalog/?q=" + encodeURI(searchstring);
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
    var pageend = pagestart + 9;
    for (i = pagestart; i <= pageend; i++) {
        giftx10load(linkquery, i, pricemin, pricemax, searchstring);
    }
});
function giftx10load(linkquery, pagestart, pricemin, pricemax, searchstring) {
    $("#giftx10_loading").css("display", "block");
    if (searchstring != "") {
        var msg = '<li class="list-group-item list-group-item-success">Đang tải dữ liệu - Từ Khóa:<strong>' + searchstring + '</strong> - Trang:' + pagestart + '</li>';
        showMsgGiftx10(msg);
    } else {
        var category_name = $("#giftx10_category option:selected").text();
        var msg = '<li class="list-group-item list-group-item-success">Đang tải dữ liệu - Danh mục:' + category_name + ' - Trang:' + pagestart + '</li>';
        showMsgGiftx10(msg);
    }
    var linksquerybuild = encodeURIComponent(linkquery + "&page=" + pagestart);
    $.ajax({
        method: "POST",
        url: "http://139.59.117.234/api/giftlazada",
        //url: "http://localhost:8081/api/giftlazada",
        data: {urlcrawl: linksquerybuild, pricemin: pricemin, pricemax: pricemax, clientid: clientKey}
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            showMsgGiftClrx10(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'giftx10');
            $("#giftx10_loading").css("display", "none");
        }
    });
};
//Coupon x10
function showMsgCouponx10(msg) {
    $("#couponx10_result").append(msg);
}
function showMsgcouponx10_Clr(msg) {
    $("#couponx10_result").html(msg);
}
$("#couponx10_submit").click(function () {
    $("#couponx10_showdata").empty();
    $("#couponx10_result").empty();
    var category = $("#couponx10_category").val();
    category = category + "?api=1";
    var pagestart = parseInt($("#couponx10_pagestart").val());
    var searchstring = $("#couponx10_searchstring").val();
    var linkquery;
    if ($('#couponx10_pricemin').val() != '') {
        pricemin = $('#couponx10_pricemin').val();
    }
    if ($('#couponx10_pricemax').val() != '') {
        pricemax = $('#couponx10_pricemax').val();
    }
    if (!searchstring) {
        linkquery = category;
    } else {
        linkquery = "http://www.lazada.vn/catalog/?q=" + encodeURI(searchstring);
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
    var pageend = pagestart + 9;
    for (i = pagestart; i <= pageend; i++) {
        cLoadingx10(linkquery, i, pricemin, pricemax, searchstring);
    }

});
function cLoadingx10(linkquery, pagestart, pricemin, pricemax, searchstring) {
    $("#couponx10_loading").css("display", "block");
    if (searchstring != "") {
        var msg = '<li class="list-group-item list-group-item-success">Đang tải dữ liệu - Từ Khóa:<strong>' + searchstring + '</strong> - Trang:' + pagestart + '</li>';
        showMsgCouponx10(msg);
    } else {
        var category_name = $("#couponx10_category option:selected").text();
        var msg = '<li class="list-group-item list-group-item-success">Đang tải dữ liệu - Danh mục:' + category_name + ' - Trang:' + pagestart + '</li>';
        showMsgCouponx10(msg);
    }
    var linksquerybuild = encodeURIComponent(linkquery + "&page=" + pagestart);
    $.ajax({
        method: "POST",
        url: "http://139.59.117.234/api/couponlazada",
        //url: "http://localhost:8081/api/couponlazada",
        data: {urlcrawl: linksquerybuild, pricemin: pricemin, pricemax: pricemax, clientid: clientKey}
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            showMsgcouponx10_Clr(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'couponx10');
            $("#couponx10_loading").css("display", "none");
        }
    });
};

//Guide Newbie

//End
// Retrieve
/*
 $.ajax({
 url: 'https://cors-anywhere.herokuapp.com/www.lazada.vn/',
 type: 'GET',
 success: function (data) {
 //console.log(data);
 var data_secondmenu = [];
 //var $ = data;
 $(data).find(".c-second-menu__item_style_heading1").each(function (i) {

 var linkcategory = $(this).find("a").attr('href');
 var namecategory = $(this).find("a").text();
 namecategory = capitalizeEachWord(namecategory.toLowerCase());
 var option_category = "<option value='" + linkcategory + "'>" + namecategory + "</option>";
 $('#category').append(option_category);
 });
 }
 });
 function capitalizeEachWord(str)
 {
 var words = str.split(" ");
 var arr = [];
 for (i in words)
 {
 temp = words[i].toLowerCase();
 temp = temp.charAt(0).toUpperCase() + temp.substring(1);
 arr.push(temp);
 }
 return arr.join(" ");
 }
 */