<template>
  <div :style="{ width: videoWidth, height: videoHeight }">
    <video
      :id="videoId"
      style="width: 100%; height: 100%"
      class="video-js"
    ></video>
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
      default: "200px",
    },
    //视频高度
    videoHeight: {
      type: String,
      default: "150px",
    },
  },
  data() {
    return {
      options: {
        autoplay: true, // 设置自动播放
        muted: true, // 设置了它为true，才可实现自动播放,同时视频也被静音 （Chrome66及以上版本，禁止音视频的自动播放）
        preload: "auto", // 预加载
        controls: true, // 显示播放的控件
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

<style lang="scss" scoped></style>
