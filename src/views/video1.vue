<template>
  <div class="video-wrapper">
    <el-container class="video-layout-wrapper">
      <el-header class="video-header-wrapper">
        <Header @change="changeCityHandle" @settingHandle="settingHandle">
          <template #city>
            <!-- <el-select
          class="bigSreenSelect"
          v-model="cityValue"
          filterable
          size="small"
          placeholder="请选择"
          @change="changeCityHandle"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.adcode"
          ></el-option>
        </el-select> -->
          </template>
        </Header>
      </el-header>
      <el-container class="video-content-wrapper">
        <el-aside class="video-aside-wrapper" width="300px">
          <div class="video-aside-title-wrapper">
            <div class="aside-title">考站列表（50）</div>
            <div class="aside-right">已筛 20</div>
          </div>
          <div class="video-search-wrapper">
            <el-select
              class="search-case"
              v-model="searchConfig.status"
              placeholder="全部状态"
            >
              <el-option
                v-for="item in searchConfig.statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-input
              class="search-case"
              v-model="searchConfig.venue"
              placeholder="搜索考站"
              suffix-icon="el-icon-search"
            ></el-input>
          </div>
          <el-tree
            class="video-tree-wrapper"
            :data="treeConfig.data"
            :props="treeConfig.defaultProps"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <!-- {{ data }} -->
              <div class="flex-justify-between-align-center" style="flex: 1">
                <div class="flex-align-center">
                  {{ data.label }}
                  <svg
                    v-if="data.isGoBack"
                    t="1733991246205"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6739"
                    id="mx_n_1733991246206"
                    width="20"
                    height="20"
                    style="margin-left: 5px"
                  >
                    <path
                      d="M896 160.01219a64 64 0 0 1 64 64v575.97562a64 64 0 0 1-64 64.02438h-512a64 64 0 0 1-64-64.02438V224.036571a64 64 0 0 1 64-64.024381h512zM228.010667 219.989333c19.870476 0 35.986286 16.14019 35.986285 36.010667v512a36.010667 36.010667 0 1 1-71.996952 0v-512c0-19.870476 16.11581-36.010667 36.010667-36.010667z m659.992381 12.01981H391.996952v559.981714h496.006096V232.009143z m-787.992381 51.98019c19.870476 0 35.986286 16.14019 35.986285 36.010667v384a36.010667 36.010667 0 1 1-71.996952 0v-384c0-19.870476 16.11581-36.010667 36.010667-36.010667z m462.409143 69.071238l208.018285 123.977143c23.04 13.726476 23.503238 46.957714 0.853334 61.318096l-207.993905 132.047238c-23.966476 15.189333-55.296-2.023619-55.296-30.403048v-256a36.010667 36.010667 0 0 1 54.442666-30.939429z m17.578666 94.305524v127.146667l103.302095-65.584762-103.302095-61.561905z"
                      fill="#ffffff"
                      p-id="6740"
                    ></path>
                  </svg>
                </div>
                <div
                  v-if="data.tags && data.tags.length"
                  class="flex-align-center"
                >
                  <svg
                    v-if="data.tags.includes('disabled')"
                    style="margin: 0 3px"
                    t="1733818025867"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4290"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M512 953.6a441.6 441.6 0 1 1 0-883.2 441.6 441.6 0 0 1 0 883.2z m0-64a377.6 377.6 0 1 0 0-755.2 377.6 377.6 0 0 0 0 755.2z"
                      fill="red"
                      p-id="4291"
                    ></path>
                    <path
                      d="M182.1696 227.4304l45.2608-45.2608 614.4 614.4-45.2608 45.2608z"
                      fill="red"
                      p-id="4292"
                    ></path>
                  </svg>
                  <div
                    v-if="data.tags.includes('person')"
                    class="video-tag video-tag-person"
                  >
                    人
                  </div>
                  <div
                    v-if="data.tags.includes('AI')"
                    class="video-tag video-tag-AI"
                  >
                    AI
                  </div>
                </div>
              </div>
            </template>
          </el-tree>
          <!-- <el-button>退回</el-button> -->
        </el-aside>
        <el-main
          class="video-main-wrapper"
          :class="`video-main-wrapper${layoutNum}`"
        >
          <BaseVideo
            :ref="item.cameraId"
            class="video-item"
            :class="item.cameraId"
            :c="item"
            v-for="item in vDataList"
          >
            <template #top-tools>
              <div class="video-tools-list flex-justify-between-align-center">
                <div class="top-base-info flex-align-center">
                  <div class="orange">AI：4</div>
                  <div class="red">人工：3</div>
                </div>
                <div class="flex-align-center">
                  <svg
                    t="1733822901344"
                    class="icon top-btn"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6446"
                    width="20"
                    height="20"
                    @click="screenshotHandle(item)"
                  >
                    <path
                      d="M835.3 250.9v522.3H188.7V250.9h646.6m49.8-49.8H138.9v621.8H885V201.1h0.1z"
                      p-id="6447"
                      fill="#ffffff"
                    ></path>
                    <path
                      d="M138.9 101.6v99.5H64.3v49.8H188.7V101.6zM885.1 922.4v-99.5h74.6v-49.8H835.3v149.3zM511 705.4H297.5c-7.8 0-20.4-2.9-23.3-7.8-2.9-4.9 1.9-16.5 5.8-23.3 26.2-39.8 53.4-79.6 79.6-119.4 8.7-12.6 17.5-13.6 31.1-7.8 44.6 21.4 90.3 42.7 135.9 64.1 12.6 5.8 28.1 1.9 35.9-9.7 24.3-37.9 49.5-74.7 75.7-111.6 4.9-6.8 13.6-17.5 20.4-17.5 7.8 0 13.6 12.6 16.5 20.4 24.3 60.2 47.6 121.3 70.9 181.5 9.7 25.2 5.8 31.1-23.3 31.1H511z m-78.6-298c0 29.1-25.2 52.4-54.4 51.4-29.1-1-51.4-23.3-51.4-51.4 0-29.1 24.3-52.4 54.4-51.4 27.1 0.9 51.4 24.2 51.4 51.4z"
                      p-id="6448"
                      fill="#ffffff"
                    ></path>
                  </svg>
                  <svg
                    t="1733822850834"
                    class="icon top-btn"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5349"
                    width="20"
                    height="20"
                    @click="testHandle('固定')"
                  >
                    <path
                      d="M43.072 974.72l380.864-301.952 151.936 161.6c0 0 63.424 17.28 67.328-30.72l-3.904-163.584 225.088-259.648 98.048-5.696c0 0 76.928-15.488 21.184-82.752l-275.072-276.928c0 0-74.944-9.6-69.248 59.584l0 75.008L383.552 367.104 225.856 376.64c0 0-57.728 19.2-36.608 69.248l148.16 146.176L43.072 974.72 43.072 974.72z"
                      fill="#ffffff"
                      p-id="5350"
                    ></path>
                  </svg>
                  <svg
                    t="1733822947979"
                    class="icon top-btn"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="7488"
                    width="20"
                    height="20"
                    @click="testHandle('禁用')"
                  >
                    <path
                      d="M874.045406 149.954594a511.208843 511.208843 0 1 0 109.544752 162.734815 511.208843 511.208843 0 0 0-109.544752-162.734815z m-100.416023 19.596339L169.550933 773.629383a430.876025 430.876025 0 0 1 604.07845-604.07845z m169.550933 342.388209a430.997742 430.997742 0 0 1-718.126708 321.08784l608.581956-608.581956a428.441697 428.441697 0 0 1 109.544752 287.494116z"
                      fill="#ffffff"
                      p-id="7489"
                    ></path>
                  </svg>
                  <svg
                    t="1733822984615"
                    class="icon top-btn"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="8550"
                    width="23"
                    height="23"
                    @click="testHandle('详情信息')"
                  >
                    <path
                      d="M512 958.016611c-245.919634 0-446.016611-200.064292-446.016611-446.016611 0-245.919634 200.095256-446.016611 446.016611-446.016611 245.952318 0 446.016611 200.064292 446.016611 446.016611S757.952318 958.016611 512 958.016611zM512 129.983389c-210.655557 0-382.016611 171.359333-382.016611 382.016611 0 210.624593 171.359333 382.016611 382.016611 382.016611 210.624593 0 382.016611-171.359333 382.016611-382.016611S722.624593 129.983389 512 129.983389z"
                      fill="#ffffff"
                      p-id="8551"
                    ></path>
                    <path
                      d="M463.99957 304.00043c0 26.509985 21.490445 48.00043 48.00043 48.00043s48.00043-21.490445 48.00043-48.00043-21.490445-48.00043-48.00043-48.00043S463.99957 277.490445 463.99957 304.00043z"
                      fill="#ffffff"
                      p-id="8552"
                    ></path>
                    <path
                      d="M512 768c-17.664722 0-32.00086-14.303454-32.00086-32.00086L479.99914 448c0-17.664722 14.336138-32.00086 32.00086-32.00086s32.00086 14.336138 32.00086 32.00086l0 287.99914C544.00086 753.696546 529.664722 768 512 768z"
                      fill="#ffffff"
                      p-id="8553"
                    ></path>
                  </svg>
                </div>
              </div>
            </template>
          </BaseVideo>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog
      title="设置"
      custom-class="video-dialog-wrapper"
      :visible.sync="dialogConfig.visible"
      width="580px"
    >
      <el-form class="video-form-wrapper" label-position="top" :inline="true">
        <el-form-item label="画面布局">
          <el-select v-model="formConfig.layoutValue" placeholder="请选择">
            <el-option
              v-for="item in formConfig.layoutOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="轮询周期">
          <el-select v-model="formConfig.loopTime" placeholder="请选择">
            <el-option
              v-for="item in formConfig.loopTimeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfig.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfig.visible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import BaseVideo from "@/components/Video.vue";
