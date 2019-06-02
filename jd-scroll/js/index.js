var titles = ["名家推荐", "艺术收藏", "好物好价", "甄选优汇", "人气推荐", "艺品指南", "好物好价"];
// var infoBox = [...Object.keys(titles)].map(res => res.repeat(res * 1 + 1));
var infoBox = ["名家推荐家推荐", "艺术收藏2", "好物好价3", "甄选优汇4", "人气推荐5", "艺品指南6", "好物好价格7"];
var isAnime = false
var list = $(".list");
var listBox = $(".flexBox")
var isIE = checkIE()
var listItems = function () {
  return isIE ? $(".IE_list span") : $(".list span")
};

// $('.btntop').on('click', function (event) {
//   event.preventDefault();
//   return $('html, body').animate({
//     scrollTop: 0
//   }, 300);
//   // return false;
// })

window.onload = function () {
  var titlesCon = "";
  for (var index = 0; index < titles.length; index++) {
    titlesCon = titlesCon + "<span key=" + index + " >" + titles[index] + "</span>"
  }
  list.html(titlesCon);
  getCenter();
  indexSpan();
  setAll();
  $(".scrollBox").css("width", list.css("width"));
  listItems().on("click", isIE ? IE_spanFn : spanFn);
  $(".leftBtn").on("click", function () {
    listItems().eq(2).trigger("click")
  })
  $(".rightBtn").on("click", function () {
    listItems().eq(4).trigger("click")
  })
};

function checkIE() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    $(".flexBox").addClass("IEBox").removeClass("flexBox")
    $(".list").addClass("IE_list").removeClass("list")
    $(".btnBox").addClass("IE_btnBox").removeClass("btnBox")
    $(".scrollBox").css("margin", "0 auto")
    return true;
  } else {
    $("body").append("<script src='https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.min.js'></script>");
    return false;
  }
}

function IE_spanFn(el) {
  var target = $(el.currentTarget);
  var num = target.attr("index");
  if (num === 0) return
  listItems()
    .removeClass("centerTitle")
  target.addClass("centerTitle");
  for (var index = 0; index < Math.abs(num); index++) {
    num > 0 ? list.prepend(listItems().eq(-1)) : list.append(listItems().eq(0))
  }
  setAll(target.attr("key"));
  indexSpan()
}

function spanFn(el) {
  if (isAnime) return
  isAnime = true
  var target = $(el.currentTarget);
  var cloneBox = [];
  var num = target.attr("index");
  var spanWidth = parseFloat(
    listItems()
    .eq(0)
    .css("width")
  );
  setAll(target.attr("key"));
  listItems()
    .removeClass("centerTitle")
    .addClass("smallFt");
  target.addClass("centerTitle");
  if (num === 0) return;
  target.css({
    left: num > 0 && 0,
    right: num > 0 || 0
  })
  for (var i = 0; i < Math.abs(num); i++) {
    cloneBox.push(
      listItems()
      .eq(num > 0 ? -(i + 1) : i)
      .clone()
    );
  }
  cloneBox.forEach(function (el) {
    el.on("click", spanFn);
    list[num < 0 ? "append" : "prepend"](el)
  });
  var obj = {
    targets: ".list",
    duration: 300,
    easing: "easeInOutQuad",
    update: function (anim) {
      if (anim.progress < 30) return;
      listItems().hasClass("smallFt") && listItems().removeClass("smallFt");
    },
    complete: function () {
      for (var i = 0; i < Math.abs(num); i++) {
        listItems()
          .eq(num > 0 ? -1 : 0)
          .remove();
      }
      list.css({
        left: "",
        right: ""
      });
      indexSpan();
      isAnime = false
    }
  };
  var moveArr = [0, -Math.abs(num * spanWidth)];
  obj[num < 0 ? "left" : "right"] = moveArr
  anime && anime(obj);
};

function indexSpan() {
  listItems().each(function (index, el) {
    $(el).attr("index", getMidNum(listItems(), '') - index);
  });
};

function getCenter() {
  listItems()
    .eq(getMidNum(listItems(), ''))
    .addClass("centerTitle");
}

function centerInfo(num) {
  $(".infoBox").text(infoBox[num]);
}

function setContain(num) {
  $(".contain .items").css("display", "none")
    .eq(num).css("display", "block")
}

function changeBg(num) {
  // $(".changebg .items").css("display","none")
  $(".changebg .items").eq(num)
    .addClass('_2ZxbGWxwHnyspJNFD6yxAU')
    .siblings().removeClass("_2ZxbGWxwHnyspJNFD6yxAU");
}

function setAll(num) {
  var infoKey = listItems()
    .eq(getMidNum(listItems(), ''))
    .attr("key");
  centerInfo(num || infoKey)
  setContain(num || infoKey)
  changeBg(num || infoKey)
}

function getMidNum(target, type) {
  return target.length && Math[type || "floor"](target.length / 2)
}