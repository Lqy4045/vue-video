<template>
  <div>
    <iframe
      v-for="item in 20"
      src="http://172.16.21.90:8080/video1"
      frameborder="0"
      style="width: 320px; height: 260px"
    ></iframe>
  </div>
</template>
<script>
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
  methods: {},
};
</script>
<style lang="scss" scoped></style>
