<template>
  <div>
    <Child :user="user"></Child>
  </div>
</template>
<script>
import axios from "axios";
import { fatherMixin } from "@/mixins/father";
import Child from "@/components/Child.vue";
export default {
  name: "father",
  mixins: [fatherMixin],
  components: {
    Child,
  },
  data() {
    console.log("父组件data");
    return {
      user: {
        name: "",
        age: "",
      },
    };
  },
  beforeCreate() {
    console.log("父组件beforeCreate", this);
  },
  async created() {
    // this.user.name = "zs";
    // this.user.age = 18;
    // await this.getTestData();
    console.log("父组件created", this.user);
  },
  beforeMount() {
    console.log("父组件beforeMount");
  },
  mounted() {
    this.$nextTick(() => {
      console.log("父组件mounted_nexttick", this.user);
    });
    console.log("父组件mounted");
  },

  methods: {
    async getTestData() {
      const res = await axios.get(
        "http://127.0.0.1:4523/m1/3543863-2241790-default/api/user"
      );
      console.log("获取数据", res);
      this.user = res.data.data;
      // this.option = res.data.data;
    },
  },
};
</script>
<style lang="scss" scoped></style>
