<template>
  <div>
    <Child :user="user"></Child>
  </div>
</template>
<script>
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
    return {};
  },
  beforeCreate() {
    console.log("父组件beforeCreate", this);
  },
  async created() {
    console.log("父组件created");
  },
  beforeMount() {
    console.log("父组件beforeMount");
  },
  mounted() {
    console.log("父组件mounted");
  },

  methods: {},
};
</script>
<style lang="scss" scoped></style>
