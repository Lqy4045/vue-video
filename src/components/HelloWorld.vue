<template>
  <div>
    <button @click="sendMessage">发送广播</button>
  </div>
</template>
<script>
import { EventBus } from "@/utils/eventBus";
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
    sendMessage() {
      console.log("发送广播");
      EventBus.$emit("message", "hello world");
    },
  },
};
</script>
<style lang="scss" scoped></style>
