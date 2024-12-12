<template>
  <div class="main">
    <div class="app-container">
      <!-- 左边视频窗口 -->
      <div class="left" id="divPlugin">
        <div class="hello-ezuikit-js" ref="videoBox">
          <!-- 最多9格 -->
          <div
            v-for="item in 9"
            v-show="
              (select == 1 && selectVideoFirst == item) ||
              (select == 2 &&
                item >= selectVideoFirst &&
                item < selectVideoFirst + 4) ||
              select == 3
            "
            :key="item"
            :class="select == 1 ? 'width' : select == 2 ? 'width2' : 'width3'"
            style="position: relative"
          >
            <!-- 最多16格 -->
            <!-- <div
              v-for="item in 16"
              v-show="
                (select == 1 && selectVideoFirst == item) ||
                  (select == 2 &&
                    item >= selectVideoFirst &&
                    item < selectVideoFirst + 4) ||
                  (select == 3 &&
                    item >= selectVideoFirst &&
                    item < selectVideoFirst + 9) ||
                  select == 4
              "
              :key="item"
              :class="
                select == 1
                  ? 'width'
                  : select == 2
                  ? 'width2'
                  : select == 3
                  ? 'width3'
                  : 'width4'
              "
              style="position:relative;"
            > -->
            <div
              :id="'video-cover' + item"
              class="video-cover"
              :class="{
                'video-active': selectVideo == item,
              }"
            ></div>
            <div :id="'video-container' + item"></div>
          </div>
        </div>
      </div>
      <!-- 右边操作区 -->
      <div class="right">
        <el-input
          style="width: 15.625rem; position: relative; left: 1.875rem"
          placeholder="请输入设备名称"
          prefix-icon="el-icon-search"
          v-model="search"
          clearable
        ></el-input>
        <div
          v-if="searchList.length"
          style="
            width: 91%;
            position: relative;
            left: 1.25rem;
            height: 50%;
            overflow: auto;
            top: 0.3125rem;
          "
        >
          <div
            v-for="(camera, index) in searchList"
            @click="selectCamera2(camera)"
            :key="index"
            :style="
              cameraList[selectVideo - 1].ipcSerial == camera.ipcSerial
                ? 'color:#0079e0'
                : ''
            "
            style="width: 100%; height: 2rem; cursor: pointer"
          >
            <span
              v-if="camera.status"
              style="
                width: 0.5rem;
                height: 0.5rem;
                borderradius: 50%;
                background: #0cdc8c;
                display: inline-block;
                margin-right: 0.9375rem;
              "
            ></span>
            <span
              v-else
              style="
                width: 0.5rem;
                height: 0.5rem;
                borderradius: 50%;
                background: #aaa;
                display: inline-block;
                margin-right: 0.9375rem;
              "
            ></span>
            {{ camera.channelName }}
          </div>
        </div>
        <div
          v-else
          style="
            width: 91%;
            position: relative;
            left: 1.25rem;
            height: 50%;
            overflow: auto;
            top: 0.3125rem;
          "
        >
          <div
            v-for="(camera, index) in cameraList"
            @click="selectCamera(camera, index)"
            :key="index"
            :style="
              cameraList[selectVideo - 1].ipcSerial == camera.ipcSerial
                ? 'color:#0079e0'
                : ''
            "
            style="width: 100%; height: 2rem; cursor: pointer"
          >
            <span
              v-if="camera.status"
              style="
                width: 0.5rem;
                height: 0.5rem;
                borderradius: 50%;
                background: #0cdc8c;
                display: inline-block;
                margin-right: 0.9375rem;
              "
            ></span>
            <span
              v-else
              style="
                width: 0.5rem;
                height: 0.5rem;
                borderradius: 50%;
                background: #aaa;
                display: inline-block;
                margin-right: 0.9375rem;
              "
            ></span>
            {{ camera.channelName }}
          </div>
        </div>
        <div class="btns">
          <div class="wheel">
            <div @click="deviceCapture" class="camera">
              <i class="el-icon-camera"></i>
            </div>
            <div class="top">
              <div
                @click="startPTZCtrl('0')"
                class="triangle triangle-top"
              ></div>
            </div>
            <div class="center">
              <div class="center-left">
                <div
                  @click="startPTZCtrl('2')"
                  class="triangle triangle-left"
                ></div>
              </div>
              <div class="center-right">
                <div
                  @click="startPTZCtrl('3')"
                  class="triangle triangle-right"
                ></div>
              </div>
            </div>
            <div class="bottom">
              <div
                @click="startPTZCtrl('1')"
                class="triangle triangle-bottom"
              ></div>
            </div>
          </div>
          <div class="two-btn">
            <el-button @click="startPTZCtrl('9')" size="mini" type="primary"
              >-</el-button
            >
            <el-button @click="startPTZCtrl('8')" size="mini" type="primary"
              >+</el-button
            >
          </div>
          <el-button
            class="right-btn"
            @click="showAllScreen"
            size="small"
            type="primary"
            >全屏显示</el-button
          >
        </div>
      </div>
    </div>
    <!-- 底部切屏按钮 -->
    <div
      @click="select = 1"
      style="position: absolute; left: 1.875rem; top: 94.5vh; cursor: pointer"
    >
      <!-- <img
          class="rect"
          v-if="select == 1"
          src="../../assets/images1/one_1.png"
          alt
        />
        <img class="rect" v-else src="../../assets/images1/one.png" alt /> -->
    </div>
    <div
      @click="select = 2"
      style="position: absolute; left: 4rem; top: 94.5vh; cursor: pointer"
    >
      <!-- <img
          class="rect"
          v-if="select == 2"
          src="../../assets/images1/four_1.png"
          alt
        />
        <img class="rect" v-else src="../../assets/images1/four.png" alt /> -->
    </div>
    <div
      @click="select = 3"
      style="position: absolute; left: 6.125rem; top: 94.5vh; cursor: pointer"
    >
      <!-- <img
          class="rect"
          v-if="select == 3"
          src="../../assets/images1/nine_1.png"
          alt
        />
        <img class="rect" v-else src="../../assets/images1/nine.png" alt /> -->
    </div>
    <!-- <div
        @click="select = 4"
        style="position: absolute;left:8.25rem;top:94.5vh;cursor: pointer;"
      >
        <img
          class="rect"
          v-if="select == 4"
          src="../../assets/images1/nine_1.png"
          alt
        />
        <img class="rect" v-else src="../../assets/images1/nine.png" alt />
      </div> -->
  </div>
