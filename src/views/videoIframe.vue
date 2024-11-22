<template>
  <div>
    <iframe
      v-for="item in 10"
      src="http://localhost:8080/video1"
      frameborder="0"
      style="width: 250px; height: 180px"
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
