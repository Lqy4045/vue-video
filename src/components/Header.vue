<template>
  <div class="bigScreenHeader">
    <div class="logo">
      <img
        class="mgr10"
        src="@/assets/bigScreen_images/logo.png"
        alt=""
        width="30px"
        height="30px"
      />
      <slot name="city"></slot>
    </div>
    <div class="title">中国银行总行技能评定悦考_2022年9月</div>
    <div class="right">
      <div class="time">
        <span class="year mgr20">{{ dateYear }}</span>
        <span class="week mgr20">{{ dateWeek }}</span>
        <span class="day mgr10">{{ dateDay }}</span>
        <span id="he-plugin-simple"></span>
      </div>

      <el-icon
        class="el-icon-setting video-setting"
        @click.native="$emit('settingHandle')"
      ></el-icon>

      <img
        src="@/assets/bigScreen_images/fullScreen.png"
        alt="全屏"
        width="28px"
        style="cursor: pointer"
        @click="fullScreenHandle"
      />
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "Header",
  components: {},
  data() {
    return {
      fullscreen: false,
      timing: null,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
    };
  },
  computed: {},
  watch: {},
  created() {
    // window.WIDGET = {
    //   CONFIG: {
    //     modules: "02",
    //     background: "5",
    //     tmpColor: "A8C0E2",
    //     tmpSize: "20",
    //     cityColor: "FFFFFF",
    //     citySize: "20",
    //     aqiColor: "FFFFFF",
    //     aqiSize: "16",
    //     weatherIconSize: "40",
    //     alertIconSize: "18",
    //     padding: "0px 0px 0px 0px",
    //     shadow: "0",
    //     language: "auto",
    //     borderRadius: "5",
    //     fixed: "false",
    //     vertical: "center",
    //     horizontal: "left",
    //     key: "e5d1886108d04ae6be9b22b1c0ff26ea",
    //   },
    // };
    // (function (d) {
    //   var c = d.createElement("link");
    //   c.rel = "stylesheet";
    //   c.href =
    //     "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
    //   var s = d.createElement("script");
    //   s.src =
    //     "https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0";
    //   var sn = d.getElementsByTagName("script")[0];
    //   sn.parentNode.insertBefore(c, sn);
    //   sn.parentNode.insertBefore(s, sn);
    // })(document);
  },
  mounted() {
    this.timeFn();
    this.fullListen();
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = moment(new Date()).format("HH : mm : ss");
        this.dateWeek = moment(new Date()).locale("zh-cn").format("ddd");
        this.dateYear = moment(new Date()).format("YYYY.MM.DD");
      }, 1000);
    },
    changeHandle(value) {
      console.log("切换省份", value);
      this.$emit("change", value);
    },
    fullScreenHandle() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
    },
    fullListen() {
      document.addEventListener("fullscreenchange", this.screenCutHandle);
    },
    screenCutHandle() {
      this.fullscreen = !this.fullscreen;
    },
  },
  beforeDestroy() {
    clearInterval(this.timing);
    document.removeEventListener("fullscreenchange", this.screenCutHandle);
  },
};
</script>
<style lang="scss" scoped>
.bigScreenHeader {
  //   position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo {
    flex: 1;
    text-align: left;
  }
  .title {
    flex: 1;
    text-align: center;
    color: #fff;
    font-size: 20px;
    line-height: 56px;
    font-weight: 700;
  }
  .right {
    flex: 1;
    color: #fff;
    display: flex;
    text-align: center;
    justify-content: end;
    .time {
      line-height: 28px;
      .year {
        //   color: #56acff;
        margin-right: 5px;
      }
      .week {
        //   color: #56acff;
        margin-right: 5px;
      }
      .day {
        //   display: inline-block;
        min-width: 130px;
        font-size: 20px;
        //   color: #d8f0ff;
        letter-spacing: 1px;
        margin-right: 10px;

        //   text-shadow: 0px 0px 10px #0091ff, 0px 0px 4px #0091ff;
      }
    }
    .video-setting {
      font-size: 28px;
      cursor: pointer;
      margin-right: 10px;
    }
  }
}
</style>
