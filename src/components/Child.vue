<template>
  <div>
    <div>子组件</div>
    <div>{{ user.name }}</div>
  </div>
</template>
<script>
export default {
  name: "child",
  props: ["user"],
  data() {
    console.log("子组件data");
    return {};
  },
  beforeCreate() {
    console.log("子组件beforeCreate", this);
  },
  async created() {
    console.log("子组件created");
  },
  beforeMount() {
    console.log("子组件beforeMount");
  },
  mounted() {
    console.log("子组件mounted");
  },

  methods: {},
};
</script>
<style lang="scss" scoped></style>
