<template>
  <div style="padding: 50px">
    <div
      class="videoCase"
      :style="{
        width: `${width}px`,
        height: `${height}px`,
      }"
    >
      <BaseVideo :vData="vDataList"></BaseVideo>
    </div>
    <el-form label-position="right" label-width="80px">
      <el-form-item label="url">
        <el-input
          v-model="config.vData.hlsurl"
          style="width: 640px; margin-top: 20px"
        ></el-input>
      </el-form-item>
      <el-form-item label="width">
        <el-input
          v-model="config.width"
          style="width: 640px; margin-top: 20px"
        ></el-input>
      </el-form-item>
      <el-form-item label="height">
        <el-input
          v-model="config.height"
          style="width: 640px; margin-top: 20px"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-button @click="confirmHandle">确定</el-button>
  </div>
</template>
<script>
import BaseVideo from "@/components/Video.vue";

export default {
  name: "",
  components: {
    BaseVideo,
  },
  props: {},
  mixins: [],
  data() {
    return {
      config: {
        vData: {
          hlsurl: "",
          cameraId: `lqy${+new Date()}`,
        },
        width: "",
        height: "",
      },
      width: 1280,
      height: 720,
      vDataList: {
        hlsurl:
          "http://ata-dev.oss-cn-beijing.aliyuncs.com/multi_stream_20241212.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049350512&Signature=bXiC1cEZCA0sVVkh8MFDpx0VKak%3D",
        cameraId: `lqy${+new Date()}`,
      },
    };
  },

  filters: {},
  computed: {},
  watch: {},
  created() {
    this.config.vData.hlsurl = this.vDataList.hlsurl;
    this.config.width = this.width;
    this.config.height = this.height;
  },
  mounted() {},
  methods: {
    confirmHandle() {
      this.vDataList.hlsurl = this.config.vData.hlsurl;
      this.width = this.config.width;
      this.height = this.config.height;
    },
  },
};
</script>
