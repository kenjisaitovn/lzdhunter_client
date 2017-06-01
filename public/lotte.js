var pricemin = 1;
var pricemax = 9999999999;
var discount = 0;
var captratoken;
if (localStorage.getItem("tokenKey") === null) {
    var tokenKey = newToken(16);
    localStorage.setItem("tokenKey", tokenKey);
}
var tokenKey = localStorage.getItem("tokenKey");
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
    var linkquery;
    var searchstring = $("#searchstring").val();
    if ($('#searchstring').val() != '') {
        linkquery = "https://www.lotte.vn/catalogsearch/result/?q=" + encodeURI(searchstring);
        loadcontent(linkquery, pageend, pagestart, pricemin, pricemax,searchstring);
    }else{
        linkquery = category;
        loadcontent(linkquery, pageend, pagestart, pricemin, pricemax);
    }
});
function showmsg(msg) {
    $("#result_ext").append(msg);
}
function showmsgclear(msg) {
    $("#result_ext").html(msg);
}
function loadcontent(linkquery, pageend, pagestart, pricemin, pricemax,searchstring) {
    if(searchstring){
        $("#processloading").css("display", "block");
        var msg = '<li class="list-group-item list-group-item-success">Đang tìm kiếm sản phẩm giảm giá * Từ Khóa:<strong>' + searchstring + '</strong> - Trang:'+pagestart+'</li>';
        var linksquerybuild = encodeURIComponent(linkquery+"&p="+pagestart);
        showmsg(msg);
    }else{
        var category_name = $("#category option:selected").text();
        $("#processloading").css("display", "block");
        var msg = '<li class="list-group-item list-group-item-success">Đang tìm kiếm sản phẩm giảm giá * Danh Mục:<strong>' + category_name + '</strong> - Trang:'+pagestart+'</li>';
        var linksquerybuild = encodeURIComponent(linkquery+"?p="+pagestart);
        showmsg(msg);
    }

    $.ajax({
        method: "POST",
        //url: "http://localhost:8081/api/lotte",
        url: "http://139.59.117.234/api/lotte",
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
                loadcontent(linkquery,pageend, pagestart, pricemin, pricemax,searchstring);
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
            var product_brand = value['product_brand'];
            var product_image = value['product_image'];
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            var contentshow = "<tr><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + product_image + "' rel='nofollow' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='"+oldint+"'>" + oldprice + " VNĐ</td>";
            contentshow += "<td class='price' data-price='"+priceint+"'>" + productprice + " VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "</td>";
            contentshow += "<td class='brand-name'> " + product_brand + "</td></tr>";
            $("#showdata").append(contentshow);
        });
        var resort = true;
        $("#tablesort").trigger("update", [resort]);
    } else if (typetab == 'gift') {
        $.each(data, function (index, value) {
            var productlink = value['product_link'];
            var productname = capitalizeEachWord(value['product_name']);
            var productprice = value['product_price'];
            var productdiscount = value['product_discount'];
            var oldprice = value['product_oldprice'];
            var giftname = capitalizeEachWord(value['giftname']);
            var product_image = value['product_image'];
            var oldint = parseInt(oldprice.replace(/\./g, ''));
            var priceint = parseInt(productprice.replace(/\./g, ''));
            var contentshow = "<tr><td><a href='" + productlink + "' rel='popover' data-placement='top' data-img='" + product_image + "' rel='nofollow' target=_blank>" + productname + "</a></td>";
            contentshow += "<td class='oldprice' data-oldprice='"+oldint+"'>" + oldprice + " VNĐ</td>";
            contentshow += "<td class='price' data-price='"+priceint+"'>" + productprice + " VNĐ</td>";
            contentshow += "<td class='discount'>" + productdiscount + "</td>";
            contentshow += "<td class='giftname'> " + giftname + "</td></tr>";
            $("#g_showdata").append(contentshow);
        });
        var resort = true;
        $("#g_tablesort").trigger("update", [resort]);
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
            var contentshow = "<tr><td><a href='http://www.lazada.vn" + productlink + "' rel='popover' data-placement='top' data-img='" + imgproduct + "' rel='nofollow' target=_blank >" + productname + "</a></td>";
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
//Gift
$("#g_submit").click(function () {
    $("#g_showdata").empty();
    var category = $("#g_category").val();
    var pagestart = parseInt($("#g_pagestart").val());
    var pageend = parseInt($("#g_pageend").val());
    if ($('#g_pricemin').val() != '') {
        pricemin = $('#g_pricemin').val();
    }
    if ($('#g_pricemax').val() != '') {
        pricemax = $('#g_pricemax').val();
    }
    if (pagestart > pageend) {
        var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Yêu cầu trang bắt đầu phải nhỏ hoặc bằng trang cuối</li>';
        g_showmsgclear(msg);
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
    var linkquery;
    var searchstring = $("#searchstring").val();
    if ($('#searchstring').val() != '') {
        linkquery = "https://www.lotte.vn/catalogsearch/result/?q=" + encodeURI(searchstring);
        g_loadcontent(linkquery, pageend, pagestart, pricemin, pricemax,searchstring);
    }else{
        linkquery = category;
        g_loadcontent(linkquery, pageend, pagestart, pricemin, pricemax);
    }
});
function g_showmsg(msg) {
    $("#g_result_ext").append(msg);
}
function g_showmsgclear(msg) {
    $("#g_result_ext").html(msg);
}
function g_loadcontent(linkquery, pageend, pagestart, pricemin, pricemax,searchstring) {
    if(searchstring){
        $("#processloading").css("display", "block");
        var msg = '<li class="list-group-item list-group-item-success">Đang tìm kiếm sản phẩm có quà tặng * Từ Khóa:<strong>' + searchstring + '</strong> - Trang:'+pagestart+'</li>';
        var linksquerybuild = encodeURIComponent(linkquery+"&p="+pagestart);
        g_showmsg(msg);
    }else{
        var category_name = $("#category option:selected").text();
        $("#processloading").css("display", "block");
        var msg = '<li class="list-group-item list-group-item-success">Đang tìm kiếm sản phẩm có quà tặng * Danh Mục:<strong>' + category_name + '</strong> - Trang:'+pagestart+'</li>';
        var linksquerybuild = encodeURIComponent(linkquery+"?p="+pagestart);
        g_showmsg(msg);
    }

    $.ajax({
        method: "POST",
        //url: "http://localhost:8081/api/lottegift",
        url: "http://139.59.117.234/api/lottegift",
        data: {
            urlcrawl: linksquerybuild,
            pricemin: pricemin,
            pricemax: pricemax,
            clientid: tokenKey
        }
    }).done(function (data) {
        if (data == "error") {
            var msg = '<li class="list-group-item list-group-item-danger">*Lỗi: Mã Kích Hoạt Sai Hoặc Không Tồn Tại...</li>';
            g_showmsg(msg);
        } else {
            //$.cookie("keyactive", captratoken, 5);
            showdata(data, 'gift');
            $("#g_processloading").css("display", "none");
            pagestart++;
            if (pagestart <= pageend) {
                g_loadcontent(linkquery,pageend, pagestart, pricemin, pricemax,searchstring);
            } else {
                var msg = '<li class="list-group-item list-group-item-info">Đã xong thưa sếp...</li>';
                g_showmsgclear(msg);
            }
        }
    });
}
//End
//Coupon
//End
function newToken(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
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
/*
$.ajax({
    url: 'https://cors-anywhere.herokuapp.com/www.lotte.vn/',
    type: 'GET',
    success: function (data) {
        //console.log(data);
        var data_secondmenu = [];
        //var $ = data;
        $(data).find(".nav-item").each(function (i) {
            var linkcategory = $(this).find("a").attr('href');
            var namecategory = $(this).find("span").text();
            namecategory = capitalizeEachWord(namecategory.toLowerCase());
            var option_category = "<option value='" + linkcategory + "'>" + namecategory + "</option>";
            $('#category').append(option_category);
        });
    }
});
*/
