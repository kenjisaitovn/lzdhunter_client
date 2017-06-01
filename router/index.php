<?php
$base['title'] = "Lazada Hunter - Tìm kiếm sản phẩm giảm giá Lazada";
$base['description'] = "Công cụ Lazada Hunter - Tìm kiếm mã giảm giá, sản phẩm hot, sản phẩm có mã giảm giá Lazada";
$base['image'] = "http://lazadahunter.com/images/lazadahunter.jpg";
$filecontent = "lazada.php";
if(isset($_GET['store'])){
    switch ($_GET['store']){
        case 'lazada-hunter':
            $filecontent = "lazada.php";
            break;
        case 'lotte-hunter':
            $base['title'] = "Lotte Hunter - Tìm kiếm sản phẩm giảm giá Lotte";
            $base['description'] = "Công cụ Lotte Hunter - Tìm kiếm mã giảm giá, sản phẩm hot, sản phẩm có mã giảm giá Lotte";
            $base['image'] = "http://lazadahunter.com/images/lotte-hunter.jpg";
            $filecontent = "lotte.php";
            break;
        /*
		case 'shopee-hunter':
            $base['title'] = "Shopee Hunter - Tìm kiếm sản phẩm giảm giá Shopee";
            $base['description'] = "Công cụ Shopee Hunter - Tìm kiếm mã giảm giá, sản phẩm hot, sản phẩm có mã giảm giá Shopee";
            $base['image'] = "http://lazadahunter.com/images/Shopee-hunter.jpg";
            $filecontent = "shopee.php";
            break;*/
        case 'lay-ma-giam-gia':
            $base['title'] = "Tự động lấy mã giảm giá Lazada,Shopee,Lotte,Yes24";
            $base['description'] = "Công cụ tự động lấy mã giảm giá Lazada,Shopee,Lotte,Yes24 - Tìm kiếm mã giảm giá, sản phẩm hot, sản phẩm có mã giảm giá Shopee";
            $base['image'] = "http://lazadahunter.com/images/Shopee-hunter.jpg";
            $filecontent = "getcoupon.php";
            break;
        case 'member':
            $base['title'] = "Quản lý tài khoản";
            $base['description'] = "Công cụ tự động lấy mã giảm giá Lazada,Shopee,Lotte,Yes24 - Tìm kiếm mã giảm giá, sản phẩm hot, sản phẩm có mã giảm giá Shopee";
            $base['image'] = "http://lazadahunter.com/images/Shopee-hunter.jpg";
            $filecontent = "member.php";
            break;
        default:
            $filecontent = "unknow.php";
            break;
    }
}
?>