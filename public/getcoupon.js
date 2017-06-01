if (localStorage.getItem("tokenKey") === null) {
    var tokenKey = newToken(16);
    localStorage.setItem("tokenKey", tokenKey);
}
var tokenKey = localStorage.getItem("tokenKey");
function newToken(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
$(".getcoupon").click(function () {
    if(!!$.cookie("logged")){
        var userlogged = $.cookie("logged");
        var storename = $(this).data("store");
        $.ajax({
            method: "POST",
            url: "http://139.59.117.234:8081/member/getcoupon",
            //url: "http://localhost:8081/lzd/getcoupon",
            data: {
                storename: storename,
                userid:userlogged,
                clientid: tokenKey
            }
        }).done(function (data) {
            $("#processloading").css("display", "none");
            var html;
            if (data['statuscode'] == 1) {
                var couponcode = data['couponcode'];
                var coupondes = data['coupondes'];
                var productlink = data['productlink'];
                html = '<div class="panel panel-success"><div class="panel-heading">Tự động lấy mã thành công</div><div class="panel-body"><p>Mã giảm giá bạn nhận được</p>' +
                    '<div class="input-group">'+
                    '<input type="text" class="form-control" id="couponcode" data-link="'+productlink+'" value="'+couponcode+'" disabled>'+
                    '<span class="input-group-btn">'+
                    '<button class="btn btn-primary" type="button" onclick="copyTextToClipboard()">Bấm Copy</button>'+
                    '</span>'+
                    '</div><p>Áp dụng:' + coupondes + '</p><p>Link sản phẩm:<a href="' + productlink + '" target=_blank>Bấm vào đây</a></p></div></div>';
            } else if (data['statuscode'] == 0) {
                html = '<div class="panel panel-danger"><div class="panel-heading">Hệ thống đã hết mã - Hãy chọn mã loại khác</div><div class="panel-body"><p>Hệ thống đã hết mã giảm giá</p><p>Tham gia group để tìm kiếm thêm</p><p>Hoặc đóng góp mã mà bạn biết</p></div></div>';
            } else if (data['statuscode'] == 2) {
                html = '<div class="panel panel-warning"><div class="panel-heading">Giới hạn lấy mã giảm giá</div><div class="panel-body"><p>Hôm nay bạn đã sử dụng 2 lần chức năng lấy mã</p><p>Chia sẻ website để nhận thêm lần sử dụng</p></div></div>';
            } else {
                html = "<p>Lỗi không xác định</p>";
            }
            $("#showcontent").html(html);
        });
        $("#processloading").css("display", "block");
    }else {
        var html = '<div class="panel panel-danger"><div class="panel-heading">Yêu cầu đăng nhập</div><div class="panel-body"><p>Để đảm bảo người dùng thật sử dụng MGG</p><p>Chúng tôi yêu cầu bạn đăng nhập để sử dụng</p><p>Vui lòng bấm đăng nhập ở trên</p><p>Xin cám ơn!</p></div></div>';
        $("#showcontent").html(html);
    }
});

function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = $("#couponcode").val();
    document.body.appendChild(textArea);
    textArea.select();
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    var linkgoto = $("#couponcode").data("link");
    window.open(linkgoto, '_blank');
    document.body.removeChild(textArea);
}