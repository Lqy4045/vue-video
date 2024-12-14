<template>
  <div style="padding: 50px">
    <div class="videoCase">
      <BaseVideo :vData="vDataList"></BaseVideo>
    </div>

    <el-input
      v-model="vDataList.hlsurl"
      style="width: 640px; margin-top: 20px"
    ></el-input>
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
      vDataList: {
        hlsurl:
          "http://ata-dev.oss-cn-beijing.aliyuncs.com/multi_stream_20241212.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049350512&Signature=bXiC1cEZCA0sVVkh8MFDpx0VKak%3D",
        // hlsurl:
        //   "",
        cameraId: `lqy1`, //id
      },
    };
  },

  filters: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.videoCase {
  width: 640px;
  height: 360px;
}
</style>
