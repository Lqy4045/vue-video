<template>
  <div>
    <!-- <iframe
      src="/about"
      frameborder="0"
      style="width: 1366px; height: 768px"
    ></iframe> -->
    <button @click="test">测试</button>
    <button @click="login">登录</button>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  props: {},
  mixins: [],
  data() {
    return {};
  },
  filters: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    test() {
      axios.get("http://172.16.21.90:8512", {
        account: "123456@qq.com",
        password: 123456,
      });
    },
    login() {
      axios.post("http://172.16.21.90:8512/users/login", {
        account: "123456@qq.com",
        password: 123456,
      });
    },
  },
};
</script>
<style lang="scss" scoped></style>
