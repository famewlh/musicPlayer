// (function ($,root){
//     // 大约1000毫秒
//     function Pro(){
//         var startTime = new Date().getTime();
//         var timer = setInterval(function (){
//             var nowTime = new Date().getTime();
//             var curTime = nowTime - startTime;
//             var time = Math.round(curTime / 1000);
//             var m= Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
//             var s = Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60);
//             $('.pro-box .cur-time span').text(m + ':' + s);
//         },1000)
    
//     }









//     root.pro = new Pro;

// })(window.Zepto,window.player || (window.player = {}))
