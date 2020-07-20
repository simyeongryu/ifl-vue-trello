<template>
  <div>
    Board
    <div v-if="loading">Loading Board...</div>
    <div v-else>
      <div>bId : {{ bId }}</div>
      <router-link :to="`/b/${bId}/c/1`">Card 1</router-link>
      <router-link :to="`/b/${bId}/c/2`">Card 2</router-link>
    </div>
    <hr />
    <!-- 중첩 라우팅을 위한 router-view -->
    <router-view />
  </div>
</template>

<script>
let timeout = null;

export default {
  data() {
    return {
      bId: 0,
      loading: false
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.loading = true;

      timeout = setTimeout(() => {
        this.bId = this.$route.params.bId; // this.$route 를 통해 해당 route의 정보를 얻을 수 있다.
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
