<template>
  <div class="home">
    {{ message }}
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { EventBus } from "@/utils/eventBus";
export default {
  name: "HomeView",
  data() {
    return {
      message: "",
    };
  },
  created() {
    EventBus.$on("message", (msg) => {
      console.log("接收消息", msg);
      this.message = msg;
    });
  },
  components: {
    HelloWorld,
  },
};
</script>
