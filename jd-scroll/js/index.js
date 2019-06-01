$('.btntop').on('click', function (event) {
  event.preventDefault();
  return $('html, body').animate({
    scrollTop: 0
  }, 300);
  // return false;
})
var titles = ["名家推荐", "艺术收藏", "好物好价", "甄选优汇", "人气推荐", "艺品指南", "好物好价"];
// var infoBox = [...Object.keys(titles)].map(res => res.repeat(res * 1 + 1));
var infoBox = ["名家推荐家推荐", "艺术收藏2", "好物好价3", "甄选优汇4", "人气推荐5", "艺品指南6", "好物好价格7"];
var isAnime = false
var list = $(".list");
var isIE = checkIE()
var listItems = function () {
  return isIE ? $(".IE_list span") : $(".list span")
};
var listBox = $(".flexBox")

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

var IE_spanFn = function (el) {
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

var spanFn = function (el) {
  if (isAnime) return
  isAnime = true
  var target = $(el.currentTarget);
  var num = target.attr("index");
  setAll(target.attr("key"));
  var spanWidth = parseFloat(
    listItems()
    .eq(0)
    .css("width")
  );
  listItems()
    .removeClass("centerTitle")
    .addClass("smallFt");
  target.addClass("centerTitle");
  if (num === 0) return;
  var cloneBox = [];
  num > 0 ?
    target.css({
      left: "none",
      right: 0
    }) :
    target.css({
      right: "none",
      left: 0
    });
  for (var i = 0; i < Math.abs(num); i++) {
    cloneBox.push(
      listItems()
      .eq(num > 0 ? -(i + 1) : i)
      .clone()
    );
  }
  cloneBox.forEach(function (el) {
    el.on("click", spanFn);
    num < 0 ? list.append(el) : list.prepend(el);
  });
  var moveArr = [0, -Math.abs(num * spanWidth)];
  var obj = {
    targets: ".list",
    duration: 300,
    easing: "easeInOutQuad",
    update: function (anim) {
      if (anim.progress < 30) return;
      if (listItems().hasClass("smallFt")) {
        listItems().removeClass("smallFt");
      }
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
  obj[num < 0 ?"left":"right"] = moveArr
  anime && anime(obj);
};

function indexSpan() {
  listItems().each(function (index, el) {
    $(el).attr("index", Math.floor(listItems().length / 2) - index);
  });
};

function getCenter() {
  listItems()
    .eq(Math.floor(listItems().length / 2))
    .addClass("centerTitle");
}

function centerInfo(num) {
  $(".infoBox").text(infoBox[num]);
}

function setContain(num) {
  $(".contain .items").css("display", "none")
  $(".contain .items").eq(num).css("display", "block")
}

function changeBg(num) {
  // $(".changebg .items").css("display","none")
  $(".changebg .items").eq(num).addClass('_2ZxbGWxwHnyspJNFD6yxAU').siblings().removeClass("_2ZxbGWxwHnyspJNFD6yxAU");
}

function setAll(num) {
  var infoKey = listItems()
    .eq(Math.floor(listItems().length / 2))
    .attr("key");
  centerInfo(num || infoKey)
  setContain(num || infoKey)
  changeBg(num || infoKey)
}