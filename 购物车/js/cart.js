$(function () {
    //添加数量按钮功能
    $("body").on("click", ".btnAdd", function () {
        var number = parseInt($(this).prev().val()) + 1;
        $(this).prev().val(number);
        calPrice($(this), number);
        calTotal();
    });
    //减少数量按钮功能
    $("body").on("click", ".btnMinus", function () {
        var i = parseInt($(this).next().val());
        if (i != 0) {
            var number = parseInt($(this).next().val()) - 1;
            $(this).next().val(number);
            calPrice($(this), number);
            calTotal();
        } else {
            $(this).next().val(0);
        }
    });
    //单击全选按钮的功能
    $("#allCb").click(function () {
        var objCb = document.getElementById("allCb");
        var objItems = document.getElementsByName("item");
        for (var i = 0; i < objItems.length; i++) {
            objItems[i].checked = objCb.checked;
        }
        if (objCb.checked) {
            calTotal();
        } else {
            calTotal();
        }
    });
    //单击复选按钮选中商品
    $("body").on("click", "input[name='item']", function () {
        if (this.checked) {
            calTotal();
        } else {
            calTotal();
        }
        var objItems = document.getElementsByName("item");
        var objCb = document.getElementById("allCb");
        for (var i = 0; i < objItems.length; i++) {
            if (!objItems[i].checked) {
                objCb.checked = objItems[i].checked;
                return;
            }
        }
        objCb.checked = true;
    });
    //利用遮罩层，提示框进行删除操作
    $("body").on("click", "td a:contains('删除')", function () {
        delRow = $(this).parent("td").parent("tr");//全局变量(亮点可有领悟)
        showMask();
        $("#dialog").show();
    });
    $("#title p").click(function () {//关闭
        $("#mask,#dialog").hide();
    });
    $("#btnSure").click(function () {//确认删除
        delRow.remove();
        calTotal();
        $("#mask,#dialog").hide();
    });
    //添加购物车
    $("#lastview a").click(function () {
        var $dl = $(this).parents("dl");
        var $tr = $("<tr></tr>");
        var $tds = new Array();
        $tds[0] = $("<td><input type='checkbox' name='item'/></td>");
        $tds[1] = $("<td class='item'><a href='detail.html'><img src='" + $dl.find('img').attr('src') + "' align='left'/>" +
            $dl.children("dd:first").text() + "</a></td>");
        $tds[2] = $(" <td>可购买</td>");
        $tds[3] = $("<td><input type='button' value='-' class='btn btnMinus'/> <input class='txt' type='text' value='1' disabled='disabled'/> <input type='button' value='+' class='btn btnAdd'/></td>")
        $tds[4] = $("<td>" + $dl.find('dd.price').children('span').text() + "</td>");
        $tds[5] = $(" <td title='price'>" + $dl.find('dd.price').children('span').text() + "</td>");
        $tds[6] = $("<td><a href='#'>删除</a></td>");
        $tr.append($tds[0]).append($tds[1]).append($tds[2]).append($tds[3]).append($tds[4]).append($tds[5]).append($tds[6]).insertBefore($("#tabOrder tr:last"));
        var x=5,y=15;//初始化提示图片位置
        //小图片鼠标移动事件
        $("table img").mouseover(function(e){
            $("#imgTip")
                .attr("src",this.src)//设置图片的src属性
                .css({"top":(e.pageY+y)+"px","left":(e.pageX+x)+"px"})//设置提示图片的位置
                .show(200);//显示图片
        });
        //小图片移除事件
        $("table img").mouseout(function(){
            $("#imgTip").hide();//隐藏图片
        });
    });
});
//按添加数量按钮，计算一种商品的总价格的方法
function calPrice($BtnObj, number) {
    var $tdObj = $BtnObj.parent().next();//获取其所在单元格的下一个单价单元格
    var price = parseFloat($tdObj.text().substr(1));
    var total = price * number;
    var $tdObjTotal = $tdObj.next();
    $tdObjTotal.html("&yen;" + total.toFixed(2));//商品小计小数点保留二位后显示
}
//计算总数量和总价格的方法
function calTotal() {
    var num = 0;
    var sum = 0;
    var $checkedBox = $("input[name='item']:checked");
    var $allBox = $("input[name='item']");
    if ($checkedBox.length != $allBox.length) {
        $checkedBox.each(function () {
            var $num = $(this).parent().siblings(":eq(2)").children(":eq(1)").val();
            var $sum = $(this).parent().siblings(":eq(4)").text().substr(1);
            num = num + parseInt($num);
            sum = sum + parseFloat($sum);
        });
        $("span#spanTotal").prev().html(num);
        $("#spanTotal").html("&yen;" + sum);
    } else {//显示全选的总数量
        $(".txt").each(function () {
            num = num + parseInt($(this).val());
        });
        $("span#spanTotal").prev().html(num);
        //显示全选的总价格
        $("#tabOrder td[title='price']").each(function () {
            sum = sum + parseFloat($(this).text().substr(1));
        });
        $("#spanTotal").html("&yen;" + sum);
    }
}
//设置遮罩层的方法
function showMask() {
    var bh = $("body").height();
    var bw = $("body").width();
    $("div#mask").css({
        height: bh + "px",
        width: bw + "px",
        display: "block"
    })
}


