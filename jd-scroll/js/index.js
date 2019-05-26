window.onload = () => {
    let titles = ["aaaa", "bbbb", "cccc", "dddd", "eee", "ffff", "gggg"]
    let list = $(".list")
    let titlesCon = ""
    titles.map((res, index) => {
        titlesCon += `<span key=${index} >
            ${res}
        </span>`
    })
    list.html(titlesCon)
    getCenter()
    indexSpan()
    $(".scrollBox").css("width", $(".list").css("width"))
    $(".list span").on("click", spanFn)
}

const spanFn = el => {
    let num = $(el.currentTarget).attr("index")
    const spanWidth = parseFloat($(".list span").eq(0).css("width"))
    if (num === 0) return;
    let cloneBox = []
    for (let i = 0; i < Math.abs(num); i++) {
        if(num > 0){
            cloneBox.push($(".list span").eq(-i-1).clone())
        }
    }
    cloneBox.map(el=>{
        el.on("click",spanFn)
        num<0?$(".list").append(el):$(".list").prepend(el)
    })
    let res = $(".list span").eq(0).clone()
    const moveArr = [[0, num * spanWidth]]
    let obj = {
        targets: ".list",
        duration: 300,
        easing: 'easeInOutQuad',
        complete: function (anim) {
            for (let i = 0; i < Math.abs(num); i++) {
                $(".list span").eq(num>0?-1:0).remove()
            }
            // $(".list span").eq(0).remove()
            // $(".list").css("left", 0)
            indexSpan()
        }
    }
    num<0?obj.left = moveArr:obj.right = moveArr
    anime(obj)
}

const indexSpan = () => {
    $(".list span").each((index, el) => {
        $(el).attr("index", Math.floor($(".list span").length / 2) - index )
    })
}

function getCenter() {
    $(".list span").eq(Math.floor($(".list span").length / 2)).addClass("centerTitle")
}