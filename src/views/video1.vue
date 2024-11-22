<template>
  <div class="video-wrapper">
    <BaseVideo
      class="video-item"
      :vData="item"
      v-for="item in vDataList"
    ></BaseVideo>
  </div>
</template>
<script>
import BaseVideo from "@/components/Video.vue";
export default {
  data() {
    return {
      vDataList: [],
    };
  },
  created() {
    Array(1)
      .fill(0)
      .forEach((item, index) => {
        this.vDataList.push({
          hlsurl:
            "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241122/test_20241122.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=1734848589&Signature=lk%2BTB8OzXme5pS9wlYyexsv6HF8%3D",
          cameraId: `lqy${index}`, //id
        });
      });
  },
  components: {
    BaseVideo,
  },
};
</script>
<style></style>
