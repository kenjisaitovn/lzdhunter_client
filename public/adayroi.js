/*
$.ajax({
    url: 'https://cors-anywhere.herokuapp.com/www.adayroi.com/',
    type: 'GET',
    success: function (data) {
        //console.log(data);
        var data_secondmenu = [];
        //var $ = data;
        var megamenu = $(data).find("#mega_menu_0_content");
        $(data).find(".content").each(function (i) {
            $(this).find(".big-title").each(function (j) {
                var linkcategory = $(this).find("a").attr('href');
                var namecategory = $(this).find("a").text();
                namecategory = namecategory.replace(/(\r\n|\n|\r)/gm, "");
                if (namecategory != "Tất cả danh mục »") {
                    if (namecategory.indexOf("Vin") == -1) {
                        if (linkcategory.indexOf("?") > -1) {
                            linkcategory = linkcategory.split("?");
                            linkcategory = linkcategory[0];
                        }
                        if (linkcategory.indexOf("adayroi.com") == -1) {
                            linkcategory = "https://www.adayroi.com" + linkcategory;
                        }
                        namecategory = capitalizeEachWord(namecategory.toLowerCase());
                        var option_category = "<option value='" + linkcategory + "'>" + namecategory + "</option>";
                        $('#adr_category').append(option_category);
                    }

                }
            });
        });
    }
});*/
