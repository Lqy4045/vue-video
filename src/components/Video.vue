<template>
  <div
    class="custom-video-wrapper"
    :style="{ width: videoWidth, height: videoHeight }"
  >
    <video
      ref="video"
      :id="videoId"
      style="width: 100%; height: 100%"
      class="video-js video-item"
    ></video>
    <div class="video-top-tools">
      <slot name="top-tools"></slot>
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
// import "videojs-contrib-hls";

export default {
  props: {
    //视频地址、video的id值
    vData: {
      type: Object,
      default: () => {
        return {
          hlsurl: "", //视频url地址
          cameraId: "", //id
        };
      },
    },
    //视频宽度
    videoWidth: {
      type: String,
      default: "33%",
    },
    //视频高度
    videoHeight: {
      type: String,
      default: "33%",
    },
  },
  data() {
    return {
      options: {
        autoplay: "muted", // 设置自动播放
        muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音 （Chrome66及以上版本，禁止音视频的自动播放）
        preload: "auto", // 预加载
        controls: true, // 显示播放的控件
        // height: "240px",
        // aspectRatio: "16:9",
        // fluid: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: false,
          remainingTimeDisplay: false,
          currentTimeDisplay: true, //当前时间
          volumeControl: false, //声音控制键
          playToggle: false, //暂停和播放键
          progressControl: false, //进度条
          fullscreenToggle: true, //全屏按钮
        },
      },
      player: null,
      videoId: "",
    };
  },
  methods: {
    getVideo(nowPlayVideoUrl, nowPlayVideoId) {
      this.player = videojs(nowPlayVideoId, this.options);
      // 关键代码， 动态设置src，才可实现换台操作
      //不动态设置依然也可以这样写
      this.player.src([
        {
          src: nowPlayVideoUrl,
          type: "application/x-mpegURL", // 告诉videojs,这是一个hls流
        },
      ]);
    },
    getVideoDom() {
      console.log("获取videoDom", this.$refs.video);
      return this.$refs.video;
    },
  },
  mounted() {
    if (this.player) {
      this.player.on("ended", function () {
        // 播放结束后的操作
        console.log("Video has ended");
      });
    }
  },
  watch: {
    //监听视频地址、video的id值
    vData: {
      deep: true,
      immediate: true,
      handler(val) {
        this.videoId = val.cameraId;
        this.$nextTick(() => {
          this.getVideo(val.hlsurl, val.cameraId);
        });
      },
    },
  },
  beforeDestroy() {
    //  组件销毁时，清除播放器
    if (this.player) {
      this.player.dispose(); // 该方法会重置videojs的内部状态并移除dom
    }
  },
};
</script>

<style lang="scss" scoped>
.custom-video-wrapper {
  position: relative;

  &:hover {
    .video-top-tools {
      display: block;
    }
  }
  .video-top-tools {
    display: none;
    width: 100%;
    color: #fff;
    position: absolute;
    top: 0;
    z-index: 4;
  }
}
</style>
