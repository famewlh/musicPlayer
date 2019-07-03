(function ($, root) {
    function renderImg(data) {
        //渲染CD图片
        var img = new Image();
        img.src = data.image;
        img.onload = () => {
            $('.img img').attr('src', data.image);
            // $('.image-box .img').html(img); //这里要用html，才能实现替换，不要用append
            player.blurImg(img, $('body')); //高斯模糊渲染背景图片
        }
    }

    function renderWords(data) {
        //渲染文字
        $('.inf-box .song-name').text(data.song);
        $('.inf-box .singer-name').text(data.singer);
        $('.inf-box .audio-name').text(data.album);
    }
    function renderTime(data){
        // 渲染时间
        $('.pro-box .cur-time span').text('00:00');
        var allTime = data.duration;
        // 分
        var hour = Math.floor(allTime / 60) < 10 ? "0" + Math.floor(allTime / 60) : Math.floor(allTime / 60);
        // 秒
        var second = Math.floor(allTime % 60) < 10 ? "0" + Math.floor(allTime % 60) : Math.floor(allTime % 60);
        $('.pro-box .all-time span').text(hour + ':' + second);
    }
    function renderLike(data){
         // 渲染like
         if (data.isLike) {
            $('.btn-box .btn-like').addClass('like');
        } else {
            $('.btn-box .btn-like').removeClass('like');
        }
    }

    function render(data) { //data为每个数据对象 eg：data[0];
        renderImg(data);
        renderWords(data);
        renderTime(data);
        renderLike(data);
    }
    root.render = render; //将接口捆绑到player对象
})(window.Zepto, window.player || (window.player = {})); //第一个参数提高效率，不用每次都去全局找;第二个参数是容错处理，防止player值为undefined;