var speed = 300;
var srcItemBanner = "../images/item";
var positionItemMinBanner =0;
var positionItemMaxBanner=0;
var numberOfItemBanner = 8;
var idListItemBanner = "#list_item";
var positionItemMinProduct =0;
var positionItemMaxProduct=3;
var numberOfItemProduct = 8;
var idListItemProduct = "#list_item_right";
var numberDisplayItemProduct = 4;
var numberDisplayItemBanner = 1;
var idItemBanner = "#img";
var idItemProduct = "#list_item_right_img";
var click =false;
var timeOutMove;
$(function () {
    $("input").focusin(function () {
        $(this).val("");
        $(this).css("color", "#444444")
    });
    $("#1").focusout(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).val("Search entrie store here...");
            $(this).css("color", "#CCCCCC")
        }
    })
    $("#2").focusout(function () {
        if ($.trim($(this).val()).length == 0) {
            $(this).val("Enter your email address");
            $(this).css("color", "#CCCCCC")
        }
    })
    $("#submitEmail").click(function () {
        var em = $(".email input").val();
        if ($.trim(em).length == 0) {
            alert("Please enter your email");
            e.preventDefault();
        }
        if (!(validateEmail(em))) {
            alert("Error email form");
        }
        else {
            alert("Thank you");
            e.preventDefault();
        }
    });
    var index = 0,
        lastIndex = 0,
        $slide = $(".slideshow"),
        $dot = $(".dotE"),
        setInt;
    $slide.hide().eq(index).show();
    $dot.eq(index).css("border", "5px solid #919595");
    function fadefn(index, time) {
        fadeDot(index - 1);
        $slide.fadeOut(time).eq(index).stop().fadeIn(time);
    }

    function fadeDot(index1) {
        $dot.eq(index1 % 4).css("border", "5px solid #CCCCCC");
        $dot.eq((index1 + 1) % 4).css("border", "5px solid #919595");
    }

    function stopInt() {
        clearInterval(setInt);
    }

    function startInt() {
        setInt = setInterval(
            function () {
                index++;
                if (index > 3)
                    index = 0;
                lastIndex = index;
                fadefn(index, 3000)
            }, 6000);
    }

    $(".dotE").click(function () {
        index = $(".dotE").index(this);
        $slide.hide().eq(index).fadeIn(1000);
        $dot.css("border", "5px solid #CCCCCC").eq(index).css("border", "5px solid #919595");
    })
    $slide.hover(stopInt, startInt);
    startInt();
    $("#next").click(function () {
        index++;
        if (index > 3)
            index = 0;
        fadefn(index, 1000)
    })
    $("#back").click(function () {
        $dot.eq(index % 4).css("border", "3px solid #CCCCCC");
        index--;
        if (index < 0)
            index = 3;
        $dot.eq((index) % 4).css("border", "5px solid #919595");
        $slide.fadeOut(1000).eq(index).stop().fadeIn(1000);
    })
    var wtd = parseInt($(".it").css("width")) + 12;
    slideItem($("#backItem"), $(".it"), -wtd);
    slideItem($("#nextItem"), $(".it"), +wtd);
    slideItem($("#backItem1"), $(".itt"), -wtd);
    slideItem($("#nextItem1"), $(".itt"), +wtd);
    $(".mmenu").click(function () {
        $(".mmenu").removeClass("active");
        $(this).addClass("active");
    });
    $(".mmenu1").click(function () {
        $(".mmenu1").removeClass("active1");
        $(this).addClass("active1");
    });

    $("#banner_bt_next").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
        if (positionItemMinBanner == 0)
            positionItemMinBanner = numberOfItemBanner - 1;
        else positionItemMinBanner --;
        nextItem(positionItemMinBanner,$(".banner_items"),srcItemBanner,1,idItemBanner,idListItemBanner);
        }
    })

    $("#banner_bt_pre").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            if (positionItemMaxBanner == numberOfItemBanner - 1)
                positionItemMaxBanner = 0;
            else positionItemMaxBanner++;
            preItem(positionItemMaxBanner, $(".banner_items"), srcItemBanner, 1,idItemBanner,idListItemBanner);

        }
    })

    $("#product_bt_next").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            var positionLagre = positionItemMinProduct;
            if (positionItemMinProduct == 0){
                positionItemMinProduct = numberOfItemProduct - 1;
            }

            else {
                positionItemMinProduct --;
            }
            if (positionItemMaxBanner == 0)
                positionItemMaxProduct=numberOfItemProduct-1;
            else positionItemMaxProduct --;
            nextItem(positionItemMinProduct,$(".list_item_right"),srcItemBanner,numberDisplayItemProduct,idItemProduct,idListItemProduct);
            changeLargeItem(positionLagre)
        }
    })

    $("#product_bt_pre").click(function () {
        if (click == false) {
            click = true;
            clearTimeout(timeOutMove);
            timeOutMove = setTimeout(function () {
                click = false;
            }, speed);
            var positionLagre = positionItemMinProduct;
            if (positionItemMaxProduct == numberOfItemProduct-1){
                positionItemMaxProduct = 0;
            }

            else {
                positionItemMaxProduct ++;
            }
            if (positionItemMinProduct == numberOfItemProduct-1)
                positionItemMinProduct=0;
            else positionItemMinProduct++;
            preItem(positionItemMaxProduct,$(".list_item_right"),srcItemBanner,numberDisplayItemProduct,idItemProduct,idListItemProduct);
            changeLargeItem(positionLagre)
        }
    })

    $(".list_item_right").click(function () {
        $("#item_large >img").attr("src",$(idItemProduct+$(".list_item_right").index(this)).attr("src"));
    });
});
var checksum = 0;
function slideItem(bt, Group, param) {
    bt.click(function () {
        if (param > 0 && checksum == 0)
            animateNext(Group, param);
        else if (param < 0 && checksum == 0)
            animateBack(Group, param);
    })
};
function animateNext(group, param) {
    checksum = 1;
    group.each(function (i, e) {
        $(e).animate(
            {
                left: parseInt($(e).css("left")) + param,
            }, 350, function () {
                if (parseInt($(e).css("left")) > (param * 4 + 100)) {
                    $(e).css("left", "-252px");
                }
                checksum = 0;
            }
        );
    });
}
function animateBack(group, param) {
    group.each(function (i, e) {
        checksum = 1;
        $(e).animate(
            {
                left: parseInt($(e).css("left")) + param,
            }, 350, function () {
                if (parseInt($(e).css("left")) < (param - 100)) {
                    $(e).css("left", "1008px");
                }
                checksum = 0;
            }
        );
    });
}
function validateEmail($email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailReg.test($email);
}
function nextItem(position,listItem,srcItem,maxItemDisplay,id,idList) {
    var widthItem = parseFloat(listItem.eq(0).css("width"));
    var widthContainer = parseFloat($(idList).css("width"));
    var paddingItem;
    if(maxItemDisplay == 1)
        paddingItem =widthContainer-widthItem;
    else paddingItem = ((widthContainer) - widthItem * maxItemDisplay) / (maxItemDisplay - 1);

    listItem.each(function (index, object) {
        var item = $(object);
        item.animate({left: "+=" + getLeftItem(1,paddingItem,widthItem)}, speed, function () {
            if (parseInt(item.css("left")) > getLeftItem(maxItemDisplay,paddingItem,widthItem)) {
                item.css("left", getLeftItem(-1,paddingItem,widthItem));
                $(id + index).attr("src", srcItem + position + ".png");
            }
        })
    });
}
function preItem(position,listItem,srcItem,maxItemDisplay,id,idList) {

    var widthItem = parseFloat(listItem.eq(0).css("width"));
    var widthContainer = parseFloat($(idList).css("width"));
    var paddingItem;
    if(maxItemDisplay == 1)
        paddingItem =widthContainer-widthItem;
    else paddingItem = ((widthContainer) - widthItem * maxItemDisplay) / (maxItemDisplay - 1);

    listItem.each(function (index, object) {
        var item = $(object);
        item.animate({left: "-=" + getLeftItem(1,paddingItem,widthItem)}, speed, function () {
            if (parseInt(item.css("left")) < getLeftItem(-1,paddingItem,widthItem)) {
                item.css("left", getLeftItem(maxItemDisplay,paddingItem,widthItem));
                $(id + index).attr("src", srcItem + position + ".png");
            }
        })
    });
}
function getLeftItem(position,paddingItem,widthItem) {
    return position * (widthItem + paddingItem);
}
function changeLargeItem(position) {
    $("#item_large>img").attr("src",srcItemBanner+position+".png");
}