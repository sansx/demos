let titles = ["aaaa", "bbbb", "cccc", "dddd", "eee", "ffff", "gggg"];
const infoBox = [...Object.keys(titles)].map(res => res.repeat(res * 1 + 1));
let isAnime = false
window.onload = () => {
  let list = $(".list");
  let titlesCon = "";
  
  titles.map((res, index) => {
    titlesCon += `<span key=${index} >
            ${res}
        </span>`;
  });
  list.html(titlesCon);
  getCenter();
  indexSpan();
  setAll();
  $(".scrollBox").css("width", $(".list").css("width"));
  $(".list span").on("click", spanFn);
  $(".leftBtn").on("click",()=>{
    console.log("111");
    
    $(".list span").eq(2).trigger("click")
  })
  $(".rightBtn").on("click",()=>{
    $(".list span").eq(4).trigger("click")
  })
};

const spanFn = el => {
  if(isAnime)return
  isAnime=true
  let target = $(el.currentTarget);
  let num = target.attr("index");
  setAll(target.attr("key"));
  const spanWidth = parseFloat(
    $(".list span")
      .eq(0)
      .css("width")
  );
  $(".list span")
    .removeClass("centerTitle")
    .addClass("smallFt");
  target.addClass("centerTitle");
  if (num === 0) return;
  let cloneBox = [];
  num > 0
    ? target.css({ left: "none", right: 0 })
    : target.css({ right: "none", left: 0 });
  for (let i = 0; i < Math.abs(num); i++) {
    cloneBox.push(
      $(".list span")
        .eq(num > 0 ? -(i + 1) : i)
        .clone()
    );
  }
  cloneBox.map(el => {
    el.on("click", spanFn);
    num < 0 ? $(".list").append(el) : $(".list").prepend(el);
  });
  const moveArr = [0, -Math.abs(num * spanWidth)];
  let obj = {
    targets: ".list",
    duration: 300,
    easing: "easeInOutQuad",
    update: anim => {
      if (anim.progress < 30) return;
      if ($(".list span").hasClass("smallFt")) {
        $(".list span").removeClass("smallFt");
      }
    },
    complete: function(anim) {
      for (let i = 0; i < Math.abs(num); i++) {
        $(".list span")
          .eq(num > 0 ? -1 : 0)
          .remove();
      }
      $(".list").css({ left: "", right: "" });
      indexSpan();
      isAnime=false
    }
  };
  num < 0 ? (obj.left = moveArr) : (obj.right = moveArr);
  anime(obj);
};

const indexSpan = () => {
  $(".list span").each((index, el) => {
    $(el).attr("index", Math.floor($(".list span").length / 2) - index);
  });
};

function getCenter() {
  $(".list span")
    .eq(Math.floor($(".list span").length / 2))
    .addClass("centerTitle");
}

function centerInfo(num) {
  $(".infoBox").text(infoBox[num]);
}

function setContain (num) {
  $(".contain .items").css("display","none")
  $(".contain .items").eq(num).css("display","block")
}

function setAll (num) {
  const infoKey = $(".list span")
    .eq(Math.floor($(".list span").length / 2))
    .attr("key");
  centerInfo(num||infoKey)
  setContain(num||infoKey)
}