import VScaleScreen from "v-scale-screen";
export default {
  watch: {
    "document.fullscreenElement": {
      handler(value) {
        console.log("全屏变化", value);
      },
    },
  },
  data() {
    return {
      layoutNum: 9,
      vDataList: [],
      videoList: [
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_1/test_20241212_1.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334190&Signature=hoFVK1svWsriq87XDrDd7YtDpOo%3D",
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_2/test_20241212_2.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334190&Signature=PTnleh1DqW4GK0pmmb3O6P7%2B4g0%3D",
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_3/test_20241212_3.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334191&Signature=KlIozgm%2FJEt%2FT3tSTk2GReQWel4%3D",
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_4/test_20241212_4.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334191&Signature=S81jvYTG%2BUAY6LJbISnsZcmFt%2F0%3D",
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_5/test_20241212_5.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334191&Signature=lK4O05I%2BVWAu5VH57SM3xJ2En5M%3D",
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_6/test_20241212_6.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334191&Signature=hvKwArMuQweKwAw%2F2C42gqp8EJw%3D",
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_7/test_20241212_7.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334191&Signature=4SMRVfwRsMVhpWFMFbO5C8yBvfE%3D",
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_8/test_20241212_8.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334191&Signature=7Z5xa39sJlI1H1fHCky3A%2FdE5pM%3D",
        "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_9/test_20241212_9.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334191&Signature=QMtbdJve%2BZ8AKX0Hf%2Bx7Qkavqq4%3D",
      ],
      treeConfig: {
        data: [
          {
            label: "江苏省",
            isGoBack: true,
            children: [
              {
                label: "南京市",
                children: [
                  {
                    label: "南京大学",
                    children: [
                      {
                        label: "考场1",
                        children: [
                          {
                            label: "右前视角",
                            tags: ["disabled", "AI", "person"],
                          },
                          {
                            label: "正前视角",
                          },
                          {
                            label: "右后视角",
                            tags: ["AI"],
                          },
                          {
                            label: "左后视角",
                            tags: ["disabled"],
                          },
                        ],
                      },
                      {
                        label: "考场2",
                        children: [
                          {
                            label: "右前视角",
                            tags: ["disabled", "AI", "person"],
                          },
                          {
                            label: "正前视角",
                          },
                          {
                            label: "右后视角",
                            tags: ["AI"],
                          },
                          {
                            label: "左后视角",
                            tags: ["disabled"],
                          },
                        ],
                      },
                      {
                        label: "考场3",
                        children: [
                          {
                            label: "IPC-校门口",
                            tags: ["person"],
                          },
                          {
                            label: "IPC-保密室",
                          },
                          {
                            label: "巡考助手-张大宝",
                          },
                          {
                            label: "巡考助手-王小花",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "南京理工大学",
                    children: [
                      {
                        label: "考场1",
                        children: [
                          {
                            label: "右前视角",
                            tags: ["disabled", "AI", "person"],
                          },
                          {
                            label: "正前视角",
                          },
                          {
                            label: "右后视角",
                            tags: ["AI"],
                          },
                          {
                            label: "左后视角",
                            tags: ["disabled"],
                          },
                        ],
                      },
                      {
                        label: "考场2",
                        children: [
                          {
                            label: "右前视角",
                            tags: ["disabled", "AI", "person"],
                          },
                          {
                            label: "正前视角",
                          },
                          {
                            label: "右后视角",
                            tags: ["AI"],
                          },
                          {
                            label: "左后视角",
                            tags: ["disabled"],
                          },
                        ],
                      },
                      {
                        label: "考场3",
                        children: [
                          {
                            label: "IPC-校门口",
                            tags: ["person"],
                          },
                          {
                            label: "IPC-保密室",
                          },
                          {
                            label: "巡考助手-张大宝",
                          },
                          {
                            label: "巡考助手-王小花",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            label: "北京市",
            children: [
              {
                label: "北京市",
                children: [
                  {
                    label: "北京大学",
                    children: [
                      {
                        label: "考场1",
                        children: [
                          {
                            label: "右前视角",
                            tags: ["disabled", "AI", "person"],
                          },
                          {
                            label: "正前视角",
                          },
                          {
                            label: "右后视角",
                            tags: ["AI"],
                          },
                          {
                            label: "左后视角",
                            tags: ["disabled"],
                          },
                        ],
                      },
                      {
                        label: "考场2",
                        children: [
                          {
                            label: "右前视角",
                            tags: ["disabled", "AI", "person"],
                          },
                          {
                            label: "正前视角",
                          },
                          {
                            label: "右后视角",
                            tags: ["AI"],
                          },
                          {
                            label: "左后视角",
                            tags: ["disabled"],
                          },
                        ],
                      },
                      {
                        label: "考场3",
                        children: [
                          {
                            label: "IPC-校门口",
                            tags: ["person"],
                          },
                          {
                            label: "IPC-保密室",
                          },
                          {
                            label: "巡考助手-张大宝",
                          },
                          {
                            label: "巡考助手-王小花",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    label: "清华大学",
                    children: [
                      {
                        label: "考场1",
                        children: [
                          {
                            label: "右前视角",
                            tags: ["disabled", "AI", "person"],
                          },
                          {
                            label: "正前视角",
                          },
                          {
                            label: "右后视角",
                            tags: ["AI"],
                          },
                          {
                            label: "左后视角",
                            tags: ["disabled"],
                          },
                        ],
                      },
                      {
                        label: "考场2",
                        children: [
                          {
                            label: "右前视角",
                            tags: ["disabled", "AI", "person"],
                          },
                          {
                            label: "正前视角",
                          },
                          {
                            label: "右后视角",
                            tags: ["AI"],
                          },
                          {
                            label: "左后视角",
                            tags: ["disabled"],
                          },
                        ],
                      },
                      {
                        label: "考场3",
                        children: [
                          {
                            label: "IPC-校门口",
                            tags: ["person"],
                          },
                          {
                            label: "IPC-保密室",
                          },
                          {
                            label: "巡考助手-张大宝",
                          },
                          {
                            label: "巡考助手-王小花",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        defaultProps: {
          children: "children",
          label: "label",
        },
      },

      dialogConfig: {
        visible: false,
      },
      searchConfig: {
        venue: "",
        status: "",
        statusOptions: [
          {
            label: "在线",
            value: "online",
          },
          {
            label: "离线",
            value: "offline",
          },
          {
            label: "隐藏",
            value: "hide",
          },
        ],
      },
      formConfig: {
        layoutValue: "",
        layoutOptions: [
          { label: 1, value: 1 },
          { label: 2, value: 2 },
          { label: 3, value: 3 },
          { label: 4, value: 4 },
          { label: 5, value: 5 },
          { label: 6, value: 6 },
          { label: 7, value: 7 },
          { label: 8, value: 8 },
          { label: 9, value: 9 },
        ],
        loopTime: "",
        loopTimeOptions: [
          {
            label: "30秒",
            value: 30,
          },
          {
            label: "1分",
            value: 60,
          },
          {
            label: "2分",
            value: 120,
          },
          {
            label: "5分",
            value: 300,
          },
          {
            label: "10分",
            value: 600,
          },
        ],
      },
    };
  },
  created() {
    this.initVideo();
  },
  watch: {
    layoutNum() {
      this.initVideo();
    },
  },
  components: {
    Header,
    BaseVideo,
    VScaleScreen,
  },
  methods: {
    initVideo() {
      // Array(this.layoutNum)
      //   .fill(20)
      this.videoList.forEach((item, index) => {
        this.vDataList.push({
          // hlsurl: "https://0472.org/hls/cgtna.m3u8",
          hlsurl: item,
          // "http://ata-dev.oss-cn-beijing.aliyuncs.com/multi_stream_20241212.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049350512&Signature=bXiC1cEZCA0sVVkh8MFDpx0VKak%3D",
          // hlsurl:
          //   "http://ata-dev.oss-cn-beijing.aliyuncs.com/test_rtmp_live_20241212_1/test_20241212_1.m3u8?x-oss-process=hls%2Fsign&OSSAccessKeyId=LTAI5tGGRdCdjVUZ5FMF8MNo&Expires=2049334190&Signature=hoFVK1svWsriq87XDrDd7YtDpOo%3D",
          cameraId: `lqy${index}`, //id
          picture: "",
        });
      });
    },
    getFull() {},
    testHandle(data) {
      alert(data);
    },
    settingHandle() {
      this.dialogConfig.visible = true;
    },
    screenshotHandle(data) {
      console.log("截图", data);
      console.log("2222", this.$refs[data.cameraId][0].getVideoDom());
      let video = this.$refs[data.cameraId][0].getVideoDom();
      // let video = document.querySelector(`#${data.cameraId}`);
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
      let previewImg = canvas.toDataURL("image/png");
      console.log(previewImg);
      this.saveBase64(previewImg);
      // testHandle("截图");
    },
    getVideoPic() {
      let video = document.getElementById("cameraId")[0];
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
    changeCityHandle() {},
    handleNodeClick(a, b, c) {
      console.log("点击", a, b, c);
      if (!a.children) {
        this.layoutNum = 1;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$aside-bg-color: #434343;
.video-wrapper {
  min-width: 1366px;
  height: 100%;
  .video-layout-wrapper {
    height: 100%;
    .video-header-wrapper {
      height: 56px !important;
      background-color: #666;
    }

    .video-content-wrapper {
      height: 100%;
      background-color: #333333;
      .video-aside-wrapper {
        margin: 10px;
        padding: 10px;
        background-color: $aside-bg-color;
        .video-aside-title-wrapper {
          display: flex;
          justify-content: space-between;
          text-align: center;
          color: #fff;
          padding: 10px 0;
          .aside-title {
            font-weight: 700;
          }
        }
        .video-search-wrapper {
          .search-case {
            width: 100%;
            margin-bottom: 10px;
            ::v-deep input {
              background-color: #666;
              border-color: #666;
            }
          }
        }
        .video-tree-wrapper {
          color: #fff;
          background-color: $aside-bg-color;
          ::v-deep .el-tree-node__content:hover {
            background-color: $aside-bg-color;
          }
          ::v-deep .el-tree-node:focus {
            .el-tree-node__content {
              background-color: $aside-bg-color;
            }
          }
          .video-tag {
            font-size: 12px;
            width: 25px;
            text-align: center;
            margin: 3px;
            border-radius: 2px;
          }
          .video-tag-person {
            color: red;
            border: 1px solid red;
          }
          .video-tag-AI {
            color: orange;
            border: 1px solid orange;
          }
        }
      }
      .video-main-wrapper {
        padding: 10px 10px 10px 0;
      }
      .video-main-wrapper1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;

        .video-item {
          width: 100%;
          height: 100%;
          .video-tools-list {
            box-sizing: border-box;
            width: 100%;
            background-color: rgba(97, 105, 127, 0.7);
            height: 30px;
            padding: 0 10px;
            .top-base-info {
              font-size: 13px;
              .red {
                margin-right: 10px;
                color: red;
              }
              .orange {
                margin-right: 10px;
                color: orange;
              }
            }
            .top-btn {
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }
      }
      .video-main-wrapper9 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;

        .video-item {
          width: 33%;
          height: 33%;
          .video-tools-list {
            box-sizing: border-box;
            width: 100%;
            background-color: rgba(97, 105, 127, 0.7);
            height: 30px;
            padding: 0 10px;
            .top-base-info {
              font-size: 13px;
              .red {
                margin-right: 10px;
                color: red;
              }
              .orange {
                margin-right: 10px;
                color: orange;
              }
            }
            .top-btn {
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

::v-deep .video-dialog-wrapper {
  .el-dialog__header {
    border-bottom: 1px solid #ccc;
  }
  .el-dialog__body {
    padding: 10px 20px;
  }
  .video-form-wrapper {
    .el-form-item {
      margin-right: 45px;
    }
    .el-form-item__label {
      padding: 0;
    }
    padding: 0;
  }
}
</style>