</template>
<script>
import EZUIKit from "ezuikit-js";
import axios from "axios";
axios.defaults.baseURL = "/yingshiyun";
export default {
  name: "Project",
  data() {
    return {
      count: 0,
      selectPlayer: "", // 选中的监控
      deviceList: [], // 录像机个数
      cameraList: [], // 摄像头个数
      selectChannelNo: 1, // 选中的通道号
      select: 1, // 选中的网格数
      accessToken: "", // 用appKey和APPSecret请求回来的token
      selectVideo: 1, // 当前选中的video序号
      selectVideoFirst: 1,
      search: "", // 搜索框
      searchList: [],
    };
  },
  created() {},
  async mounted() {
    // 获得萤石云的token
    this.getDeviceToken();
  },
  watch: {
    // 选择显示video数量
    select(value) {
      this.select = value;
      this.cameraList.forEach((item, index) => {
        if (value == 1) {
          if (item.code == 200)
            item.player.reSize(
              this.$refs.videoBox.offsetWidth,
              this.$refs.videoBox.offsetHeight
            );
        } else if (value == 2) {
          if (item.code == 200)
            item.player.reSize(
              this.$refs.videoBox.offsetWidth / 2 - 2,
              this.$refs.videoBox.offsetHeight / 2 - 2
            );
        } else if (value == 3) {
          if (item.code == 200)
            item.player.reSize(
              this.$refs.videoBox.offsetWidth / 3,
              this.$refs.videoBox.offsetHeight / 3
            );
        }
        // else {
        //   if (item.code == 200)
        //     item.player.reSize(
        //       this.$refs.videoBox.offsetWidth / 4,
        //       this.$refs.videoBox.offsetHeight / 4
        //     );
        // }
      });
    },
    search(value) {
      if (value) {
        this.searchList = this.cameraList.filter(
          (item) => item.channelName.indexOf(value) > -1
        );
      } else {
        this.searchList = [];
      }
    },
  },
  beforeDestroy() {
    this.players.forEach((item) => {
      item.stop();
    });
  },
  methods: {
    // 获取token
    async getDeviceToken() {
      const data = new FormData();
      data.append("appKey", "萤石云账户的appKey");
      data.append("appSecret", "萤石云账户的appSecret");
      var res = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        url: "/api/lapp/token/get",
        data: data,
      });
      if (res.data.code == 200) {
        this.accessToken = res.data.data.accessToken;
        // TODO：deviceList(设备列表)需要利用获取设备列表接口获取
        if (this.deviceList.length) {
          this.deviceList.forEach((item) => {
            this.getChannelList(item);
          });
        }
      }
    },
    // 获取摄像头（通道）列表
    async getChannelList(device) {
      const data = new FormData();
      data.append("accessToken", this.accessToken);
      data.append("deviceSerial", device.deviceSerial);
      var res = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        url: "/api/lapp/device/camera/list",
        data: data,
      });
      this.count++;
      if (res.data.code == 200) {
        var canUseList = [];
        canUseList = res.data.data.filter(
          (item) => item.deviceSerial != item.ipcSerial
        );
        this.cameraList = [...this.cameraList, ...canUseList];
        if (this.count >= this.deviceList.length) {
          this.cameraList.forEach((item, index) => {
            this.getEzuikitUrl(item, index);
          });
          this.selectPlayer = this.cameraList[0];
        }
      }
    },
    // 获取监控地址
    async getEzuikitUrl(item, index, select) {
      const data = new FormData();
      data.append("accessToken", this.accessToken);
      data.append("deviceSerial", item.deviceSerial);
      data.append("channelNo", item.channelNo);
      var res = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        url: "/api/lapp/v2/live/address/get",
        method: "post",
        data: data,
      });
      if (res.data.code == 200) {
        var url = res.data.data.url;
        item.url = url;
        item.code = 200;
        item.msg = res.data.msg;
        // 渲染视频播放
        this.StructureEZUIKitPlayer(url, item, index, select);
      } else {
        var ref = document.querySelector("#video-cover" + (index + 1));
        ref.innerText = res.data.msg;
      }
      this.$set(this.cameraList, index, item);
    },
    // 渲染视频播放
    StructureEZUIKitPlayer(url, item, index, select) {
      if (select) {
        var player = new EZUIKit.EZUIKitPlayer({
          autoplay: false,
          audio: "0",
          id: "video-container", // 视频容器ID
          accessToken: this.accessToken,
          url: url, // 初始化写死一个离线或者找不到的设备，避免初始化无法创建播放器；
          template: "simple",
          width: this.$refs.videoBox.offsetWidth / 3,
          height: this.$refs.videoBox.offsetHeight / 3,
        });
        this.selectPlayer.player = player;
      } else {
        var player = new EZUIKit.EZUIKitPlayer({
          autoplay: false,
          audio: "0",
          id: `video-container${index + 1}`, // 视频容器ID
          accessToken: this.accessToken,
          url: url, // 初始化写死一个离线或者找不到的设备，避免初始化无法创建播放器；
          template: "simple",
          width: this.$refs.videoBox.offsetWidth / 3,
          height: this.$refs.videoBox.offsetHeight / 3,
        });
        item.player = player;
      }
      this.select = 3;
    },
    // 开始云台控制
    async startPTZCtrl(direction) {
      // 放大缩小：8 放大 9 缩小
      // 方向：0-上，1-下，2-左，3-右，4-左上，5-左下，6-右上，7-右下
      const data = new FormData();
      data.append("accessToken", this.accessToken);
      data.append("deviceSerial", this.selectPlayer.deviceSerial);
      data.append("channelNo", this.selectPlayer.channelNo);
      data.append("direction", direction);
      data.append("speed", "1");
      var res = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        url: "/api/lapp/device/ptz/start",
        data: data,
      });
      if (res.data.code != 200) {
        this.$message(res.data.msg);
      } else {
        this.stopPTZCtrl(direction);
      }
    },
    // 停止云台控制
    async stopPTZCtrl() {
      const data = new FormData();
      data.append("accessToken", this.accessToken);
      data.append("deviceSerial", this.selectPlayer.deviceSerial);
      data.append("channelNo", this.selectPlayer.channelNo);
      data.append("direction", "0");
      var res = await axios({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        method: "post",
        url: "/api/lapp/device/ptz/stop",
        data: data,
      });
      this.$message(res.data.msg);
    },
    // 设备抓拍图片
    async deviceCapture() {
      this.cameraList[this.selectVideo - 1].player.capturePicture();
    },
    // 全屏显示
    showAllScreen() {
      this.cameraList[this.selectVideo - 1].player.cancelFullScreen();
      this.cameraList[this.selectVideo - 1].player.fullScreen();
    },
    selectCamera(item, index) {
      this.selectPlayer = item;
      this.selectVideo = index + 1;
      this.selectVideoFirst = index + 1;
    },
    selectCamera2(camera) {
      var index = this.cameraList.findIndex(
        (item) => item.ipcSerial == camera.ipcSerial
      );
      this.selectPlayer = item;
      this.selectVideo = index + 1;
      this.selectVideoFirst = index + 1;
    },
  },
};
</script>
<style lang="scss" scoped>
.main {
  position: fixed;
  .app-container {
    width: 94.375rem;
    height: 71vh;
    // border: .125rem solid rgb(116, 228, 24);
    left: 1.875rem;
    background-color: rgb(255, 255, 255);
    margin: 0rem auto;
    position: relative;
    top: 13.125rem;
    // border-radius:.625rem;
    overflow: hidden;
    .left {
      overflow: hidden;
      width: 80%;
      border: 0.125rem solid rgb(226, 181, 33);
      height: 100%;
      position: absolute;
      left: 0;
      top: 0rem;
      .title {
        position: absolute;
        top: 1rem;
        left: 0.75rem;
        font-size: 1rem;
        font-weight: 600;
        color: #000;
      }
      .time {
        position: absolute;
        top: 1rem;
        right: 1.25rem;
        font-size: 1rem;
        font-weight: 600;
        color: #000;
      }
    }
    .left1 {
      width: 80%;
      border: 0.125rem solid rgb(37, 43, 102);
      height: 100%;
      top: 0rem;

      position: absolute;
      left: 0;
      overflow: hidden;
    }
    .left2 {
      top: 0rem;
      width: 80%;
      border: 0.125rem solid rgb(37, 43, 102);
      height: 100%;
      position: absolute;
      overflow: hidden;
      left: 0;
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background: rgb(255, 255, 255);
      width: 20%;
      height: 100%;
      top: 0;

      // border: .0625rem solid rgb(22, 21, 27);
      position: absolute;
      right: 0;
      .right1 {
        width: 100%;
        text-align: start;
        line-height: 2.5rem;
        color: #6e727a;
        margin: 0.3125rem auto;
        height: 2.5rem;
        padding: 0 1.25rem;
        cursor: pointer;
      }
      .right1:hover {
        background: #1393fc;
        color: rgb(255, 255, 255);
        border: none;
      }
      .right2 {
        width: 100%;
        padding: 0 1.25rem;
        height: 2.5rem;
        margin: 0.3125rem auto;
        line-height: 2.5rem;
        background: #1393fc;
        color: rgb(255, 255, 255);
        cursor: pointer;
      }
    }
  }
}

