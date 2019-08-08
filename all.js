//選擇圖片
document.getElementById("pic1").addEventListener("click", function () {
    $(".setImg").attr("style", "background-image: url(img/1.jpg)");
    initial();
    stopTime();
    document.getElementById("count").innerHTML = "count";

});
document.getElementById("pic2").addEventListener("click", function () {
    $(".setImg").attr("style", "background-image: url(img/2.jpg)");
    initial();
    stopTime();
    document.getElementById("count").innerHTML = "count";
});
document.getElementById("pic3").addEventListener("click", function () {
    $(".setImg").attr("style", "background-image: url(img/3.jpg)");
    initial();
    stopTime();
    document.getElementById("count").innerHTML = "count";
});
document.getElementById("pic4").addEventListener("click", function () {
    $(".setImg").attr("style", "background-image: url(img/4.jpg)");
    initial();
    stopTime();
    document.getElementById("count").innerHTML = "count";
});

//拖移
function drag(e) {
    //拖移元素的id
    var id = e.target.id;
    e.dataTransfer.setData("id", id);


}
//拖移過程
function allowDrag(e) {
    e.preventDefault();
}
//放下
function drop(e) {
    //抓取的元素id
    var dragId = e.dataTransfer.getData("id");
    // console.log(dragId);

    //被放置的位置div的id
    var dropId = e.target.id;
    // console.log(dropId);

    //被拖移的元素
    var dragged = document.getElementById(dragId);
    // console.log(dragged);
    //放下的div
    var dropped = document.getElementById(dropId);
    // console.log(dropped);
    var draggedParent = dragged.parentNode;
    // console.log(draggedParent);
    var droppedParent = dropped.parentNode;
    // console.log(droppedParent);
    //交換位置
    draggedParent.appendChild(dropped);
    droppedParent.appendChild(dragged);
    check();

}
//檢查是否正確
function check() {
    var count = 0;
    //找到所有圖片的div
    var pic = document.getElementsByClassName("setImg");
    for (var i = 0; i < pic.length; i++) {
        var img = pic[i];
        console.log(img);
        var seat = img.parentNode;
        console.log(seat);

        var imgId = img.getAttribute("id");
        console.log(imgId);
        var seatId = seat.getAttribute("id");
        console.log(seatId);

        // 截取最後的數字比對
        var imgLast = imgId.substr(4, 1);
        var seatLast = seatId.substr(5, 1);
        if (imgLast == seatLast) {
            count++;
        } else {
            return;
        }
    }

    if (count == 9) {

        conText1();
        stopTime();
        
    }
    
}

// 初始位置
function initial() {
    var pic = document.getElementsByClassName("setImg");
    for (var i = 0; i < pic.length; i++) {
        $(pic[i]).attr('id', 'img-' + (i + 1));
    }
}


//隨機排序
function start() {
    var imgs = document.getElementsByClassName("setImg");
    console.log(imgs);
    for (var i = 0; i < 100; i++) {

        var m = parseInt(Math.random() * 9);
        var n = parseInt(Math.random() * 9);

        //互換temp1跟2的內容
        var temp1 = imgs[m].parentNode;
        var temp2 = imgs[n].parentNode;
        temp1.appendChild(imgs[n]);
        temp2.appendChild(imgs[m]);
    }
}
//倒數10秒
var sec = 10;
var t;
function time(sec) {

    if (sec > 0) {
        sec -= 1;
        // console.log(sec);
        document.getElementById('count').innerHTML = sec;
        t = setTimeout("time(" + sec + ")", 1000);
    } else if (sec == 0) {
        conText();
        initial();

    } else {
        return;
    }
}
//停止倒數
function stopTime() {
    clearTimeout(t);
}

function conText() {
    $("#myCanvas").attr("style", "position: absolute");
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    c.width = window.innerWidth; // 畫布寬 = 視窗內的寬
    c.height = window.innerHeight; // 畫布高 = 視窗內的高
    ctx.font = "6rem Verdana sold";
    ctx.textAlign = "left";
    ctx.textBaseline = "hanging";
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // //漸層
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "purple");
    gradient.addColorStop("0.5", "red");
    gradient.addColorStop("1", "black");
    ctx.lineWidth = 10;
    ctx.strokeStyle = gradient;
    ctx.strokeText("YOU LOSE IN THIS GAME!", 100, 200);
}

function conText1() {
    $("#myCanvas").attr("style", "position: absolute");
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    c.width = window.innerWidth; // 畫布寬 = 視窗內的寬
    c.height = window.innerHeight; // 畫布高 = 視窗內的高
    ctx.font = "6rem Verdana sold";
    ctx.textAlign = "left";
    ctx.textBaseline = "hanging";
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    // //漸層
    var gradient = ctx.createLinearGradient(0, 0, c.width, 0);
    gradient.addColorStop("0", "blue");
    gradient.addColorStop("0.5", "orange");
    gradient.addColorStop("1", "green");
    ctx.lineWidth = 10;
    ctx.strokeStyle = gradient;
    ctx.strokeText("YOU ALREADY PASSED!", 100, 200);
    
}
//點擊返回首頁
document.getElementById("myCanvas").addEventListener("click", function () {
    $(this).attr("style", "display:none");
});