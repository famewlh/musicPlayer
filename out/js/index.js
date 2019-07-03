// 1.数据渲染可视化；
// 2.载入音频，按钮事件的控制-播放，暂停，上下曲；
// 3.进度条部分；
// 4.图片运动部分；
// 5.切换歌曲列表部分；
// window.player = {
//     render: (data) => {}, //需要传入eg： data[0];
//     audioManager: {
//         audio: '',
//         status: 'pause/play',
//         getAudio: (data)=>{},  //需要传入eg: data[0];
//         play: ()=>{},
//         pause: ()=>{},
//         prev: ()=>{},
//         next: ()=>{}
//     }
// }

//定义全局变量
var dataList = [];
var timer,deg = 0;
var curIndex;

// 获取数据
function getData() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: 'https://famewlh.github.io/musicPlayer/out/mock/data.json',
        success: function (data) {
            dataList = data;
            player.render(data[0]); //渲染数据可视化
            player.audioManager.getAudio(data[0]); //加载音频
            player.audioManager.renderList(dataList);  //播放列表
            bindEvents(); //按钮事件
            touchEvents(); //进度条拖动事件
        },
        error: function () {
            alert('Sorror A Mistake')
        }
    })
}
getData();
// 绑定事件
function bindEvents() {
    $('.btn-box .btn-play').on('click', function () {
        if (player.audioManager.status === 'play') {
            player.audioManager.pause(); //暂停
            $('.btn-box .btn-play').removeClass('play').addClass('pause');
            clearInterval(timer);
        } else {
            player.audioManager.play(); //播放
            $('.btn-box .btn-play').removeClass('pause').addClass('play');
            rotate();
        }
    })
    $('.btn-box .btn-prev').on('click', function () {
        player.audioManager.prev();
        deg = 0;
        if(player.audioManager.status === 'play') {
            player.audioManager.play(); //播放
            $('.btn-box .btn-play').removeClass('pause').addClass('play');
            rotate();
        }
    })
    $('.btn-box .btn-next').on('click', function () {
        player.audioManager.next();
        deg = 0;
        if(player.audioManager.status === 'play') {
            player.audioManager.play(); //播放
            $('.btn-box .btn-play').removeClass('pause').addClass('play');
            rotate();
        }
    })
    $('.btn-box .btn-playlist').on('click',function (){
        $('.wrapper .playList').css('display','block')
    })
    $('.wrapper .playList .close').on('click',function (){
        $('.wrapper .playList').css('display','none')
    })
    $('.wrapper .playList .song').on('click',function (){
        $('.wrapper .playList .song').removeClass('active');
        $(this).addClass('active');
        var a= $(this).attr('data-index');
        player.audioManager.clickList(a);
        $('.btn-box .btn-play').removeClass('pause').addClass('play'); 
        setTimeout(function (){
            $('.wrapper .playList').css('display','none');
        },100)
    })
}


function touchEvents(){
    var width = $('.pro-box .pro .top').offset().width;
    var left = $('.pro-box .pro').offset().left;
    $('.top').on('touchstart',function (e){
        player.audioManager.stopCurTime();
    })
    .on('touchmove',function (e){
        var x = e.changedTouches[0].clientX;
        var precent = (x - left) / width;
        player.audioManager.touchCurTime(precent);
    })
    .on('touchend',function (e){
        player.audioManager.play();
        $('.btn-box .btn-play').removeClass('pause').addClass('play');
        player.audioManager.songTo();
    })
}





//CD图片转动时间
function rotate() {
    clearInterval(timer);
    timer = setInterval(function (){
        deg += 0.2;
        $('.image-box .img img').css({
            'transform': 'rotatez('+ deg +'deg)'
        },200)
    })
}