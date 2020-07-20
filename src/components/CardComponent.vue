<template>
  <div>
    Card
    <div v-if="loading">Loading Cards...</div>
    <div v-else>cId: {{ cId }}</div>
  </div>
</template>

<script>
let timeout = null;

export default {
  data() {
    return {
      cId: 0,
      loading: false
    };
  },

  // $route의 변화를 감지하여 특정 코드를 실행
  watch: {
    // watch 내부를 함수가 아니라 객체형태로도 정의할 수 있다.
    $route: {
      handler: 'fetchData', // $route가 변할 때 실행할 함수
      immediate: true // 즉시 실행
    }
  },

  methods: {
    fetchData() {
      this.loading = true;

      timeout = setTimeout(() => {
        this.cId = this.$route.params.cId;
        this.loading = false;
      }, 500);
    }
  },

  destroyed() {
    clearTimeout(timeout);
  }
};
</script>

<style></style>