.hello-ezuikit-js {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  background: #ccc;
}

.width {
  width: 100%;
  height: 100%;
}

.width2 {
  width: 50%;
  height: 50%;
}

.width3 {
  width: 33.3%;
  height: 33.3%;
}

.width4 {
  width: 25%;
  height: 25%;
}

.video-active {
  border: 0.125rem solid rgb(255, 133, 62) !important;
}

.rect {
  width: 1.625rem;
  height: 1.625rem;
}

.video-cover {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: rgb(153, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  border-top: 0.0313rem solid #fff;
  border-right: 0.0313rem solid #fff;
}

::v-deep .el-dialog__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep .el-dialog__header {
  background: #efefef;
}

::v-deep .el-dialog {
  width: 36rem;
}

::v-deep .el-dialog__body {
  padding-top: 3.75rem;
  display: flex;
  justify-content: center;
}

::v-deep .el-form {
  width: 28.125rem;
}

::v-deep .el-form-item__label {
  width: 6.875rem !important;
}

::v-deep .el-input {
  width: 20rem;
}

.tabs {
  width: 100%;
  height: 2.4375rem;
  display: flex;
  position: absolute;
  top: 3.375rem;
  left: 0;
  border-top: 1px solid #ccc;

  .tab-item {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .tab-active {
    background: #ccc;
    color: #fff;
  }
}

.wheel {
  position: relative;
  width: 9.375rem;
  height: 9.375rem;
  border-radius: 50%;
  background: rgb(77, 77, 77);

  .camera {
    position: absolute;
    left: 3.75rem;
    top: 3.75rem;
    z-index: 5;
    width: 1.875rem;
    height: 1.875rem;
    text-align: center;
    line-height: 1.875rem;
    font-size: 1.25rem;
    color: #fff;
    cursor: pointer;
  }

  .top {
    height: 33.3%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .center {
    height: 33.3%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .center-left,
    .center-right {
      width: 33.3%;
      display: flex;
      justify-content: center;
    }
  }
  .bottom {
    height: 33.3%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .triangle {
    width: 0;
    height: 0;
    border: 0.625rem solid transparent;
    cursor: pointer;
  }

  .triangle-top {
    border-bottom: 0.9375rem solid #fff;
  }

  .triangle-bottom {
    border-top: 0.9375rem solid #fff;
  }

  .triangle-left {
    border-right: 0.9375rem solid #fff;
  }

  .triangle-right {
    border-left: 0.9375rem solid #fff;
  }
}

.bg-black {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  color: rgb(151, 0, 0);
  font-size: 12px;
}

.btns {
  display: flex;
  flex-direction: column;
  align-items: center;

  .two-btn {
    width: 11.25rem;
    margin: 0.9375rem auto;

    .el-button {
      width: 50%;
      margin: 0;
    }
  }
}

::v-deep .el-button {
  background: rgb(77, 77, 77);
  border-color: rgb(77, 77, 77);
}

::v-deep .el-button.right-btn {
  width: 11.25rem;
  margin: 0 auto 0.625rem;
}
</style>
