import axios from "axios";
export const fatherMixin = {
  data() {
    console.log("父组件Mixin_data");
    return {
      option: [],
    };
  },
  beforeCreate() {
    console.log("父组件Mixin_beforeCreate");
  },
  async created() {
    await this.getTestData();
    console.log("父组件Mixin_Create", this.user);
  },
  beforeMount() {
    console.log("父组件Mixin_beforeMount");
  },
  mounted() {
    console.log("父组件Mixin_mounted");
  },
  methods: {
    async getTestData() {
      const res = await axios.get(
        "http://127.0.0.1:4523/m1/3543863-2241790-default/api/user"
      );
      console.log("获取数据1", res);
      this.user = res.data.data;
      // this.option = res.data.data;
    },
  },
};
