<template>
  <div>
    <div class="player-container-wrapper">
      <div class="player-container">
        <div class="player-header">占位文字</div>
        <video-player
          class="vjs-custom-skin"
          :options="playerOptions"
        ></video-player>
      </div>
    </div>
    <p @click="getVideoPic" style="text-align: center; margin: 10px auto">
      点击拍照
    </p>
    <img style="width: 100%; height: auto" :src="previewImg" alt="" />
  </div>
</template>

<script>
//引入video样式
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";

//引入hls.js
// import "videojs-contrib-hls.js/src/videojs.hlsjs";
import "videojs-contrib-hls";

// import html2canvas from "html2canvas";

export default {
  name: "Video",
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        controls: true, //控制条
        preload: "auto", //视频预加载
        muted: true, //默认情况下将会消除任何音频。
        loop: false, //导致视频一结束就重新开始。
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        hls: false,
        sources: [
          {
            type: "application/x-mpegURL",
            src: "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241122/test_20241122.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=1734848589&Signature=lk%2BTB8OzXme5pS9wlYyexsv6HF8%3D",
          },
        ],
        poster:
          "http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "无法播放", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          currentTimeDisplay: false, //当前时间
          volumeControl: false, //声音控制键
          playToggle: false, //暂停和播放键
          progressControl: false, //进度条
          fullscreenToggle: false, //全屏按钮
        },
      },
      previewImg: "",
      dataurl: "",
    };
  },
  methods: {
    getVideoPic() {
      let video = document.getElementsByClassName("vjs-tech")[0];
      console.log(1111, video);
      let canvas = document.createElement("canvas");
      let w = window.innerWidth;

      let h = (window.innerWidth / 16) * 9;
      canvas.width = w;
      canvas.height = h;
      console.log(canvas);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(video, 0, 0, w, h);
      ctx.drawImage(video, 0, 0, w, h);
      this.previewImg = canvas.toDataURL("image/png");
      console.log(this.previewImg);
      this.saveBase64(this.previewImg);
    },
    saveBase64(base64, name = new Date().valueOf()) {
      const a = document.createElement("a");
      a.href = base64;
      a.download = `${name}.png`;
      a.click();
    },
  },
};
</script>
<style>
.player-container-wrapper {
  display: flex;
  flex-wrap: wrap;
  .player-container {
    position: relative;
    .player-header {
      color: #fff;
      position: absolute;
      top: 0px;
      z-index: 9;
    }
    .vjs-custom-skin {
      margin: 5px;
    }
  }
}
.vjs-custom-skin {
  width: 500px;
  /* height: 500px; */
}
</style>
