(function ($, root) {
    function AudioManager() {
        //创建音频
        this.audio = new Audio();
        this.status = 'pause';
        this.curIndex = 0;
        this.curTime = 0;
        this.timer = null;
        this.data = null;
        this.proLen = 0;
        this.currentTime = 0; //音频时间
    }
    AudioManager.prototype = {
        getAudio: function (data) {
            this.data = data;
            this.audio.src = data.audio;
            this.audio.load();
        },
        play: function () {
            this.audio.play();
            this.status = 'play';
            this.renderCurTime();
        },
        pause: function () {
            this.audio.pause();
            this.status = 'pause';
            clearInterval(this.timer);
        },
        prev: function () {
            if (this.curIndex == 0) {
                this.curIndex = 2
            } else {
                this.curIndex--;
            }
            clearInterval(this.timer);
            this.curTime = 0;
            this.proLen = 0;
            root.render(dataList[this.curIndex]);
            this.getAudio(dataList[this.curIndex]);
            $('.pro-box .cur-time span').text('00:00');
            $('.pro-box .pro .top').css({
                'transform': 'translatex(0%)'
            })

        },
        next: function () {
            if (this.curIndex == 2) {
                this.curIndex = 0
            } else {
                this.curIndex++;
            }
            clearInterval(this.timer);
            this.curTime = 0;
            this.proLen = 0;
            root.render(dataList[this.curIndex]);
            this.getAudio(dataList[this.curIndex]);
            $('.pro-box .cur-time span').text('00:00');
            $('.pro-box .pro .top').css({
                'transform': 'translatex(0%)'
            })
        },
        renderCurTime: function () {
            var _this = this;
            var startTime = new Date().getTime() - _this.curTime;
            this.timer = setInterval(function () {
                var nowTime = new Date().getTime();
                _this.curTime = nowTime - startTime;
                var time = Math.round(_this.curTime / 1000);
                var m = Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
                var s = Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60);
                $('.pro-box .cur-time span').text(m + ':' + s);
                _this.proLen += 98 / _this.data.duration / 60;
                $('.pro-box .pro .top').css({
                    'transform': 'translatex(' + _this.proLen + '%)'
                })
                if (Math.round(_this.curTime / 1000) >= _this.data.duration + 1) {
                    clearInterval(_this.timer);
                    _this.next();
                    _this.play();
                    rotate();
                }
            }, 16.7)
        },
        stopCurTime: function () {
            clearInterval(this.timer);
        },
        touchCurTime: function (precent) {
            precent = precent <= 0 ? 0 : (precent >= 1 ? 1 : precent);
            $('.pro-box .pro .top').css({
                'transform': 'translatex(' + precent * 100 + '%)'
            })
            var time = Math.round(this.data.duration * precent);
            var m = Math.floor(time / 60) < 10 ? "0" + Math.floor(time / 60) : Math.floor(time / 60);
            var s = Math.floor(time % 60) < 10 ? "0" + Math.floor(time % 60) : Math.floor(time % 60);
            $('.pro-box .cur-time span').text(m + ':' + s);
            this.curTime = this.data.duration * precent * 1000;
            this.proLen = precent * 100;
            this.currentTime = time;
        },
        songTo: function () {
            this.audio.currentTime = this.currentTime;
            this.proLen = 0.98 * this.proLen;
        },
        renderList: function (dataList) {
            console.log(dataList)
            var str = '<p>播放列表</p>'
            dataList.forEach(function (ele, index) {
                str += '<p class="song" data-index="' + index + '">' + ele.song + '-<span>' + ele.singer + '</span></p>'
            })
            str += '<p class="close">关闭</p>'
            $('.wrapper .playList').html(str);
        },
        clickList: function (index) {
            this.curIndex = index;
            clearInterval(this.timer);
            this.curTime = 0;
            this.proLen = 0;
            root.render(dataList[this.curIndex]);
            this.getAudio(dataList[this.curIndex]);
            $('.pro-box .cur-time span').text('00:00');
            $('.pro-box .pro .top').css({
                'transform': 'translatex(0%)'
            })
            this.play();
        }
    }
    root.audioManager = new AudioManager();
})(window.Zepto, window.player || (window.player = {}));